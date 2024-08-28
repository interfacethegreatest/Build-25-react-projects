import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function Model() {
  const { nodes } = useGLTF("/medias/torrus.glb");

  return (
    <group>
      <mesh
        geometry={nodes.Torus002.geometry}
        material={nodes.Torus002.material}
        position={nodes.Torus002.position}
        rotation={nodes.Torus002.rotation}
        scale={nodes.Torus002.scale}
      />
    </group>
  );
}
