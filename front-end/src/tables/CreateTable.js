import { createTable } from "../utils/api";
import TableForm from "./TableForm";
import { useHistory } from "react-router-dom"


export default function CreateTable() {
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        const formData = new FormData(form);
    
        const newTable = {
            data: {
                table_name: formData.get("table_name"),
                capacity: Number(formData.get("capacity")),
                reservation_id: formData.get("reservation_id"),
                is_occupied: formData.get("is_occupied"),
            }
        }
        await createTable(newTable)
        history.push("/dashboard")
    }

    const handleCancel = (event) => {
        history.goBack()
    }

    return (
        <>
            <h1>Create a Table</h1>
            <TableForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </>
    )
}