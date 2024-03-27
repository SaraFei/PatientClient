import './App.css';
import { Route, Routes } from 'react-router-dom';

import AllPatients from './patient/AllPatients';
import PatientDetails from './patient/PatientDetails.js';
import AddPatientForm from './patient/AddPatientForm.js';
import NavBar from './NavBar.js';
import EditPatient from './patient/EditPatient.js';



function App() {
  return (<>
    <div style={{ direction: "rtl" }}>
      <NavBar />
      <Routes>
        <Route path='/allpatients' element={<AllPatients />}>
          <Route path='patientDetails/:_id' element={<PatientDetails />} />
          <Route path='edit/:id' element={<EditPatient />} />
        </Route>
        <Route path='addPatient' element={<AddPatientForm />} />
        <Route path='edit/:id' element={<EditPatient/>}/>
      </Routes>
    </div>
  </>
  );
}

export default App;
