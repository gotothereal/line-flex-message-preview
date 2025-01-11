import React from 'react';
import '../../styles/sections/SectionEditor.css';

const SectionEditor = ({
  section,
  sectionType,
  onUpdate
}) => {
  if (!section) {
    return (
      <div className="section-editor">
        <p className="section-editor-empty">セクションを選択してください</p>
      </div>
    );
  }

  const handleLayoutChange = (e) => {
    onUpdate({
      ...section,
      layout: e.target.value
    });
  };

  const handleBackgroundColorChange = (e) => {
    onUpdate({
      ...section,
      backgroundColor: e.target.value || undefined
    });
  };

  const handlePaddingChange = (e) => {
    const value = e.target.value;
    onUpdate({
      ...section,
      paddingAll: value || undefined
    });
  };

  return (
    <div className="section-editor">
      <h3 className="section-editor-title">
        {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}の設定
      </h3>
      
      <div className="section-editor-form">
        <div className="form-group">
          <label>レイアウト</label>
          <select
            value={section.layout || 'vertical'}
            onChange={handleLayoutChange}
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
            <option value="baseline">Baseline</option>
          </select>
        </div>

        <div className="form-group">
          <label>背景色</label>
          <input
            type="text"
            value={section.backgroundColor || ''}
            onChange={handleBackgroundColorChange}
            placeholder="#FFFFFF"
          />
        </div>

        <div className="form-group">
          <label>パディング (all)</label>
          <select
            value={section.paddingAll || ''}
            onChange={handlePaddingChange}
          >
            <option value="">なし</option>
            <option value="none">none</option>
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
            <option value="xxl">xxl</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
