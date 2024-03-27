//In this compound we have the option to add a health insurance member,
//using react hook form

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { addPatient } from './patientApi';
import { useState } from 'react';
const AddPatientForm = () => {
    let navigate = useNavigate();
    let [errorVaccinArr, setErrorVaccinArr] = useState(false);
    const { register, getValues, handleSubmit, formState: { errors }, watch } = useForm();

    // const today = new Date().toISOString().split('T')[0];
    // const dob = watch('dob');
    // const positiveDate = watch('positiveDate');
    // const isDateNotGreaterThanToday = (value) => {
    //     if (value > today) {
    //         return "תאריך לא יכול להיות גדול מהיום";
    //     }
    //     return true;
    // };
    // const validateSickDate = (value) => {
    //     const dob = watch('dob');
    //     if (dob && new Date(value) < new Date(dob)) {
    //         return "Sick date cannot be before the birth date";
    //     }
    // };

    // const checkRecoveryDate = (value) => {
    //     const { positiveDate } = getValues();
    //     const positiveDateObj = new Date(positiveDate);
    //     const recoveryDateObj = new Date(value);

    //     return recoveryDateObj >= positiveDateObj || 'תאריך החלמה חייב להיות אחרי תאריך החולי';
    // };

    const tryAddPatient = async (data) => {
        let { firstName, lastName, id, dob, telephonNum, phonNum, city, street, houseNum, positiveDate, recoveryDate, date, manufacturer } = data;
        let address = { city, street, houseNum };
        let patient = {
            firstName,
            lastName,
            id,
            dob,
            telephonNum,
            phonNum,
            address,
        };
        setErrorVaccinArr(false)
        if (date == '' && manufacturer == '') {
            date = null;
            manufacturer = null;

        } if (positiveDate == "") {
            positiveDate = null;
            recoveryDate = null;
        }
        if (recoveryDate == "") {
            recoveryDate = null;
        }
        if (date && manufacturer) {
            patient.receivingVaccineDate = [{ date, manufacturer }];
        }
        if (positiveDate) {
            patient.positiveDate = positiveDate;
        }
        if (recoveryDate) {
            patient.recoveryDate = recoveryDate;
        }
        if (!date && manufacturer || !manufacturer && date) {
            setErrorVaccinArr(true);
            return;
        }
        try {
            console.log(patient);
            const response = await addPatient(patient);
            alert("החבר נוסף בהצלחה!");
            console.log("add by success");
            setTimeout(() => { navigate('/allpatients') }, 1000)

        }
        catch (error) {
            if (error.response.request.status === 409 && error.response.data.type === "same patient") {
                console.log("קיים משתמש עם ת.ז. זהה במערכת");
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



    return (
        <>
            הוספת חבר קופ"ח
            <form onSubmit={handleSubmit(tryAddPatient)}>
                <h2>  <label>שם פרטי</label>
                    <input type='text' {...register('firstName', { required: "first name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}</h2>
                <h2>       <label >שם משפחה</label>
                    <input type='text' {...register('lastName', { required: "last name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}</h2>
                <label > ת.ז.</label>
                <h2>    <input type='text'  {...register('id', {
                    required: "id is required", pattern: {
                        value: /^[0-9]{9}$/,
                        message: 'נא הקש ת.ז. תקינה! בעלת 9 ספרות בלבד'
                    }
                })} />
                    {errors.id && <p>{errors.id.message}</p>}</h2>
                <h2>  <label > תאריך  לידה </label>
                    <input
                        type='date'
                        {...register('dob', { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } }, {
                            required: 'תאריך הוא שדה חובה',
                        })}
                    />
                    {errors.dob && <p>{errors.dob.message}</p>}</h2>

                <h2>  <label> מס' טלפון</label>
                    <input type='text'  {...register('telephonNum', { required: "telephonNum name is required", pattern: { message: "telephon number  must begin with the digits 0 and its length must be 9    ", value: /^0\d{8}$/
} })} />
                    {errors.telephonNum && <p>{errors.telephonNum.message}</p>}</h2>
                <h2>   <label > מס' נייד</label>
                    <input type='text' {...register('phonNum', { required: "phonNum name is required", pattern: { message: "phon number  must begin with the digits 05 and its length must be 10 ", value: /^05\d{8}$/} })} />
                    {errors.phonNum && <p>{errors.phonNum.message}</p>}</h2>
                כתובת:
                <h2> <label > עיר </label>
                    <input type='text' {...register('city', { required: "city name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.city && <p>{errors.city.message}</p>} </h2>
                <h2> <label > רחוב </label>
                    <input type='text' {...register('street', { required: "street name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.street && <p>{errors.street.message}</p>} </h2>
                <h2> <label > מס' בית </label>
                    <input type='text' {...register('houseNum', { required: "houseNum name is required", pattern: { message: " מספרים בלבד!", value: /^[0-9]{1,3}$/, } })} />
                    {errors.houseNum && <p>{errors.houseNum.message}</p>} </h2>
                קבלת חיסון:
                <h2> <label > תאריך קבלת חיסון</label>
                    <input type='date'  {...register('date',{ min: { value:watch('dob'), message: " date must be after date of birth " } },  { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } })} />
                    {errors.date && <p>{errors.date.message}</p>} </h2>

                <h2> <label > יצרן  החיסון</label>
                    <select {...register('manufacturer')}>
                        <option value={null}>{null} </option>
                        <option value="Moderna" >Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="AstraZeneca">AstraZeneca (Vaxzevria)</option>
                        <option value="Johnson & Johnson">Johnson & Johnson(Janssen)</option>
                        <option value="Sinovac">Sinovac (CoronaVac)</option>
                        <option value="Sinopharm">Sinopharm (BBIBP-CorV)</option>
                        <option value="Bharat Biotech">Bharat Biotech (Covaxin)</option>
                    </select>
                    {errorVaccinArr && <p>must fill manufacturer and date to vaccin</p>} </h2>


                <h2>  <label > תאריך בו נמצא חיובי לנגיף </label>
                    <input type='date'  {...register('positiveDate', { min: { value:watch('dob'), message: " date must be after date of birth " } }, { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } })} />
                    {errors.positiveDate && <p>{errors.positiveDate.message}</p>}</h2>
                <h2>  <label > תאריך החלמה </label>
                    <input type='date' {...register('recoveryDate', { min: { value: watch('positiveDate')&&watch('dob'), message: " date must be after positive and after date of birth" } }, { max: { value: new Date().toISOString().split("T")[0], message: "recovery date must be before today" } })} />
                    {errors.recoveryDate && <p>{errors.recoveryDate.message}</p>}</h2>
                <button type="submit">הוסף חבר</button>
            </form>
        </>
    );
}

export default AddPatientForm; 