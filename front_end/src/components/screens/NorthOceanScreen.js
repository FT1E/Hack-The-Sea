import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

//import conicaltunicate from '../assets/FishModels/conicaltunicate.glb'
//import crnik from '../assets/FishModels/crnik.glb'
//import blackeyedgrandmother from '../assets/FishModels/blackeyedgrandmother.glb'


const fish = [
  { id: 1, name: 'Conical Sea Squirt(Koničasti Plaščar)', species: 'Aplidium conicum', model: '/FishModels/conicaltunicate.glb' },
  { id: 2, name: 'Damselfish(Črnik)', species: ' Mediterranean chromis', model: '/FishModels/crnik.glb' },
  { id: 3, name: 'Longstriped blenny(Črnoboka babica)', species: 'Parablennius rouxi', model: '/FishModels/blackeyedgrandmother.glb' },
]

export default function NorthOceanScreen() {
  const navigate = useNavigate()

  return (
    <div className="region-screen">
      <h1 className="region-title">OBALNI PAS SKAL</h1>

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
          PEŠČENO MORSKI PAS →
        </button>
      </div>
    </div>
  )
}