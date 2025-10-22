import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NovelDetail.css';

function NovelDetail() {
  const { novelId } = useParams();
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNovelData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 动态设置API基础路径
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3001' 
        : '';
      
      // 获取小说详情
      const novelResponse = await fetch(`${baseUrl}/api/novels/${novelId}`);
      
      // 严格验证响应
      if (!novelResponse.ok) {
        throw new Error(`HTTP错误! 状态码: ${novelResponse.status}`);
      }
      
      const contentType = novelResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await novelResponse.text();
        throw new Error(`预期JSON但收到: ${text.substring(0, 100)}`);
      }
      
      const novelData = await novelResponse.json();
      
      if (!novelData.success) {
        throw new Error(novelData.error || '获取小说详情失败');
      }
      
      // 获取章节列表
      const chaptersResponse = await fetch(`${baseUrl}/api/novels/${novelId}/chapters`);
      const chaptersData = await chaptersResponse.json();
      
      if (!chaptersData.success) {
        throw new Error(chaptersData.error || '获取章节列表失败');
      }
      
      setNovel(novelData.data);
      setChapters(chaptersData.data);
      
    } catch (error) {
      console.error('获取数据失败:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovelData();
  }, [novelId]);

  // 重试函数
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchNovelData(); // 现在可以正确访问
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>加载失败</h3>
        <p className="error-message">{error}</p>
        <button onClick={handleRetry} className="retry-button">
          重试
        </button>
        <Link to="/" className="back-link">
          ← 返回首页
        </Link>
      </div>
    );
  }

  if (!novel) {
    return (
      <div className="not-found-container">
        <h3>小说未找到</h3>
        <p>请检查小说ID是否正确</p>
        <Link to="/" className="back-link">
          ← 返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="novel-detail">
      {/* 返回按钮 */}
      <Link to="/" className="back-button">
        <span className="arrow">←</span> 返回小说列表
      </Link>
      
      {/* 小说头部信息 */}
      <div className="novel-header">
        <img 
          src={novel.cover_url || '/images/default-cover.jpg'} 
          alt={novel.title}
          className="novel-cover"
          onError={(e) => {
            e.target.src = '/images/default-cover.jpg';
          }}
        />
        
        <div className="novel-info">
          <h1 className="novel-title">{novel.title}</h1>
          
          <div className="meta-info">
            <div className="meta-item">
              <span className="label">作者：</span>
              <span className="value">{novel.author_name || '未知'}</span>
            </div>
            
            <div className="meta-item">
              <span className="label">状态：</span>
              <span className={`value ${novel.status}`}>
                {novel.status === 'completed' ? '已完结' : '连载中'}
              </span>
            </div>
            
            <div className="meta-item">
              <span className="label">字数：</span>
              <span className="value">
                {novel.word_count ? Math.round(novel.word_count / 10000) + '万' : '未知'}
              </span>
            </div>
          </div>
          
          <div className="description">
            <h3>作品简介</h3>
            <p>{novel.description || '暂无作品简介'}</p>
          </div>
        </div>
      </div>

      {/* 章节列表 */}
      <div className="chapters-section">
        <h2>
          章节列表
          <span className="chapter-count">（共{chapters.length}章）</span>
        </h2>
        
        {chapters.length === 0 ? (
          <div className="no-chapters">暂无章节内容</div>
        ) : (
          <div className="chapters-list">
            {chapters.map(chapter => (
              <Link
                key={chapter.id}
                to={`/novel/${novelId}/chapter/${chapter.id}`}
                className="chapter-item"
              >
                <span className="chapter-number">第{chapter.chapter_number}章</span>
                <span className="chapter-title">{chapter.title}</span>
                {chapter.word_count && (
                  <span className="word-count">{chapter.word_count}字</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NovelDetail;