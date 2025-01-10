import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/ComponentList.css';

const ComponentList = ({ components, onSelect, selectedComponent, onDelete }) => {
  const getComponentLabel = (component) => {
    switch (component.type) {
      case 'text':
        if (component.contents) {
          // spansを使用したテキストの場合
          const combinedText = component.contents.map(span => span.text).join('');
          return `テキスト: ${combinedText.substring(0, 20)}${combinedText.length > 20 ? '...' : ''}`;
        }
        // 通常のテキストの場合
        return `テキスト: ${component.text ? component.text.substring(0, 20) + (component.text.length > 20 ? '...' : '') : '(空のテキスト)'}`;
      case 'button':
        return `ボタン: ${component.action?.label || ''}`;
      case 'separator':
        return '区切り線';
      case 'image':
        return '画像';
      default:
        return component.type;
    }
  };

  return (
    <div className="component-list">
      <h3>コンポーネント一覧</h3>
      <Droppable droppableId="components">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="component-list-items"
          >
            {components.map((component, index) => (
              <Draggable
                key={index.toString()}
                draggableId={index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`component-list-item ${selectedComponent === component ? 'selected' : ''}`}
                    onClick={() => onSelect(component)}
                  >
                    <span className="drag-handle">⋮⋮</span>
                    <span className="component-label">
                      {getComponentLabel(component)}
                    </span>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ComponentList; 