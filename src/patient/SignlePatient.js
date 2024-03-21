import { Link, useNavigate } from "react-router-dom";
import { deletePatient } from "./patientApi";

const SignlePatient = ({ signlePatient, setFlag }) => {
    let navigate = useNavigate();
    return (<>
        <h1>{signlePatient.lastName} {signlePatient.firstName}</h1>
        <h2> {signlePatient.id}  </h2>
        <h3>{signlePatient.address.city}</h3>
        <Link to={`patientDetails/${signlePatient._id}`} state={signlePatient} >
            <input type="button" value="לפרטים נוספים" />
        </Link>
        <Link to={`edit/${signlePatient._id}`} state={signlePatient}>
            <input type="button" value="ערוך פרטי חבר" />
        </Link>

        <input type="button" value="למחיקת פציינט" onClick={() => {

            deletePatient(signlePatient._id).then(
                alert('נמחק בהצלחה'),
                // dispatch(deletPatientFromClient(patient._id)),
                setFlag(true),
                console.log("החבר נמחק בהצלחה", signlePatient.id),

                setTimeout(() => { navigate('/') }, 1000)
                // navigate('/')
            ).catch(
                (error) => {
                    if (error.response.request.status === 404 && error.response.data.type === "patient error") {
                        console.log(error.response.data.message);
                    }
                    if (error.response.request.status === 400 && error.response.data.type === "error id") {
                        console.log("id is not valied");
                        console.log(error.response.data.message);
                    }
                }
            )
        }} />
    </>);
}

export default SignlePatient;