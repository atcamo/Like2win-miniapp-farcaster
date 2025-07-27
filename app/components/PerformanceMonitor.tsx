"use client";

import { useEffect, useState } from 'react';

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
        
        // Medir memoria si está disponible
        if ('memory' in performance) {
          const memInfo = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
          setMemory(Math.round(memInfo.usedJSHeapSize / 1024 / 1024));
        }
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm font-mono z-50">
      <div>FPS: {fps}</div>
      {memory > 0 && <div>Memory: {memory}MB</div>}
    </div>
  );
}