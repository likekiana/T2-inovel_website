import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthForm.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // 动态设置API基础URL
  const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' 
    : '';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 前端验证
    if (formData.password !== formData.confirmPassword) {
      return setError('两次输入的密码不一致');
    }
    
    if (formData.password.length < 6) {
      return setError('密码长度不能少于6位');
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await register(
        formData.username,
        formData.email,
        formData.password
      );
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || '注册失败，请稍后再试');
      }
    } catch (err) {
      console.error('注册请求错误:', err);
      setError('网络请求失败，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>用户注册</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
              maxLength="20"
            />
          </div>
          
          <div className="form-group">
            <label>邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="请输入有效的邮箱地址"
            />
          </div>
          
          <div className="form-group">
            <label>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              autoComplete="new-password"
            />
          </div>
          
          <div className="form-group">
            <label>确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        
        <div className="auth-footer">
          已有账号？<Link to="/login">立即登录</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;