import ReservationForm from "./ReservationForm";
// import axios from "axios";

export default function EditReservation() {
  //TODO build handleCancel
  //TODO build handleSubmit
  const handleCancel = (event) => {
    event.preventDefault();
    let confirmed = window.confirm("Do you want to cancel this reservation? This cannot be undone")
    if (confirmed) {
      //TODO throw logic in to axios.put() to change reservation status to "cancelled"
    } 
  }

    return (
        <>
            <h2>Edit the reservation</h2>
            <br />
            <ReservationForm 
                // handleCancel={}
                // handleEdit={}
            />
        </>
    )
}