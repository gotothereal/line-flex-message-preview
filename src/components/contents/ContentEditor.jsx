import React from 'react';

const ContentEditor = ({ selectedContent, onChange }) => {
  const renderTextProperties = () => {
    return (
      <div className="property-group">
        <div className="property-row">
          <label>テキストモード:</label>
          <select
            value={selectedContent.contents ? 'span' : 'simple'}
            onChange={(e) => {
              // テキストモード変更の処理を追加
            }}
          >
            <option value="span">スパン</option>
            <option value="simple">シンプル</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Content Editor</h2>
      {renderTextProperties()}
      {/* コンテンツ編集のUIをここに追加 */}
    </div>
  );
};

export default ContentEditor; 