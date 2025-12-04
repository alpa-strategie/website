interface NotionPage {
  id: string;
  title: string;
  content: string;
}

const dbIds = {
  knowledge: process.env.NOTION_DB_ID_KNOWLEDGE!,
  missions: process.env.NOTION_DB_ID_MISSIONS!,
  expertise: process.env.NOTION_DB_ID_EXPERTISE!,
  faqs: process.env.NOTION_DB_ID_FAQS!,
};

function extractPropertyValue(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  
  const typedProp = prop as { type: string; [key: string]: unknown };
  const propType = typedProp.type;
  const propData = typedProp[propType];

  if (!propData) return '';

  switch (propType) {
    case 'title':
    case 'rich_text':
      if (Array.isArray(propData) && propData[0]) {
        return propData.map((rt: { plain_text: string }) => rt.plain_text).join('');
      }
      return '';
    
    case 'number':
      return propData ? String(propData) : '';
    
    case 'select':
      return (propData as { name?: string })?.name || '';
    
    case 'multi_select':
      if (Array.isArray(propData)) {
        return propData.map((item: { name: string }) => item.name).join(', ');
      }
      return '';
    
    case 'date':
      const dateData = propData as { start?: string; end?: string };
      if (dateData.start) {
        return dateData.end ? `${dateData.start} to ${dateData.end}` : dateData.start;
      }
      return '';
    
    case 'checkbox':
      return propData ? 'Yes' : 'No';
    
    case 'url':
      return propData ? String(propData) : '';
    
    case 'email':
      return propData ? String(propData) : '';
    
    case 'phone_number':
      return propData ? String(propData) : '';
    
    case 'status':
      return (propData as { name?: string })?.name || '';
    
    default:
      return '';
  }
}

async function queryDatabase(databaseId: string): Promise<NotionPage[]> {
  try {
    const response = await fetch('https://api.notion.com/v1/databases/' + databaseId + '/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
      }),
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json() as { results: unknown[] };
    const pages: NotionPage[] = [];

    for (const page of data.results) {
      if (typeof page === 'object' && page !== null && 'properties' in page && 'id' in page) {
        let title = '';
        const pageWithProps = page as { id: string; properties: Record<string, unknown> };
        const properties = pageWithProps.properties;
        
        const titleProp = Object.values(properties).find(
          (prop) => typeof prop === 'object' && prop !== null && (prop as { type: string }).type === 'title'
        );

        if (titleProp && typeof titleProp === 'object' && titleProp !== null && 'title' in titleProp && Array.isArray(titleProp.title) && titleProp.title[0]) {
          title = (titleProp.title[0] as { plain_text: string }).plain_text;
        }

        let propertiesText = '';
        for (const [propName, propValue] of Object.entries(properties)) {
          if (typeof propValue === 'object' && propValue !== null) {
            const propType = (propValue as { type: string }).type;
            if (propType !== 'title') {
              const value = extractPropertyValue(propValue);
              if (value) {
                propertiesText += `**${propName}**: ${value}\n`;
              }
            }
          }
        }

        const blocksResponse = await fetch(`https://api.notion.com/v1/blocks/${pageWithProps.id}/children`, {
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28',
          },
        });

        if (blocksResponse.ok) {
          const blocksData = await blocksResponse.json() as { results: unknown[] };
          let blockContent = '';
          
          for (const block of blocksData.results) {
            if (typeof block === 'object' && block !== null && 'type' in block) {
              const blockType = (block as { type: string }).type;
              const blockData = (block as Record<string, unknown>)[blockType];

              if (blockData && typeof blockData === 'object' && 'rich_text' in blockData) {
                const richText = blockData.rich_text as Array<{ plain_text: string }>;
                const text = richText.map((rt) => rt.plain_text).join('');
                if (text) blockContent += text + '\n';
              }
            }
          }

          const fullContent = propertiesText + (propertiesText && blockContent ? '\n' : '') + blockContent;

          if (title || fullContent.trim()) {
            pages.push({
              id: pageWithProps.id,
              title,
              content: fullContent.trim(),
            });
          }
        }
      }
    }

    return pages;
  } catch (error) {
    console.error(`Error querying database ${databaseId}:`, error);
    return [];
  }
}

function formatPages(pages: NotionPage[], sectionTitle: string): string {
  if (pages.length === 0) return '';

  let formatted = `\n## ${sectionTitle}\n\n`;
  
  for (const page of pages) {
    if (page.title) {
      formatted += `### ${page.title}\n`;
    }
    if (page.content) {
      formatted += `${page.content}\n\n`;
    }
  }

  return formatted;
}

