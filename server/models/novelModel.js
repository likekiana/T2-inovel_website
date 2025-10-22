const pool = require('../db');

class NovelModel {
  static async findAll(page = 1, limit = 10, category = null) {
    const offset = (page - 1) * limit;
    let query = 'SELECT n.*, a.username AS author_name FROM novels n JOIN authors a ON n.author_id = a.id';
    const params = [];
    
    if (category) {
      query += ' WHERE n.category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY n.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const [novels] = await pool.query(query, params);
    return novels;
  }

  static async findById(id) {
    const [novels] = await pool.query(
      'SELECT n.*, a.username AS author_name FROM novels n JOIN authors a ON n.author_id = a.id WHERE n.id = ?',
      [id]
    );
    return novels[0];
  }

  static async getChapters(novelId) {
    const [chapters] = await pool.query(
      'SELECT id, title, chapter_order FROM chapters WHERE novel_id = ? ORDER BY chapter_order',
      [novelId]
    );
    return chapters;
  }

  static async getChapterContent(novelId, chapterId) {
    const [chapters] = await pool.query(
      'SELECT * FROM chapters WHERE id = ? AND novel_id = ?',
      [chapterId, novelId]
    );
    return chapters[0];
  }
}

module.exports = NovelModel;