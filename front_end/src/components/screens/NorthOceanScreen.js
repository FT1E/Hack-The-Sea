import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

const fish = [
  { id: 1, name: 'Frostie', species: 'Cold Water Drifter', slug: 'modrak', model: '/FishModels/modrak.glb' },
  { id: 2, name: 'Blubb', species: 'Arctic Glider', slug: 'pisanica', model: '/FishModels/pisanica.glb' },
  { id: 3, name: 'Chillo', species: 'North Current Rider', slug: 'stripedcroaker', model: '/FishModels/stripedcroaker.glb' },
]

export default function NorthOceanScreen() {
  const navigate = useNavigate()
  return (
    <div className="region-screen">
      <h1 className="region-title">North Ocean</h1>
      <div className="fish-grid">
        {fish.map((f) => <FishCard key={f.id} fish={f} />)}
      </div>
      <div className="pagination">
        <button className="nav-btn" onClick={() => navigate('/')}>← Back to Map</button>
        <button className="nav-btn" onClick={() => navigate('/reefs')}>The Reefs →</button>
      </div>
    </div>
  )
}