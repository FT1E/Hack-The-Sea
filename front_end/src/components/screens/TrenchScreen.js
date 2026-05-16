import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import stripedcroaker from '../assets/FishModels/stripedcroaker.glb'
import modrak from '../assets/FishModels/modrak.glb'
import gentlehuntress from '../assets/FishModels/gentlehuntress.glb'

 
 

const fish = [
  {
    id: 1,
    name: 'Striped Croaker(Progasti Gruntar)',
    species: 'Sciaenidae',
    model: stripedcroaker,
  },
  {
    id: 2,
    name: 'Modrak (Modrak)',
    species: 'Sparidae',
    model: modrak,
  },
  {
    id: 3,
    name: 'Gentle Huntress (Nežna Lovka)',
    species: 'Scorpaenidae',
    model: gentlehuntress,
  },
]

export default function TrenchScreen() {
  const navigate = useNavigate()

  return (
    <div className="region-screen">
      <h1 className="region-title">ODPRTO OBALNO MORJE</h1>

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
          OBALNI PAS SKAL →
        </button>
      </div>
    </div>
  )
}