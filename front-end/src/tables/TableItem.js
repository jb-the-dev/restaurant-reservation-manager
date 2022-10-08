export default function TableItem({ table, handleFinish }){
    return (
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
        </li>
    )
}