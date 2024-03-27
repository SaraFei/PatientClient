import { Link, useLocation } from "react-router-dom";

import "./PatientDetails.css";
import { useState } from "react";

const PatientDetails = () => {

    let location = useLocation();
    let patient = location.state;
    let [vaccinDetails, setVaccinDetails] = useState(false);
    const changeDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('he-IL');
        return formattedDate;
    }

    return (<>
        <div style={{
            backgroundColor: "white", position: "fixed", width: "100%", height: "100%", top: 0, direction: "rtl", overflow: "auto"
            , backgroundImage: "url('https://img.freepik.com/vetores-premium/doutor-bonito-com-injecao-na-frente-do-personagem-de-desenho-animado-do-edificio-do-hospital_295036-139.jpg')"
            , backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            backgroundSize: "400px",
            position: "fixed",
        }}>
            <div className="details-container">
                <div className="patient-details">
                    <p style={{ fontSize: "50px", marginTop: "3px", color: "cyan" }}>   פרטי פציינט😷:</p>
                    <h1> שם :{patient.lastName} {patient.firstName}</h1>
                    <h3> ת.ז.{patient.id} </h3>
                    <h3> תאריך לידה{changeDate(patient.dob)} </h3>
                    כתובת:🏠

                    <h3> עיר: {patient.address.city}</h3>
                    <h3>רחוב:{patient.address.street}</h3>
                    <h3>  מס' בית:{patient.address.houseNum}</h3>
                    <h3> טלפון:{patient.phonNum}</h3>
                    <h3> נייד:{patient.telephonNum}</h3>

                    <Link to={`/edit/${patient._id}`} state={patient}>
                        <input type="button" value="לעריכת פציינט" />
                    </Link>
                </div>
                <div className="vaccine-details">
                    {!vaccinDetails && <input type="button" value="לצפייה בפירוט חיסונים" onClick={() => { setVaccinDetails(true) }} />}
                    {vaccinDetails && (<ul>
                        <p style={{ fontSize: "50px", marginTop: "3px", color: "cyan" }}>       פרטי חיסונים💉:</p>
                        {patient.receivingVaccineDate.map((item, index) => {
                            return <div key={index}><label>חיסון מספר : {index + 1}</label>
                                <h4> תאריך קבלת החיסון:  {changeDate(item.date)}</h4> <h4> יצרן החיסון: {item.manufacturer}</h4></div>

                        })}</ul>)}
                        {!patient.receivingVaccineDate[0]&&<p>אין חיסונים להצגה</p>}
                    {patient.positiveDate ? <h3>  תאריך קבלת הקורונה: {changeDate(patient.positiveDate)}</h3> : <p>לא חלה בקורונה😊</p>}
                    {patient.recoveryDate ? <h3>      תאריך החלמה : {changeDate(patient.recoveryDate)}</h3> : <p></p>}

                    {patient.positiveDate && !patient.recoveryDate && <p>עדיין חולה😢</p>}
                </div>

            </div>
        </div>
    </>);
}

export default PatientDetails;
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
