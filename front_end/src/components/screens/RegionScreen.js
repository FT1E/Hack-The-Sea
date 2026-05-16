import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard'
import './RegionScreen.css'

export default function RegionScreen({ title, fish, nextRoute }) {
  const navigate = useNavigate()
  return (
    <div className="region-screen">
      <h1 className="region-title">{title}</h1>
      <div className="fish-grid">
        {fish.map((f) => <FishCard key={f.id} fish={f} />)}
      </div>
      <div className="pagination">
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