import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import glumboModel from '../assets/FishModels/Crnik.glb'
import zappyModel from '../assets/FishModels/FlatHead.glb'
import murkletModel from '../assets/FishModels/GentleHuntress.glb'

const fish = [
  { id: 1, name: 'Bloopy', species: 'Coral Drifter', model: glumboModel },
  { id: 2, name: 'Finzo', species: 'Bubble Swimmer', model: zappyModel },
  { id: 3, name: 'Splashy', species: 'Reef Glider', model: murkletModel },
]

export default function ReefScreen() {
  const navigate = useNavigate()

  return (
    <div className="region-screen">
      <h1 className="region-title">The Reefs</h1>

      <div className="fish-grid">
        {fish.map((f) => (
          <FishCard key={f.id} fish={f} />
        ))}
      </div>

      <div className="pagination">
        <button className="nav-btn" onClick={() => navigate('/')}>
          ← Back to Map
        </button>
        <button className="nav-btn" onClick={() => navigate('/trench')}>
          Deep Trench →
        </button>
      </div>
    </div>
  )
}