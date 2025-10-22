import React, { Suspense } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useLocation 
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Layout from './components/Layout';
import './App.css';


function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
    </div>
  );
}

//加载页面组件
const Home = React.lazy(() => import('./pages/Home'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const NovelDetail = React.lazy(() => import('./pages/NovelDetail'));
const Reader = React.lazy(() => import('./pages/Reader'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));

//保护路由组件
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation(); // 正确使用location
  
  return user ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

function NotFound() {
  return (
    <div className="not-found-page">
      <h2>404 - 页面未找到</h2>
      <p>您访问的页面不存在，请检查URL或返回首页</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* 公开路由 */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* 首页路由 */}
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              
              <Route path="/novel/:novelId" element={<NovelDetail />} />
              <Route path="/novel/:novelId/chapter/:chapterId" element={<Reader />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default App;