import { useState } from "react";
import ReservationList from "../reservations/ReservationList";
import { listReservations } from "../utils/api";

export default function Search() {
    const [reservations, setReservations] = useState([]);

    const handleFind = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const searchData = { mobile_number: formData.get("mobile_number") }
        const abortController = new AbortController(); 
        let reservationsData = await listReservations(searchData, abortController.signal)
        setReservations(reservationsData)
    }

    return (
        <>
        <form onSubmit={handleFind}>
            <label htmlFor="mobile_number">Mobile Number</label>
            <input 
                name="mobile_number" 
                id="mobile_number"
                type="text"
                className="form-control" 
                placeholder="Enter a customer's phone number"
                required
                />
            <button type="submit">
                Find
            </button>
        </form>

        <hr />
        <h3>Reservations found:</h3>
        { reservations.length 
            ? <ReservationList reservations={reservations} />
            : "No reservations found"
        }
        </>
    )

}