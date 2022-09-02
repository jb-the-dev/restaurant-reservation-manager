export default function CancelReservationButton({reservation, handleCancel}) {
    //TODO modularize cancel button out of TableForm and ReservationForm components
    return (
        <button 
          data-reservation-id-cancel={reservation.reservation_id}
          className="btn btn-danger"
          onClick={handleCancel}
        >Cancel</button>
    )
}