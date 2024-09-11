import React, { useEffect } from 'react';
import style from './styles.module.css';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../../public/medias/earth-globe/Earth';

export default function GlobeScene({lat, long}:{lat:number, long:number}) {
  const [rotation, setRotation] = useState([0, 0, 0]); // Initial rotation [x, y, z]

  useEffect(() => {
    // Convert lat/long to radians and update rotation
    const latitude = lat * (Math.PI / 180);   // Convert latitude to radians
    const longitude = long * (Math.PI / 180); // Convert longitude to radians
    
    // Set rotation [x (latitude), y (longitude), 0]
    setRotation([latitude, -longitude, 0]);   // Inverse Y for globe direction
  }, [lat, long]);

  return (
    <Canvas id={style.globeCanvas}>
     <ambientLight intensity={1} />
     <Suspense fallback={null}>
      <Earth rotation={rotation} />
     </Suspense>
     <Environment preset='sunset'/>
    </Canvas>
  )
}
