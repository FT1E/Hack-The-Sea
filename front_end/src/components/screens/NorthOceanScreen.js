import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import glumboModel from '../assets/FishModels/Modrak.glb'
import zappyModel from '../assets/FishModels/Pisanica.glb'
import murkletModel from '../assets/FishModels/StripedCroaker.glb'

const fish = [
  { id: 1, name: 'Frostie', species: 'Cold Water Drifter', model: glumboModel },
  { id: 2, name: 'Blubb', species: 'Arctic Glider', model: zappyModel },
  { id: 3, name: 'Chillo', species: 'North Current Rider', model: murkletModel },
]

export default function NorthOceanScreen() {
  const navigate = useNavigate()

  return (
    <div className="region-screen">
      <h1 className="region-title">North Ocean</h1>

      <div className="fish-grid">
        {fish.map((f) => (
          <FishCard key={f.id} fish={f} />
        ))}
      </div>

      <div className="pagination">
        <button className="nav-btn" onClick={() => navigate('/')}>
          ← Back to Map
        </button>
        <button className="nav-btn" onClick={() => navigate('/reefs')}>
          The Reefs →
        </button>
      </div>
    </div>
  )
}