import { Index } from '@upstash/vector';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const embeddingCache = new Map<string, { embedding: number[]; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000;

export async function semanticSearch(
  query: string,
  options?: {
    topK?: number;
  }
): Promise<string> {
  const topK = options?.topK || 10;
  
  const vectorIndex = new Index({
    url: process.env.UPSTASH_VECTOR_URL!,
    token: process.env.UPSTASH_VECTOR_TOKEN!,
  });
  
  const cacheKey = query.toLowerCase().trim();
  const cached = embeddingCache.get(cacheKey);
  
  let queryEmbedding: number[];
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('💾 [VECTOR] Using cached embedding');
    queryEmbedding = cached.embedding;
  } else {
    console.log('🧠 [VECTOR] Generating embedding for query...');
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query
    });
    queryEmbedding = embedding.data[0].embedding;
    
    embeddingCache.set(cacheKey, {
      embedding: queryEmbedding,
      timestamp: Date.now()
    });
  }
  
  console.log('🔍 [VECTOR] Querying Upstash Vector DB...');
  const results = await vectorIndex.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true
  });
  
  console.log(`✅ [VECTOR] Found ${results.length} relevant chunks`);
  
  const context = results
    .map((r) => {
      const metadata = r.metadata as { text?: string } | undefined;
      return metadata?.text || '';
    })
    .filter(Boolean)
    .join('\n\n---\n\n');
  
  return context;
}
