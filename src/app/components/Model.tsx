'use client';

import { Canvas } from '@react-three/fiber';

import AnimatedLines from './AnimatedLines';
  
const Model = () => {
    return (
      <Canvas
        className="relative top-0 left-0 w-screen h-screen z-0"
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 10] }}
        style={{background: 'transparent'}}
      >
        <AnimatedLines />
      </Canvas>
    );
  };
  
export default Model;