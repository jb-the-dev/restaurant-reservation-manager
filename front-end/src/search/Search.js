import { useState } from "react";
import ReservationList from "../reservations/ReservationList";
import { listReservations } from "../utils/api";

export default function Search() {
  const [reservations, setReservations] = useState([]);

  const handleFind = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const searchData = { mobile_number: formData.get("mobile_number") };
    const abortController = new AbortController();
    let reservationsData = await listReservations(
      searchData,
      abortController.signal
    );
    setReservations(reservationsData);
  };

  return (
    <div>
      <h2 className="title-layer">Phone Number Lookup</h2>

      <div className="container">
        <form onSubmit={handleFind} className="opacity-layer">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            name="mobile_number"
            id="mobile_number"
            type="text"
            className="form-control"
            placeholder="Enter a customer's phone number"
            required
          />
          <button type="submit" className="btn btn-info m-2">
            Find
          </button>
        </form>
      </div>

      <hr />
      <h3 className="title-layer">Matching reservations</h3>
      {reservations.length ? (
        <ReservationList reservations={reservations} />
      ) : (
        <div className="opacity-layer">No reservations found</div>
      )}
    </div>
  );
}
