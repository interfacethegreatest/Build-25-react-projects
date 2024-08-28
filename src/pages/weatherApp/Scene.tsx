'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';

export default function Scene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
      <Model/>
      </Suspense>
    </Canvas>
  );
}
