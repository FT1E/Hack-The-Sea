import FishLabel from './FishLabel'
import './FishCard.css'

export default function FishCard({ fish }) {
  return (
    <div className="fish-card">
      <div className="fish-canvas-placeholder" />
      <FishLabel fish={fish} />
    </div>
  )
}