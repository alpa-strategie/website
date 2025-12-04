import { Index } from '@upstash/vector';
import OpenAI from 'openai';
import { getKnowledgeBase } from './notion-kb';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface ChunkMetadata {
  text: string;
  source: 'knowledge' | 'missions' | 'expertise' | 'faqs';
  pageTitle?: string;
  category?: string;
  [key: string]: string | undefined;
}

interface IndexingResult {
  success: boolean;
  totalChunks: number;
  databases: string[];
  duration: number;
}

export async function indexNotionToUpstash(): Promise<IndexingResult> {
  const startTime = Date.now();
  
  const vectorIndex = new Index({
    url: process.env.UPSTASH_VECTOR_URL!,
    token: process.env.UPSTASH_VECTOR_TOKEN!,
  });
  
  console.log('📚 [INDEXER] Fetching all Notion databases...');
  
  const fullKB = await getKnowledgeBase('full');
  
  console.log(`✂️ [INDEXER] Chunking content (target: ~500 chars per chunk)...`);
  
  const chunks = chunkText(fullKB, {
    chunkSize: 500,
    overlap: 50
  });
  
  console.log(`📝 [INDEXER] Created ${chunks.length} chunks`);
  console.log(`🧠 [INDEXER] Generating embeddings...`);
  
  const batchSize = 50;
  const allVectors = [];
  
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    
    console.log(`   ⏳ Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(chunks.length/batchSize)}...`);
    
    const embeddings = await Promise.all(
      batch.map(chunk =>
        openai.embeddings.create({
          model: "text-embedding-3-small",
          input: chunk.text
        })
      )
    );
    
    const vectors = batch.map((chunk, idx) => ({
      id: chunk.id,
      vector: embeddings[idx].data[0].embedding,
      metadata: chunk.metadata
    }));
    
    allVectors.push(...vectors);
  }
  
  console.log(`📤 [INDEXER] Uploading ${allVectors.length} vectors to Upstash...`);
  
  const upsertBatchSize = 100;
  for (let i = 0; i < allVectors.length; i += upsertBatchSize) {
    const batch = allVectors.slice(i, i + upsertBatchSize);
    await vectorIndex.upsert(batch);
    console.log(`   ✓ Uploaded ${i + batch.length}/${allVectors.length} vectors`);
  }
  
  const duration = Date.now() - startTime;
  
  console.log(`✅ [INDEXER] Complete! Duration: ${duration}ms`);
  
  return {
    success: true,
    totalChunks: chunks.length,
    databases: ['knowledge', 'missions', 'expertise', 'faqs'],
    duration
  };
}

function chunkText(
  text: string,
  options: { chunkSize: number; overlap: number }
): Array<{ id: string; text: string; metadata: ChunkMetadata }> {
  const chunks = [];
  const lines = text.split('\n');
  
  let currentChunk = '';
  let chunkId = 0;
  
  for (const line of lines) {
    if (currentChunk.length + line.length > options.chunkSize && currentChunk.length > 0) {
      chunks.push({
        id: `chunk-${chunkId++}`,
        text: currentChunk.trim(),
        metadata: {
          text: currentChunk.trim(),
          source: detectSource(currentChunk),
          category: detectCategory(currentChunk)
        }
      });
      
      const words = currentChunk.split(' ');
      currentChunk = words.slice(-Math.floor(options.overlap / 5)).join(' ') + '\n' + line;
    } else {
      currentChunk += '\n' + line;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push({
      id: `chunk-${chunkId++}`,
      text: currentChunk.trim(),
      metadata: {
        text: currentChunk.trim(),
        source: detectSource(currentChunk),
        category: detectCategory(currentChunk)
      }
    });
  }
  
  return chunks;
}

function detectSource(text: string): 'knowledge' | 'missions' | 'expertise' | 'faqs' {
  if (text.includes('Mission') || text.includes('Client')) return 'missions';
  if (text.includes('FAQ') || text.includes('Question')) return 'faqs';
  if (text.includes('Expertise') || text.includes('Service')) return 'expertise';
  return 'knowledge';
}

function detectCategory(text: string): string {
  if (text.includes('PMO')) return 'PMO';
  if (text.includes('CTO') || text.includes('CPTO')) return 'Leadership';
  if (text.includes('SaaS')) return 'SaaS';
  if (text.includes('offshore') || text.includes('Offshore')) return 'Offshoring';
  return 'General';
}
