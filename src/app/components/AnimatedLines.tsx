'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3 } from 'three';
import { Line } from '@react-three/drei';

interface LineItem {
  id: number;
  points: Vector3[];
  drawProgress: number;
  fadeOutProgress: number;
  speed: number;
  length: number;
}

type AnimationState = 'DRAWING' | 'FADING';

const AnimatedLines = () => {
  const [lines, setLines] = useState<LineItem[]>([]);
  const [animationState, setAnimationState] = useState<AnimationState>('DRAWING');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const lastLineTime = useRef(0);
  const baseCurve = useRef<CatmullRomCurve3 | null>(null);
  const lineCount = useRef(0);
  const fadeStartTime = useRef(0);

  // Constants for the animation
  const maxLines = 30; // Increased number of lines
  const generateInterval = 400; 
  const fadeInterval = 100;
  const fadeDuration = 1000;
  const viewportSize = 10;
  const offsetMultiplier = 0.1; // Reduced for closer lines

  // Effect to detect and update color mode preference
  useEffect(() => {
    // Check for a match with the dark color scheme media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial state
    setIsDarkMode(mediaQuery.matches);

    // Create a listener for changes to the color scheme
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Clean up the listener when the component unmounts
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Generates a new line with a gentle, straight-trending path.
   */
  const generateNewLine = (): LineItem => {
    // Create the base curve on the first line generation
    if (!baseCurve.current) {
        let startPoint: Vector3;
        let endPoint: Vector3;
        
        const startSide = Math.floor(Math.random() * 4);
        const buffer = viewportSize + 5;

        switch (startSide) {
          case 0: // Top
            startPoint = new Vector3(Math.random() * viewportSize * 2 - viewportSize, buffer, 0);
            endPoint = new Vector3(Math.random() * viewportSize * 2 - viewportSize, -buffer, 0);
            break;
          case 1: // Bottom
            startPoint = new Vector3(Math.random() * viewportSize * 2 - viewportSize, -buffer, 0);
            endPoint = new Vector3(Math.random() * viewportSize * 2 - viewportSize, buffer, 0);
            break;
          case 2: // Left
            startPoint = new Vector3(-buffer, Math.random() * viewportSize * 2 - viewportSize, 0);
            endPoint = new Vector3(buffer, Math.random() * viewportSize * 2 - viewportSize, 0);
            break;
          case 3: // Right
            startPoint = new Vector3(buffer, Math.random() * viewportSize * 2 - viewportSize, 0);
            endPoint = new Vector3(-buffer, Math.random() * viewportSize * 2 - viewportSize, 0);
            break;
          default:
            startPoint = new Vector3(0, buffer, 0);
            endPoint = new Vector3(0, -buffer, 0);
            break;
        }
        
        const numMidPoints = 3;
        const midPoints: Vector3[] = [];
        for (let i = 1; i <= numMidPoints; i++) {
          const t = i / (numMidPoints + 1);
          const interpolatedPoint = new Vector3().lerpVectors(startPoint, endPoint, t);
          const offset = new Vector3(
            (Math.random() - 0.5) * 2.5, // Increased multiplier for more curve
            (Math.random() - 0.5) * 2.5, // Increased multiplier for more curve
            (Math.random() - 0.5) * 0.2
          );
          midPoints.push(interpolatedPoint.add(offset));
        }
        baseCurve.current = new CatmullRomCurve3([startPoint, ...midPoints, endPoint]);
    }

    const basePoints = baseCurve.current!.getPoints(500);
    const offsetVector = new Vector3(
      lineCount.current * offsetMultiplier,
      lineCount.current * offsetMultiplier,
      0
    );
    
    const points = basePoints.map((p, index) => {
      return index > 0 ? p.clone().add(offsetVector) : p.clone();
    });
    
    lineCount.current += 1;

    return {
      id: Math.random(),
      points,
      drawProgress: 0,
      fadeOutProgress: 0,
      speed: 0.01 + Math.random() * 0.005, // Faster animation speed
      length: points.length,
    };
  };

  /**
   * The animation loop, run on every frame.
   */
  useFrame(({ clock }) => {
    const now = clock.getElapsedTime() * 1000;
    
    // --- DRAWING PHASE ---
    if (animationState === 'DRAWING') {
      if (lines.length < maxLines && now - lastLineTime.current > generateInterval) {
        setLines(prevLines => [...prevLines, generateNewLine()]);
        lastLineTime.current = now;
      }
      
      setLines(prevLines => 
        prevLines.map(line => ({
          ...line,
          drawProgress: Math.min(line.drawProgress + line.speed, 1),
        }))
      );

      if (lines.length === maxLines && lines.every(line => line.drawProgress >= 1)) {
        setAnimationState('FADING');
        fadeStartTime.current = now;
      }
    } 
    // --- FADING PHASE ---
    else if (animationState === 'FADING') {
      setLines(prevLines => 
        prevLines.map((line, index) => {
          const delay = index * fadeInterval;
          const timeSinceFadeStart = now - (fadeStartTime.current + delay);
          
          if (timeSinceFadeStart > 0) {
            const fadeProgress = Math.min(timeSinceFadeStart / fadeDuration, 1);
            return {
              ...line,
              fadeOutProgress: fadeProgress,
            };
          }
          return line;
        })
      );
      
      if (lines.length > 0 && lines[lines.length - 1].fadeOutProgress >= 1) {
        setLines([]);
        lineCount.current = 0;
        baseCurve.current = null;
        setAnimationState('DRAWING');
        lastLineTime.current = 0;
      }
    }
  });

  return (
    <>
      {lines.map((line) => {
        const drawCount = Math.max(1, Math.floor(line.drawProgress * line.length));
        const opacity = 1 - line.fadeOutProgress;
        
        return (
          line.points.length > 0 && drawCount > 0 && opacity > 0 && (
            <Line
              key={line.id}
              points={line.points.slice(0, drawCount)}
              // Use conditional rendering to change color based on dark mode
              color={isDarkMode ? 'white' : 'black'}
              lineWidth={1}
              transparent
              opacity={opacity}
            />
          )
        );
      })}
    </>
  );
};

export default AnimatedLines;
