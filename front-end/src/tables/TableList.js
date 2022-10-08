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
    <TableItem table={table} handleFinish={handleFinish} />
  ));

  return (
    <>
      <h2>Tables</h2>
      {tables.length === 0 ? "Loading list of tables..." : tablesList}
    </>
  );
}
