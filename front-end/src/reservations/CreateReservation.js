import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useState } from "react";
import { DateTime } from "luxon";

export default function CreateReservation() {
  const [dateError, setDateError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const history = useHistory();

  //TODO refactor dateValidator into utils folder; be mindful of state mgmt
  function dateValidator(date) {
    let errors = [];
    
    try {
      if (date < DateTime.now()) {
        console.log("DATE INPUT", date)
        console.log("DATE OBJ", DateTime.local())
        errors.push(
          "Sorry, but we cannot accept reservations for any time earlier than today. You may be able to time travel, but none of our staff can."
        );
      }
      if (date.toFormat("ccc") === "Tue") {
        errors.push(
          "No reservations can be made on Tuesdays. Our restaurant is closed."
        );
      }
      if (errors.length !== 0) throw new Error(errors.join(" AND "));
      return true;
    } catch (error) {
      setDateError(error);
      return false;
    }
  }

  function timeValidator(time) {
    let errors = [];

    const openingTime = DateTime.fromISO("10:30");
    const closingTime = DateTime.fromISO("21:30");

    try {
      if (time < openingTime) {
        errors.push("Reservations cannot be made before 10:30 AM.");
      }
      if (time > closingTime) {
        errors.push("Reservations cannot be made after 9:30 PM.");
      }
      if (errors.length !== 0) throw new Error(errors.join(" AND "));

      return true;
    } catch (error) {
      setTimeError(error);
      return false;
    }
  }

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
    const date = DateTime.fromISO(
      `${newReservation.data.reservation_date}T${newReservation.data.reservation_time}`
    ); // .replaceAll, otherwise Date object moves to day previous of inputted
    const time = DateTime.fromISO(newReservation.data.reservation_time);

    let isValidTime = timeValidator(time);
    let isValidDate = dateValidator(date);

    if (isValidDate && isValidTime) {
      await createReservation(newReservation);
      history.push(`/dashboard?date=${formData.get("reservation_date")}`);
    }

    //? will we need to make this handleSubmit work to also update existing reservations?
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <h2 className="mb-4">Create new reservation</h2>
      {(dateError || timeError) && (
        <ErrorAlert error={dateError || timeError} />
      )}
      <ReservationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        // reservationData={reservationInfo}
      />
    </>
  );
}
