import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Next-Gen Modern Custom Cursor
 * Features a precise inner dot and a spring-interpolated glowing outer ring
 * with dynamic hover state expansions over interactive elements.
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring lag / lerp effect
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track hover on interactive elements
    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'button, a, input, textarea, select, [role="button"], .interactive, [data-cursor-hover]'
      );
      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Outer Glowing Neon Ring with Spring Physics */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(0, 240, 255, 0.9)' : 'rgba(0, 240, 255, 0.5)',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 240, 255, 0.02)',
          boxShadow: isHovered
            ? '0 0 30px rgba(0, 240, 255, 0.7), inset 0 0 15px rgba(0, 240, 255, 0.3)'
            : '0 0 15px rgba(0, 240, 255, 0.3)'
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 pointer-events-none"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? '#ff007f' : '#00f0ff',
          boxShadow: isHovered ? '0 0 10px #ff007f' : '0 0 8px #00f0ff'
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
      />
    </div>
  );
}
