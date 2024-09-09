import React from 'react'
import style from './styles.module.css'
import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Earth from '../../../public/medias/earth_globe/Earth'

export default function GlobeScene() {
  return (
    <Canvas id={style.globeCanvas}>
     <ambientLight/>
     <OrbitControls/>
     <Suspense fallback={null}>
      <Earth />
     </Suspense>
     <Environment preset='sunset'/>
    </Canvas>
  )
}
