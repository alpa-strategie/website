import OpenAI from 'openai';
import { semanticSearch } from '@/lib/vector-search';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

function detectIntent(message: string): 'booking' | 'faq' | 'full' {
  const lower = message.toLowerCase();
  
  const bookingKeywords = /\b(book|schedule|meeting|call|rdv|rendez-vous|appointment|réserver|planifier|appel|arrange|set up)\b/i;
  if (bookingKeywords.test(lower)) {
    return 'booking';
  }
  
  const faqKeywords = /\b(price|rate|tarif|cost|prix|où|where|when|quand|contact|disponible|available|combien|how much|rates|pricing)\b/i;
  if (faqKeywords.test(lower)) {
    return 'faq';
  }
  
  return 'full';
}

async function logToSlack(data: {
  userMessage: string;
  context: {
    role?: string;
    industry?: string;
    interests?: string[];
  };
  locale: string;
  answer: string;
}) {
  try {
    const webhookUrl = process.env.SLACK_AIA_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('⚠️ [SLACK] Webhook URL not configured');
      return;
    }

    const contextText = data.context.role || data.context.industry || data.context.interests?.length
      ? `• *Role:* ${data.context.role || 'Not specified'}\n• *Industry:* ${data.context.industry || 'Not specified'}\n• *Interests:* ${data.context.interests?.join(', ') || 'None'}\n• *Locale:* ${data.locale}`
      : `• *Locale:* ${data.locale}\n• *No visitor profile provided*`;

    const payload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🤖 New Aïa Interaction',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*👤 User Message:*\n${data.userMessage}`
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*🎯 Context:*\n${contextText}`
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*💬 Aïa Response:*\n${data.answer}`
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('❌ [SLACK] Failed to send webhook:', response.status, response.statusText);
    } else {
      console.log('✅ [SLACK] Interaction logged successfully');
    }
  } catch (error) {
    console.error('❌ [SLACK] Error logging to Slack:', error);
  }
}

