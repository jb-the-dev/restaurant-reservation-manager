export default function SubmitButton() {
    //TODO modularize submit button out of TableForm and ReservationForm components
    return (
        <button 
            type="submit" 
            className="btn btn-primary mb-2"
            onClick={() => console.log("submitted")}

        >Submit</button>
    )
}