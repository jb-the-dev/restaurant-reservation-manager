import CancelReservationButton from "../buttons/CancelReservationButton";
import EditReservationButton from "../buttons/EditReservationButton";
import SeatTableButton from "../buttons/SeatTableButton";

export default function ReservationItem({
  reservation,
  handleCancel,
  handleSeat,
}) {
  return (
    <div className="card opacity-layer m-2" key={reservation.reservation_id}>
      <p className="form-field">
        Name: {reservation.first_name} {reservation.last_name}
      </p>
      <p className="form-field">Mobile number: {reservation.mobile_number}</p>
      <p className="form-field">Party size: {reservation.people}</p>
      <p className="form-field">
        Reservation time: {reservation.reservation_time}
      </p>
      <p
        className="form-field"
        data-reservation-id-status={reservation.reservation_id}
      >
        Status: {reservation.status}
      </p>
      {/* <p>Created on: {reservation.created_at}</p>
          <p>Last updated on: {reservation.updated_at}</p> */}
      <EditReservationButton reservation_id={reservation.reservation_id} />
      <CancelReservationButton
        reservation_id={reservation.reservation_id}
        handleCancel={() => handleCancel(reservation.reservation_id)}
      />
      {reservation.status === "booked" && (
        <SeatTableButton
          onClick={() => handleSeat(reservation.reservation_id)}
          reservation_id={reservation.reservation_id}
        />
      )}
    </div>
  );
}
