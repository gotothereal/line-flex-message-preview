import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChromePicker } from 'react-color';
import '../styles/PropertyEditor.css';

const PropertyEditor = ({ selectedComponent, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState({});

  const handleChange = (property, value) => {
    onChange({
      ...selectedComponent,
      [property]: value
    });
  };

  const handleSpanChange = (index, property, value) => {
    const updatedComponent = { ...selectedComponent };
    updatedComponent.contents[index][property] = value;
    onChange(updatedComponent);
  };

  const handleSpanColorChange = (index, color) => {
    handleSpanChange(index, 'color', color.hex);
  };

  const handleColorChange = (color) => {
    onChange({
      ...selectedComponent,
      color: color.hex
    });
  };

  const handleDeleteSpan = (index) => {
    const updatedComponent = { ...selectedComponent };
    updatedComponent.contents.splice(index, 1);
    onChange(updatedComponent);
  };

  const handleAddSpan = () => {
    const updatedComponent = { ...selectedComponent };
    updatedComponent.contents.push({
      type: 'span',
      text: 'New Text',
      color: '#111111',
      weight: 'regular'
    });
    onChange(updatedComponent);
  };

  const toggleColorPicker = (id) => {
    setShowColorPicker(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSpanDragEnd = (result) => {
    if (!result.destination) return;

    const updatedComponent = { ...selectedComponent };
    const [removed] = updatedComponent.contents.splice(result.source.index, 1);
    updatedComponent.contents.splice(result.destination.index, 0, removed);
    onChange(updatedComponent);
  };

  const renderColorPicker = (color, onChange, id) => (
    <div className="color-picker-container">
      <div
        className="color-preview"
        style={{ backgroundColor: color }}
        onClick={() => toggleColorPicker(id)}
      />
      <input
        type="text"
        value={color}
        onChange={(e) => onChange({ hex: e.target.value })}
      />
      {showColorPicker[id] && (
        <div className="color-picker-popover">
          <div
            className="color-picker-cover"
            onClick={() => toggleColorPicker(id)}
          />
          <ChromePicker
            color={color}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );

  const renderTextProperties = () => {
    return (
      <div className="property-group">
        <div className="property-row">
          <label>テキストモード:</label>
          <select
            value={selectedComponent.contents ? 'span' : 'simple'}
            onChange={(e) => {
              if (e.target.value === 'span') {
                const text = selectedComponent.text || '';
                onChange({
                  ...selectedComponent,
                  contents: [{
                    type: 'span',
                    text: text,
                    color: selectedComponent.color,
                    weight: selectedComponent.weight,
                    decoration: selectedComponent.decoration
                  }],
                  text: undefined,
                  color: undefined,
                  weight: undefined,
                  decoration: undefined
                });
              } else {
                const firstSpan = selectedComponent.contents?.[0] || {};
                onChange({
                  ...selectedComponent,
                  text: firstSpan.text || '',
                  color: firstSpan.color,
                  weight: firstSpan.weight,
                  decoration: firstSpan.decoration,
                  contents: undefined
                });
              }
            }}
          >
            <option value="simple">シンプル</option>
            <option value="span">スパン</option>
          </select>
        </div>

        {selectedComponent.contents ? (
          <>
            <div className="property-row">
              <label>サイズ:</label>
              <select
                value={selectedComponent.size || 'md'}
                onChange={(e) => handleChange('size', e.target.value)}
              >
                <option value="xs">XS</option>
                <option value="sm">小</option>
                <option value="md">中</option>
                <option value="lg">大</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <h4>テキストスパン</h4>
            <DragDropContext onDragEnd={handleSpanDragEnd}>
              <Droppable droppableId="spans-list">
                {(provided) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    className="spans-container"
                  >
                    {selectedComponent.contents.map((span, index) => (
                      <Draggable 
                        key={`span-${index}`} 
                        draggableId={`span-${index}`} 
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="span-item"
                          >
                            <div className="property-row">
                              <label>テキスト:</label>
                              <input
                                type="text"
                                value={span.text || ''}
                                onChange={(e) => handleSpanChange(index, 'text', e.target.value)}
                              />
                            </div>
                            <div className="property-row">
                              <label>色:</label>
                              {renderColorPicker(
                                span.color || '#111111',
                                (color) => handleSpanColorChange(index, color),
                                `span-${index}-color`
                              )}
                            </div>
                            <div className="property-row">
                              <label>太さ:</label>
                              <select
                                value={span.weight || 'regular'}
                                onChange={(e) => handleSpanChange(index, 'weight', e.target.value)}
                              >
                                <option value="regular">通常</option>
                                <option value="bold">太字</option>
                              </select>
                            </div>
                            <div className="property-row">
                              <label>装飾:</label>
                              <select
                                value={span.decoration || 'none'}
                                onChange={(e) => handleSpanChange(index, 'decoration', e.target.value)}
                              >
                                <option value="none">なし</option>
                                <option value="underline">下線</option>
                                <option value="line-through">取り消し線</option>
                              </select>
                            </div>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteSpan(index)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button className="add-button" onClick={handleAddSpan}>
              スパンを追加
            </button>
          </>
        ) : (
          <>
            <div className="property-row">
              <label>テキスト:</label>
              <input
                type="text"
                value={selectedComponent.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </div>
            <div className="property-row">
              <label>色:</label>
              {renderColorPicker(
                selectedComponent.color || '#111111',
                (color) => handleColorChange(color),
                'text-color'
              )}
            </div>
            <div className="property-row">
              <label>サイズ:</label>
              <select
                value={selectedComponent.size || 'md'}
                onChange={(e) => handleChange('size', e.target.value)}
              >
                <option value="xs">XS</option>
                <option value="sm">小</option>
                <option value="md">中</option>
                <option value="lg">大</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div className="property-row">
              <label>太さ:</label>
              <select
                value={selectedComponent.weight || 'regular'}
                onChange={(e) => handleChange('weight', e.target.value)}
              >
                <option value="regular">通常</option>
                <option value="bold">太字</option>
              </select>
            </div>
            <div className="property-row">
              <label>装飾:</label>
              <select
                value={selectedComponent.decoration || 'none'}
                onChange={(e) => handleChange('decoration', e.target.value)}
              >
                <option value="none">なし</option>
                <option value="underline">下線</option>
                <option value="line-through">取り消し線</option>
              </select>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderButtonProperties = () => {
    return (
      <div className="property-group">
        <div className="property-row">
          <label>ラベル:</label>
          <input
            type="text"
            value={selectedComponent.action?.label || ''}
            onChange={(e) => {
              const updatedComponent = { ...selectedComponent };
              if (!updatedComponent.action) updatedComponent.action = {};
              updatedComponent.action.label = e.target.value;
              onChange(updatedComponent);
            }}
          />
        </div>
        <div className="property-row">
          <label>URL:</label>
          <input
            type="text"
            value={selectedComponent.action?.uri || ''}
            onChange={(e) => {
              const updatedComponent = { ...selectedComponent };
              if (!updatedComponent.action) {
                updatedComponent.action = { type: 'uri' };
              }
              updatedComponent.action.uri = e.target.value;
              onChange(updatedComponent);
            }}
          />
        </div>
        <div className="property-row">
          <label>スタイル:</label>
          <select
            value={selectedComponent.style || 'primary'}
            onChange={(e) => handleChange('style', e.target.value)}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="link">Link</option>
          </select>
        </div>
      </div>
    );
  };

  const renderImageProperties = () => {
    return (
      <div className="property-group">
        <div className="property-row">
          <label>URL:</label>
          <input
            type="text"
            value={selectedComponent.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
          />
        </div>
        <div className="property-row">
          <label>サイズ:</label>
          <select
            value={selectedComponent.size || 'md'}
            onChange={(e) => handleChange('size', e.target.value)}
          >
            <option value="xxs">XXS</option>
            <option value="xs">XS</option>
            <option value="sm">小</option>
            <option value="md">中</option>
            <option value="lg">大</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
            <option value="3xl">3XL</option>
            <option value="4xl">4XL</option>
            <option value="5xl">5XL</option>
            <option value="full">Full</option>
          </select>
        </div>
      </div>
    );
  };

  const renderSeparatorProperties = () => {
    return (
      <div className="property-group">
        <div className="property-row">
          <label>マージン:</label>
          <select
            value={selectedComponent.margin || 'none'}
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
          <label>色:</label>
          {renderColorPicker(
            selectedComponent.color || '#EEEEEE',
            (color) => handleColorChange(color),
            'separator-color'
          )}
        </div>
        <div className="property-row">
          <label>高さ:</label>
          <select
            value={selectedComponent.height || 'none'}
            onChange={(e) => handleChange('height', e.target.value)}
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

  return (
    <div className="property-editor">
      <h3>プロパティ</h3>
      {selectedComponent.type === 'text' && renderTextProperties()}
      {selectedComponent.type === 'button' && renderButtonProperties()}
      {selectedComponent.type === 'separator' && renderSeparatorProperties()}
      {selectedComponent.type === 'image' && renderImageProperties()}
    </div>
  );
};

export default PropertyEditor; 