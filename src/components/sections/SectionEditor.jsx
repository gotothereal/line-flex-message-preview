import React from 'react';
import '../../styles/sections/SectionEditor.css';

const SectionEditor = ({ section, onUpdate }) => {
  if (!section) {
    return <div className="section-editor-empty">セクションを選択してください</div>;
  }

  return (
    <div className="section-editor">
      <h2>セクション設定</h2>
      <div className="section-form">
        <div className="form-group">
          <label>セクション名</label>
          <input
            type="text"
            value={section.name || ''}
            onChange={(e) => onUpdate({ ...section, name: e.target.value })}
            placeholder="セクション名を入力"
          />
        </div>
        <div className="form-group">
          <label>説明</label>
          <textarea
            value={section.description || ''}
            onChange={(e) => onUpdate({ ...section, description: e.target.value })}
            placeholder="セクションの説明を入力"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionEditor; 