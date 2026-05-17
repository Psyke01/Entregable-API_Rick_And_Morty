const CardCharacter = ({ name, image, species, status, gender }) => {
  const statusClass =
    status === 'Alive' ? 'alive' :
    status === 'Dead' ? 'dead' : 'unknown'

  return (
    <div className="card">
      <div className="cardImageWrapper">
        <img src={image} alt={name} className="cardImage" />
        <div className="cardGradientOverlay" />
        <span className={`cardStatusBadge ${statusClass}`}>{status}</span>
      </div>
      <div className="cardContent">
        <h3 className="cardName">{name}</h3>
        <div className="cardInfo">
          <span className="cardInfoItem">{species}</span>
          <span className="cardInfoDot">·</span>
          <span className="cardInfoItem">{gender}</span>
        </div>
      </div>
    </div>
  )
}

export default CardCharacter