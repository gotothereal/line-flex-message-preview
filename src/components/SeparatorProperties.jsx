import React from 'react';

const SeparatorProperties = ({ component, onChange, renderColorPicker }) => {
  const handleChange = (property, value) => {
    onChange({
      ...component,
      [property]: value
    });
  };

  return (
    <div className="property-group">
      <div className="property-row">
        <label>色:</label>
        {renderColorPicker(
          component.color || '#EEEEEE',
          (color) => handleChange('color', color.hex),
          'separator-color'
        )}
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
      <div className="property-row">
        <label>高さ:</label>
        <select
          value={component.height || 'xs'}
          onChange={(e) => handleChange('height', e.target.value)}
        >
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

export default SeparatorProperties; 