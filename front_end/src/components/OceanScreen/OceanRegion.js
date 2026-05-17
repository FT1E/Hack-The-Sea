import React, { useState } from 'react';

export default function OceanRegion({ d, name, onClick, labelX, labelY }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <g
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <path
        d={d}
        style={{
          pointerEvents: 'auto',
          fill: isHovered ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.08)',
          stroke: isHovered ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.45)',
          strokeWidth: isHovered ? 4 : 2,
          transition: 'all 0.25s ease',
        }}
      />
      {isHovered && labelX !== undefined && (
        <>
          {/* shadow layer */}
          <text
            x={labelX + 1}
            y={labelY - 17}
            textAnchor="middle"
            fontSize="20"
            fontWeight="600"
            letterSpacing="2"
            fill="rgba(0,0,0,0.6)"
            style={{ pointerEvents: 'none' }}
          >
            {name}
          </text>
          {/* main name label */}
          <text
            x={labelX}
            y={labelY - 18}
            textAnchor="middle"
            fontSize="20"
            fontWeight="600"
            letterSpacing="2"
            fill="rgba(255,255,255,0.95)"
            style={{ pointerEvents: 'none' }}
          >
            {name}
          </text>
          {/* shadow layer */}
          <text
            x={labelX + 1}
            y={labelY + 7}
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            letterSpacing="3"
            fill="rgba(0,0,0,0.6)"
            style={{ pointerEvents: 'none' }}
          >
            ↓ IZBERI TO REGIJO
          </text>
          {/* subtitle label */}
          <text
            x={labelX}
            y={labelY + 6}
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            letterSpacing="3"
            fill="rgba(255,255,255,0.8)"
            style={{ pointerEvents: 'none' }}
          >
            ↓ IZBERI TO REGIJO
          </text>
        </>
      )}
      <title>{name}</title>
    </g>
  );
}