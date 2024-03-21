import { useForm } from 'react-hook-form';
import { addPatient } from './patientApi';
import { useDispatch } from 'react-redux';
import { addPatientToClient } from './patientSlice';
import { useNavigate } from 'react-router-dom';
const AddPatientForm = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const tryAddPatient = async (data) => {
        let { firstName, lastName, id, telephonNum, phonNum, city, street, houseNum, positiveDate, recoveryDate, date, manufacturer } = data;
        let address = { city, street, houseNum };
        let receivingVaccineDate = [{ date, manufacturer}];
        let patient = {
            firstName,
            lastName,
            id,
            telephonNum,
            phonNum,
            address,
            receivingVaccineDate,
            positiveDate,
            recoveryDate
        }
        try {
           
            const response = await addPatient(patient);
            alert("החבר נוסף בהצלחה!");
            console.log("add by success");
            setTimeout(() => { navigate('/') }, 1000)

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
                <h2>  <label htmlFor='firstName'>שם פרטי</label>
                    <input type='text' id='firstName' {...register('firstName', { required: "first name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}</h2>
                <h2>       <label htmlFor='lastName'>שם משפחה</label>
                    <input type='text' id='lastName' {...register('lastName', { required: "last name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}</h2>
                <label htmlFor='id'> ת.ז.</label>
                <h2>    <input type='text' id='id' {...register('id', {
                    required: "id is required", pattern: {
                        value: /^[0-9]{9}$/,
                        message: 'נא הקש ת.ז. תקינה! בעלת 9 ספרות בלבד'
                    }
                })} />
                    {errors.id && <p>{errors.id.message}</p>}</h2>
                <h2>  <label htmlFor='telephonNum'> מס' טלפון</label>
                    <input type='text' id='telephonNum' {...register('telephonNum', { required: "telephonNum name is required", pattern: { message: "מס' הטלפון 9 ספרות ", value: /^[0-9]{9}$/ } })} />
                    {errors.telephonNum && <p>{errors.telephonNum.message}</p>}</h2>
                <h2>   <label htmlFor='phonNum'> מס' נייד</label>
                    <input type='text' id='phonNum' {...register('phonNum', { required: "phonNum name is required", pattern: { message: "מס' נייד 10 ספרות ", value: /^[0-9]{10}$/ } })} />
                    {errors.phonNum && <p>{errors.phonNum.message}</p>}</h2>
                כתובת:
                <h2> <label htmlFor='city'> עיר </label>
                    <input type='text' id='city' {...register('city', { required: "city name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.city && <p>{errors.city.message}</p>} </h2>
                <h2> <label htmlFor='street'> רחוב </label>
                    <input type='text' id='street' {...register('street', { required: "street name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.street && <p>{errors.street.message}</p>} </h2>
                <h2> <label htmlFor='houseNum'> מס' בית </label>
                    <input type='text' id='houseNum' {...register('houseNum', { required: "houseNum name is required", pattern: { message: " מספרים בלבד!", value: /^[0-9]{2}$/ } })} />
                    {errors.houseNum && <p>{errors.houseNum.message}</p>} </h2>
                קבלת חיסון:
                <h2> <label htmlFor='date'> תאריך קבלת חיסון</label>
                    <input type='text' id='date' {...register('date', { pattern: { message: " פורמט תאריך yyyy/mm/dd" } })} />
                    {errors.date && <p>{errors.date.message}</p>} </h2>

                <h2> <label htmlFor='manufacturer'> יצרן  החיסון</label>
                    <input type='text' id='manufacturer' {...register('manufacturer', { pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                    {errors.manufacturer && <p>{errors.manufacturer.message}</p>} </h2>


                <h2>  <label htmlFor='positiveDate'> תאריך בו נמצא חיובי לנגיף </label>
                    <input type='text' id='positiveDate' {...register('positiveDate', { message: " פורמט תאריך yyyy/mm/dd" })} />
                    {errors.positiveDate && <p>{errors.positiveDate.message}</p>}</h2>
                <h2>  <label htmlFor='recoveryDate'> תאריך החלמה </label>
                    <input type='text' id='recoveryDate' {...register('recoveryDate', { message: " פורמט תאריך yyyy/mm/dd" })} />
                    {errors.recoveryDate && <p>{errors.recoveryDate.message}</p>}</h2>
                <button type="submit">הוסף חבר</button>
            </form>
        </>
    );
}

export default AddPatientForm; 