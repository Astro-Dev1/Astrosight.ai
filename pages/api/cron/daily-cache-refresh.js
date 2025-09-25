// Daily cron job to refresh related articles cache
import { refreshRelatedArticlesCache } from '../../../lib/relatedArticlesCache.js';

export default async function handler(req, res) {
  // Verify this is being called by a cron job or authorized request
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET || 'your-secret-key-here';
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }

  try {
    console.log('Daily cron job: Refreshing related articles cache...');
    const result = await refreshRelatedArticlesCache();
    
    if (result) {
      console.log('Daily cron job: Cache refreshed successfully');
      res.status(200).json({
        success: true,
        message: 'Related articles cache refreshed by daily cron',
        totalArticles: result.totalArticles,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('Daily cron job: Failed to refresh cache');
      res.status(500).json({
        success: false,
        error: 'Failed to refresh cache'
      });
    }
  } catch (error) {
    console.error('Daily cron job error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}