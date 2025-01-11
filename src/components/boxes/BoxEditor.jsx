import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const BoxEditor = ({ selectedBox, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState({});

  const toggleColorPicker = (id) => {
    setShowColorPicker(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      <h2>Box Editor</h2>
      {/* ボックス編集のUIをここに追加 */}
    </div>
  );
};

export default BoxEditor; 