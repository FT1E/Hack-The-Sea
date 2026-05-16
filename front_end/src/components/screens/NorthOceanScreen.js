import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import modrakModel from '../assets/FishModels/modrak.glb'
import pisanicaModel from '../assets/FishModels/pisanica.glb'
import stripedcroakerModel from '../assets/FishModels/stripedcroaker.glb'

const fish = [
  { id: 1, name: 'Frostie', species: 'Cold Water Drifter', model: modrakModel },
  { id: 2, name: 'Blubb', species: 'Arctic Glider', model: pisanicaModel },
  { id: 3, name: 'Chillo', species: 'North Current Rider', model: stripedcroakerModel },
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