import React from 'react';
import '../../styles/sections/SectionList.css';

const SECTION_TYPES = ['header', 'hero', 'body', 'footer'];

const SectionList = ({
  flexMessage,
  selectedSection,
  onSectionSelect,
  onSectionToggle
}) => {
  return (
    <div className="section-list">
      <h3 className="section-list-title">セクション</h3>
      <div className="section-items">
        {SECTION_TYPES.map(sectionType => {
          const isActive = flexMessage.contents[sectionType] !== undefined;
          const isSelected = selectedSection === sectionType;

          return (
            <div
              key={sectionType}
              className={`section-item ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => isActive && onSectionSelect(sectionType)}
            >
              <div className="section-item-header">
                <span className="section-item-title">
                  {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
                </span>
                <button
                  className={`section-toggle-button ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSectionToggle(sectionType);
                  }}
                >
                  {isActive ? '無効' : '有効'}
                </button>
              </div>
              {isActive && (
                <div className="section-item-info">
                  コンテンツ数: {flexMessage.contents[sectionType].contents.length}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionList;
