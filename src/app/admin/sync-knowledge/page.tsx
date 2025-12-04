'use client';

import { useState } from 'react';

interface SyncResult {
  success: boolean;
  chunksIndexed: number;
  databases: string[];
  duration: number;
}

export default function SyncKnowledge() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<SyncResult | null>(null);

  const handleSync = async () => {
    if (!password) {
      setLog(['❌ Please enter admin password']);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setLog(['🚀 Starting Notion → Upstash Vector sync...', '⏳ This may take 30-60 seconds...']);
    setResult(null);

    try {
      const response = await fetch('/api/admin/sync-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed');
      }

      setResult(data);
      setLog(prev => [
        ...prev,
        '',
        `✅ Sync complete!`,
        `📊 Total chunks indexed: ${data.chunksIndexed}`,
        `🗄️  Databases synced: ${data.databases.join(', ')}`,
        `⏱️  Duration: ${(data.duration / 1000).toFixed(1)}s`,
        '',
        '✨ Aïa is now updated with latest Notion content!'
      ]);
      setStatus('success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLog(prev => [...prev, '', `❌ Error: ${errorMessage}`]);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sync Notion Knowledge Base</h1>
            <p className="text-gray-600">
              Update Aïa&apos;s vector database with the latest content from Notion.
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
                disabled={status === 'loading'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSync();
                  }
                }}
              />
            </div>

            <button
              onClick={handleSync}
              disabled={status === 'loading' || !password}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </span>
              ) : (
                '🚀 Sync Now'
              )}
            </button>

            {log.length > 0 && (
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-auto max-h-96">
                {log.map((line, i) => (
                  <div key={i} className={line.startsWith('❌') ? 'text-red-400' : ''}>
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            )}

            {status === 'success' && result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-green-800 font-semibold mb-2">✅ Sync Successful</h3>
                <div className="text-sm text-green-700 space-y-1">
                  <p>• <strong>{result.chunksIndexed}</strong> content chunks indexed</p>
                  <p>• <strong>{result.databases.length}</strong> Notion databases synced</p>
                  <p>• Completed in <strong>{(result.duration / 1000).toFixed(1)}</strong> seconds</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">When to sync:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>After adding new missions to Notion</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>After updating FAQ content</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>After changing expertise descriptions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>After modifying any knowledge base content</span>
              </li>
            </ul>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Sync typically takes 30-60 seconds. The process fetches all Notion content, 
                creates semantic embeddings, and uploads them to Upstash Vector for fast retrieval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
