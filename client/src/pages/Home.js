import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NovelCard from '../components/NovelCard';
import CollapsibleCategory from '../components/CollapsibleCategory';
import './Home.css';

function Home() {
  const [novels, setNovels] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        setLoading(true);
        
        const url = activeCategory === 'all' 
        ? 'http://localhost:3001/api/novels'
        : `http://localhost:3001/api/novels?category=${encodeURIComponent(activeCategory)}`;

        console.log(' 当前请求URL:', url); 
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok || !data.success) {
          throw new Error(data.error || '请求失败');
        }
        
        setNovels(data.data || []);
      } catch (error) {
        console.error('获取小说失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNovels();
  }, [activeCategory]); 

  return (
    <div className="home">
      <CollapsibleCategory 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <div className="novel-grid">
        {loading ? (
          <div className="loading">加载中...</div>
        ) : (
          novels.map(novel => (
            <NovelCard key={novel.id} novel={novel} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;