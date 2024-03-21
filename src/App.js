import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import AllPatients from './patient/AllPatients';
import PatientDetails from './patient/PatientDetails.js';
import UpDatePatient from './patient/UpdatePatient.js';
import AddPatientForm from './patient/AddPatientForm.js';
import NavBar from './NavBar.js';



function App() {
  return (<>
    <div style={{ direction: "rtl" }}>
      <NavBar />
      <Routes>
        <Route path='/' element={<AllPatients />}>
          <Route path='patientDetails/:_id' element={<PatientDetails />} />
          <Route path='edit/:id' element={<UpDatePatient />} />
        </Route>
        <Route path='addPatient' element={<AddPatientForm />} />
        <Route path='edit/:id' element={<UpDatePatient/>}/>
      </Routes>
    </div>
  </>
  );
}

export default App;
