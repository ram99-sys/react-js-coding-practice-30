import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import {Component} from 'react'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isFiltered: false,
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onClickStaredButton = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  activateStar = id => {
    // console.log(id)
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStared: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredList = () => {
    const {appointmentsList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFiltered} = this.state
    const filterClassName = isFiltered ? 'apply-bg-color' : 'apply-none'
    const filteredAppointmentsList = this.getFilteredList()
    return (
      <div className="app-container">
        <div className="appointments-app-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <div className="form-image-container">
            <div className="form-container">
              <form className="form" onSubmit={this.addAppointment}>
                <label htmlFor="text-field" className="title">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="text-field"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                  value={title}
                  className="title-field"
                />
                <br />
                <label htmlFor="date" className="date-label">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  className="date-field"
                  onChange={this.onChangeDateInput}
                  value={date}
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`stared-button ${filterClassName}`}
              onClick={this.onClickStaredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list-container">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                activateStar={this.activateStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
