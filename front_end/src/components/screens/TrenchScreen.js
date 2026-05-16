import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'


const fish = [
  {
    id: 1,
    name: 'Striped Croaker(Progasti Gruntar)',
    species: 'Sciaenidae',
    model: '/FishModels/stripedcroaker.glb',
    slug: 'stripedcroaker',
  },
  {
    id: 2,
    name: 'Modrak (Modrak)',
    species: 'Sparidae',
    model: '/FishModels/modrak.glb',
    slug: 'modrak',
  },
  {
    id: 3,
    name: 'Gentle Huntress (Nežna Lovka)',
    species: 'Scorpaenidae',
    model: '/FishModels/gentlehuntress.glb',
    slug: 'gentlehuntress',
  },
]

export default function TrenchScreen() {
  const navigate = useNavigate()
  return (
    <div className="region-screen">
      <h1 className="region-title">The Deep Trench</h1>
      <div className="fish-grid">
        {fish.map((f) => <FishCard key={f.id} fish={f} />)}
      </div>
      <div className="pagination">
        <button className="nav-btn" onClick={() => navigate('/')}>← Back to Map</button>
        <button className="nav-btn" onClick={() => navigate('/north-ocean')}>North Ocean →</button>
      </div>
    </div>
  )
}