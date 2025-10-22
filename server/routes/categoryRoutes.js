const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有分类
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT * FROM categories ORDER BY is_featured DESC, sort_order ASC'
    );
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取分类详情
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [categories] = await pool.query(
      'SELECT * FROM categories WHERE slug = ?',
      [slug]
    );
    
    if (categories.length === 0) {
      return res.status(404).json({ success: false, error: '分类未找到' });
    }
    
    res.json({ success: true, data: categories[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取分类下的小说
router.get('/:slug/novels', async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const [novels] = await pool.query(
      `SELECT n.*, c.name as category_name 
       FROM novels n
       LEFT JOIN categories c ON n.category = c.slug
       WHERE c.slug = ?
       ORDER BY n.updated_at DESC
       LIMIT ? OFFSET ?`,
      [slug, parseInt(limit), offset]
    );
    
    const [[{ count }]] = await pool.query(
      'SELECT COUNT(*) as count FROM novels WHERE category = ?',
      [slug]
    );
    
    res.json({ 
      success: true, 
      data: novels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;