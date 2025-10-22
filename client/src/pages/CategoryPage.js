import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NovelCard from '../components/NovelCard';
import Pagination from '../components/Pagination';
import './CategoryPage.css';

function CategoryPage() {
  const { slug } = useParams();
  const [novels, setNovels] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        //获取分类信息
        if (slug !== 'all') {
          const catRes = await fetch(`/api/categories/${slug}`);
          const catData = await catRes.json();
          setCategory(catData.data);
        }
        
        //获取小说列表
        const url = slug === 'all' 
          ? `/api/novels?page=${pagination.page}&limit=${pagination.limit}`
          : `/api/categories/${slug}/novels?page=${pagination.page}&limit=${pagination.limit}`;
        
        const novelsRes = await fetch(url);
        const novelsData = await novelsRes.json();
        
        setNovels(novelsData.data);
        setPagination(prev => ({
          ...prev,
          total: novelsData.pagination.total,
          totalPages: novelsData.pagination.totalPages
        }));
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [slug, pagination.page]);

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="loading-page">加载中...</div>;

  return (
    <div className="category-page">
      {category && (
        <div className="category-header">
          <h1>{category.name}</h1>
          <p className="category-description">{category.description}</p>
        </div>
      )}
      
      <div className="novel-grid">
        {novels.map(novel => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>
      
      {novels.length === 0 && (
        <div className="no-novels">
          <p>该分类下暂时没有小说</p>
          <Link to="/novels" className="browse-all">浏览所有小说</Link>
        </div>
      )}
      
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default CategoryPage;