import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="custom-cursor hidden md:block"
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `translate(-50%, -50%)` }}
      />
      <div 
        className={`custom-cursor-follower hidden md:block ${isHovering ? 'cursor-hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `translate(-50%, -50%) ${isHovering ? 'scale(2)' : 'scale(1)'}` }}
      />
    </>
  );
};

export default CustomCursor;
