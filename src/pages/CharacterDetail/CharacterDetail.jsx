import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CharacterDetail.css'

const CharacterDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchAllAndFind = async () => {
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

        const found = allCharacters.find(c => c.id === parseInt(id))

        if (!cancelled) {
          if (found) {
            setCharacter(found)
          } else {
            setError('Personaje no encontrado')
          }
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchAllAndFind()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <p className="loadingMessage">Cargando detalle...</p>
  if (error) return <p className="errorMessage">Error: {error}</p>

  const statusClass =
    character.status === 'Alive' ? 'alive' :
    character.status === 'Dead' ? 'dead' : 'unknown'

  return (
    <div className="detailPage">
      <div className="detailCard">
        <img src={character.image} alt={character.name} className="detailImage" />
        <div className="detailInfo">
          <h1 className="detailName">{character.name}</h1>
          <div className="detailBadge">
            <span className={`statusDot ${statusClass}`}></span>
            {character.status}
          </div>
          <hr className="detailDivider" />
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          <p><strong>Origen:</strong> {character.origin.name}</p>
          <p><strong>Última ubicación:</strong> {character.location.name}</p>
          <p><strong>Episodios:</strong> {character.episode.length}</p>
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail