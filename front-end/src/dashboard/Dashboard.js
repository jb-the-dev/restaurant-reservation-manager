import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery"

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
    listReservations({ date }, abortController.signal) //takes "date" from `today()` in date-time.js
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  //TODO sort list of reservations from earliest time to latest, then map;

  //TODO turn reservationMapper (rename?) into its own component
  let reservationList = reservations.map(reservation => (
      <div className="card">
        <p>Name: {reservation.first_name} {reservation.last_name}</p>
        <p>Mobile number: {reservation.mobile_number}</p>
        <p>Party size: {reservation.people}</p>
        <p>Reservation time: {reservation.reservation_time}</p>
        <p>Created on: {reservation.created_at}</p>
        <p>Last updated on: {reservation.updated_at}</p>
      </div>
  ))


  //buttons below (next, previous) should take you to new URLs; do NOT change the current URL
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date === today() ? "Today" : date}</h4>
        <div>{reservationList}</div>
      </div>
      <ErrorAlert error={reservationsError} />
      <button 
        className="btn btn-secondary"
        // onClick={}
      >Previous Day</button>
      <button 
        className="btn btn-primary"
        // onClick={}
      >Next Day</button>
    </main>
  );
}

export default Dashboard;
