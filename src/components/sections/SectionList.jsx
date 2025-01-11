import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../../styles/sections/SectionList.css';

const SectionList = ({ sections, onSectionSelect, selectedSectionId, onAddSection }) => {
  return (
    <div className="section-list">
      <h2>セクション一覧</h2>
      <Droppable droppableId="sections" type="section">
        {(provided) => (
          <div
            className="section-items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`section-item ${selectedSectionId === section.id ? 'selected' : ''} ${
                      snapshot.isDragging ? 'dragging' : ''
                    }`}
                    onClick={() => onSectionSelect(section.id)}
                  >
                    <span>{section.name || 'セクション'}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button className="add-section-btn" onClick={onAddSection}>
        + 新規セクション
      </button>
    </div>
  );
};

export default SectionList; 