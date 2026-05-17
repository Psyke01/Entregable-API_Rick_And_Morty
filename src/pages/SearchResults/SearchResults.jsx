import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './SearchResults.css'
import CardCharacter from '../../components/CardCharacter/CardCharacter.jsx'

const SearchResults = () => {
  const { query } = useParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchAllAndSearch = async () => {
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
        const allCharacters = allPages.flatMap(page => page.results)

        const filtered = allCharacters.filter(character =>
          character.name.toLowerCase().includes(query.toLowerCase())
        )

        if (!cancelled) {
          setResults(filtered)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchAllAndSearch()
    return () => { cancelled = true }
  }, [query])

  if (loading) return <p className="loadingMessage">Buscando "{query}"...</p>
  if (error) return <p className="errorMessage">Error: {error}</p>

  return (
    <div className="searchResultsPage">
      <div className="searchResultsHeader">
        <h2>Resultados para: <span>"{query}"</span></h2>
        <p>{results.length} personaje{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</p>
      </div>

      {results.length === 0 ? (
        <div className="noResults">
          <p className="noResultsText">No se encontró ningún personaje llamado "{query}"</p>
          <Link to="/characters" className="noResultsLink">Ver todos los personajes</Link>
        </div>
      ) : (
        <div className="containerPage">
          {results.map(character => (
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

export default SearchResults