//In this compound we have the option to edit a health insurance member,
//using react hook form
//(Only the editable ones are shown)


import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { upDatePatient } from "./patientApi";
import "./EditPatient.css"



const EditPatient = () => {
    let location = useLocation();
    let patient = location.state;
    let numFieldVaccine = patient.receivingVaccineDate;
    let ArrayEdit = patient.receivingVaccineDate;
    let navigate = useNavigate();


    let [addVaccine, setAddVaccine] = useState(false);
    let [errorVaccinArr, setErrorVaccinArr] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            firstName: patient.firstName,
            lastName: patient.lastName,
            address: {
                city: patient.address.city,
                street: patient.address.street,
                houseNum: patient.address.houseNum
            },
            telephonNum: patient.telephonNum,
            phonNum: patient.phonNum,
            positiveDate: patient.positiveDate,
            recoveryDate: patient.recoveryDate,
        }
    });
    const today = new Date().getTime();

    const isDateNotGreaterThanToday = (value) => {
        if (value < Date.now())
            return "תאריך לא יכול להיות גדול מהיום";
        return true;
    }

    // const validatenewCaccinDate = (value) => {

    // if (patient.receivingVaccineDate.length === 0) {
    //     let lastVaccin = patient.receivingVaccineDate[patient.receivingVaccineDate.length].date;
    // }
    //     if (newCaccinDate && new Date(value) < new Date(newCaccinDate)) {
    //         return "תאריך קבלת החיסון  לא יכול להיות לפני תאריך קבלת החיסון הקודם";
    //     }
    // };

    const onSubmit = async (data) => {
        let { firstName, lastName, telephonNum, phonNum, address, positiveDate, recoveryDate,
            date, manufacturer } = data;
        let patientToEdit = {
            firstName, lastName, address, telephonNum, phonNum
        };
        if (date == '' && manufacturer == '') {
            date = null;
            manufacturer = null;
        }
        if (recoveryDate != "") {
            patientToEdit.recoveryDate = recoveryDate;
        }
        if (positiveDate != "") {
            patientToEdit.positiveDate = positiveDate;
        }
        // if (date&&manufacturer) {
        //     let vaccineEntry = { date, manufacturer };
        //     await ArrayEdit.push(vaccineEntry);
        //     patient.receivingVaccineDate = ArrayEdit;
        // }
        // if (date && manufacturer) {
        //     let vaccineEntry = { date, manufacturer };
        //     ArrayEdit.push(vaccineEntry);
        //     patient.receivingVaccineDate = ArrayEdit;
        // }
        if (date && manufacturer) {
            let vaccineEntry = { date, manufacturer };
            await ArrayEdit.push(vaccineEntry);
            patientToEdit.receivingVaccineDate = ArrayEdit;
            // patientToEdit = {
            //     firstName, lastName, address, telephonNum, phonNum,
            //     receivingVaccineDate: ArrayEdit, positiveDate, recoveryDate
            // }
        }
        if (!date && manufacturer || !manufacturer && date) {
            setErrorVaccinArr(true);
        }
        const userConfirmation = window.confirm('האם אתה בטוח שברצונך לעדכן את הפרטים?');
        if (userConfirmation) {
            try {
                console.log("patientToEdit before update:", patientToEdit);
                const response = await upDatePatient(patient._id, patientToEdit);
                alert("החבר עודכן בהצלחה!");
                console.log("updated by success");
                console.log("Updating patient with data:", patient._id, patientToEdit);

                navigate('/allpatients')

            }
            catch (error) {
                console.log(error)
                if (error.response.request.status === 404 && error.response.data.type === "patient error") {
                    console.log(" לא קיים משתמש עם ת.ז. זהה במערכת ");
                }
                if (error.response.request.status === 403 && error.response.data.type === "error validate") {
                    console.log("אחד מהשדות שהזנת לא מולאו כראוי");
                }
                else {
                    console.error('Failed to register:', error);
                }
                // setError('Registration failed. Please try again.');
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >

            <h2>  <label >שם פרטי</label>
                <input type='text'{...register('firstName', { required: "first name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.firstName && <p>{errors.firstName.message}</p>}</h2>
            <h2>       <label >שם משפחה</label>
                <input type='text' {...register('lastName', { required: "first name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </h2>

            <h2>  <label > מס' טלפון</label>
                <input type='text' {...register('telephonNum', { required: "telephonNum name is required", pattern: { message: "telephon number  must begin with the digits 0 and its length must be 9 ", value: /^05\d{8}$/} })} />
                {errors.telephonNum && <p>{errors.telephonNum.message}</p>}</h2>
            <h2>   <label > מס' נייד</label>
                <input type='text'   {...register('phonNum', { required: "phonNum name is required", pattern: { message: "phon number  must begin with the digits 05 and its length must be 10 ", value: /^05\d{8}$/}})} />
                {errors.phonNum && <p>{errors.phonNum.message}</p>}</h2>
            כתובת:
            <h2> <label> עיר </label>
                <input type='text'  {...register('address.city', { required: "city name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.city && <p>{errors.address.city.message}</p>} </h2>
            <h2> <label> רחוב </label>
                <input type='text' {...register('address.street', { required: "street name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.street && <p>{errors.address.street.message}</p>} </h2>
            <h2> <label > מס' בית </label>
                <input type='text'  {...register('address.houseNum', { required: "houseNum name is required", pattern: { message: " מספרים בלבד!", value: /^[0-9]/, maxLength: 3 } })} />
                {errors.houseNum && <p>{errors.address.houseNum.message}</p>} </h2>



            {!patient.positiveDate && <h2><label > תאריך בו נמצא חיובי לנגיף </label>
                <input type='date' {...register('positiveDate',{ min: { value:watch('dob'), message: " date must be after date of birth " } },  { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } })} />
                {errors.positiveDate && <p>{errors.positiveDate.message}</p>}</h2>}


            {!patient.recoveryDate && <h2>  <label > תאריך החלמה </label>
                <input type='date' {...register('recoveryDate', { min: { value: watch('positiveDate')&&watch('dob'), message: " date must be after positive and after dob " } }, { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } })} />

                {errors.recoveryDate && <p>{errors.recoveryDate.message}</p>}</h2>
            }


            מס החיסונים שקיבל:{numFieldVaccine.length}
            {patient.receivingVaccineDate.length < 4 ? <input type="button" value="להוספת חיסון" onClick={() => { setAddVaccine(true) }} /> : <h2>לא ניתן להוסיף מעל 4 חיסונים</h2>}
            {addVaccine && <><h2>

                <label>  תאריך קבלת חיסון</label>
                <input type="date"  {...register('date',{ min: { value:watch('dob'), message: " date must be after date of birth " } },  { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } })} /></h2>
                <p>{errors.date?.message}</p>
                <select {...register('manufacturer')}>
                    <option value={null}>{null} </option>
                    <option value="Moderna" >Moderna</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="AstraZeneca">AstraZeneca (Vaxzevria)</option>
                    <option value="Johnson & Johnson">Johnson & Johnson (Janssen)</option>
                    <option value="Sinovac">Sinovac (CoronaVac)</option>
                    <option value="Sinopharm">Sinopharm (BBIBP-CorV)</option>
                    <option value="Bharat Biotech">Bharat Biotech (Covaxin)</option>
                </select>
                {errorVaccinArr && <p>must fill manufacturer and date to vaccin</p>}
            </>}



            <button type="submit"> עדכן פרטים</button>
        </form>
    );
}

export default EditPatient;