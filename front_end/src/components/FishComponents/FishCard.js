import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
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
  return (
    <div className="fish-card">
      <div className="fish-canvas-placeholder">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[2, 2, 2]} intensity={2} />

          <FishModel modelPath={fish.model} />

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