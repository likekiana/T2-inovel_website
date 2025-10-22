import React from 'react';
import './CollapsibleCategory.css';

function CollapsibleCategory({ activeCategory, onSelectCategory }) {
  const categories = [
    { id: 'all', name: '全部' },
    { id: '武侠', name: '武侠' },
    { id: '玄幻', name: '玄幻' },
    { id: '都市', name: '都市' },
    { id: '历史', name: '历史' },
    { id: '科幻', name: '科幻' },
    { id: '言情', name: '言情' },
    { id: '悬疑', name: '悬疑' }
  ];

  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CollapsibleCategory;