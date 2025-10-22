import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('搜索关键词:', query);

      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      console.log('响应状态:', response.status);
      console.log('响应类型:', response.headers.get('content-type'));
      
      if (!response.ok) {
        throw new Error(`HTTP错误! 状态码: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('非JSON响应:', text.substring(0, 200));
        throw new Error(`预期JSON但收到: ${text.substring(0, 100)}`);
      }
      
      const data = await response.json();
      console.log('搜索响应:', data);
      
      if (!data.success) {
        throw new Error(data.error || '搜索失败');
      }
      
      setResults(data.data);
      
    } catch (error) {
      console.error('搜索失败:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    performSearch();
  };

  if (!query) {
    return (
      <div className="search-results">
        <div className="no-query">请输入搜索关键词</div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-header">
        <h1>搜索结果</h1>
        <div className="search-info">
          搜索关键词: <strong>"{query}"</strong>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="filters">
        <select className="filter-select">
          <option value="">全部分类</option>
          <option value="武侠">武侠</option>
          <option value="言情">言情</option>
        </select>
        
        <select className="filter-select">
          <option value="">全部状态</option>
          <option value="ongoing">连载中</option>
          <option value="completed">已完结</option>
        </select>
      </div>

      {/* 错误状态 */}
      {error && (
        <div className="error-container">
          <h3>搜索失败</h3>
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="retry-button">
            重试
          </button>
          <div className="troubleshoot-tips">
            <p>排查建议：</p>
            <ul>
              <li>检查后端服务是否运行在3001端口</li>
              <li>确认API端点 /api/search 是否存在</li>
              <li>查看浏览器控制台获取详细错误信息</li>
            </ul>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {loading && <div className="loading">搜索中...</div>}

      {/* 搜索结果 */}
      {!loading && !error && results.length > 0 && (
        <div className="results-grid">
          {results.map(novel => (
            <div key={novel.id} className="novel-card">
              <h3>{novel.title}</h3>
              <p>作者: {novel.author_name}</p>
              <p>{novel.description}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="no-results">
          <p>未找到匹配的小说</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;