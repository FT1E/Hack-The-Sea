import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import glumboModel from '../assets/FishModels/BlackEyedGrandmother.glb'
import zappyModel from '../assets/FishModels/CommonCuttleFish.glb'
import murkletModel from '../assets/FishModels/ConicalTunicate.glb'

const fish = [
  {
    id: 1,
    name: 'Glumbo',
    species: 'Deep Sea Floater',
    model: glumboModel,
  },
  {
    id: 2,
    name: 'Zappy',
    species: 'Shadow Swimmer',
    model: zappyModel,
  },
  {
    id: 3,
    name: 'Murklet',
    species: 'Cave Glider',
    model: murkletModel,
  },
]

export default function TrenchScreen() {
  const navigate = useNavigate()

  return (
    <div className="region-screen">
      <h1 className="region-title">The Deep Trench</h1>

      <div className="fish-grid">
        {fish.map((f) => (
          <FishCard key={f.id} fish={f} />
        ))}
      </div>

      <div className="pagination">
        <button className="nav-btn" onClick={() => navigate('/')}>
          ← Back to Map
        </button>

        <button className="nav-btn" onClick={() => navigate('/north-ocean')}>
          North Ocean →
        </button>
      </div>
    </div>
  )
}