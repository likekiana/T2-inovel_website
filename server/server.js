require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

//初始化数据库连接
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

//中间件配置
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'] 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//导入路由
const novelRoutes = require('./routes/novelRoutes');
const searchRoutes = require('./routes/searchRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

//注册路由
app.use('/api/novels', novelRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);


app.get('/api/search-test', async (req, res) => {
  try {
    const { q } = req.query;
    
    const [connectionTest] = await pool.query('SELECT 1+1 AS result');
    const [simpleResults] = await pool.query(
      'SELECT id, title FROM novels WHERE title LIKE ? LIMIT 5', 
      [`%${q}%`]
    );
    const [fulltextResults] = await pool.query(
      'SELECT id, title FROM novels WHERE MATCH(title, description) AGAINST(? IN NATURAL LANGUAGE MODE) LIMIT 5',
      [q]
    );
    
    res.json({
      success: true,
      connectionTest: connectionTest[0].result === 2 ? '成功' : '失败',
      simpleQueryResults: simpleResults,
      fulltextQueryResults: fulltextResults,
      mysqlVersion: (await pool.query('SELECT VERSION() AS version'))[0][0].version
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

//404处理
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'API端点未找到',
      availableEndpoints: [
        '/api/novels',
        '/api/novels/:id',
        '/api/novels/:id/chapters',
        '/api/search',
        '/api/search-test'
      ]
    }
  });
});

//错误处理
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: '服务器内部错误'
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务运行在 http://localhost:${PORT}`);
  console.log('可用API端点:');
  console.log(`http://localhost:${PORT}/api/search`);
  console.log(`http://localhost:${PORT}/api/search-test`);
});