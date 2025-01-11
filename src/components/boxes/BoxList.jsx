import React from 'react';
import '../../styles/boxes/BoxList.css';

const BoxList = ({
  boxes,
  selectedBoxId,
  onBoxSelect,
  onBoxAdd,
  onBoxDelete
}) => {
  const renderBoxes = (boxArray, level = 0) => {
    return boxArray.map((box, index) => {
      const boxId = `${level}-${index}`;
      const isSelected = selectedBoxId === boxId;
      
      return (
        <div
          key={boxId}
          className={`box-item ${isSelected ? 'selected' : ''}`}
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="box-item-header">
            <div className="box-item-info">
              <span className="box-layout-badge">{box.layout}</span>
              <span className="box-content-count">
                コンテンツ: {box.contents?.length || 0}
              </span>
            </div>
            <div className="box-item-actions">
              <button
                className="box-action-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBoxAdd(boxId);
                }}
              >
                ＋ Box
              </button>
              {level > 0 && (
                <button
                  className="box-action-button delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBoxDelete(boxId);
                  }}
                >
                  削除
                </button>
              )}
            </div>
          </div>
          <div
            className="box-item-content"
            onClick={() => onBoxSelect(boxId)}
          >
            {box.contents?.map((content, contentIndex) => {
              if (content.type === 'box') {
                return renderBoxes([content], level + 1);
              }
              return (
                <div key={contentIndex} className="box-content-item">
                  {content.type}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="box-list">
      <div className="box-list-header">
        <h3>ボックス構造</h3>
        <button
          className="box-action-button primary"
          onClick={() => onBoxAdd('root')}
        >
          ＋ 新規Box
        </button>
      </div>
      <div className="box-items">
        {boxes && boxes.length > 0 ? (
          renderBoxes(boxes)
        ) : (
          <div className="box-empty-state">
            ボックスがありません
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxList; 