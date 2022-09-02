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
            console.log("array", [1, 2, 3, 4, 5, 5, 6, 7, {},])
            setTables(tablesData)
        }
        getTableList();
    }, [tables])

    const tablesList = tables.map((table) =>(
        <li>
            <p key={table.table_id}>Table: {table.table_name}</p>
        </li>
    ))

    return (
        <>
            <h2>I am supposed to be a table list</h2>
            {tablesList}
        </>
    )
}