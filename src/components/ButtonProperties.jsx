import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const ButtonProperties = ({ selectedComponent = {}, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!selectedComponent) {
    return null;
  }

  const handleChange = (property, value) => {
    onChange({
      ...selectedComponent,
      [property]: value
    });
  };

  const handleActionChange = (property, value) => {
    onChange({
      ...selectedComponent,
      action: {
        ...selectedComponent.action,
        type: 'uri',
        [property]: value
      }
    });
  };

  const handleColorChange = (color) => {
    handleChange('color', color.hex);
  };

  const action = selectedComponent.action || { type: 'uri', label: '', uri: '' };

  return (
    <div className="property-editor">
      <div className="property-group">
        <div className="property-row">
          <label>ラベル:</label>
          <input
            type="text"
            value={action.label || ''}
            onChange={(e) => handleActionChange('label', e.target.value)}
          />
        </div>
        <div className="property-row">
          <label>URL:</label>
          <input
            type="text"
            value={action.uri || ''}
            onChange={(e) => handleActionChange('uri', e.target.value)}
          />
        </div>
        <div className="property-row">
          <label>スタイル:</label>
          <select
            value={selectedComponent.style || 'link'}
            onChange={(e) => handleChange('style', e.target.value)}
          >
            <option value="link">リンク</option>
            <option value="primary">プライマリ</option>
            <option value="secondary">セカンダリ</option>
          </select>
        </div>
        <div className="property-row">
          <label>色:</label>
          <div className="color-input-group">
            <input
              type="text"
              value={selectedComponent.color || '#000000'}
              onChange={(e) => handleChange('color', e.target.value)}
            />
            <button
              className="color-picker-button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{ backgroundColor: selectedComponent.color || '#000000' }}
            />
          </div>
          {showColorPicker && (
            <div className="color-picker-popover">
              <div
                className="color-picker-cover"
                onClick={() => setShowColorPicker(false)}
              />
              <ChromePicker
                color={selectedComponent.color || '#000000'}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
        <div className="property-row">
          <label>マージン:</label>
          <select
            value={selectedComponent.margin || 'none'}
            onChange={(e) => handleChange('margin', e.target.value)}
          >
            <option value="none">なし</option>
            <option value="xs">XS</option>
            <option value="sm">S</option>
            <option value="md">M</option>
            <option value="lg">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ButtonProperties; 