import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery"
import PreviousDay from "./PreviousDay";
import NextDay from "./NextDay";
import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();

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

  //TODO reformat "created_at" and "updated on" data to render more readably; take out the `T`, `Z`, and seconds values



  //* buttons below (next, previous) should take you to new URLs; do NOT change the current URL
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date === today() ? "Today" : date}</h4>
      </div>
      <ReservationList reservations={reservations} handleCancel={handleCancel}/>
      <TableList />
      <ErrorAlert error={reservationsError} />
      <PreviousDay />
      <NextDay />

    </main>
  );
}

export default Dashboard;
