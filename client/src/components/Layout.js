import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import './Layout.css';

function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>iNovel</h1>
          </Link>
          
          <nav className="nav">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              首页
            </Link>
            <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>
              发现
            </Link>
            {user && (
              <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                个人中心
              </Link>
            )}
          </nav>
          
          <div className="header-right">
            <SearchBar />
            
            {user ? (
              <div className="user-menu">
                <div className="user-dropdown">
                  <div className="user-info">
                    <img 
                      src={user.avatar_url || '/images/default-avatar.jpg'} 
                      alt="用户头像" 
                      className="user-avatar"
                    />
                    <span className="username">{user.username}</span>
                  </div>
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">
                      <i className="icon">👤</i> 个人中心
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <i className="icon">⚙️</i> 账户设置
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      <i className="icon">🚪</i> 退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn login-btn">登录</Link>
                <Link to="/register" className="auth-btn register-btn">注册</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>关于我们</h3>
            <p>iNovel - creator:zzh</p>
          </div>
          <div className="footer-section">
            <h3>快速链接</h3>
            <Link to="/">首页</Link>
            <Link to="/search">搜索</Link>
            {user && <Link to="/profile">个人中心</Link>}
          </div>
          <div className="footer-section">
            <h3>联系我们</h3>
            <p>邮箱: zzh@qq.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 iNovel</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;