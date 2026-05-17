import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useCallback, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FishLabel from './FishLabel'
import './FishCard.css'

function FishModel({ modelPath, onLoaded }) {
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (scene) {
      onLoaded(); // Signal that model is ready
    }
  }, [scene, onLoaded]);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}

export default function FishCard({ fish }) {
  const navigate = useNavigate()

  const location = useLocation()

   const [modelLoading, setModelLoading] = useState(true); // <-- NEW
  
    // Reset model loading when slug changes
    useEffect(() => {
      setModelLoading(true);
    }, [location]);
  
    const handleModelLoaded = useCallback(() => {
      setModelLoading(false);
    }, []);

  return (
    <div className="fish-card" onClick={() => navigate(`/fish/${fish.slug}`)} style={{ cursor: 'pointer' }}>
      <div className="fish-canvas-placeholder">


        {/* Loading overlay */}
        {modelLoading && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            background: "rgba(5, 17, 31, 0.8)",
          }}>
            <img
              src="/loading_spinner_transparent.gif"
              alt="Loading model..."
              style={{ height: "60px", width: "60px" }}
            />
            <span style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,180,60,0.5)",
              marginTop: "0.8rem",
            }}>
              Loading 3D Model…
            </span>
          </div>
        )}

        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[2, 2, 2]} intensity={2} />

          <Suspense fallback={null}>
            <FishModel modelPath={fish.model} onLoaded={handleModelLoaded} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>

      <FishLabel fish={fish} />
    </div>
  )
}