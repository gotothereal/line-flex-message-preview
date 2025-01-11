import React from 'react';

const ButtonProperties = ({ component, onChange }) => {
  const handleChange = (property, value) => {
    onChange({
      ...component,
      [property]: value
    });
  };

  return (
    <div className="property-group">
      <div className="property-row">
        <label>ラベル:</label>
        <input
          type="text"
          value={component.action?.label || ''}
          onChange={(e) => {
            onChange({
              ...component,
              action: {
                ...component.action,
                type: 'uri',
                label: e.target.value
              }
            });
          }}
        />
      </div>
      <div className="property-row">
        <label>URL:</label>
        <input
          type="text"
          value={component.action?.uri || ''}
          onChange={(e) => {
            onChange({
              ...component,
              action: {
                ...component.action,
                type: 'uri',
                uri: e.target.value
              }
            });
          }}
        />
      </div>
      <div className="property-row">
        <label>スタイル:</label>
        <select
          value={component.style || 'primary'}
          onChange={(e) => handleChange('style', e.target.value)}
        >
          <option value="primary">プライマリ</option>
          <option value="secondary">セカンダリ</option>
          <option value="link">リンク</option>
        </select>
      </div>
      <div className="property-row">
        <label>マージン:</label>
        <select
          value={component.margin || 'none'}
          onChange={(e) => handleChange('margin', e.target.value)}
        >
          <option value="none">なし</option>
          <option value="xs">XS</option>
          <option value="sm">小</option>
          <option value="md">中</option>
          <option value="lg">大</option>
          <option value="xl">XL</option>
          <option value="xxl">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default ButtonProperties; 