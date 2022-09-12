// import axios from "axios";
import { useEffect, useState } from "react";
import { getTables } from "../utils/api";

export default function TableList() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        async function getTableList() {
            let response = await getTables();
            let tablesData = response.data.data
            console.log("TABLES DATA", tablesData)
            setTables(tablesData)
        }
        getTableList();
    }, [])

    const tablesList = tables.map((table) =>(
        <li key={table.table_id}>
            <p>Table: {table.table_name}</p>
        </li>
    ))

    return (
        <>
            <h2>I am supposed to be a table list</h2>
            {tables.length === 0 ? "Loading list of tables..." : tablesList}
        </>
    )
}