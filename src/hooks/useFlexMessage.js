import { useState } from 'react';

const INITIAL_FLEX_MESSAGE = {
  type: 'flex',
  altText: 'Flex Message',
  contents: {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: []
    },
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: []
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: []
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: []
    }
  }
};

export const useFlexMessage = () => {
  const [flexMessage, setFlexMessage] = useState(INITIAL_FLEX_MESSAGE);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);

  const updateSection = (sectionType, newSection) => {
    setFlexMessage(prev => ({
      ...prev,
      contents: {
        ...prev.contents,
        [sectionType]: newSection
      }
    }));
  };

  const updateBoxInSection = (sectionType, boxId, newBox) => {
    setFlexMessage(prev => {
      const section = { ...prev.contents[sectionType] };
      const [parentId, index] = boxId.split('-').map(Number);
      let currentBox = section;

      // 親ボックスまで辿る
      for (let i = 0; i < parentId; i++) {
        currentBox = currentBox.contents[i];
      }

      // 指定されたボックスを更新
      currentBox.contents[index] = newBox;

      return {
        ...prev,
        contents: {
          ...prev.contents,
          [sectionType]: section
        }
      };
    });
  };

  return {
    flexMessage,
    setFlexMessage,
    selectedSection,
    setSelectedSection,
    selectedBox,
    setSelectedBox,
    updateSection,
    updateBoxInSection
  };
}; 