const express = require('express');
const router = express.Router();
const pool = require('../config/db');

//获取小说列表
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        n.id, 
        n.title, 
        n.cover_url, 
        n.description,
        n.status,
        n.word_count,
        n.category,
        a.username AS author_name
      FROM novels n
      LEFT JOIN authors a ON n.author_id = a.id
    `;
    
    const params = [];
    
    if (category && category !== 'all') {
      query += ' WHERE n.category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY n.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const [novels] = await pool.query(query, params);
    
    let countQuery = 'SELECT COUNT(*) as total FROM novels';
    if (category && category !== 'all') {
      countQuery += ' WHERE category = ?';
    }
    
    const [[{ total }]] = await pool.query(
      countQuery, 
      category && category !== 'all' ? [category] : []
    );
    
    res.json({
      success: true,
      data: novels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('数据库查询错误:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

//获取单个小说详情
router.get('/:id', async (req, res) => {
  try {
    const novelId = req.params.id;
    
    const [novels] = await pool.query(`
      SELECT 
        n.id, 
        n.title, 
        n.cover_url, 
        n.description,
        n.status,
        n.word_count,
        n.category,
        a.username AS author_name
      FROM novels n
      LEFT JOIN authors a ON n.author_id = a.id
      WHERE n.id = ?
    `, [novelId]);
    
    if (novels.length === 0) {
      return res.status(404).json({
        success: false,
        error: '小说未找到'
      });
    }
    
    res.json({
      success: true,
      data: novels[0]
    });
    
  } catch (error) {
    console.error('获取小说详情错误:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

//获取小说章节列表
router.get('/:id/chapters', async (req, res) => {
  try {
    const novelId = req.params.id;
    
    const [chapters] = await pool.query(`
      SELECT 
        id,
        chapter_number,
        title,
        word_count
      FROM chapters 
      WHERE novel_id = ? 
      ORDER BY chapter_number ASC
    `, [novelId]);
    
    res.json({
      success: true,
      data: chapters
    });
    
  } catch (error) {
    console.error('获取章节列表错误:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

//获取特定章节内容 
router.get('/:novelId/chapters/:chapterId', async (req, res) => {
  try {
    const { novelId, chapterId } = req.params;
    
    const [chapters] = await pool.query(`
      SELECT 
        c.id,
        c.chapter_number,
        c.title,
        c.content,
        c.word_count,
        c.created_at,
        n.title AS novel_title,
        a.username AS author_name
      FROM chapters c
      JOIN novels n ON c.novel_id = n.id
      LEFT JOIN authors a ON n.author_id = a.id
      WHERE c.id = ? AND c.novel_id = ?
    `, [chapterId, novelId]);
    
    if (chapters.length === 0) {
      return res.status(404).json({
        success: false,
        error: '章节未找到'
      });
    }
    
    const chapter = chapters[0];
    
    res.json({
      success: true,
      data: chapter
    });
    
  } catch (error) {
    console.error('获取章节内容错误:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;