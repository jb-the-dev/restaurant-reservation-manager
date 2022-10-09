import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FormCancelButton from "../buttons/FormCancelButton";
import FormSubmitButton from "../buttons/FormSubmitButton";
import ErrorAlert from "../layout/ErrorAlert";
import { getTables, seatTable } from "../utils/api";

export default function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [occupiedError, setOccupiedError] = useState("");
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    async function getTableList() {
      let response = await getTables(controller.signal);
      let tablesData = response.data.data;
      let openTables = tablesData.filter((table) => !table.reservation_id);
      setTables(openTables);
    }
    getTableList();
    return () => controller.abort();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestConfig = {
      data: {
        reservation_id: reservation_id,
      },
    };
    try {
      await seatTable(tableId, requestConfig);
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
      setOccupiedError(error);
    }
  };

  const handleTableIdChange = (event) => {
    setTableId(event.target.value);
  };

  return (
    <div className="form-container m-10">
      <ErrorAlert error={occupiedError} />
      <form onSubmit={handleSubmit} className="opacity-layer m-10">
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
        <FormSubmitButton />
        <FormCancelButton />
      </form>
    </div>
  );
}
