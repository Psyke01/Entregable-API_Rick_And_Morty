import { useState, useEffect } from 'react'
import './Characters.css'
import CardCharacter from '../../components/CardCharacter/CardCharacter.jsx'
import { Link } from 'react-router-dom'

const Characters = () => {
  const [allCharacters, setAllCharacters] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const firstResponse = await fetch('https://rickandmortyapi.com/api/character')
        if (!firstResponse.ok) throw new Error('Error al obtener personajes')

        const firstData = await firstResponse.json()
        const totalPages = firstData.info.pages

        const pagePromises = []
        for (let i = 1; i <= totalPages; i++) {
          pagePromises.push(
            fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
              .then(res => res.json())
          )
        }

        const allPages = await Promise.all(pagePromises)
        const allChars = allPages.flatMap(page => page.results)

        setAllCharacters(allChars)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  
  const filtered = allCharacters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <p className="loadingMessage">Cargando personajes...</p>
  if (error) return <p className="errorMessage">Error: {error}</p>

  return (
    <div className="charactersPage">
      <div className="searchContainer">
        <div className="searchWrapper">
          <span className="searchIcon">🔍</span>
          <input
            type="text"
            placeholder="Buscar personaje por nombre..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="searchInput"
          />
          {searchTerm && (
            <button className="clearButton" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <p className="resultsCount">
          {filtered.length} personaje{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="loadingMessage">No se encontraron personajes con ese nombre.</p>
      ) : (
        <div className="containerPage">
          {filtered.map(character => (
            <Link
              key={character.id}
              to={`/characters/${character.id}`}
              style={{ textDecoration: 'none' }}
            >
              <CardCharacter
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                gender={character.gender}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Characters