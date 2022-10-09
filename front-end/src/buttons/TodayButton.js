import { useHistory } from "react-router"

export default function TodayButton() {
    const history = useHistory();
    return (
        <button className="btn btn-dark mr-3"
        onClick={() => history.push(`/dashboard`)}>
            Today
        </button>
    )
}