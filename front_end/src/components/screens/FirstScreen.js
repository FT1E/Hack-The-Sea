import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FishCard from '../FishComponents/FishCard';
import './RegionScreen.css'

const reefFish = [
  { id: 1, name: 'Bloopy', species: 'Coral Drifter' },
  { id: 2, name: 'Finzo', species: 'Bubble Swimmer' },
  { id: 3, name: 'Splashy', species: 'Reef Glider' },
  { id: 4, name: 'Coraly', species: 'Reef Dancer' },
  { id: 5, name: 'Wavo', species: 'Shallow Glider' },
  { id: 6, name: 'Pinky', species: 'Coral Lurker' },
]

export default function FirstScreen() {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const fishPerPage = 3
  const totalPages = Math.ceil(reefFish.length / fishPerPage)
  const currentFish = reefFish.slice(page * fishPerPage, page * fishPerPage + fishPerPage)

  return (
    <div className="region-screen">
      <h1 className="region-title">The Reefs</h1>

      <div className="fish-grid">
        {currentFish.map((fish) => (
          <FishCard key={fish.id} fish={fish} />
        ))}
      </div>

      <div className="pagination">
        <button
          className="nav-btn"
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0}
        >
          ← Back
        </button>

        <span className="page-indicator">
          {page + 1} / {totalPages}
        </span>

        {page < totalPages - 1 ? (
          <button
            className="nav-btn"
            onClick={() => setPage(p => p + 1)}
          >
            Next →
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={() => navigate('/trench')}
          >
            Next Region →
          </button>
        )}
      </div>
    </div>
  )
}