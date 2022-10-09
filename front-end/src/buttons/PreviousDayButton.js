import { useHistory } from "react-router";
import { previous } from "../utils/date-time";

export default function PreviousDayButton({ date }) {
  const history = useHistory();
  let previousDate = previous(date);

  return (
    <button
      className="btn btn-dark mr-3"
      onClick={() => history.push(`/dashboard?date=${previousDate}`)}
    >
      &le; {previousDate}
    </button>
  );
}
