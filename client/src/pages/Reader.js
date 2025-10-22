import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Reader.css';

function Reader() {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 阅读设置
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState('light');
  const [lineHeight, setLineHeight] = useState(1.8);
  const [fontFamily, setFontFamily] = useState('serif');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 获取章节内容
        const chapterRes = await fetch(`http://localhost:3001/api/novels/${novelId}/chapters/${chapterId}`);
        const chapterData = await chapterRes.json();
        
        // 获取小说信息
        const novelRes = await fetch(`http://localhost:3001/api/novels/${novelId}`);
        const novelData = await novelRes.json();
        
        // 获取章节列表
        const chaptersRes = await fetch(`http://localhost:3001/api/novels/${novelId}/chapters`);
        const chaptersData = await chaptersRes.json();

        setChapter(chapterData.data);
        setNovel(novelData.data);
        setChapters(chaptersData.data);
      } catch (error) {
        console.error('数据加载失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [novelId, chapterId]);

  // 获取当前章节索引
  const currentIndex = chapters.findIndex(ch => ch.id === parseInt(chapterId));
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  if (loading) return (
    <div className="reader-loading">
      <div className="loading-spinner"></div>
      <p>章节加载中...</p>
    </div>
  );
  
  if (!chapter) return (
    <div className="reader-error">
      <h3>章节加载失败</h3>
      <p>请检查网络连接或刷新页面</p>
      <Link to={`/novel/${novelId}`} className="back-button">返回小说</Link>
    </div>
  );

  return (
    <div className={`reader-container ${theme}`}>
      {/* 顶部导航栏 */}
      <header className="reader-header">
        <div className="header-left">
          <Link to={`/novel/${novelId}`} className="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回小说
          </Link>
        </div>
        
        <div className="header-center">
          <h1 className="novel-title">{novel?.title}</h1>
        </div>
        
        <div className="header-right">
          <div className="reader-settings">
            <select 
              value={fontSize} 
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="setting-select"
            >
              <option value={14}>小</option>
              <option value={16}>中</option>
              <option value={18}>标准</option>
              <option value={20}>大</option>
              <option value={22}>特大</option>
            </select>
            
            <select 
              value={fontFamily} 
              onChange={(e) => setFontFamily(e.target.value)}
              className="setting-select"
            >
              <option value="serif">宋体</option>
              <option value="sans-serif">黑体</option>
              <option value="system-ui">系统字体</option>
            </select>
            
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="setting-select"
            >
              <option value="light">日间</option>
              <option value="sepia">护眼</option>
              <option value="dark">夜间</option>
            </select>
          </div>
        </div>
      </header>

      {/* 阅读内容区 */}
      <main className="reader-content">
        <div className="content-wrapper">
          <h2 className="chapter-title">{chapter.title}</h2>
          
          <div 
            className="chapter-content"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              fontFamily: fontFamily
            }}
          >
            {chapter.content.split('\n').map((para, i) => (
              <p key={i} className="paragraph">{para}</p>
            ))}
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <footer className="reader-footer">
        <button 
          onClick={() => prevChapter && navigate(`/novel/${novelId}/chapter/${prevChapter.id}`)}
          disabled={!prevChapter}
          className="nav-button prev-button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          上一章
        </button>
        
        <div className="chapter-progress">
          <span className="chapter-position">第{currentIndex + 1}章</span>
          <span className="chapter-total">/ 共{chapters.length}章</span>
        </div>
        
        <button 
          onClick={() => nextChapter && navigate(`/novel/${novelId}/chapter/${nextChapter.id}`)}
          disabled={!nextChapter}
          className="nav-button next-button"
        >
          下一章
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </footer>
    </div>
  );
}

export default Reader;