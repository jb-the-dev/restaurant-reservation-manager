import { useHistory } from "react-router";
import { next } from "../utils/date-time";

export default function NextDayButton({ date }) {
  const history = useHistory();
  let nextDate = next(date);

  return (
    <button
      className="btn btn-dark"
      onClick={() => history.push(`/dashboard?date=${nextDate}`)}
    >
      {nextDate} &gt;
    </button>
  );
}
