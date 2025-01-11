import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    onChange(color.hex);
  };

  const styles = {
    color: {
      width: '36px',
      height: '24px',
      borderRadius: '2px',
      background: color,
      cursor: 'pointer',
      border: '1px solid #ccc',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  };

  return (
    <div className="color-picker">
      <div style={styles.color} onClick={handleClick} />
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker; 