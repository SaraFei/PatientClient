// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import { useLocation } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { upDatePatient } from './patientApi';
// import { useDispatch } from 'react-redux';
// import { upDatePatientInClient } from './patientSlice';

const UpDatePatient = () => {
    let location = useLocation();
    let patient = location.state;
    // let dispatch = useDispatch();
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            firstName: patient.firstName,
            lastName: patient.lastName,
            id: patient.id,
            dob:patient.dob,
            city: patient.address.city,
            street:patient.address.street,
            telephonNum: patient.telephonNum,
            phonNum: patient.phonNum,
            receivingVaccineDate: patient.receivingVaccineDate,
            positiveDate: patient.positiveDate,
            recoveryDate: patient.recoveryDate,
        }
    });


    let idVaccineD = 0, idVaccineM = 0;
    //כמה שדות ליצור בשביל החיסון מקסימום ארבע, לבדוק כמה חסר
    let numFieldVaccine = patient.receivingVaccineDate;
    let copyPatientArr = patient.receivingVaccineDate;
    let numFieldVaccineToedit = [];
    // let initialForArr=numFieldVaccine.length+1;//מפה תתחיל לבצע השמה זה יכול ליפול כי אם אין מקום במערך
    let vaccineNum = (numFieldVaccine.length) + 1;
    for (let i = 0; i < 4 - (numFieldVaccine.length); i++) {
        numFieldVaccineToedit[i] = i;
    }

    const checkIsNull = (receivingVaccineDM) => {
        let newArr = [];
        for (let i = 0; i < receivingVaccineDM.length && receivingVaccineDM[i] !== undefined || receivingVaccineDM[i] !== undefined; i++) {
            if (receivingVaccineDM[i].date != "" || receivingVaccineDM[i].date != '' || receivingVaccineDM[i].date != undefined && receivingVaccineDM[i].manufacturer != "" || receivingVaccineDM[i].manufacturer != '' || receivingVaccineDM[i].manufacturer != undefined)
                newArr.push(receivingVaccineDM[i]);
            else {
                newArr.push(patient.receivingVaccineDate[i]);
            }
        }
        if (copyPatientArr < 4) {
            for (let i = 0; i < 4; i++) {
                copyPatientArr.push(newArr[i]);
            }
        }
        return copyPatientArr;
        return newArr;
    }
    const checkDidntEdited = (receivingVaccineDM) => {
        for (let i = 0; i < receivingVaccineDM.length; i++) {
            if (receivingVaccineDM[i] === '' || receivingVaccineDM[i] === null || receivingVaccineDM[i] === undefined) {
                receivingVaccineDM[i] = patient.receivingVaccineDate[i];
            }

        }
    }

    const aa=(date0, manufacturer0 ,
        date1, manufacturer1,
         date2, manufacturer2 ,
       date3, manufacturer3)=>{
        if(manufacturer0!=""||manufacturer0!=undefined||manufacturer0!=null){
            patient.receivingVaccineDate[0].manufacturer=manufacturer0;
            patient.receivingVaccineDate[0].date=date0;
        }
        if(manufacturer1!=""||manufacturer1!=undefined||manufacturer1!=null){
            patient.receivingVaccineDate[1].manufacturer=manufacturer1;
            patient.receivingVaccineDate[1].date=date1;
        }
        if(manufacturer2!=""||manufacturer2!=undefined||manufacturer2!=null){
            patient.receivingVaccineDate[2].manufacturer=manufacturer2;
            patient.receivingVaccineDate[2].date=date2;
        }
        if(manufacturer3!=""||manufacturer3!=undefined||manufacturer3!=null){
            patient.receivingVaccineDate[3].manufacturer=manufacturer3;
            patient.receivingVaccineDate[3].date=date3;
        }
    }





    const save = async (data) => {
        console.log(data);
        let {firstName, lastName, telephonNum, phonNum, city, street, houseNum, positiveDate, recoveryDate, date0, manufacturer0,
            date1, manufacturer1, date2, manufacturer2, date3, manufacturer3 } = data;
        let address = { city, street, houseNum };
        
await aa(
    ( date0, manufacturer0 ,
     date1, manufacturer1,
      date2, manufacturer2 ,
    date3, manufacturer3) );

        let patientToEdit = {
            firstName,
            lastName,
            telephonNum,
            phonNum,
            address,
            receivingVaccineDate: patient.receivingVaccineDate,
            positiveDate,
            recoveryDate
        }
        try {
 console.log("patientToEdit before update:", patientToEdit);
            const response = await upDatePatient(patient._id, patientToEdit);
            // dispatch(upDatePatientInClient(response.data));
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






    const saveEdited = async (data) => {
        console.log(data);
        let { firstName, lastName, telephonNum, phonNum, city, street, houseNum, positiveDate, recoveryDate, date0, manufacturer0,
            date1, manufacturer1, date2, manufacturer2, date3, manufacturer3 } = data;
        let address = { city, street, houseNum };
        // let receivingVaccineDM = [{ date: date0, manufacturer: manufacturer0 }, { date: date1, manufacturer: manufacturer1 }, { date: date2, manufacturer: manufacturer2 }, { date: date3, manufacturer: manufacturer3 }];
        // let toAdd = await checkIsNull(receivingVaccineDM);
        //צריך לעשות push????
        // let receivingVaccineDate = toAdd;
        // let toAdd = await checkDidntEdited(receivingVaccineDM);





        let receivingVaccineDM = [
            { date: date0, manufacturer: manufacturer0 },
            { date: date1, manufacturer: manufacturer1 },
            { date: date2, manufacturer: manufacturer2 },
            { date: date3, manufacturer: manufacturer3 }
        ];
    
        // צור את המערך שיכיל את כל החיסונים
        let vaccines = [];
    
        // עבור כל זוג שדות תוסיף חיסון חדש למערך החיסונים
        for (let i = 0; i < receivingVaccineDM.length; i += 2) {
            // בדוק שיש ערכים לשני השדות
            if (receivingVaccineDM[i] && receivingVaccineDM[i + 1]) {
                vaccines.push({
                    date: receivingVaccineDM[i].date,
                    manufacturer: receivingVaccineDM[i].manufacturer
                });
                vaccines.push({
                    date: receivingVaccineDM[i + 1].date,
                    manufacturer: receivingVaccineDM[i + 1].manufacturer
                });
            }
        }



        let patientToEdit = {
            firstName,
            lastName,
            telephonNum,
            phonNum,
            address,
            receivingVaccineDate: vaccines,
            positiveDate,
            recoveryDate
        }
        try {
 console.log("patientToEdit before update:", patientToEdit);
            const response = await upDatePatient(patient._id, patientToEdit);
            // dispatch(upDatePatientInClient(response.data));
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
    return (<>עריכת פרטי המשתמש {`${patient.lastName} ${patient.firstName}`}
       
        <form onSubmit={handleSubmit(save)}>
            <h2>  <label htmlFor='firstName'>שם פרטי</label>
                <input type='text' id='firstName' {...register('firstName', { required: "first name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.firstName && <p>{errors.firstName.message}</p>}</h2>
            <h2>       <label htmlFor='lastName'>שם משפחה</label>
                <input type='text' id='lastName'  {...register('lastName', { required: "first name is required", pattern: { message: "שם מורכב רק מאותיות", value: /^[A-Za-zא-ת\s]+$/ } })} />
            </h2>
            <label htmlFor='id'> ת.ז.</label>
            <h2>    <input type='text' id='id' value={patient.id} disabled />
                {errors.id && <p>{errors.id.message}</p>}</h2>
                <h2><label>תאריך לידה</label>
                <input type='text'  disabled/>
                </h2>
            <h2>  <label htmlFor='telephonNum'> מס' טלפון</label>
                <input type='text' id='telephonNum' {...register('telephonNum', { required: "telephonNum name is required", pattern: { message: "מס' הטלפון 9 ספרות ", value: /^[0-9]{9}$/ } })} />
                {errors.telephonNum && <p>{errors.telephonNum.message}</p>}</h2>
            <h2>   <label htmlFor='phonNum'> מס' נייד</label>
                <input type='text' id='phonNum'  {...register('phonNum', { required: "phonNum name is required", pattern: { message: "מס' נייד 10 ספרות ", value: /^[0-9]{10}$/ } })} />
                {errors.phonNum && <p>{errors.phonNum.message}</p>}</h2>
            כתובת:
            <h2> <label htmlFor='city'> עיר </label>
                <input type='text' id='city' {...register('city', { required: "city name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.city && <p>{errors.city.message}</p>} </h2>
            <h2> <label htmlFor='street'> רחוב </label>
                <input type='text' id='street' {...register('street', { required: "street name is required", pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.street && <p>{errors.street.message}</p>} </h2>
            <h2> <label htmlFor='houseNum'> מס' בית </label>
                <input type='text' id='houseNum'  {...register('houseNum', { required: "houseNum name is required", pattern: { message: " מספרים בלבד!", value: /^[0-9]/,maxLength:3 } })} />
                {errors.houseNum && <p>{errors.houseNum.message}</p>} </h2>
            קבלת חיסון:
            מס החיסונים שקיבל:{numFieldVaccine.length}
            {/* מס החיסונים שקיבל:{numFieldVaccine.length}
            {numFieldVaccine.map(item => {
                return (<>

                    <h2> <label htmlFor='date'> תאריך קבלת חיסון</label>
                        <input type='text' id='date' value={item.date} disabled /> </h2>

                    <h2> <label htmlFor='manufacturer'> יצרן  החיסון</label>
                        <input type='text' id='manufacturer' value={item.manufacturer} disabled /> </h2>
                </>

                )
            })}

            {numFieldVaccineToedit.map(item => {
                return (<>
                    חיסון מס'{vaccineNum++}
                    <h2> <label htmlFor='date'> תאריך קבלת חיסון</label>
                        <input type='text' id='date' {...register(`date${idVaccineD++}`, { pattern: { message: " פורמט תאריך yyyy/mm/dd" } })} />
                        {errors.date && <p>{errors.date.message}</p>} </h2>

                    <h2> <label htmlFor='manufacturer'> יצרן  החיסון</label>
                        <input type='text' id='manufacturer' {...register(`manufacturer${idVaccineM++}`, { pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                        {errors.manufacturer && <p>{errors.manufacturer.message}</p>} </h2>
                </>

                )
            })} */}
            {numFieldVaccine[0] ? <h2><label> תאריך קבלת חיסון </label>
                <input type='date' /></h2> : <h2><label> תאריך קבלת חיסון </label> <input type='date' {...register('date0', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.date0 && <p>{errors.date1.message}</p>}</h2>}


            {numFieldVaccine[0] ? <h2><label> יצרן</label>
                <input type='text'  /></h2> : <h2> <input type='text' {...register('manufacturer0', { pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.manufacturer0 && <p>{errors.manufacturer0.message}</p>}</h2>}

            {numFieldVaccine[1] ? <h2><label> תאריך קבלת חיסון </label>
                <input type='date' defaultValue={numFieldVaccine[1].date} /></h2> : <h2><label> תאריך קבלת חיסון </label> <input type='date' {...register('date1', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.date1 && <p>{errors.date1.message}</p>}</h2>}


            {numFieldVaccine[1] ? <h2><label> יצרן</label>
                <input type='text' /></h2> : <h2> <input type='text' {...register('manufacturer1', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.manufacturer1 && <p>{errors.manufacturer1.message}</p>}</h2>}

            {numFieldVaccine[2] ? <h2><label> תאריך קבלת חיסון </label>
                <input type='date' d /></h2> : <h2><label> תאריך קבלת חיסון </label> <input type='date'{...register('date2', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.date2 && <p>{errors.date2.message}</p>}</h2>}


            {numFieldVaccine[2] ? <h2><label> יצרן</label>
                <input type='text'  /></h2> : <h2> <input type='text' {...register('manufacturer2', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.manufacturer2 && <p>{errors.manufacturer2.message}</p>}</h2>}

            {numFieldVaccine[3] ? <h2><label> תאריך קבלת חיסון </label>
                <input type='date' /></h2> : <h2> <label> תאריך קבלת חיסון </label> <input type='date'{...register('date3', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.date3 && <p>{errors.date3.message}</p>}</h2>}


            {numFieldVaccine[3] ? <h2><label> יצרן</label>
                <input type='text' /></h2> : <h2> <label> יצרן</label> <input type='text' {...register('manufacturer3', { pattern: { message: "אותיות בלבד", value: /^[A-Za-zא-ת\s]+$/ } })} />
                {errors.manufacturer3 && <p>{errors.manufacturer3.message}</p>}</h2>}






            {patient.positiveDate ? <h2><label htmlFor='positiveDate'> תאריך בו נמצא חיובי לנגיף </label>
                <input type='text' id='positiveDate' disabled /></h2> : <h2> <input type='text' id='positiveDate' {...register('positiveDate', { message: " פורמט תאריך yyyy/mm/dd" })} />
                {errors.positiveDate && <p>{errors.positiveDate.message}</p>}</h2>}


            {patient.recoveryDate ? <h2>  <label htmlFor='recoveryDate'> תאריך החלמה </label>
                <input type='text' id='recoveryDate' disabled /></h2> :
                <h2>  <label htmlFor='recoveryDate'> תאריך החלמה </label>
                    <input type='text' id='recoveryDate' {...register('recoveryDate', { message: " פורמט תאריך yyyy/mm/dd" })} />
                    {errors.recoveryDate && <p>{errors.recoveryDate.message}</p>}</h2>
            }

            <button type="submit"> עדכן פרטים</button>
        </form>
    </>);
}

export default UpDatePatient;