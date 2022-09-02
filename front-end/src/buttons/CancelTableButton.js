export default function CancelTableButton() {
    //TODO modularize submit button out of TableForm and ReservationForm components
    return (
        <button 
            type="submit" 
            className="btn btn-danger mb-2"
            onClick={console.log("cancelled")}

        >Cancel</button>
    )
}