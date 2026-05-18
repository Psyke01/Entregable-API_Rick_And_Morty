import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './FilterBySpecies.css'
import CardCharacter from '../../components/CardCharacter/CardCharacter.jsx'

const FilterBySpecies = () => {
  const { species } = useParams()
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    
    let cancelled = false

    const fetchAllAndFilter = async () => {
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

        const result = allCharacters.filter(
          character => character.species.toLowerCase() === species.toLowerCase()
        )

        
        if (!cancelled) {
          setFiltered(result)
          setError(null)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchAllAndFilter()

    return () => {
      cancelled = true
    }
  }, [species])

  if (loading) return <p className="loadingMessage">Cargando personajes...</p>
  if (error) return <p className="errorMessage">Error: {error}</p>

  return (
    <div className="filterPage">
      <h2 className="filterTitle">
        Especie: <span>{species}</span> — {filtered.length} personaje(s)
      </h2>
      {filtered.length === 0 ? (
        <p className="loadingMessage">No se encontraron personajes de esta especie.</p>
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

export default FilterBySpecies