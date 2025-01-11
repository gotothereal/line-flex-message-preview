import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import SectionList from './components/sections/SectionList';
import SectionEditor from './components/sections/SectionEditor';
import BoxList from './components/boxes/BoxList';
import BoxEditor from './components/boxes/BoxEditor';
import ComponentList from './components/contents/ComponentList';
import ComponentBuilder from './components/contents/ComponentBuilder';
import PropertyEditor from './components/contents/PropertyEditor';
import JsonPreview from './components/preview/JsonPreview';
import useFlexMessage from './hooks/useFlexMessage';

function App() {
  const {
    sections,
    selectedSectionId,
    selectedBoxId,
    selectedContentId,
    setSelectedSectionId,
    setSelectedBoxId,
    setSelectedContentId,
    addSection,
    updateSection,
    addBox,
    updateBox,
    addContent,
    updateContent,
    handleDragEnd,
  } = useFlexMessage();

  const selectedSection = sections.find(section => section.id === selectedSectionId);
  const selectedBox = selectedSection?.boxes.find(box => box.id === selectedBoxId);
  const selectedContent = selectedBox?.contents.find(content => content.id === selectedContentId);

  const handleAddSection = () => {
    addSection();
  };

  const handleAddBox = () => {
    if (selectedSectionId) {
      addBox(selectedSectionId);
    }
  };

  const handleAddContent = (content) => {
    if (selectedSectionId && selectedBoxId) {
      addContent(selectedSectionId, selectedBoxId, content);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <div className="sidebar">
          <div className="section-panel">
            <SectionList
              sections={sections}
              selectedSectionId={selectedSectionId}
              onSectionSelect={setSelectedSectionId}
              onAddSection={handleAddSection}
            />
          </div>
          <div className="box-panel">
            <BoxList
              boxes={selectedSection?.boxes || []}
              selectedBoxId={selectedBoxId}
              onBoxSelect={setSelectedBoxId}
              onAddBox={handleAddBox}
              sectionId={selectedSectionId}
            />
          </div>
          <div className="component-panel">
            <ComponentList onSelect={handleAddContent} />
          </div>
        </div>
        <div className="main-content">
          <div className="editor-panel">
            {selectedSection && (
              <SectionEditor
                section={selectedSection}
                onUpdate={(updates) => updateSection(selectedSectionId, updates)}
              />
            )}
            {selectedBox && (
              <BoxEditor
                box={selectedBox}
                onUpdate={(updates) => updateBox(selectedSectionId, selectedBoxId, updates)}
              />
            )}
            {selectedContent && (
              <PropertyEditor
                content={selectedContent}
                onUpdate={(updates) =>
                  updateContent(selectedSectionId, selectedBoxId, selectedContentId, updates)
                }
              />
            )}
          </div>
          <div className="preview-container">
            <div className="preview-panel">
              <ComponentBuilder
                sections={sections}
                selectedSectionId={selectedSectionId}
                selectedBoxId={selectedBoxId}
                selectedContentId={selectedContentId}
              />
            </div>
            <div className="json-panel">
              <JsonPreview sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
