import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery"
import { Link } from "react-router-dom";
import PreviousDay from "./PreviousDay";
import NextDay from "./NextDay";
import SeatTableButton from "../buttons/SeatTableButton";
import CancelReservationButton from "../buttons/CancelReservationButton";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();
  // rezzies show for different dates
  const date = ( query.get('date') ? query.get("date") : today() )

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //TODO build handleCancel including a window.confirm() prompt
  const handleCancel = (event) => {
    event.preventDefault();
    let confirmed = window.confirm("Do you want to cancel this reservation? This cannot be undone")
    if (confirmed) {
      //TODO throw logic in to axios.put() to change reservation status to "cancelled"
    } 
  }


  //TODO verify if Link tag will work on href test, or if need to use 'a' tag
  //TODO 

  //TODO turn reservationMapper (rename?) into its own component
  //TODO reformat "created_at" and "updated on" data to render more readably; take out the `T`, `Z`, and seconds values
  let reservationList = reservations.map(reservation => (
      <div className="card" key={reservation.reservation_id}>
        <p>Name: {reservation.first_name} {reservation.last_name}</p>
        <p>Mobile number: {reservation.mobile_number}</p>
        <p>Party size: {reservation.people}</p>
        <p>Reservation time: {reservation.reservation_time}</p>
        <p>Created on: {reservation.created_at}</p>
        <p>Last updated on: {reservation.updated_at}</p>
        <Link 
          to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-info mb-2"
        >Edit</Link>
        <CancelReservationButton reservation={reservation} handleCancel={handleCancel}/>
        <SeatTableButton />
      </div>
  ))


  //* buttons below (next, previous) should take you to new URLs; do NOT change the current URL
  return (
    <main>
      <h1>Dashboard</h1>
      <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to={``} className="nav-link">Reservations</Link>
          </li>
          <li className="nav-item">
            <Link to={``} className="nav-link">Tables</Link>
          </li>
        </ul>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date === today() ? "Today" : date}</h4>
        <div>{reservationList}</div>
      </div>
      <ErrorAlert error={reservationsError} />
      <PreviousDay />
      <NextDay />
    </main>
  );
}

export default Dashboard;
