import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { getAllPatients, getCntUnVaccinFromServer } from "./patientApi";

import SignlePatient from "./SignlePatient";

const AllPatients = () => {
    // let allPatients = useSelector(state => state.patientState.patientArr);
    let [allPatients, setAllPatients] = useState([]);
    let [flag, setFlag] = useState(false);
    let [cntOfUnVacc,setCntOfUnVacc]=useState(null);
    useEffect(() => {
        getAllPatients().then(
            res => {
                // alert("😷");
                // dispatch(saveAllPatientAtClient(res.data))
                setAllPatients(res.data)
            }
        ).catch((err => {
            console.log("לא הצליח להביא את החולים מהשרת", err);
            getCntUnVaccinFromServer().then(
                alert("vhh"),
                res => {
                  alert(res.data.cnt);
                  console.log(res.data.cnt);
                 setCntOfUnVacc(res.data.cnt)
                }
          
              )
                .catch(
                  (err) => {
                    console.log(err);
                    alert("לא הצליח להביא את כמות הלא מחוסנים ");
                  }
                )
        }))
    }, [flag])
    return (<>
<div style={{ display: 'grid', marginTop: "2%", marginLeft: "0.5%" ,gridTemplateColumns:"1fr 1fr 1fr"}}>
        {allPatients.map(item =>  <SignlePatient key={item.id} signlePatient={item} setFlag={setFlag} />
            
        )}

        <Outlet /></div>
    </>);
}

export default AllPatients;