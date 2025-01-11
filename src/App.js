import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import SectionList from './components/sections/SectionList';
import SectionEditor from './components/sections/SectionEditor';
import BoxList from './components/boxes/BoxList';
import BoxEditor from './components/boxes/BoxEditor';
import { useFlexMessage } from './hooks/useFlexMessage';
import './App.css';

function App() {
  const {
    flexMessage,
    setFlexMessage,
    selectedSection,
    setSelectedSection,
    selectedBox,
    setSelectedBox,
    updateSection,
    updateBoxInSection
  } = useFlexMessage();

  const handleSectionToggle = (sectionType) => {
    if (flexMessage.contents[sectionType]) {
      const newContents = { ...flexMessage.contents };
      delete newContents[sectionType];
      setFlexMessage({
        ...flexMessage,
        contents: newContents
      });
      if (selectedSection === sectionType) {
        setSelectedSection(null);
        setSelectedBox(null);
      }
    } else {
      setFlexMessage({
        ...flexMessage,
        contents: {
          ...flexMessage.contents,
          [sectionType]: {
            type: 'box',
            layout: 'vertical',
            contents: []
          }
        }
      });
    }
  };

  const handleSectionSelect = (sectionType) => {
    setSelectedSection(sectionType);
    setSelectedBox(null);
  };

  const handleSectionUpdate = (newSection) => {
    if (selectedSection) {
      updateSection(selectedSection, newSection);
    }
  };

  const handleBoxSelect = (boxId) => {
    setSelectedBox(boxId);
  };

  const handleBoxAdd = (parentBoxId) => {
    if (!selectedSection) return;

    const newBox = {
      type: 'box',
      layout: 'vertical',
      contents: []
    };

    if (parentBoxId === 'root') {
      const section = { ...flexMessage.contents[selectedSection] };
      section.contents = [...(section.contents || []), newBox];
      updateSection(selectedSection, section);
    } else {
      const [parentLevel, parentIndex] = parentBoxId.split('-').map(Number);
      const section = { ...flexMessage.contents[selectedSection] };
      let currentBox = section;

      // 親ボックスまで辿る
      for (let i = 0; i < parentLevel; i++) {
        currentBox = currentBox.contents[i];
      }

      // 新しいボックスを追加
      currentBox.contents[parentIndex].contents = [
        ...(currentBox.contents[parentIndex].contents || []),
        newBox
      ];

      updateSection(selectedSection, section);
    }
  };

  const handleBoxDelete = (boxId) => {
    if (!selectedSection || !boxId) return;

    const [parentLevel, index] = boxId.split('-').map(Number);
    const section = { ...flexMessage.contents[selectedSection] };
    let currentBox = section;

    // 親ボックスまで辿る
    for (let i = 0; i < parentLevel; i++) {
      currentBox = currentBox.contents[i];
    }

    // 指定されたボックスを削除
    currentBox.contents.splice(index, 1);
    updateSection(selectedSection, section);

    if (selectedBox === boxId) {
      setSelectedBox(null);
    }
  };

  const handleBoxUpdate = (updatedBox) => {
    if (!selectedSection || !selectedBox) return;

    const [parentLevel, index] = selectedBox.split('-').map(Number);
    const section = { ...flexMessage.contents[selectedSection] };
    let currentBox = section;

    // 親ボックスまで辿る
    for (let i = 0; i < parentLevel; i++) {
      currentBox = currentBox.contents[i];
    }

    // ボックスを更新
    currentBox.contents[index] = updatedBox;
    updateSection(selectedSection, section);
  };

  const ResizeHandle = () => {
    return (
      <PanelResizeHandle className="resize-handle">
        <div className="resize-handle-bar" />
      </PanelResizeHandle>
    );
  };

  return (
    <div className="app">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <div className="left-panel">
            <SectionList
              flexMessage={flexMessage}
              selectedSection={selectedSection}
              onSectionSelect={handleSectionSelect}
              onSectionToggle={handleSectionToggle}
            />
            {selectedSection && (
              <BoxList
                boxes={flexMessage.contents[selectedSection]?.contents || []}
                selectedBoxId={selectedBox}
                onBoxSelect={handleBoxSelect}
                onBoxAdd={handleBoxAdd}
                onBoxDelete={handleBoxDelete}
              />
            )}
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={40} minSize={30}>
          <div className="center-panel">
            {selectedSection && !selectedBox && (
              <SectionEditor
                section={flexMessage.contents[selectedSection]}
                sectionType={selectedSection}
                onUpdate={handleSectionUpdate}
              />
            )}
            {selectedBox && (
              <BoxEditor
                box={flexMessage.contents[selectedSection]?.contents[selectedBox]}
                onUpdate={handleBoxUpdate}
              />
            )}
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={30} minSize={20}>
          <div className="right-panel">
            <div className="preview-panel">
              <h3>プレビュー</h3>
              <pre className="json-preview">
                {JSON.stringify(flexMessage, null, 2)}
              </pre>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
