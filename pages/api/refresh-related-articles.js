// API endpoint to refresh related articles cache
import { refreshRelatedArticlesCache, getCacheStatus } from '../../lib/relatedArticlesCache.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get cache status
    try {
      const status = getCacheStatus();
      res.status(200).json({
        success: true,
        status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  } else if (req.method === 'POST') {
    // Refresh cache
    try {
      const result = await refreshRelatedArticlesCache();
      
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Related articles cache refreshed successfully',
          totalArticles: result.totalArticles,
          timestamp: new Date(result.timestamp).toISOString()
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to refresh cache'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}