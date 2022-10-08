import { useHistory } from "react-router"

export default function FormCancelButton() {
const history = useHistory();

    return (
        <button 
            type="button" 
            className="btn btn-danger mt-2"
            onClick={() => history.goBack()}
        >Cancel</button>
    )
}