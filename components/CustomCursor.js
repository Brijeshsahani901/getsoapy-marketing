import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorOuter = useRef(null);
  const cursorInner = useRef(null);

  // Initialize positions with (0,0) - safe for SSR
  const outerPos = useRef({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Mouse position state
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set window size once mounted
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Initialize positions in center on mount
    outerPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function handleMouseMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Move inner cursor instantly
      if (cursorInner.current) {
        cursorInner.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    }

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    function animate() {
      if (cursorOuter.current) {
        outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.15;
        outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.15;

        cursorOuter.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .cursor-outer,
        .cursor-inner {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          mix-blend-mode: difference;
          z-index: 9999;
          user-select: none;
        }
        .cursor-outer {
          width: 48px;
          height: 48px;
          border: 2px solid white;
          border-radius: 50%;
          background: transparent;
          margin-left: -24px;
          margin-top: -24px;
          will-change: transform;
          transition: border-color 0.3s ease;
        }
        .cursor-inner {
          width: 8px;
          height: 8px;
          background: #0F8A5F; /* green dot */
          border-radius: 50%;
          margin-left: -4px;
          margin-top: -4px;
          will-change: transform;
        }
      `}</style>

      <div className="cursor-outer" ref={cursorOuter}></div>
      <div className="cursor-inner" ref={cursorInner}></div>
    </>
  );
}
