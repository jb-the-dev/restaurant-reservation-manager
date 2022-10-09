export default function SeatTableButton({ reservation_id }) {
  return (
    <a className="btn btn-dark" href={`/reservations/${reservation_id}/seat`}>
      Seat
    </a>
  );
}
