import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import type { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  __ASSETS: KVNamespace;
  MOVIEDB: D1Database;
}

// This catch-all route handler delegates all non-API routes to the Next.js built app
export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    // Skip API routes - let them be handled by functions/api
    if (context.request.url.includes('/api/')) {
      return new Response('Not Found', { status: 404 });
    }

    // Try to serve from static assets first
    try {
      return await getAssetFromKV(context, { ASSET_NAMESPACE: context.env.__ASSETS });
    } catch {
      // Asset not found in KV, return 404
      return new Response('Not Found', { status: 404 });
    }
  } catch (error) {
    return new Response(`Internal Error: ${error}`, { status: 500 });
  }
};
