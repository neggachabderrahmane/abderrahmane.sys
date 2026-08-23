import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * TiltCard Component
 * Interactive 3D perspective tilt effect with cursor-following specular light reflection.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  glareOpacity = 0.15,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values inside card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for ultra-smooth physical motion
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Glare position
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -0.5 to 0.5
      const xPct = clientX / width - 0.5;
      const yPct = clientY / height - 0.5;

      rotateX.set(-yPct * maxTilt * 2);
      rotateY.set(xPct * maxTilt * 2);

      mouseX.set(clientX);
      mouseY.set(clientY);
      setGlarePos({ x: (clientX / width) * 100, y: (clientY / height) * 100 });
    },
    [maxTilt, mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        perspective: 1000
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Specular Glare Reflection Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? glareOpacity : 0,
          background: `radial-gradient(650px circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 240, 255, 0.25), rgba(255, 0, 127, 0.15) 40%, transparent 80%)`
        }}
      />

      {/* Card Content with 3D Depth */}
      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}
