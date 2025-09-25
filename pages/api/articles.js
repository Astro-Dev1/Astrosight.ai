import { getAllArticles } from '../../lib/relatedArticlesCache.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const articles = await getAllArticles();
      const slugs = articles.slice(0, 20).map(article => ({
        slug: article.slug,
        title: article.Title,
        category: article.category?.name || 'Uncategorized'
      }));
      
      res.status(200).json({
        total: articles.length,
        sample: slugs
      });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Articles API error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}