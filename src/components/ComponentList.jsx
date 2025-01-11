import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/ComponentList.css';
import ComponentBuilder from './ComponentBuilder';

const ComponentList = ({ components, onSelect, selectedComponent, onDelete, toggleSection, preview, onAddComponentToBody }) => {
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

  const renderComponent = (component, index) => {
    if (!component) return null;
    return (
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
            {getComponentLabel(component)}
            <button onClick={(e) => { e.stopPropagation(); onDelete(index); }}>削除</button>
          </div>
        )}
      </Draggable>
    );
  };

  const sectionTypes = ['header', 'hero', 'body', 'footer'];

  const isBodyOrItsChild = (component) => {
    // bodyセクション自体が選択されている場合
    if (component && component.type === 'body') {
      return true;
    }

    // bodyセクション内のコンポーネントが選択されている場合
    if (component && component.parent === 'body') {
      return true;
    }

    return false;
  };

  return (
    <div className="component-list">
      <h3>セクション一覧</h3>
      <div className="component-list-items">
        {sectionTypes.map((sectionType, index) => (
          <div
            key={index}
            className={`component-list-item ${selectedComponent && selectedComponent.type === sectionType ? 'selected' : ''}`}
          >
            <span onClick={() => onSelect({ type: sectionType })}>{sectionType}</span>
            <button onClick={() => toggleSection(sectionType)}>
              {preview && preview[sectionType] ? 'ON' : 'OFF'}
            </button>
          </div>
        ))}
      </div>
      {(isBodyOrItsChild(selectedComponent)) && (
        <div>
          <h3>bodyの中身</h3>
          <ComponentBuilder onAddComponent={(component) => onAddComponentToBody(component)} />
          <Droppable droppableId="body-contents">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="component-list-items"
              >
                {preview && preview.body && preview.body.contents && preview.body.contents.map((component, index) => (
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
                        {getComponentLabel(component)}
                        <button onClick={(e) => { e.stopPropagation(); onDelete(index); }}>削除</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </div>
  );
};

export default ComponentList; 