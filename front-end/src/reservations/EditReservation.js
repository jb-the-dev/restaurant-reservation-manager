import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate, formatAsTime } from "../utils/date-time";
import reservationValidator from "../utils/reservationValidator";
import ReservationForm from "./ReservationForm";

export default function EditReservation() {
  const [currentReservation, setCurrentReservation] = useState();
  const [tuesdayError, setTuesdayError] = useState(null);
  const [businessHoursError, setBusinessHoursError] = useState(null);
  const [futureTimeError, setFutureTimeError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchReservation() {
      let fetchedData = await readReservation(reservation_id, {
        signal: controller.signal,
      });
      let shortFetch = fetchedData.data.data;
      shortFetch.reservation_date = formatAsDate(shortFetch.reservation_date);
      shortFetch.reservation_time = formatAsTime(shortFetch.reservation_time);
      setCurrentReservation(shortFetch);
    }

    fetchReservation();
    return () => controller.abort();
  }, [reservation_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const updatedReservation = {
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
      updatedReservation.data.reservation_date,
      updatedReservation.data.reservation_time,
      setFutureTimeError,
      setBusinessHoursError,
      setTuesdayError
    );

    if (isValidReservation) {
      const controller = new AbortController();
      await updateReservation(reservation_id, updatedReservation, {
        signal: controller.signal,
      });
      history.push(`/dashboard?date=${formData.get("reservation_date")}`);
      return () => controller.abort();
    }
  };

  return (
    <div className="fade-background">
      <h1>Edit the reservation</h1>
      <br />

      {futureTimeError && <ErrorAlert error={futureTimeError} />}
      {tuesdayError && <ErrorAlert error={tuesdayError} />}
      {businessHoursError && <ErrorAlert error={businessHoursError} />}

      <ReservationForm
        handleSubmit={handleSubmit}
        currentReservation={currentReservation}
      />
    </div>
  );
}
