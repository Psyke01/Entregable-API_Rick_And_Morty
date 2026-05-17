import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="homePage">
      <div className="homeContent">
        <span className="homeBadge">Universo Rick &amp; Morty</span>
        <h1>Explora el <span>Multiverso</span></h1>
        <p>
          Más de 800 personajes de todas las dimensiones y realidades.
          Descubre cada rincón del universo de Rick and Morty.
        </p>
        <div className="homeStats">
          <div className="statItem">
            <span className="statNumber">800+</span>
            <span className="statLabel">Personajes</span>
          </div>
          <div className="statItem">
            <span className="statNumber">50+</span>
            <span className="statLabel">Especies</span>
          </div>
          <div className="statItem">
            <span className="statNumber">∞</span>
            <span className="statLabel">Dimensiones</span>
          </div>
        </div>
        <div className="homeButtons">
          <Link to="/characters" className="homeBtn primary">
            Ver todos los personajes
          </Link>
          <Link to="/filter/Human" className="homeBtn secondary">
            Explorar por especie
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home