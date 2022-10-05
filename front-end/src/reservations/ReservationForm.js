// import { today } from "../utils/date-time";
// keeping this import above to add a "min" later to `reservation_date` to further prevent user error

import { useHistory } from "react-router";

export default function ReservationForm({ handleSubmit, currentReservation }) {
const history = useHistory();

  return (
    <>
      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="first_name" className="form-label">
          First Name
        </label>
        <input 
            id="first_name" 
            name="first_name" 
            type="text" 
            className="form-control" 
            // placeholder=""
            defaultValue={currentReservation?.first_name} 
            required />
        <label htmlFor="last_name" className="form-label">
          Last Name
        </label>
        <input 
            id="last_name" 
            name="last_name" 
            type="text" 
            className="form-control" 
            placeholder="" 
            defaultValue={currentReservation?.last_name} 
            required />        
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number
        </label>
        <input 
            id="mobile_number" 
            name="mobile_number" 
            type="tel" 
            className="form-control"
            // pattern="[0-9]{10}"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            // placeholder="Use no dashes and include area code, i.e. '1234567890'" 
            defaultValue={currentReservation?.mobile_number} 
            required />        
        <label htmlFor="reservation_date" className="form-label">
          Reservation Date
        </label>
        <input 
            id="reservation_date" 
            name="reservation_date" 
            type="date" 
            className="form-control"
            defaultValue={currentReservation?.reservation_date}
            // defaultValue={currentReservation?.reservation_date}  
            // min={today()}
            // required 
          />        
        <label htmlFor="reservation_time" className="form-label">
          Reservation Time
        </label>
        <input 
            id="reservation_time" 
            name="reservation_time" 
            type="time" 
            className="form-control" 
            defaultValue={currentReservation?.reservation_time} 
            required />        
        <label htmlFor="people" className="form-label">
          Group Size
        </label>
        <input 
            id="people" 
            name="people" 
            type="number" 
            className="form-control" 
            maxLength={2} 
            min={1}
            placeholder="" 
            defaultValue={currentReservation?.people} 
            required />        
        <button type="submit" className="btn btn-primary mb-2">Submit</button>
        <button className="btn btn-danger" onClick={() => history.goBack()}>Cancel</button>
      </form>
    </>
  );
}
