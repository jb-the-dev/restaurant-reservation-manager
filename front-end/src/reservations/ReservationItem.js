import CancelReservationButton from "../buttons/CancelReservationButton";
import EditReservationButton from "../buttons/EditReservationButton";
import SeatTableButton from "../buttons/SeatTableButton";
import "./ReservationItem.css"

export default function ReservationItem({
  reservation,
  handleCancel,
  handleSeat,
}) {
  return (
    <div className="card opacity-layer m-2" key={reservation.reservation_id}>
      <p className="reservation-card">
        {reservation.first_name} {reservation.last_name}
      </p>
      <p className="card-field">Mobile number: {reservation.mobile_number}</p>
      <p className="card-field">Party size: {reservation.people}</p>
      <p className="card-field">
        Reservation time: {reservation.reservation_time}
      </p>
      <p
        className="card-field"
        data-reservation-id-status={reservation.reservation_id}
      >
        Status: {reservation.status}
      </p>

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
