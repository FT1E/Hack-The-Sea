import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

//import flatHead from '../assets/FishModels/flathead.glb'
//import commoncuttlefish from '../assets/FishModels/commoncuttlefish.glb'
//import pisanica from '../assets/FishModels/pisanica.glb'



const fish = [
  { id: 1, name: 'Flat Head (Ploščata Glava)', species: 'Triglidae', model: '/FishModels/flathead.glb' },
  { id: 2, name: 'Common Cuttle Fish(Navadna Sipa)', species: 'Sepia officinalis', model: '/FishModels/commoncuttlefish.glb' },
  { id: 3, name: 'Pisanica(pisanica)', species: 'Labridae', model: '/FishModels/pisanica.glb' },
]

export default function ReefScreen() {
  const navigate = useNavigate()

  return (
    <div className="region-screen">
      <h1 className="region-title">PEŠČENO MORSKI PAS</h1>

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
          ODPRTO OBALNO MORJE →
        </button>
      </div>
    </div>
  )
}