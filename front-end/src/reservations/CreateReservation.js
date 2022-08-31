import axios from "axios";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom"

export default function CreateReservation() {

    const history = useHistory();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form)
        const newReservation = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            mobile_number: formData.get("mobile_number"),
            reservation_date: formData.get("reservation_date"),
            reservation_time: formData.get("reservation_time"),
            people: formData.get("people"),
        }
        console.log("new REZZIE", newReservation)

        await axios.post("/reservations", newReservation)

        history.push(`/dashboard?date=${formData.get("reservation_date")}`)
        
        //? will we need to make this conditional to update existing reservations?
    }

    return (
        <ReservationForm handleSubmit={handleSubmit}/>
    )
}