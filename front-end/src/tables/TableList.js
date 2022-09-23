// import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getTables, unseatReservation } from "../utils/api";

export default function TableList() {
    const [tables, setTables] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function getTableList() {
            let response = await getTables();
            let tablesData = response.data.data
            // console.log("TABLES DATA", tablesData)
            setTables(tablesData)
        }
        getTableList();
    }, [])

    const handleFinish = async (table_id) => {
        let confirmed = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
        if (confirmed) {
            await unseatReservation(table_id)
            history.go(0);
        } else {
            return
        }

    }

    const tablesList = tables.map((table) =>(
        <li key={table.table_id}>
            <p>Table: {table.table_name}</p>
            <p data-table-id-status={`${table.table_id}`}>Current Status: { table.reservation_id ? "Occupied" : "Free" }</p>
            {table.reservation_id 
                ? <button 
                    data-table-id-finish={table.table_id} 
                    className="btn btn-secondary" 
                    onClick={() => handleFinish(table.table_id)}>
                        Finish
                </button> 
                : ""
            }
            {/* {table.reservation_id} */}
        </li>
    ))

    return (
        <>
            <h2>I am supposed to be a table list</h2>
            {tables.length === 0 ? "Loading list of tables..." : tablesList}
        </>
    )
}