import React, { useState } from 'react';

export default function OceanRegion({ d, name, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <path
      d={d} // The geometric coordinates of the irregular shape
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Critical: pointerEvents 'auto' ensures the path itself is clickable
        pointerEvents: 'auto', 
        cursor: 'pointer',
        // Make it invisible normally, but highlight on hover
        fill: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        stroke: isHovered ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 3,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Accessibility/SEO: Shows a tooltip on hover */}
      <title>{name}</title>
    </path>
  );
};