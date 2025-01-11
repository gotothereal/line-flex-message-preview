import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../../styles/boxes/BoxList.css';

const BoxList = ({ boxes, onBoxSelect, selectedBoxId, onAddBox, sectionId }) => {
  return (
    <div className="box-list">
      <h2>ボックス一覧</h2>
      <Droppable droppableId={sectionId} type="box">
        {(provided) => (
          <div
            className="box-items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boxes.map((box, index) => (
              <Draggable
                key={box.id}
                draggableId={box.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`box-item ${selectedBoxId === box.id ? 'selected' : ''} ${
                      snapshot.isDragging ? 'dragging' : ''
                    }`}
                    onClick={() => onBoxSelect(box.id)}
                  >
                    <span>{box.name || 'ボックス'}</span>
                    <span className="box-type">{box.type}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button className="add-box-btn" onClick={onAddBox}>
        + 新規ボックス
      </button>
    </div>
  );
};

export default BoxList; 