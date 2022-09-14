import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CancelTableButton from "../buttons/CancelTableButton";
import ErrorAlert from "../layout/ErrorAlert";
import { getTables, seatTable } from "../utils/api";

export default function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(0)
  const [occupiedError, setOccupiedError] = useState("")
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getTableList() {
      let response = await getTables();
      let tablesData = response.data.data;
      // console.log("TABLES DATA", tablesData)
      setTables(tablesData);
    }
    getTableList();
  }, []);
  // let table = {
  //     table_id: 7,
  //     table_name: "high top",
  //     capacity: 4
  // }
  //TODO pass reservation_id in using useParams

  //TODO Figure out how to get table_id shown on <option>, into the HTTP request to the backend.

  const handleSubmit = async (event) => {
    event.preventDefault();

    // let foundTable = tables.find((table) => table.table_id === Number(tableId))
    // console.log("tableId", tableId)

    const requestConfig = {
      data: {
        reservation_id: reservation_id,
      },
    };
    try {
      await seatTable(tableId, requestConfig)
      history.push("/dashboard")
    } catch(error) {
      console.error(error)
      setOccupiedError(error)
      // set error, display error
    }
  };

  const handleTableIdChange = (event) => {
    // console.log("event.target", event.target.value);
    setTableId(event.target.value)
  }

  return (
    <>
        <ErrorAlert error={occupiedError}/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="table_id">Table Number:</label>
            <select
                id="table_id"
                name="table_id"
                value={tableId}
                onChange={handleTableIdChange}
                >
                <option>Pick a table</option>
                {tables.map((table) => (
                    <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                </option>
                ))}
            </select>
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
            <CancelTableButton />
        </form>
    </>
  );
}
