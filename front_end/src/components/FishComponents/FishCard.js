import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import FishLabel from './FishLabel'
import './FishCard.css'

function FishModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)
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

  return (
    <div className="fish-card" onClick={() => navigate(`/fish/${fish.slug}`)} style={{ cursor: 'pointer' }}>
      <div className="fish-canvas-placeholder">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[2, 2, 2]} intensity={2} />

          <Suspense fallback={null}>
            <FishModel modelPath={fish.model} />
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