export async function getKnowledgeBase(intent: 'booking' | 'faq' | 'full' = 'full'): Promise<string> {
  try {
    console.log(`\n🔵 [NOTION KB] Starting knowledge base retrieval (intent: ${intent})...`);
    
    if (intent === 'booking') {
      console.log('🎯 [NOTION KB] Booking intent detected - returning minimal KB');
      return getBookingKnowledgeBase();
    }
    
    if (!process.env.NOTION_TOKEN || !dbIds.knowledge) {
      console.warn('⚠️ [NOTION KB] Notion not configured, using fallback knowledge base');
      return getFallbackKnowledgeBase();
    }

    if (intent === 'faq') {
      console.log('🔵 [NOTION KB] FAQ intent - querying FAQs database only...');
      const faqPages = await queryDatabase(dbIds.faqs);
      console.log(`✅ [NOTION KB] Retrieved FAQs: ${faqPages.length} pages`);
      
      let knowledgeBase = '# Baptiste Leroux - Alpa Stratégie\n\n';
      knowledgeBase += 'Contact: Based in Paris, France. Available for projects across Europe.\n';
      knowledgeBase += formatPages(faqPages, 'Frequently Asked Questions');
      
      console.log(`✅ [NOTION KB] FAQ knowledge base size: ${knowledgeBase.length} characters`);
      return knowledgeBase;
    }

    console.log('🔵 [NOTION KB] Full intent - querying 4 Notion databases...');
    const [knowledgePages, missionPages, expertisePages, faqPages] = await Promise.all([
      queryDatabase(dbIds.knowledge),
      queryDatabase(dbIds.missions),
      queryDatabase(dbIds.expertise),
      queryDatabase(dbIds.faqs),
    ]);

    console.log(`✅ [NOTION KB] Retrieved pages: Knowledge=${knowledgePages.length}, Missions=${missionPages.length}, Expertise=${expertisePages.length}, FAQs=${faqPages.length}`);

    let knowledgeBase = '# Baptiste Leroux - Alpa Stratégie\n';
    knowledgeBase += formatPages(knowledgePages, 'About Baptiste & Alpa Stratégie');
    knowledgeBase += formatPages(expertisePages, 'Expertise & Services');
    knowledgeBase += formatPages(missionPages, 'Client Missions & Case Studies');
    knowledgeBase += formatPages(faqPages, 'Frequently Asked Questions');

    console.log(`✅ [NOTION KB] Total knowledge base size: ${knowledgeBase.length} characters`);
    console.log(`📄 [NOTION KB] Sample (first 200 chars): ${knowledgeBase.substring(0, 200)}...`);

    if (knowledgeBase.length < 200) {
      console.warn('⚠️ [NOTION KB] Notion data too sparse, using fallback');
      return getFallbackKnowledgeBase();
    }

    return knowledgeBase;
  } catch (error) {
    console.error('❌ [NOTION KB] Error fetching Notion knowledge base:', error);
    return getFallbackKnowledgeBase();
  }
}

function getBookingKnowledgeBase(): string {
  return `# Baptiste Leroux - Alpa Stratégie

## Contact & Booking
Baptiste Leroux is available for consulting engagements across Europe, based in Paris, France.

### What to Expect from a Call
A 45-minute strategy session to:
- Understand your specific challenges and objectives
- Explore how Baptiste's 20+ years of IT leadership experience can help
- Discuss potential engagement models and next steps
- Answer any questions about services, approach, or experience

### Booking Process
Use the scheduling link to select a convenient time. You'll receive a confirmation with video conference details.

Contact: Based in Paris, France. Available for projects across Europe.`;
}

export async function fetchPsychometricProfilePage(): Promise<string> {
  const pageId = process.env.NOTION_PAGE_ID_PSYCHOMETRIC_PROFILE;
  
  if (!pageId || !process.env.NOTION_TOKEN) {
    console.warn('⚠️ [PSYCHOMETRIC] Psychometric profile page not configured, skipping');
    return '';
  }

  try {
    console.log('🧠 [PSYCHOMETRIC] Fetching psychometric profile page...');
    
    const blocksResponse = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!blocksResponse.ok) {
      console.error(`❌ [PSYCHOMETRIC] Failed to fetch page: ${blocksResponse.status}`);
      return '';
    }

    const blocksData = await blocksResponse.json() as { results: unknown[] };
    let content = '';
    
    for (const block of blocksData.results) {
      if (typeof block === 'object' && block !== null && 'type' in block) {
        const blockType = (block as { type: string }).type;
        const blockData = (block as Record<string, unknown>)[blockType];

        if (blockData && typeof blockData === 'object' && 'rich_text' in blockData) {
          const richText = blockData.rich_text as Array<{ plain_text: string }>;
          const text = richText.map((rt) => rt.plain_text).join('');
          if (text) content += text + '\n';
        }
      }
    }

    console.log(`✅ [PSYCHOMETRIC] Profile page content: ${content.length} characters`);
    return content.trim();
  } catch (error) {
    console.error('❌ [PSYCHOMETRIC] Error fetching profile page:', error);
    return '';
  }
}

