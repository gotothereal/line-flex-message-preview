import { useState, useCallback } from 'react';

const useFlexMessage = () => {
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [selectedContentId, setSelectedContentId] = useState(null);

  const addSection = useCallback(() => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: '',
      boxes: [],
    };
    setSections([...sections, newSection]);
    setSelectedSectionId(newSection.id);
  }, [sections]);

  const updateSection = useCallback((sectionId, updates) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  }, [sections]);

  const addBox = useCallback((sectionId) => {
    const newBox = {
      id: `box-${Date.now()}`,
      name: '',
      type: 'vertical',
      contents: [],
    };
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, boxes: [...section.boxes, newBox] }
        : section
    ));
    setSelectedBoxId(newBox.id);
  }, [sections]);

  const updateBox = useCallback((sectionId, boxId, updates) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            boxes: section.boxes.map(box =>
              box.id === boxId ? { ...box, ...updates } : box
            ),
          }
        : section
    ));
  }, [sections]);

  const addContent = useCallback((sectionId, boxId, content) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            boxes: section.boxes.map(box =>
              box.id === boxId
                ? { ...box, contents: [...box.contents, content] }
                : box
            ),
          }
        : section
    ));
    setSelectedContentId(content.id);
  }, [sections]);

  const updateContent = useCallback((sectionId, boxId, contentId, updates) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            boxes: section.boxes.map(box =>
              box.id === boxId
                ? {
                    ...box,
                    contents: box.contents.map(content =>
                      content.id === contentId ? { ...content, ...updates } : content
                    ),
                  }
                : box
            ),
          }
        : section
    ));
  }, [sections]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    // 同じ位置にドロップした場合は何もしない
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // セクションの並び替え
    if (type === 'section') {
      const newSections = Array.from(sections);
      const [removed] = newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, removed);
      setSections(newSections);
      return;
    }

    // ボックスの並び替え
    if (type === 'box') {
      const sectionId = source.droppableId;
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      const newBoxes = Array.from(section.boxes);
      const [removed] = newBoxes.splice(source.index, 1);
      newBoxes.splice(destination.index, 0, removed);

      setSections(sections.map(s =>
        s.id === sectionId ? { ...s, boxes: newBoxes } : s
      ));
      return;
    }

    // コンテンツの並び替え
    if (type === 'content') {
      const [sectionId, boxId] = source.droppableId.split(':');
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      const box = section.boxes.find(b => b.id === boxId);
      if (!box) return;

      const newContents = Array.from(box.contents);
      const [removed] = newContents.splice(source.index, 1);
      newContents.splice(destination.index, 0, removed);

      setSections(sections.map(s =>
        s.id === sectionId
          ? {
              ...s,
              boxes: s.boxes.map(b =>
                b.id === boxId ? { ...b, contents: newContents } : b
              ),
            }
          : s
      ));
    }
  }, [sections]);

  return {
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
  };
};

export default useFlexMessage; 