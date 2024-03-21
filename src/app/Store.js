import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "../patient/patientSlice";

export const store = configureStore({
    reducer: {
        patientState: patientSlice
    }

})