//In this compound we have calls to server.
// This is basically the connection between the client and the server

import axsios from "axios";

let baseUrl = "http://localhost:8000/api/patient";

export const getAllPatients = () => {
    return axsios.get(baseUrl);
}

export const getPatientById = (id) => {
    return axsios.get(`${baseUrl}/${id}`);
}
export const deletePatient = (id) => {
    return axsios.delete(`${baseUrl}/${id}`);
}
export const upDatePatient = (id, updatedPatient) => {
    return axsios.put(`${baseUrl}/${id}`, updatedPatient);
}
export const addPatient = (patient) => {
    return axsios.post(baseUrl, patient)
}
export const getCntUnVaccinFromServer = () => {
    return axsios.get("http://localhost:8000/api/cnt");
}