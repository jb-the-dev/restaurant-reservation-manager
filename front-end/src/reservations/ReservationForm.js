// import ErrorAlert from "./ErrorAlert";

export default function ReservationForm({handleSubmit, handleCancel}) {

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
            placeholder="" 
            required />        
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number
        </label>
        <input 
            id="mobile_number" 
            name="mobile_number" 
            type="tel" 
            className="form-control"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            placeholder="123-456-7890" 
            required />        
        <label htmlFor="reservation_date" className="form-label">
          Reservation Date
        </label>
        <input 
            id="reservation_date" 
            name="reservation_date" 
            type="date" 
            className="form-control" 
            required />        
        <label htmlFor="reservation_time" className="form-label">
          Reservation Time
        </label>
        <input 
            id="reservation_time" 
            name="reservation_time" 
            type="time" 
            className="form-control" 
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
            required />        
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}
