import React from 'react';

const SectionProperties = ({ component, onChange, renderColorPicker }) => {
  const handleChange = (property, value) => {
    onChange({
      ...component,
      [property]: value
    });
  };

  return (
    <div className="property-group">
      <div className="property-row">
        <label>背景色:</label>
        {renderColorPicker(
          component.backgroundColor || '#ffffff',
          (color) => handleChange('backgroundColor', color.hex),
          'section-background-color'
        )}
      </div>
      <div className="property-row">
        <label>高さ:</label>
        <input
          type="number"
          value={component.height || 100}
          onChange={(e) => handleChange('height', parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
};

export default SectionProperties; 