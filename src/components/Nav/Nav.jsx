import './Nav.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SPECIES = ['Human', 'Alien', 'Robot', 'Mythological Creature', 'Animal', 'Humanoid']

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim() === '') return
    navigate(`/search/${encodeURIComponent(searchTerm.trim())}`)
    setSearchTerm('')
  }

  return (
    <nav>
      <ul className="navList">
        <li>
          <Link to="/" className="navLink">Inicio</Link>
        </li>
        <li>
          <Link to="/characters" className="navLink">Personajes</Link>
        </li>
        <li className="dropdownContainer">
          <span className="dropdownLabel">Especies ▾</span>
          <ul className="dropdownMenu">
            {SPECIES.map(species => (
              <li key={species}>
                <Link to={`/filter/${species}`}>{species}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="searchItem">
          <form onSubmit={handleSearch} className="searchForm">
            <input
              type="text"
              placeholder="Buscar personaje..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="navSearchInput"
            />
            <button type="submit" className="navSearchButton">Buscar</button>
          </form>
        </li>
      </ul>
    </nav>
  )
}

export default Nav