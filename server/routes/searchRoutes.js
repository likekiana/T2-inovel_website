const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const MAX_QUERY_LENGTH = 100;

router.get('/', async (req, res) => {
  const startTime = Date.now();
  try {
    let { q = '', page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    
    console.log(`[Search] 关键词: "${q}" | 分页: ${page}/${limit}`);
    
    if (!q.trim()) {
      return res.json({
        success: true,
        data: [],
        meta: { count: 0, message: '请输入搜索关键词' }
      });
    }
    
    if (q.length > MAX_QUERY_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `搜索关键词过长(最大${MAX_QUERY_LENGTH}字符)`
      });
    }

    //基础LIKE查询
    const [likeResults] = await pool.query(
      `SELECT 
        id,
        title,
        cover_url,
        LEFT(description, 200) AS short_description,
        status,
        word_count
       FROM novels
       WHERE title LIKE ? 
       OR description LIKE ?
       ORDER BY title ASC
       LIMIT ? OFFSET ?`,
      [`%${q}%`, `%${q}%`, limit, (page - 1) * limit]
    );

    //全文搜索尝试
    let fulltextResults = [];
    try {
      const [ftResults] = await pool.query(
        `SELECT 
          id,
          title,
          cover_url,
          LEFT(description, 200) AS short_description,
          status,
          word_count,
          MATCH(title, description) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance
         FROM novels
         WHERE MATCH(title, description) AGAINST(? IN NATURAL LANGUAGE MODE)
         ORDER BY relevance DESC
         LIMIT ? OFFSET ?`,
        [q, q, limit, (page - 1) * limit]
      );
      fulltextResults = ftResults;
    } catch (ftError) {
      console.error('[Search] 全文搜索降级:', ftError.message);
    }

    const finalResults = fulltextResults.length > 0 ? fulltextResults : likeResults;
    const hasMore = finalResults.length >= limit;

    console.log(`[Search] 结果: ${finalResults.length} | 耗时: ${Date.now() - startTime}ms`);

    res.json({
      success: true,
      data: finalResults,
      meta: {
        query: q,
        count: finalResults.length,
        hasMore,
        page,
        limit,
        method: fulltextResults.length > 0 ? 'fulltext' : 'like',
        time: Date.now() - startTime + 'ms'
      }
    });

  } catch (error) {
    console.error('[Search] 系统错误:', error);
    res.status(500).json({
      success: false,
      error: '搜索服务暂时不可用',
      code: 'SEARCH_SERVICE_UNAVAILABLE'
    });
  }
});

module.exports = router;