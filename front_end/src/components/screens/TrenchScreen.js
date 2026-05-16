import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import blackeyedgrandmotherModel from '../assets/FishModels/blackeyedgrandmother.glb'
import commoncuttlefishModel from '../assets/FishModels/commoncuttlefish.glb'
import conicaltunicateModel from '../assets/FishModels/conicaltunicate.glb'

const fish = [
  {
    id: 1,
    name: 'Glumbo',
    species: 'Deep Sea Floater',
    model: blackeyedgrandmotherModel,
  },
  {
    id: 2,
    name: 'Zappy',
    species: 'Shadow Swimmer',
    model: commoncuttlefishModel,
  },
  {
    id: 3,
    name: 'Murklet',
    species: 'Cave Glider',
    model: conicaltunicateModel,
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