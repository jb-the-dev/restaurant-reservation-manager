import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import PreviousDayButton from "../buttons/PreviousDayButton";
import NextDayButton from "../buttons/NextDayButton";
import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";
import "./Dashboard.css";
import TodayButton from "../buttons/TodayButton";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();

  const date = query.get("date") ? query.get("date") : today();

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

  return (
    <main className="dashboard-container">
      <div className="d-md-flex title-layer">
        <h3>Reservations for {date === today() ? "Today" : date}</h3>
      </div>

      <div className="d-md-flex mx-2 my-4">
        <ReservationList
          reservations={reservations}
          setReservations={setReservations}
        />
      </div>

      <div className="opacity-layer">
        <PreviousDayButton date={date} />
        <TodayButton />
        <NextDayButton date={date} />
      </div>

      <TableList />

      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
