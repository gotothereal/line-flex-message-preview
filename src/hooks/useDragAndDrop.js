import { useCallback } from 'react';

const useDragAndDrop = (onReorder) => {
  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;

      if (sourceIndex === destinationIndex) {
        return;
      }

      onReorder(sourceIndex, destinationIndex);
    },
    [onReorder]
  );

  return {
    handleDragEnd,
  };
};

export default useDragAndDrop; 