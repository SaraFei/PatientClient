import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCntUnVaccinFromServer } from "./patient/patientApi";

//mui buttons
import * as React from 'react';
import Button from '@mui/material/Button';


const NavBar = () => {

    let [cntOfUnVacc, setCntOfUnVacc] = useState(null);

    useEffect(() => {
        getCntUnVaccinFromServer()
            .then(res => {
                setCntOfUnVacc(res.data.cnt);
            })
            .catch(err => {
                console.log("לא הצליח להביא את מספר הפציינטים שאינם מחוסנים מהשרת", err);
            });
    }, []);
    return (<>
        <div style={{ backgroundColor: "cyan", width: "100%", height: "10%" }}>
            <h2 style={{ marginRight: "40%" }}>קופת חולים 🏥  💉</h2>
            <p style={{ color:"blue" }}>חולים לא מחוסנים: {cntOfUnVacc}</p>
            <Link to={'/addPatient'}>
                <Button variant="outlined">הוסף חבר</Button>
            </Link></div>
    </>);
}

export default NavBar;