import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom"
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useState } from "react";

export default function CreateReservation() {
    const [dateError, setDateError] = useState(null);
    const history = useHistory();
    
    function dateValidator(date) {
        try {
            if ( date < new Date() ) {
                throw new Error("Sorry, but we cannot accept reservations for any time earlier than today. You may be able to time travel, but none of our staff can.")
            }
            if (date.getDay() === 2 ) {
                throw new Error("No reservations can be made on Tuesdays. Our restaurant is closed.");
            }
            return true

        } catch (error) {
            setDateError(error)
            return false
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form)
        const newReservation = {
            data: {
                first_name: formData.get("first_name"),
                last_name: formData.get("last_name"),
                mobile_number: formData.get("mobile_number"),
                reservation_date: formData.get("reservation_date"),
                reservation_time: formData.get("reservation_time"),
                people: Number(formData.get("people")),
            }
        }
        const date = new Date(newReservation.data.reservation_date.replaceAll("-", "/")) // .replaceAll, otherwise Date object moves to day previous of inputted

        let isValid = dateValidator(date)

        if (isValid){
            await createReservation(newReservation)
            history.push(`/dashboard?date=${formData.get("reservation_date")}`)
        }
        
        //? will we need to make this conditional to update existing reservations?
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <>
            {dateError && <ErrorAlert error={dateError}/>}
            <ReservationForm 
                handleSubmit={handleSubmit} 
                handleCancel={handleCancel}
                // reservationData={reservationInfo}
                />
        </>
    )
}