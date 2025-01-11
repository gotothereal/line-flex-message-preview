import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import ButtonProperties from './ButtonProperties';
import SeparatorProperties from './SeparatorProperties';
import SectionProperties from './SectionProperties';
import '../styles/PropertyEditor.css';

const PropertyEditor = ({ selectedComponent, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState({});

  const toggleColorPicker = (id) => {
    setShowColorPicker(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderColorPicker = (color, onColorChange, id) => (
    <div className="color-picker-container">
      <div
        className="color-preview"
        style={{ backgroundColor: color }}
        onClick={() => toggleColorPicker(id)}
      />
      {showColorPicker[id] && (
        <div className="color-picker-popover">
          <div
            className="color-picker-cover"
            onClick={() => toggleColorPicker(id)}
          />
          <ChromePicker
            color={color}
            onChange={onColorChange}
          />
        </div>
      )}
    </div>
  );

  if (!selectedComponent) {
    return <div className="property-editor-empty">コンポーネントを選択してください</div>;
  }

  return (
    <div className="property-editor">
      <h3>プロパティ</h3>
      {selectedComponent.type === 'button' && (
        <ButtonProperties
          component={selectedComponent}
          onChange={onChange}
        />
      )}
      {selectedComponent.type === 'separator' && (
        <SeparatorProperties
          component={selectedComponent}
          onChange={onChange}
          renderColorPicker={renderColorPicker}
        />
      )}
      {(selectedComponent.type === 'header' || 
        selectedComponent.type === 'hero' || 
        selectedComponent.type === 'body' || 
        selectedComponent.type === 'footer') && (
        <SectionProperties
          component={selectedComponent}
          onChange={onChange}
          renderColorPicker={renderColorPicker}
        />
      )}
    </div>
  );
};

export default PropertyEditor; 