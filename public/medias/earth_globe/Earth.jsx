import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Earth(props) {
  const { nodes, materials } = useGLTF('/medias/earth_globe/earth.gltf');
  const mesh = useRef();
  useFrame(() =>{
    mesh.current.rotation.z +=0.002
  })
  
  return (
    <group ref={mesh} {...props} scale={[.6,.6,.6]} position={[.89,-1.1,.7]} >
      <group  >
        <group rotation={[-Math.PI, 0, 0]}>
          <mesh geometry={nodes.meshNode_Material_u1_v1_0.geometry} material={materials.Material_u1_v1} />
          <mesh geometry={nodes.meshNode_Material_u2_v1_0.geometry} material={materials.Material_u2_v1} />
          <mesh geometry={nodes.meshNode_Material_u1_v2_0.geometry} material={materials.Material_u1_v2} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/medias/earth_globe/earth.gltf');
