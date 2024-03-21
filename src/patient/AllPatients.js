import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { getAllPatients } from "./patientApi";
import { saveAllPatientAtClient } from "./patientSlice";
import SignlePatient from "./SignlePatient";

const AllPatients = () => {
    // let allPatients = useSelector(state => state.patientState.patientArr);
    let [allPatients, setAllPatients] = useState([]);
    let [flag, setFlag] = useState(false);
    let dispatch = useDispatch();
    useEffect(() => {
        getAllPatients().then(
            res => {
                // alert("😷");
                // dispatch(saveAllPatientAtClient(res.data))
                setAllPatients(res.data)
            }
        ).catch((err => {
            console.log("לא הצליח להביא את החולים מהשרת", err);
        }))
    }, [flag])
    return (<>
        {allPatients.map(item => {

            return <li key={item.id}>
                {<SignlePatient key={item.id} signlePatient={item} setFlag={setFlag} />}
            </li>
        })}

        <Outlet />
    </>);
}

export default AllPatients;