import React from 'react';
import { Link } from 'react-router-dom';
import './NovelCard.css';

function NovelCard({ novel }) {
  const renderCover = () => {
    if (novel.cover_url) {
      return (
        <img 
          src={novel.cover_url} 
          alt={novel.title}
          className="novel-cover"
          onError={(e) => {
            e.target.src = '/images/default-cover.jpg';
          }}
        />
      );
    }
    
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#A593E0', '#FFA07A'];
    const color = colors[novel.title.length % colors.length];
    const initials = novel.title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    return (
      <div 
        className="generated-cover"
        style={{ backgroundColor: color }}
      >
        <span className="cover-initials">{initials}</span>
      </div>
    );
  };

  return (
    <div className="novel-card">
      <Link to={`/novel/${novel.id}`} className="novel-link">
        {renderCover()}
        <div className="novel-info">
          <h3>{novel.title}</h3>
          <p className="description">{novel.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default NovelCard;