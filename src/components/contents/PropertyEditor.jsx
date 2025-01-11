import React from 'react';
import '../../styles/contents/PropertyEditor.css';
import ColorPicker from '../common/ColorPicker';

const PropertyEditor = ({ content, onUpdate }) => {
  if (!content) {
    return <div className="property-editor-empty">コンテンツを選択してください</div>;
  }

  const renderTextProperties = () => (
    <>
      <div className="form-group">
        <label>テキスト</label>
        <input
          type="text"
          value={content.text || ''}
          onChange={(e) => onUpdate({ ...content, text: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>サイズ</label>
        <select
          value={content.size || 'md'}
          onChange={(e) => onUpdate({ ...content, size: e.target.value })}
        >
          <option value="xs">XS</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
          <option value="xxl">XXL</option>
        </select>
      </div>
      <div className="form-group">
        <label>文字の太さ</label>
        <select
          value={content.weight || 'regular'}
          onChange={(e) => onUpdate({ ...content, weight: e.target.value })}
        >
          <option value="regular">Regular</option>
          <option value="bold">Bold</option>
        </select>
      </div>
      <div className="form-group">
        <label>色</label>
        <ColorPicker
          color={content.color || '#000000'}
          onChange={(color) => onUpdate({ ...content, color })}
        />
      </div>
    </>
  );

  const renderButtonProperties = () => (
    <>
      <div className="form-group">
        <label>ラベル</label>
        <input
          type="text"
          value={content.action?.label || ''}
          onChange={(e) =>
            onUpdate({
              ...content,
              action: { ...content.action, label: e.target.value }
            })
          }
        />
      </div>
      <div className="form-group">
        <label>スタイル</label>
        <select
          value={content.style || 'primary'}
          onChange={(e) => onUpdate({ ...content, style: e.target.value })}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="link">Link</option>
        </select>
      </div>
    </>
  );

  const renderImageProperties = () => (
    <>
      <div className="form-group">
        <label>画像URL</label>
        <input
          type="text"
          value={content.url || ''}
          onChange={(e) => onUpdate({ ...content, url: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>サイズ</label>
        <select
          value={content.size || 'full'}
          onChange={(e) => onUpdate({ ...content, size: e.target.value })}
        >
          <option value="full">Full</option>
          <option value="xl">XL</option>
          <option value="lg">Large</option>
          <option value="md">Medium</option>
          <option value="sm">Small</option>
        </select>
      </div>
    </>
  );

  const renderSeparatorProperties = () => (
    <>
      <div className="form-group">
        <label>マージン</label>
        <select
          value={content.margin || 'md'}
          onChange={(e) => onUpdate({ ...content, margin: e.target.value })}
        >
          <option value="none">None</option>
          <option value="xs">XS</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
          <option value="xxl">XXL</option>
        </select>
      </div>
      <div className="form-group">
        <label>色</label>
        <ColorPicker
          color={content.color || '#CCCCCC'}
          onChange={(color) => onUpdate({ ...content, color })}
        />
      </div>
    </>
  );

  const renderSpacerProperties = () => (
    <div className="form-group">
      <label>サイズ</label>
      <select
        value={content.size || 'md'}
        onChange={(e) => onUpdate({ ...content, size: e.target.value })}
      >
        <option value="xs">XS</option>
        <option value="sm">Small</option>
        <option value="md">Medium</option>
        <option value="lg">Large</option>
        <option value="xl">XL</option>
        <option value="xxl">XXL</option>
      </select>
    </div>
  );

  return (
    <div className="property-editor">
      <h2>プロパティ</h2>
      <div className="property-form">
        {content.type === 'text' && renderTextProperties()}
        {content.type === 'button' && renderButtonProperties()}
        {content.type === 'image' && renderImageProperties()}
        {content.type === 'separator' && renderSeparatorProperties()}
        {content.type === 'spacer' && renderSpacerProperties()}
      </div>
    </div>
  );
};

export default PropertyEditor; 