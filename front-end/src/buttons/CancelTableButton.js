export default function CancelTableButton({ handleCancel }) {
    //TODO modularize submit button out of TableForm and ReservationForm components
    return (
        <button 
            type="submit" 
            className="btn btn-danger mb-2"
            onClick={() => handleCancel()}

        >Cancel</button>
    )
}