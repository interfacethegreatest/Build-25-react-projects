import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './stars.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Index({ numberOfStars = 5 }) {
  const [stars, setStars] = useState(Number)
  const [clickedStars, setClickedStars] = useState(Number)
  
  
  function getHover(index : number) {
    setStars(index)
  }

  function getLeave(index : number) {
    setStars(0)
  }
  
  function getDown(index : number) {
    setClickedStars(index)
  }

  return (
    <div>
    <h1 style={{textAlign: "center"}}>Select some stars!</h1>
    <div id={styles.background} >
      {
        [...Array(numberOfStars)].map((_, index) => (
          <FaStar 
            key={index} 
            id={ styles.clicked}
            style={index + 1 > (stars || clickedStars)? {color : "black"} : {color: "gold"}}
            onMouseOver={() => getHover(index + 1)} 
            onMouseLeave={() => getLeave(index+1)}
            onMouseDown={() => getDown(index+1)}
          />
        ))
      }
    </div>
    </div>
  );
}
