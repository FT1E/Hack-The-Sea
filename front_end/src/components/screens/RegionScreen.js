import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'
import { slugMap } from '../assets/modelMap'

export default function RegionScreen({ title, fish, nextRoute }) {
  const navigate = useNavigate()
  const randomIndex = Math.floor(Math.random() * slugMap.length)
  const keys = Object.keys(slugMap)
  const randomFish = slugMap[keys[randomIndex]]
  return (
    <div className="region-screen">
      <h1 className="region-title">{title}</h1>
      <div className="fish-grid">
        {fish.map((f) => <FishCard key={f.id} fish={f} />)}
      </div>
      <div className="pagination">

          {/* ── Draw the Fish button ── */}
      <button
        className="draw-btn"
        onClick={() => navigate(`/draw?fish=${randomFish}`)}
      >
        🎨 Draw the Fish!
      </button>


        {
          <button className="nav-btn" onClick={() => navigate('/')}>
            ← {'Back to map'}
          </button>
        }
        {nextRoute && (
          <button className="nav-btn" onClick={() => navigate(nextRoute)}>
            {'Next Region'} →
          </button>
        )}
      </div>
    </div>
  )
}