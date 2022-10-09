import { createTable } from "../utils/api";
import TableForm from "./TableForm";
import { useHistory } from "react-router-dom";

export default function CreateTable() {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const controller = new AbortController();

    const newTable = {
      data: {
        table_name: formData.get("table_name"),
        capacity: Number(formData.get("capacity")),
        reservation_id: formData.get("reservation_id"),
      },
    };
    await createTable(newTable, { signal: controller.signal });
    history.push("/dashboard");
    return () => controller.abort();
  };

  return (
    <div className="fade-background">
      <h1 className="ml-4 title-layer">Create a Table</h1>
      <TableForm handleSubmit={handleSubmit} />
    </div>
  );
}
