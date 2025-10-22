function errorHandler(err, req, res, next) {
    console.error('[ERROR]', {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      error: {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }
    });
  
    //设置默认错误响应
    const statusCode = err.statusCode || 500;
    const errorResponse = {
      success: false,
      error: {
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    };
  
    res.status(statusCode).json(errorResponse);
  }
  
  module.exports = errorHandler;