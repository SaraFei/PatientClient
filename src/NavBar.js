import { Link } from "react-router-dom";

//mui buttons
import * as React from 'react';
import Button from '@mui/material/Button';

const NavBar = () => {
    return (<>
        <div style={{ backgroundColor: "cyan", width: "100%", height: "10%" }}>
            <h2 style={{marginRight:"40%"}}>קופת חולים 🏥  💉</h2>
            <Link to={'/addPatient'}>
                <Button variant="outlined">הוסף חבר</Button>
            </Link></div>
    </>);
}

export default NavBar;