export default function TableItem({ table, handleFinish }) {
  return (
    <tr>
      <td data-table-id-status={`${table.table_id}`}>
        Current Status: {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td>
        {table.reservation_id ? (
          <button
            data-table-id-finish={table.table_id}
            className="btn btn-info"
            onClick={() => handleFinish(table.table_id)}
          >
            Finish
          </button>
        ) : (
          ""
        )}
      </td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
    </tr>
  );
}
