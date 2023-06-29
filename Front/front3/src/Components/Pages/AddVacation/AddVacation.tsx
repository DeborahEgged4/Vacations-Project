import {Button, TextField} from "@mui/material";
import "./AddVacation.css";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Vacation from "../../../interfaces/Vacation";


const AddVacation = () => {
    // use form for form validation

    const [destination, setdestination] = useState(""); 
    const [description, setdescription] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [price, setprice] = useState(0);
    const [image,setImage] = useState("");

    const send = async (event: any) => {
        try {
            event.preventDefault();

            // check price
            if (price < 0 || price > 10000) {
                alert("It is not possible to enter a negative number or higher than 10,000");
                return;
            }
            
            // check endOn>startOn
            if (startDate>endDate) {
                alert("The end date can not be earlier than the start date");
                return;
            }



            console.log('1')

            const res = await fetch(`http://localhost:8080/vacation/addVacation`, {
                method: "POST",
                body: JSON.stringify({
           
                 destination,
                  description,
                   startDate,
                   endDate,
                   price,
                   image,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log(res);
            console.log('2')

            if (res.status === 200){
                const data = await res.json();
                console.log('3')

                console.log(`data from login is: ${data}`);
                console.log('4')


                // change the route to /vacations
                navigate("/vacationsList");
            } else if (res.status === 404) {
                alert("Incorrect email or password");
            }
        } catch (error: any) {
            console.error(`Error in login, message: ${error.message}, stack: ${error.stack}`);
        }

    };


    const navigate = useNavigate();
    return (
        <div>
            <form className="Box">
            <label htmlFor='firstNamelRegisterInput'>
                    destination:
                </label>
                <input
                    value={destination}
                    onChange={event => setdestination(event.target.value)}
                    type="text" name="firstNameRegisterInput" id='firstNameRegisterInput'/>
                    <br/>
                    <br/>
                <label htmlFor='lastNameRegisterInput'>
                    description:
                </label>
                <input
                    value={description}
                    onChange={event => setdescription(event.target.value)}
                    type="text" name="LastNameRegisterInput" id='LastNameRegisterInput'/>
                    <br/>
                    <br/>
                <label htmlFor='emailLoginInput'>
                    start On:
                </label>
                <input
                    value={startDate}
                    onChange={event => setstartDate(event.target.value)}
                    type="date" name="emailLoginInput" id='emailLoginInput'/>
                    <br/>
                    <br/>
                <label htmlFor='passwordLoginInput'>
                    end On:
                </label>
                <input
                    value={endDate}
                    onChange={event => setendDate(event.target.value)}
                    type="date" name="passwordLoginInput" id='passwordLoginInput'/>
                    <br/>
                    <br/>
                <label htmlFor='passwordLoginInput'>
                    Image:
                </label>
                <input
                    value={image}
                    onChange={event => setendDate(event.target.value)}
                    type="text" name="passwordLoginInput" id='passwordLoginInput'/>
                    <br/>
                    <br/>

                <label htmlFor='passwordLoginInput'>
                    Price:
                </label>
                <input
                    value={price}
                    onChange={event => setprice(+(event.target.value))}
                    type="number" name="passwordLoginInput" id='passwordLoginInput'/>
                    <br/>
                    <br/>
                    <button onClick={(event)=>send(event)}>Add Vacation</button>
            </form>
        </div>
    );
}

export default AddVacation; 
