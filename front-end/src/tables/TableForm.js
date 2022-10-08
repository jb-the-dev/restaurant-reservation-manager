import FormSubmitButton from "../buttons/FormSubmitButton";
import FormCancelButton from "../buttons/FormCancelButton";
import "../layout/Form.css";

export default function TableForm({ handleSubmit }) {
  return (
    <div className="form-container">
      <div className="opacity-layer">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
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
          </div>
          <div className="form-field">
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
          </div>

          <FormSubmitButton />
          <FormCancelButton />
        </form>
      </div>
    </div>
  );
}
