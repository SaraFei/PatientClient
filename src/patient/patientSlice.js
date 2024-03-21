import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    patientArr: []
}
const patientSlice = createSlice({
    name: "patientState",
    initialState,
    reducers: {
        saveAllPatientAtClient: (state, action) => {
            state.patientArr = action.payload;
        },
        deletPatientFromClient: (state, action) => {
            let newArr = state.patientArr.filter(item => item._id !== action.payload)
            state.patientArr = newArr;
        },
        addPatientToClient: (state, action) => {
            state.patientArr.push(action.payload);
        },
        upDatePatientInClient: (state, action) => {
            let newArr = state.patientArr.filter(item => item._id !== action.payload._id);
            state.newArr.push(action.payload);
            state.patientArr = newArr;
        }
    }
})
export const { saveAllPatientAtClient, deletPatientFromClient, addPatientToClient, upDatePatientInClient } = patientSlice.actions;
export default patientSlice.reducer;
