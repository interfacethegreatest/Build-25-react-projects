import React, { useLayoutEffect, useRef, useState } from 'react';
import style from './style.module.css';
import onWindowResize from './onWindowResize';


export default function Index() {
  const size = onWindowResize();
  const { width, height} = size;
  const divHeight = height /2;
  const divWidth = width/2;
  return (
    <div>
      <div id={style.container}>
        <h1 id={style.title}>Welcome to window resize!</h1>
        <p>Width: {divWidth}px, Height: {divHeight}px</p>
      </div>
    </div>
  );
}
