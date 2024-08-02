import React, { useState } from 'react';
import styles from './randomColor.module.css';

export default function RandomColor() {
  const [color, setColor] = useState('');
  const [typeOfColor, setTypeOfColor] = useState('');

  function getRandomColor(type : string) {
    let newColor = '';
    if (type === 'hex') {
      newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    } else if (type === 'RGB') {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      newColor = `rgb(${red},${green},${blue})`;
    } else if (type === 'random') {
      const hue = Math.floor(Math.random() * 360);
      const sat = Math.floor(Math.random() * 101);
      const lightness = Math.floor(Math.random() * 101);
      newColor = `hsl(${hue}, ${sat}%, ${lightness}%)`;
    }
    setTypeOfColor(type);
    setColor(newColor);
  }

  return (
    <div id={styles.background} style={{ backgroundColor: color }}>
      <button onClick={() => getRandomColor('hex')}>Create HEX Color</button>
      <button onClick={() => getRandomColor('RGB')}>Create RGB Color</button>
      <button onClick={() => getRandomColor('random')}>Create Random Color</button>
      <div id={styles.titleText}>
        {typeOfColor ? <h2>{typeOfColor}</h2> : <h2>Pick a button.</h2>}
      </div>
      <div>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
