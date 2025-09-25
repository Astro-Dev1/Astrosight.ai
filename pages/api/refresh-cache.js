import { refreshRelatedArticlesCache } from '../../lib/relatedArticlesCache.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST' || req.method === 'GET') {
      console.log('🔄 Cache refresh requested...');
      const result = await refreshRelatedArticlesCache();
      
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Cache refreshed successfully',
          totalArticles: result.totalArticles,
          timestamp: result.timestamp
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to refresh cache'
        });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Cache refresh error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error', 
      message: error.message 
    });
  }
}