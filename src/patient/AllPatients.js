//This component is responsible for importing the patients from the server
// and saving them in the local state

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { getAllPatients } from "./patientApi";
import SignlePatient from "./SignlePatient";

const AllPatients = () => {

  let [allPatients, setAllPatients] = useState([]);
  let [flag, setFlag] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getAllPatients().then(
      res => {
        setAllPatients(res.data)
      }
    ).catch((err => {
      console.log("לא הצליח להביא את החולים מהשרת", err)

    }))
  }, [flag])

  return (<>
    <div style={{ display: 'grid', marginTop: "2%", marginLeft: "0.5%", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {allPatients.map(item => <SignlePatient key={item.id} signlePatient={item} setFlag={setFlag} />

      )}

      <Outlet /></div>
  </>);
}

export default AllPatients;