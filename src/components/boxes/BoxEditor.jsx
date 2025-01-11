import React from 'react';
import '../../styles/boxes/BoxEditor.css';

const BoxEditor = ({ box, onUpdate }) => {
  if (!box) {
    return <div className="box-editor-empty">ボックスを選択してください</div>;
  }

  return (
    <div className="box-editor">
      <h2>ボックス設定</h2>
      <div className="box-form">
        <div className="form-group">
          <label>ボックス名</label>
          <input
            type="text"
            value={box.name || ''}
            onChange={(e) => onUpdate({ ...box, name: e.target.value })}
            placeholder="ボックス名を入力"
          />
        </div>
        <div className="form-group">
          <label>タイプ</label>
          <select
            value={box.type}
            onChange={(e) => onUpdate({ ...box, type: e.target.value })}
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
            <option value="baseline">Baseline</option>
          </select>
        </div>
        <div className="form-group">
          <label>背景色</label>
          <input
            type="color"
            value={box.backgroundColor || '#ffffff'}
            onChange={(e) => onUpdate({ ...box, backgroundColor: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>パディング</label>
          <input
            type="number"
            value={box.padding || 0}
            onChange={(e) => onUpdate({ ...box, padding: parseInt(e.target.value) })}
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
};

export default BoxEditor; 