export default function CancelReservationButton({
  reservation_id,
  handleCancel,
}) {
  return (
    <button
      data-reservation-id-cancel={reservation_id}
      className="btn btn-danger mb-2"
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
}
