import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthForm.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return setError('请填写邮箱和密码');
    }

    try {
      setError('');
      setLoading(true);
      
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || '登录失败');
      }
    } catch (err) {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h2>用户登录</h2>
          <p>欢迎回到iNovel</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form-content">
          <div className="form-group">
            <label htmlFor="email">邮箱地址</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入您的邮箱"
              required
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              required
              autoComplete="current-password"
              minLength="6"
            />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>记住我</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              忘记密码？
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                登录中...
              </>
            ) : (
              '登录'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>还没有账号？ <Link to="/register" className="auth-link">立即注册</Link></p>
        </div>
        
        <div className="social-login">
          <div className="divider">
            <span>或使用第三方登录</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="social-button wechat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              </svg>
              微信登录
            </button>
            <button type="button" className="social-button qq">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

              </svg>
              QQ登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;