import { Link, useLocation, useNavigate } from "react-router-dom";
import { deletePatient } from "./patientApi";
import { useDispatch } from "react-redux";
import { deletPatientFromClient } from "./patientSlice";


const PatientDetails = () => {
    let navigate = useNavigate();
    let location = useLocation();

    let patient = location.state;  
      let dispatch = useDispatch();
    return (<>
        <div style={{ backgroundColor: "red", position: "fixed", width: "100vw", height: "100vh", top: 0, direction: "rtl" }}>
            פרטי פציינט
            <h1> שם :{patient.lastName} {patient.firstName}</h1>
            <h2>{patient.id}ת.ז. </h2>
            כתובת:

            <h2> {patient.address.city}</h2>
            <h2>{patient.address.street}</h2>
            <h2>  {patient.address.houseNum}</h2>
            <h2> {patient.phonNum}</h2>
            <h2> {patient.telephonNum}</h2>

            <ul>
                פרטי חיסון
                {patient.receivingVaccineDate.map(item => {
                    return <><li>{item.date}</li> <li>{item.manufacturer}</li></>

                })}</ul>
            {patient.positiveDate}
            {/* <input type="button" value="למחיקת פציינט" onClick={() => {

                deletePatient(patient._id).then(
                    dispatch(deletPatientFromClient(patient._id)),
                    console.log("החבר נמחק בהצלחה", patient.id),
                    // setTimeout(() => { navigate('/') }, 2000)
                    navigate('/')
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
            }} /> */}

            להוסיף פונקצייה בסטייט! של עריכה
            <Link to={`/edit/${patient._id}`} state={patient}>
                <input type="button" value="לעריכת פציינט" />
            </Link>
        </div>
    </>);
}

export default PatientDetails;