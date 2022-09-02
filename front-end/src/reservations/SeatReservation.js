import CancelTableButton from "../buttons/CancelTableButton"

export default function SeatReservation() {
    let table = {
        table_id: 7,
        table_name: "high top",
        capacity: 4
    }
    //TODO swap table object for real table using API call to tables db
    //TODO pass reservation_id in using useParams

    return (
        <>
            <label>Table Number:</label>
            <select name={`${table.table_id}`}>
                <option value={``}>{table.table_name} - {table.capacity}</option>
            </select>
            <button className="btn btn-primary">Submit</button>
            <CancelTableButton />
        </>
    )
}