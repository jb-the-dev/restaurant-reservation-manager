import { Link } from "react-router-dom"

export default function EditReservationButton({reservation_id}) {
    return (
        <Link 
        to={`/reservations/${reservation_id}/edit`} className="btn btn-info mb-2"
      >Edit</Link>
    )
}