import React from 'react';
import { useNavigate } from 'react-router-dom';
import OceanRegion from './OceanRegion';
import sea_water_photo from '../../media/sea_water_photo.jpg';
import LoginModal from '../LoginModal'
import { trackEvent } from '../../services/analytics'

export default function OceanHomeScreen (props) {
  const navigate = useNavigate();
  const sea_water_gif = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHF3dzdjdnV4M3A5a2duc3pmdWZlY29za2FrbDN2bXE3d3lvZm9tdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OalJFGFBD4D2xn61qb/giphy.gif";

  const handleRegionClick = (targetRoute, regionName) => {
    trackEvent('region_visited', { region: regionName })
    navigate(targetRoute)
  }

  return (
    <div style={styles.container}>
      <img
        src={sea_water_gif}
        alt="Ocean"
        style={styles.image}
      />

      <svg
        viewBox="0 0 1000 1000"
        style={styles.svgOverlay}
        preserveAspectRatio="none"
      >
        <OceanRegion
          d="M 0,0 L 500,0 Q 400,250 250,500 L 0,500 Z"
          name="OBALNI PAS SKAL"
          labelX={150} labelY={220}
          onClick={() => handleRegionClick('/obalni-pas-skal', 'OBALNI PAS SKAL')}
        />

        <OceanRegion
          d="M 500,0 L 1000,0 L 1000,600 C 800,500 700,300 500,0 Z"
          name="PEŠČENO MORSKI PAS"
          labelX={780} labelY={220}
          onClick={() => handleRegionClick('/pesceno-morski-pas', 'PEŠČENO MORSKI PAS')}
        />

        <OceanRegion
          d="M 0,500 L 250,500 Q 400,250 500,0 C 700,300 800,500 1000,600 L 1000,1000 L 0,1000 Z"
          name="ODPRTO OBALNO MORJE"
          labelX={500} labelY={780}
          onClick={() => handleRegionClick('/odprto-obalno-morje', 'ODPRTO OBALNO MORJE')}
        />
      </svg>

      <LoginModal />
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
    pointerEvents: 'none',
  },
};