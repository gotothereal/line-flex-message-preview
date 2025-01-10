import React from 'react';
import '../styles/ComponentBuilder.css';

const ComponentBuilder = ({ onAddComponent }) => {
  const componentTypes = [
    {
      type: 'text',
      label: 'テキスト',
      description: 'テキストを追加します',
      defaultProps: {
        type: 'text',
        text: 'テキストを入力',
        size: 'md',
        weight: 'regular',
        wrap: true
      }
    },
    {
      type: 'button',
      label: 'ボタン',
      description: 'クリック可能なボタンを追加',
      defaultProps: {
        type: 'button',
        style: 'primary',
        action: {
          type: 'uri',
          label: 'ボタン',
          uri: 'https://example.com'
        }
      }
    },
    {
      type: 'separator',
      label: '区切り線',
      description: 'コンテンツを区切ります',
      defaultProps: {
        type: 'separator',
        margin: 'md',
        color: '#EEEEEE'
      }
    },
    {
      type: 'image',
      label: '画像',
      description: '画像を表示します',
      defaultProps: {
        type: 'image',
        url: 'https://via.placeholder.com/300x200',
        size: 'full',
        aspectRatio: '1.5:1'
      }
    }
  ];

  return (
    <div className="component-builder">
      {componentTypes.map((component) => (
        <button
          key={component.type}
          className="component-button"
          data-type={component.type}
          onClick={() => onAddComponent(component.defaultProps)}
        >
          <div className="component-icon" />
          <div className="component-text">
            <div className="component-text-label">{component.label}</div>
            <div className="component-text-description">{component.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ComponentBuilder; 