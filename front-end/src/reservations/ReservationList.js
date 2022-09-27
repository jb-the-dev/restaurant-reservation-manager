import CancelReservationButton from "../buttons/CancelReservationButton";
import EditReservationButton from "../buttons/EditReservationButton";
import SeatTableButton from "../buttons/SeatTableButton";
import { seatReservation } from "../utils/api";

export default function ReservationList({ reservations, handleCancel}) {

  const handleSeat = async (reservation_id) => {
    const config = { data: { status: "seated" } }
    await seatReservation(reservation_id, config)
  }

    return reservations.length === 0 
      ? "No reservations for today yet... " 
      : reservations.map(reservation => (
        <div className="card" key={reservation.reservation_id}>
          <p>Name: {reservation.first_name} {reservation.last_name}</p>
          <p>Mobile number: {reservation.mobile_number}</p>
          <p>Party size: {reservation.people}</p>
          <p>Reservation time: {reservation.reservation_time}</p>
          <p data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
          <p>Created on: {reservation.created_at}</p>
          <p>Last updated on: {reservation.updated_at}</p>
          <EditReservationButton reservation_id={reservation.reservation_id} />
          <CancelReservationButton reservation_id={reservation.reservation_id} handleCancel={handleCancel}/>
          {reservation.status === "booked" && <SeatTableButton onClick={() => handleSeat(reservation.reservation_id)} reservation_id={reservation.reservation_id}/>}
        </div>
    ))
}