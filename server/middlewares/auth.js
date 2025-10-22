const jwt = require('jsonwebtoken');
const pool = require('../config/db');

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: '未提供认证令牌'
      });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: '无效的认证令牌'
        });
      }
      req.user = user;
      next();
    });
  }
};