import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import NovelCard from '../components/NovelCard';
import '../styles/Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  // 获取用户数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 获取收藏列表
        const favRes = await fetch('/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const favData = await favRes.json();
        setFavorites(favData.favorites || []);

        // 获取阅读历史
        const histRes = await fetch('/api/users/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const histData = await histRes.json();
        setReadingHistory(histData.history || []);
      } catch (error) {
        console.error('获取用户数据失败:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/users/upload-avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        // 更新用户信息
        window.location.reload();
      }
    } catch (error) {
      console.error('头像上传失败:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editData)
      });
      
      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('更新信息失败:', error);
    }
  };

  const removeFavorite = async (novelId) => {
    try {
      const response = await fetch(`/api/users/favorites/${novelId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setFavorites(favorites.filter(item => item.id !== novelId));
      }
    } catch (error) {
      console.error('移除收藏失败:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>个人中心</h2>
        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-button">
            退出登录
          </button>
          <Link to="/" className="back-button">返回首页</Link>
        </div>
      </div>
      
      <div className="profile-info">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img 
              src={user?.avatar_url || '/images/default-avatar.jpg'} 
              alt="用户头像"
              className="profile-avatar"
            />
            <label htmlFor="avatar-upload" className="avatar-upload-label">
              更换头像
              <input 
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        
        <div className="details-section">
          <div className="detail-item">
            <span className="label">用户名:</span>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleEditChange}
                className="edit-input"
              />
            ) : (
              <span className="value">{user?.username}</span>
            )}
            {isEditing ? (
              <button onClick={handleEditSubmit} className="save-btn">
                保存
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                编辑
              </button>
            )}
          </div>
          
          <div className="detail-item">
            <span className="label">邮箱:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="edit-input"
              />
            ) : (
              <span className="value">{user?.email}</span>
            )}
          </div>
          
          <div className="detail-item">
            <span className="label">注册时间:</span>
            <span className="value">
              {new Date(user?.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          我的收藏 ({favorites.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          阅读历史 ({readingHistory.length})
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'favorites' ? (
          <div className="favorites-section">
            {favorites.length > 0 ? (
              <div className="novels-grid">
                {favorites.map(novel => (
                  <div key={novel.id} className="favorite-item">
                    <NovelCard novel={novel} />
                    <button 
                      onClick={() => removeFavorite(novel.id)}
                      className="remove-favorite"
                    >
                      移除收藏
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>暂无收藏小说</p>
                <Link to="/" className="discover-link">去发现更多小说</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="history-section">
            {readingHistory.length > 0 ? (
              <div className="history-list">
                {readingHistory.map(item => (
                  <div key={item.id} className="history-item">
                    <Link to={`/novel/${item.novel_id}/chapter/${item.chapter_id}`}>
                      <span className="novel-title">{item.novel_title}</span>
                      <span className="chapter-info">第{item.chapter_number}章 {item.chapter_title}</span>
                    </Link>
                    <span className="read-time">
                      {new Date(item.read_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>暂无阅读记录</p>
                <Link to="/" className="discover-link">去阅读小说</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;