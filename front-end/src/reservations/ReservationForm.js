import { useState } from "react";
// import ErrorAlert from "./ErrorAlert";

export default function ReservationForm() {
  const [formData, setFormData] = useState({});

  return (
    <>
      <form className="card">
        <label htmlFor="first_name" className="form-label">
          First Name
        </label>
        <input 
            id="first_name" 
            name="first_name" 
            type="text" 
            className="form-control" 
            // value={} 
            // onChange={} 
            placeholder="" 
            required />
        <label htmlFor="last_name" className="form-label">
          Last Name
        </label>
        <input 
            id="last_name" 
            name="last_name" 
            type="text" 
            className="form-control" 
            // value={} 
            // onChange={} 
            placeholder="" 
            required />        
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number
        </label>
        <input 
            id="mobile_number" 
            name="mobile_number" 
            type="text" 
            className="form-control" 
            // value={} 
            // onChange={} 
            placeholder="" 
            required />        
        <label htmlFor="reservation_date" className="form-label">
          Reservation Date
        </label>
        <input 
            id="reservation_date" 
            name="reservation_date" 
            type="text" 
            className="form-control" 
            // value={} 
            // onChange={} 
            placeholder="" 
            required />        
        <label htmlFor="reservation_time" className="form-label">
          Reservation Time
        </label>
        <input 
            id="reservation_time" 
            name="reservation_time" 
            type="text" 
            className="form-control" 
            // value={} 
            // onChange={} 
            placeholder="" 
            required />        
        <label htmlFor="people" className="form-label">
          Group Size
        </label>
        <input 
            id="people" 
            name="people" 
            type="text" 
            className="form-control" 
            // value={} 
            // onChange={} 
            placeholder="" 
            required />        
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className="btn btn-danger">Cancel</button>
      </form>
      {/* <ErrorAlert /> */}
    </>
  );
}