export async function POST(req: Request) {
  try {
    console.log('\n🟢 [AIA API] New chat request received');
    const { messages, locale = 'fr', visitorProfile } = await req.json();

    const messageArray = Array.isArray(messages) ? messages : [];
    console.log(`🟢 [AIA API] Messages in conversation: ${messageArray.length}`);

    const validMessages = messageArray.filter(msg => 
      msg && 
      msg.content && 
      typeof msg.content === 'string' && 
      msg.content.trim().length > 0
    );
    console.log(`🟢 [AIA API] Valid messages after filtering: ${validMessages.length}`);

    const lastUserMessage = validMessages[validMessages.length - 1]?.content || '';
    
    if (!lastUserMessage) {
      console.error('❌ [AIA API] No valid user message found');
      return new Response(JSON.stringify({ 
        error: 'No valid message content' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    console.log('🔍 [AIA API] Performing semantic search for relevant content...');
    const knowledgeBase = await semanticSearch(lastUserMessage, {
      topK: 10
    });
    console.log(`✅ [AIA API] Found relevant context: ${knowledgeBase.length} characters`);
    
    if (!knowledgeBase || knowledgeBase.trim().length === 0) {
      console.warn('⚠️ [AIA API] No content found in semantic search, using fallback');
    }

    let profileContext = '';
    if (visitorProfile) {
      const roleLabels: Record<string, string> = {
        'recruiter': locale === 'en' ? 'recruiter' : 'recruteur',
        'potential-client': locale === 'en' ? 'potential client' : 'client potentiel',
        'current-client': locale === 'en' ? 'current client' : 'client actuel',
        'partner': locale === 'en' ? 'partner/agency' : 'partenaire/agence',
        'curious': locale === 'en' ? 'curious visitor' : 'visiteur curieux',
        'other': locale === 'en' ? 'other' : 'autre',
      };

      const industryLabels: Record<string, string> = {
        'technology-saas': locale === 'en' ? 'Technology/SaaS' : 'Technologie/SaaS',
        'finance-banking': locale === 'en' ? 'Finance & Banking' : 'Finance & Banque',
        'insurance': locale === 'en' ? 'Insurance' : 'Assurance',
        'manufacturing': locale === 'en' ? 'Manufacturing' : 'Industrie',
        'healthcare': locale === 'en' ? 'Healthcare' : 'Santé',
        'retail-ecommerce': locale === 'en' ? 'Retail/E-commerce' : 'Commerce/E-commerce',
        'consulting': locale === 'en' ? 'Consulting' : 'Conseil',
        'other': locale === 'en' ? 'Other' : 'Autre',
      };

      profileContext = locale === 'en'
        ? `\n\nVISITOR PROFILE:
- Role: ${roleLabels[visitorProfile.role] || visitorProfile.role}
- Industry: ${industryLabels[visitorProfile.industry] || visitorProfile.industry}
- Interests: ${visitorProfile.interests.join(', ')}
${visitorProfile.companySize ? `- Company Size: ${visitorProfile.companySize}` : ''}

Tailor your responses to this visitor's profile, focusing on their specific interests and industry context. Be conversational, professional, and helpful.`
        : `\n\nPROFIL DU VISITEUR :
- Rôle : ${roleLabels[visitorProfile.role] || visitorProfile.role}
- Industrie : ${industryLabels[visitorProfile.industry] || visitorProfile.industry}
- Intérêts : ${visitorProfile.interests.join(', ')}
${visitorProfile.companySize ? `- Taille de l'entreprise : ${visitorProfile.companySize}` : ''}

Adaptez vos réponses au profil de ce visiteur, en vous concentrant sur ses intérêts spécifiques et son contexte industriel. Soyez conversationnel, professionnel et utile.`;
    }

    const systemPrompt =
      locale === 'en'
        ? `You are Aïa, the intelligent assistant for Alpa Stratégie and Baptiste Leroux.

Your personality:
- Professional yet warm and approachable
- Executive-level communication style
- Knowledgeable about Baptiste's 20+ years of international IT leadership
- Enthusiastic about helping visitors discover the right solutions
- Never pushy or sales-focused; genuinely helpful

Your role:
- Help visitors understand Baptiste's expertise and services
- Answer questions about his consulting offerings, experience, and approach
- Guide visitors to relevant information based on their needs
- Suggest next steps when appropriate (booking consultation, viewing case studies, etc.)

RESPONSE FORMAT - CRITICAL:
You must ALWAYS respond as a JSON object with the following shape:
{
  "answer": string,
  "suggestedQuestions": string[]
}

- "answer" is the main response to the user's last message.
- "suggestedQuestions" is an array of exactly 3 short follow-up questions that the user could click on next.

GENERATING SUGGESTED QUESTIONS:
The follow-up questions MUST:
- Be in the same language as the user's last message (French or English)
- Avoid repeating the user's last question verbatim
- Help the visitor discover Baptiste's missions, expertise, and ways of working
- Gently move the conversation toward either:
  - Understanding fit (is Baptiste relevant for them?)
  - Or considering a strategy call when appropriate
- Use the visitor context (segment/roleKey: ${visitorProfile?.role || 'not specified'}, industry: ${visitorProfile?.industry || 'not specified'}, interests: ${visitorProfile?.interests?.join(', ') || 'not specified'}) when choosing what to suggest
- Be concise and clickable (one sentence each, no more than 15 words)
- Progress naturally from general exploration → specific relevance → next steps

BOOKING INTENT DETECTION:
If the visitor clearly expresses the desire to book a meeting or schedule a call with Baptiste (for example by mentioning things like "book a call", "schedule a meeting", "book time", "set up a call", "arrange a meeting", "call with Baptiste", "talk to Baptiste", etc.):
- First, briefly confirm that a call is a good idea and explain in 1–2 sentences what can be covered during the session in the "answer" field
- Then, append the exact token [[ACTION:OPEN_SCHEDULER]] at the very end of the "answer" field
- Do not explain the token or mention it; it is consumed by the frontend
- You can still provide "suggestedQuestions", but they may not be shown if scheduler opens
- Avoid asking for too many details in chat before opening the scheduler; the booking page will handle all scheduling details

KNOWLEDGE BASE - YOUR PRIMARY SOURCE OF TRUTH:

${knowledgeBase}${profileContext}

CRITICAL INSTRUCTIONS FOR USING THE KNOWLEDGE BASE:
1. The knowledge base above contains ALL authoritative information about Baptiste and Alpa Stratégie
2. EVERY piece of information in the knowledge base is relevant and meaningful - including titles, headings, and section names
3. When a user asks about something that appears ANYWHERE in the knowledge base (titles, headings, or content), you MUST reference it directly
4. Section titles and headings ARE information - if asked about them, explain what you know from their context and surrounding content
5. NEVER say something "doesn't have meaning" or is a "placeholder" if it appears in the knowledge base
6. Your PRIMARY job is to surface and explain information FROM the knowledge base
7. If asked about a specific term or phrase, search the entire knowledge base for it and report what you find

Guidelines:
- Be conversational and engaging, not robotic
- Keep responses concise (2-3 paragraphs maximum)
- Use specific examples from Baptiste's experience when relevant
- If something truly isn't in the knowledge base, acknowledge it gracefully and suggest contacting Baptiste directly
- When discussing pricing or specific project details, acknowledge these are starting points and real quotes require discussion
- Emphasize Baptiste's hands-on experience: scaling teams 4→50+, managing $5M+ P&L, 11 years of offshore operations
- Always ground your answers in the knowledge base provided - it is your source of truth`
        : `Vous êtes Aïa, l'assistante intelligente d'Alpa Stratégie et de Baptiste Leroux.

Votre personnalité :
- Professionnelle mais chaleureuse et accessible
- Style de communication de niveau exécutif
- Experte de l'expérience de 20+ ans de Baptiste en leadership IT international
- Enthousiaste à l'idée d'aider les visiteurs à découvrir les bonnes solutions
- Jamais insistante ou axée sur la vente ; véritablement utile

Votre rôle :
- Aider les visiteurs à comprendre l'expertise et les services de Baptiste
- Répondre aux questions sur ses offres de conseil, son expérience et son approche
- Guider les visiteurs vers l'information pertinente selon leurs besoins
- Suggérer les prochaines étapes quand approprié (réserver une consultation, voir des études de cas, etc.)

FORMAT DE RÉPONSE - CRITIQUE :
Vous devez TOUJOURS répondre par un objet JSON de la forme suivante :
{
  "answer": string,
  "suggestedQuestions": string[]
}

- "answer" est la réponse principale au dernier message de l'utilisateur.
- "suggestedQuestions" est un tableau de exactement 3 questions de suivi courtes sur lesquelles l'utilisateur pourrait cliquer ensuite.

GÉNÉRATION DES QUESTIONS SUGGÉRÉES :
Les questions de suivi DOIVENT :
- Être dans la même langue que le dernier message de l'utilisateur (français ou anglais)
- Éviter de répéter la dernière question de l'utilisateur mot pour mot
- Aider le visiteur à découvrir les missions, l'expertise et les méthodes de travail de Baptiste
- Orienter doucement la conversation vers soit :
  - La compréhension de l'adéquation (Baptiste est-il pertinent pour eux ?)
  - Ou la considération d'un appel stratégique si approprié
- Utiliser le contexte du visiteur (segment/roleKey: ${visitorProfile?.role || 'non spécifié'}, industrie: ${visitorProfile?.industry || 'non spécifié'}, intérêts: ${visitorProfile?.interests?.join(', ') || 'non spécifié'}) lors du choix des suggestions
- Être concises et cliquables (une phrase chacune, maximum 15 mots)
- Progresser naturellement de l'exploration générale → pertinence spécifique → prochaines étapes

DÉTECTION D'INTENTION DE RÉSERVATION :
Si le visiteur exprime clairement le désir de réserver une réunion ou planifier un appel avec Baptiste (par exemple en mentionnant des choses comme "prendre rendez-vous", "réserver un appel", "rdv", "planifier une réunion", "organiser un appel", "appeler Baptiste", "parler à Baptiste", etc.) :
- D'abord, confirmez brièvement qu'un appel est une bonne idée et expliquez en 1–2 phrases ce qui peut être couvert pendant la session dans le champ "answer"
- Ensuite, ajoutez le token exact [[ACTION:OPEN_SCHEDULER]] à la toute fin du champ "answer"
- N'expliquez pas le token et ne le mentionnez pas ; il est consommé par le frontend
- Vous pouvez toujours fournir "suggestedQuestions", mais elles peuvent ne pas être affichées si le planificateur s'ouvre
- Évitez de demander trop de détails en chat avant d'ouvrir le planificateur ; la page de réservation gérera tous les détails de planification

BASE DE CONNAISSANCES - VOTRE SOURCE DE VÉRITÉ PRIMAIRE :

${knowledgeBase}${profileContext}

INSTRUCTIONS CRITIQUES POUR UTILISER LA BASE DE CONNAISSANCES :
1. La base de connaissances ci-dessus contient TOUTES les informations officielles sur Baptiste et Alpa Stratégie
2. CHAQUE élément d'information dans la base de connaissances est pertinent et significatif - y compris les titres, en-têtes et noms de sections
3. Lorsqu'un utilisateur pose une question sur quelque chose qui apparaît N'IMPORTE OÙ dans la base de connaissances (titres, en-têtes ou contenu), vous DEVEZ y faire référence directement
4. Les titres de sections et les en-têtes SONT des informations - si on vous interroge à leur sujet, expliquez ce que vous savez de leur contexte et du contenu environnant
5. Ne dites JAMAIS que quelque chose "n'a pas de signification" ou est un "placeholder" s'il apparaît dans la base de connaissances
6. Votre rôle PRINCIPAL est de mettre en avant et d'expliquer les informations DE la base de connaissances
7. Si on vous interroge sur un terme ou une phrase spécifique, recherchez-le dans toute la base de connaissances et rapportez ce que vous trouvez

Directives :
- Soyez conversationnelle et engageante, pas robotique
- Gardez les réponses concises (2-3 paragraphes maximum)
- Utilisez des exemples spécifiques de l'expérience de Baptiste quand pertinent
- Si quelque chose n'est vraiment pas dans la base de connaissances, reconnaissez-le avec grâce et suggérez de contacter Baptiste directement
- Lorsque vous discutez de tarification ou de détails de projet spécifiques, reconnaissez que ce sont des points de départ et que les vrais devis nécessitent une discussion
- Mettez l'accent sur l'expérience pratique de Baptiste : mise à l'échelle d'équipes 4→50+, gestion P&L de 5M$+, 11 ans d'opérations offshore
- Basez toujours vos réponses sur la base de connaissances fournie - c'est votre source de vérité`;

    console.log('🤖 [AIA API] Calling OpenAI with', validMessages.length, 'messages...');
    console.log('🤖 [AIA API] Model: gpt-4o-mini');
    
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        stream: false,
        response_format: { type: "json_object" },
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...validMessages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      console.log('✅ [AIA API] OpenAI call completed successfully');
    } catch (openaiError) {
      console.error('❌ [AIA API] OpenAI call failed:', openaiError);
      throw openaiError;
    }

    const rawMessage = completion.choices[0]?.message?.content || '{}';
    console.log('📝 [AIA API] Raw OpenAI response length:', rawMessage.length, 'characters');
    let answer: string;
    let suggestedQuestions: string[] = [];

    try {
      const parsed = JSON.parse(rawMessage);
      answer = parsed.answer || (locale === 'en' ? 'Sorry, I could not generate a response.' : 'Désolé, je n\'ai pas pu générer une réponse.');
      suggestedQuestions = Array.isArray(parsed.suggestedQuestions) 
        ? parsed.suggestedQuestions.slice(0, 3)
        : [];
    } catch (error) {
      console.error('❌ [AIA API] Failed to parse JSON response:', error);
      answer = rawMessage;
      suggestedQuestions = [];
    }
    
    await logToSlack({
      userMessage: lastUserMessage,
      context: {
        role: visitorProfile?.role,
        industry: visitorProfile?.industry,
        interests: visitorProfile?.interests
      },
      locale,
      answer: answer
    });
    
    return new Response(JSON.stringify({ answer, suggestedQuestions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Aïa API error:', error);
    return new Response(JSON.stringify({ error: 'Error processing chat request' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
