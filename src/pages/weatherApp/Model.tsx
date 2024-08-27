import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshBasicMaterial, PlaneGeometry } from 'three';

export default function Model() {

  return (
    <mesh>
      <planeGeometry args={[1, 1]} /> {/* Width and height */}
      <meshBasicMaterial color="lightblue" side={2} /> {/* Light blue color */}
    </mesh>
  );
}
