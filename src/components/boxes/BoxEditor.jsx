import React from 'react';
import '../../styles/boxes/BoxEditor.css';

const BoxEditor = ({
  box,
  onUpdate
}) => {
  if (!box) {
    return (
      <div className="box-editor">
        <p className="box-editor-empty">ボックスを選択してください</p>
      </div>
    );
  }

  const handleChange = (field, value) => {
    onUpdate({
      ...box,
      [field]: value || undefined
    });
  };

  return (
    <div className="box-editor">
      <h3 className="box-editor-title">ボックス設定</h3>
      
      <div className="box-editor-form">
        <div className="form-group">
          <label>レイアウト</label>
          <select
            value={box.layout || 'vertical'}
            onChange={(e) => handleChange('layout', e.target.value)}
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
            value={box.backgroundColor || ''}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            placeholder="#FFFFFF"
          />
        </div>

        <div className="form-group">
          <label>境界線色</label>
          <input
            type="text"
            value={box.borderColor || ''}
            onChange={(e) => handleChange('borderColor', e.target.value)}
            placeholder="#DDDDDD"
          />
        </div>

        <div className="form-group">
          <label>境界線幅</label>
          <select
            value={box.borderWidth || ''}
            onChange={(e) => handleChange('borderWidth', e.target.value)}
          >
            <option value="">なし</option>
            <option value="none">none</option>
            <option value="light">light</option>
            <option value="normal">normal</option>
            <option value="medium">medium</option>
            <option value="semi-bold">semi-bold</option>
            <option value="bold">bold</option>
          </select>
        </div>

        <div className="form-group">
          <label>コーナー半径</label>
          <select
            value={box.cornerRadius || ''}
            onChange={(e) => handleChange('cornerRadius', e.target.value)}
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

        <div className="form-group">
          <label>パディング</label>
          <select
            value={box.paddingAll || ''}
            onChange={(e) => handleChange('paddingAll', e.target.value)}
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

        <div className="form-group">
          <label>マージン</label>
          <select
            value={box.margin || ''}
            onChange={(e) => handleChange('margin', e.target.value)}
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

export default BoxEditor; 