export default function SeatTableButton({reservation_id}) {
    return (
      <a 
        className="btn btn-warning"
        // onClick={}
        href={`/reservations/${reservation_id}/seat`}
      >Seat</a>
    )
}