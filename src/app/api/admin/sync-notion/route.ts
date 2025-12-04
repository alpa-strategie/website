import { NextRequest } from 'next/server';
import { indexNotionToUpstash } from '@/lib/vector-indexer';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  const password = req.headers.get('X-Admin-Password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🚀 [SYNC API] Starting Notion → Upstash sync...');
    
    const result = await indexNotionToUpstash();
    
    const duration = Date.now() - startTime;
    
    console.log(`✅ [SYNC API] Complete in ${duration}ms`);
    
    return Response.json({
      success: true,
      chunksIndexed: result.totalChunks,
      databases: result.databases,
      duration
    });
  } catch (error) {
    console.error('❌ [SYNC API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
