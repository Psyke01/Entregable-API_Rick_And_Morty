import './Error.css'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="errorPage">
      <h1 className="errorCode">404</h1>
      <h2 className="errorTitle">Página no encontrada</h2>
      <p className="errorDescription">
        La ruta que intentas visitar no existe en este universo.
      </p>
      <Link to="/" className="errorHomeLink">Volver al inicio</Link>
    </div>
  )
}

export default Error