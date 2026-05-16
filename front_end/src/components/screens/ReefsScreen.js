import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

const fish = [
  { id: 1, name: 'Bloopy', species: 'Coral Drifter' },
  { id: 2, name: 'Finzo', species: 'Bubble Swimmer' },
  { id: 3, name: 'Splashy', species: 'Reef Glider' },
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