import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

import flatHead from '../assets/FishModels/flathead.glb'
import commoncuttlefish from '../assets/FishModels/commoncuttlefish.glb'
import pisanica from '../assets/FishModels/pisanica.glb'



const fish = [
  { id: 1, name: 'Bloopy', species: 'Coral Drifter', slug: 'crnik', model: '/FishModels/crnik.glb' },
  { id: 2, name: 'Finzo', species: 'Bubble Swimmer', slug: 'flathead', model: '/FishModels/flathead.glb' },
  { id: 3, name: 'Splashy', species: 'Reef Glider', slug: 'gentlehuntress', model: '/FishModels/gentlehuntress.glb' },
]

export default function ReefsScreen() {
  const navigate = useNavigate()
  return (
    <div className="region-screen">
      <h1 className="region-title">PEŠČENO MORSKI PAS</h1>
      <div className="fish-grid">
        {fish.map((f) => <FishCard key={f.id} fish={f} />)}
      </div>
      <div className="pagination">
        <button className="nav-btn" onClick={() => navigate('/')}>← Back to Map</button>
        <button className="nav-btn" onClick={() => navigate('/trench')}>Deep Trench →</button>
      </div>
    </div>
  )
}