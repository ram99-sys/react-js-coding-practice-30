import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, activateStar} = props
  const {title, date, id, isStared} = appointmentDetails

  const onClickStarButton = () => {
    activateStar(id)
  }

  const toggleStar = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-list-item">
      <div className="star-container">
        <p className="appointment-name">{title}</p>
        <button
          type="button"
          onClick={onClickStarButton}
          className="star"
          testid="star"
        >
          <img src={toggleStar} alt="star" />
        </button>
      </div>
      <p className="posted-date">{date}</p>
    </li>
  )
}

export default AppointmentItem
