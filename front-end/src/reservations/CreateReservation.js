import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useState } from "react";
import reservationValidator from "../utils/reservationValidator";

export default function CreateReservation() {
  const [tuesdayError, setTuesdayError] = useState(null);
  const [businessHoursError, setBusinessHoursError] = useState(null);
  const [futureTimeError, setFutureTimeError] = useState(null);

  const history = useHistory();

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

    let isValidReservation = reservationValidator(
      newReservation.data.reservation_date,
      newReservation.data.reservation_time,
      setFutureTimeError,
      setBusinessHoursError,
      setTuesdayError
    );
    if (isValidReservation) {
      const controller = new AbortController();
      await createReservation(newReservation, { signal: controller.signal });
      history.push(`/dashboard?date=${formData.get("reservation_date")}`);
      return () => controller.abort();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div className="fade-background">
      <h1 className="mb-4 text-center title-layer">Create new reservation</h1>

      {futureTimeError && <ErrorAlert error={futureTimeError} />}
      {tuesdayError && <ErrorAlert error={tuesdayError} />}
      {businessHoursError && <ErrorAlert error={businessHoursError} />}

      <ReservationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
}
