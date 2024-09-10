import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/medias/earth-globe/earth.gltf');
  
  // Reference to the mesh
  const rotationMesh = useRef();
  
  // Initial and target rotations
  const [currentRotation, setCurrentRotation] = useState([0, 0, 0]);
  const targetRotation = props.rotation ? [...props.rotation] : [0, 0, 0];
  
  // Adjust the Y-axis rotation for target
  targetRotation[1] -= 1.565;
  
  useEffect(() => {
    // Set the initial rotation when props.rotation changes
    setCurrentRotation(rotationMesh.current ? [...rotationMesh.current.rotation.toArray()] : [0, 0, 0]);
  }, [props.rotation]);

  useFrame(() => {
    if (rotationMesh.current) {
      // Smoothly interpolate rotation values
      const lerp = (start, end, t) => start + (end - start) * t;
      
      // Lerp factor (you can adjust this to control the speed of the interpolation)
      const lerpFactor = 0.01;

      rotationMesh.current.rotation.x = lerp(currentRotation[0], targetRotation[0], lerpFactor);
      rotationMesh.current.rotation.y = lerp(currentRotation[1], targetRotation[1], lerpFactor);
      rotationMesh.current.rotation.z = lerp(currentRotation[2], targetRotation[2], lerpFactor);

      // Update current rotation for next frame
      setCurrentRotation(rotationMesh.current.rotation.toArray());
    }
  });

  return (
    <group dispose={null}>
      <mesh
        ref={rotationMesh}
        rotation={currentRotation} // Start from the current rotation
        geometry={nodes.Object_4.geometry}
        material={materials['Scene_-_Root']}
        scale={3.068}
      />
    </group>
  );
}

useGLTF.preload('/earth.gltf');
