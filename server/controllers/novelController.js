const pool = require('../config/db');

class NovelController {
  static async getNovelById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const [rows] = await pool.query(
          `SELECT 
            n.*,
            a.username AS author_name
           FROM novels n
           LEFT JOIN authors a ON n.author_id = a.id
           WHERE n.id = ?`,
          [id]
        );
        
        if (rows.length === 0) {
          reject(new Error('小说未找到'));
        } else {
          const novel = rows[0];
          // 添加格式化数据
          novel.word_count_formatted = novel.word_count ? 
            Math.round(novel.word_count / 10000) + '万' : '未知';
          resolve(novel);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getNovelChapters(novelId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM chapters WHERE novel_id = ? ORDER BY chapter_number ASC',
          [novelId]
        );
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = NovelController;