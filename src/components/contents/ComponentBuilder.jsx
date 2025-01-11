import React from 'react';
import '../../styles/contents/ComponentBuilder.css';

const ComponentBuilder = ({ sections, selectedSectionId, selectedBoxId, selectedContentId }) => {
  const renderContent = (content) => {
    switch (content.type) {
      case 'text':
        return (
          <div
            className={`flex-text ${content.id === selectedContentId ? 'selected' : ''}`}
            style={{
              color: content.color,
              fontSize: getSizeInPixels(content.size),
              fontWeight: content.weight === 'bold' ? 'bold' : 'normal',
            }}
          >
            {content.text}
          </div>
        );

      case 'button':
        return (
          <button
            className={`flex-button ${content.style} ${content.id === selectedContentId ? 'selected' : ''}`}
          >
            {content.action?.label}
          </button>
        );

      case 'image':
        return (
          <div className={`flex-image-container ${content.id === selectedContentId ? 'selected' : ''}`}>
            <img
              src={content.url}
              alt=""
              className="flex-image"
              style={{
                width: content.size === 'full' ? '100%' : getSizeInPixels(content.size),
              }}
            />
          </div>
        );

      case 'separator':
        return (
          <hr
            className={`flex-separator ${content.id === selectedContentId ? 'selected' : ''}`}
            style={{
              margin: `${getMarginInPixels(content.margin)} 0`,
              borderColor: content.color,
            }}
          />
        );

      case 'spacer':
        return (
          <div
            className={`flex-spacer ${content.id === selectedContentId ? 'selected' : ''}`}
            style={{ height: getSizeInPixels(content.size) }}
          />
        );

      default:
        return null;
    }
  };

  const getSizeInPixels = (size) => {
    switch (size) {
      case 'xs': return '12px';
      case 'sm': return '14px';
      case 'md': return '16px';
      case 'lg': return '20px';
      case 'xl': return '24px';
      case 'xxl': return '32px';
      default: return '16px';
    }
  };

  const getMarginInPixels = (margin) => {
    switch (margin) {
      case 'none': return '0';
      case 'xs': return '4px';
      case 'sm': return '8px';
      case 'md': return '16px';
      case 'lg': return '24px';
      case 'xl': return '32px';
      case 'xxl': return '48px';
      default: return '16px';
    }
  };

  const renderBox = (box) => (
    <div
      className={`flex-box ${box.id === selectedBoxId ? 'selected' : ''}`}
      style={{
        backgroundColor: box.backgroundColor,
        padding: box.padding ? `${box.padding}px` : undefined,
        display: 'flex',
        flexDirection: box.type === 'horizontal' ? 'row' : 'column',
        alignItems: box.type === 'baseline' ? 'baseline' : 'stretch',
        gap: '8px',
      }}
    >
      {box.contents.map((content) => (
        <div key={content.id} className="flex-content">
          {renderContent(content)}
        </div>
      ))}
    </div>
  );

  const renderSection = (section) => (
    <div
      key={section.id}
      className={`flex-section ${section.id === selectedSectionId ? 'selected' : ''}`}
    >
      {section.boxes.map((box) => (
        <div key={box.id} className="flex-box-container">
          {renderBox(box)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="component-builder">
      <div className="preview-container">
        {sections.map((section) => renderSection(section))}
      </div>
    </div>
  );
};

export default ComponentBuilder; 