import React from 'react';
import '../../styles/contents/ComponentList.css';

const COMPONENT_TYPES = [
  {
    type: 'text',
    label: 'テキスト',
    defaultProps: {
      type: 'text',
      text: 'テキストを入力',
      size: 'md',
      weight: 'regular',
      color: '#000000'
    }
  },
  {
    type: 'button',
    label: 'ボタン',
    defaultProps: {
      type: 'button',
      action: {
        type: 'message',
        label: 'ボタン',
        text: 'ボタンがクリックされました'
      },
      style: 'primary'
    }
  },
  {
    type: 'image',
    label: '画像',
    defaultProps: {
      type: 'image',
      url: 'https://example.com/image.jpg',
      size: 'full'
    }
  },
  {
    type: 'separator',
    label: '区切り線',
    defaultProps: {
      type: 'separator',
      margin: 'md',
      color: '#CCCCCC'
    }
  },
  {
    type: 'spacer',
    label: 'スペース',
    defaultProps: {
      type: 'spacer',
      size: 'md'
    }
  }
];

const ComponentList = ({ onSelect }) => {
  return (
    <div className="component-list">
      <h2>コンポーネント</h2>
      <div className="component-items">
        {COMPONENT_TYPES.map((component) => (
          <div
            key={component.type}
            className="component-item"
            onClick={() => onSelect({ ...component.defaultProps, id: `content-${Date.now()}` })}
          >
            <span className="component-label">{component.label}</span>
            <span className="component-type">{component.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentList; 