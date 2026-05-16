import React from 'react';
import { useNavigate } from 'react-router-dom';
import OceanRegion from './OceanRegion';
import sea_water_photo from '../../media/sea_water_photo.jpg';

export default function OceanHomeScreen (props) {
  const navigate = useNavigate();

  // Handle navigation when a region is clicked
  const handleRegionClick = (targetRoute) => {
    navigate(targetRoute);
  };

  return (
    <div style={styles.container}>
      {/* 1. The Ocean Background Image */}
      <img 
        src={sea_water_photo} 
        alt="Ocean" 
        style={styles.image}
      />

      {/* 2. The SVG Overlay for irregular clickable shapes */}
      {/* viewBox creates a virtual 1000x1000 coordinate system that scales dynamically */}
      <svg  viewBox="0 0 1000 1000"
            style={styles.svgOverlay}
            preserveAspectRatio="xMidYMid slice">
        
        {/* Region 1: Top Left / North Ocean */}
        <OceanRegion 
          d="M 0,0 L 500,0 Q 400,250 250,500 L 0,500 Z" 
          name="North Ocean"
          onClick={() => handleRegionClick('/north-ocean')}
        />

        {/* Region 2: Top Right / Reef Zone */}
        <OceanRegion 
          d="M 500,0 L 1000,0 L 1000,600 C 800,500 700,300 500,0 Z" 
          name="The Reefs"
          onClick={() => handleRegionClick('/reefs')}
        />

        {/* Region 3: Deep Trench (Southern Area) */}
        <OceanRegion 
          d="M 0,500 L 250,500 Q 400,250 500,0 C 700,300 800,500 1000,600 L 1000,1000 L 0,1000 Z" 
          name="The Deep Trench"
          onClick={() => handleRegionClick('/trench')}
        />

      </svg>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none', // Allows clicking through empty SVG space if needed
  },
};
