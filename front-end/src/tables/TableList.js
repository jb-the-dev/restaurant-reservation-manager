// import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getTables, unseatReservation } from "../utils/api";
import TableItem from "./TableItem";

export default function TableList() {
  const [tables, setTables] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    async function getTableList() {
      let response = await getTables(controller.signal);
      let tablesData = response.data.data;
      setTables(tablesData);
    }
    getTableList();
    return () => controller.abort();
  }, []);

  const handleFinish = async (table_id) => {
    let confirmed = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmed) {
      await unseatReservation(table_id);
      history.go(0);
    } else {
      return;
    }
  };

  const tablesList = tables.map((table) => (
    <TableItem key={table.table_id} table={table} handleFinish={handleFinish} />
  ));

  return (
    <>
      <h3 className="d-md-flex title-layer">Tables</h3>
      <div className="mb-3 container">
        <table className="table opacity-layer">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Finish</th>
              <th scope="col">Table</th>
              <th scope="col">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {tablesList}
          </tbody>
        </table>
      </div>
    </>
  );
}
