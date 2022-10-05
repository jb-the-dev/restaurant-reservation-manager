import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { businessHoursValidator, futureTimeValidator, notTuesdayValidator } from "../utils/reservationValidators";
import { useState } from "react";

export default function CreateReservation() {
  const [tuesdayError, setTuesdayError] = useState(null);
  const [businessHoursError, setBusinessHoursError] = useState(null);
  const [futureTimeError, setFutureTimeError] = useState(null);

  const history = useHistory();
  
  //TODO refactor dateValidator(lines 32-55) into utils folder; be mindful of state mgmt; removes it from EditReservation as well!

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newReservation = {
      data: {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        mobile_number: formData.get("mobile_number"),
        reservation_date: formData.get("reservation_date"),
        reservation_time: formData.get("reservation_time"),
        people: Number(formData.get("people")),
      },
    };
    
    let isFutureTime = futureTimeValidator(newReservation.data.reservation_date, newReservation.data.reservation_time)
    let isDuringBusinessHours = businessHoursValidator(newReservation.data.reservation_time)
    let isTuesday = notTuesdayValidator(newReservation.data.reservation_date)

    if (!isFutureTime) {
      setFutureTimeError(new Error("Sorry, the reservation date and time must be in the future."))
    }
    else setFutureTimeError(null)

    if (!isDuringBusinessHours) {
      setBusinessHoursError(new Error("Sorry, reservations can only be made between the hours of 10:30am to 9:30pm."))
    }
    else setBusinessHoursError(null)

    if (isTuesday) {
      setTuesdayError(new Error("Sorry, no reservations can be made on Tuesdays. The restaurant is closed."))
    }
    else setTuesdayError(null)

    if (isFutureTime && isDuringBusinessHours && !isTuesday){
      console.log("newRes", newReservation)
      await createReservation(newReservation);
      history.push(`/dashboard?date=${formData.get("reservation_date")}`);
    }

  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <h2 className="mb-4">Create new reservation</h2>

      {futureTimeError && <ErrorAlert error={futureTimeError} />}
      {tuesdayError && <ErrorAlert error={tuesdayError} />}
      {businessHoursError && <ErrorAlert error={businessHoursError} />}
      
      <ReservationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
}
