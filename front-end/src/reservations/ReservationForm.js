import FormCancelButton from "../buttons/FormCancelButton";
import FormSubmitButton from "../buttons/FormSubmitButton";

export default function ReservationForm({ handleSubmit, currentReservation }) {
  return (
    <div className="form-container">
      <div className="opacity-layer">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="form-control"
              defaultValue={currentReservation?.first_name}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="form-control"
              placeholder=""
              defaultValue={currentReservation?.last_name}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="mobile_number" className="form-label">
              Mobile Number
            </label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              className="form-control"
              defaultValue={currentReservation?.mobile_number}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="reservation_date" className="form-label">
              Reservation Date
            </label>
            <input
              id="reservation_date"
              name="reservation_date"
              type="date"
              className="form-control"
              defaultValue={currentReservation?.reservation_date}
            />
          </div>
          <div className="form-field">
            <label htmlFor="reservation_time" className="form-label">
              Reservation Time
            </label>
            <input
              id="reservation_time"
              name="reservation_time"
              type="time"
              className="form-control"
              defaultValue={currentReservation?.reservation_time}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="people" className="form-label">
              Group Size
            </label>
            <input
              id="people"
              name="people"
              type="number"
              className="form-control"
              maxLength={2}
              min={1}
              placeholder=""
              defaultValue={currentReservation?.people}
              required
            />
          </div>
          <FormSubmitButton />
          <FormCancelButton />
        </form>
      </div>
    </div>
  );
}
