import SubmitButton from "../buttons/SubmitButton"
import CancelTableButton from "../buttons/CancelTableButton"

export default function TableForm() {
  return (
    <form>
      <label htmlFor="table_name" className="form-label">
        Table Name
      </label>
      <input
        id="table_name"
        name="table_name"
        type="text"
        className="form-control"
        placeholder=""
        minLength={2}
        required
      />
      <label htmlFor="capacity" className="form-label">
        Capacity
      </label>
      <input
        id="capacity"
        name="capacity"
        type="number"
        className="form-control"
        placeholder=""
        min={1}
        required
      />
        <SubmitButton />
        <CancelTableButton />
    </form>
  );
}
