import './FishLabel.css'

export default function FishLabel({ fish }) {
  return (
    <div className="fish-label">
      <p className="fish-name">
        {fish?.name ?? 'Fish Name'}
      </p>

      <p className="fish-latin-name">
        {fish?.species ?? 'Species Name'}
      </p>
    </div>
  )
}