export async function queryPsychometricMetadataDB(): Promise<Array<{
  id: string;
  text: string;
  metadata: Record<string, string>;
}>> {
  const dbId = process.env.NOTION_DB_ID_PSYCHOMETRIC_METADATA;
  
  if (!dbId || !process.env.NOTION_TOKEN) {
    console.warn('⚠️ [PSYCHOMETRIC] Psychometric metadata DB not configured, skipping');
    return [];
  }

  try {
    console.log('🧠 [PSYCHOMETRIC] Querying psychometric metadata database...');
    
    const response = await fetch('https://api.notion.com/v1/databases/' + dbId + '/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
      }),
    });

    if (!response.ok) {
      console.error(`❌ [PSYCHOMETRIC] Failed to query metadata DB: ${response.status}`);
      return [];
    }

    const data = await response.json() as { results: unknown[] };
    const rows: Array<{ id: string; text: string; metadata: Record<string, string> }> = [];

    for (const page of data.results) {
      if (typeof page === 'object' && page !== null && 'properties' in page && 'id' in page) {
        const pageWithProps = page as { id: string; properties: Record<string, unknown> };
        const properties = pageWithProps.properties;
        
        const metadata: Record<string, string> = {
          source: 'psychometric_metadata',
        };
        
        const textParts: string[] = [];

        for (const [propName, propValue] of Object.entries(properties)) {
          const value = extractPropertyValue(propValue);
          if (value) {
            const key = propName.toLowerCase().replace(/\s+/g, '');
            metadata[key] = value;
            
            if (['Name', 'Factor', 'Interpretation', 'KeywordsForAI'].includes(propName)) {
              textParts.push(`${propName}: ${value}`);
            }
          }
        }

        const text = textParts.join(' | ');
        
        if (text) {
          rows.push({
            id: pageWithProps.id,
            text,
            metadata,
          });
        }
      }
    }

    console.log(`✅ [PSYCHOMETRIC] Retrieved ${rows.length} metadata rows`);
    return rows;
  } catch (error) {
    console.error('❌ [PSYCHOMETRIC] Error querying metadata DB:', error);
    return [];
  }
}

function getFallbackKnowledgeBase(): string {
  return `# Baptiste Leroux - Alpa Stratégie

## About Baptiste
Baptiste Leroux is an experienced IT leadership consultant with over 20 years of international experience in digital transformation, IT governance, and performance delivery.

### Key Experience
- Founded and scaled StarTechUp Inc. from 4 to 50+ people, generating $5M+ in revenue
- 11 years managing offshore operations of 50 people in Asia
- Delivered 50+ SaaS solutions across finance, insurance, IoT, and B2C platforms
- Proven track record in CTO/CPTO interim roles and PMO setup

### Core Services
1. **IT Strategy & Executive Leadership**: Technology roadmaps, digital transformation programs, interim CTO/CPTO services
2. **PMO & Project Governance**: PMO framework design, portfolio management, resource allocation
3. **SaaS Product Development**: Multi-tenant architecture, industry-agnostic product development, MVP to enterprise scaling
4. **Global Delivery & Offshoring**: Offshore team setup, cultural bridge management, international coordination
5. **Digital Transformation**: Cloud migration strategies, agile transformation, modern architecture implementation

### Starter Packages
- **IT Leadership Assessment** (3 days, €3,000-4,000): Organization maturity assessment, quick wins identification
- **Offshoring Strategy & Setup** (5 days, €4,500-6,000): Build vs offshore framework, vendor selection, team setup
- **SaaS Product Strategy Sprint** (4 days, €3,500-4,500): Architecture assessment, scaling bottlenecks, growth roadmap
- **PMO Setup & Governance** (5 days, €4,000-5,500): PMO framework design, project portfolio assessment
- **Digital Transformation Readiness** (4 days, €3,500-4,500): Maturity assessment, technology roadmap, quick wins
- **Global Delivery Model Design** (6 days, €5,000-6,500): Delivery model assessment, global team structure

### Contact
Based in Paris, France. Available for projects across Europe.
LinkedIn: Connect for consulting inquiries`;
}
