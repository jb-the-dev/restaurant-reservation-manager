import { useHistory } from "react-router";
import { next } from "../utils/date-time";

export default function NextDay({ date }) {
  const history = useHistory();
  let nextDate = next(date)

    return (
        <button 
        className="btn btn-primary"
        onClick={() => history.push(`/dashboard?date=${nextDate}`)}
      >{nextDate} &gt;</button>
    )
}