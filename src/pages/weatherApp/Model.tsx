import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';

function Model() {
  const mesh = useRef();
  const { nodes } = useGLTF("/medias/Cube.glb");
  const { viewport } = useThree();

  useFrame(() => {
    mesh.current.rotation.x += 0.002;
  });

  return (
    <group scale={viewport.width * 0.28}>
      <Text position={[0,0,-2]}>Hello World</Text>
      <mesh ref={mesh}
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={nodes.Cube002.position}
        rotation={nodes.Cube002.rotation}
        scale={nodes.Cube002.scale}
      >
        <MeshTransmissionMaterial /*{...materialProps}*/ />
      </mesh>
    </group>
  );
}

export default React.memo(Model);