/*import {Button, TextField} from "@mui/material";
import "./AddVacations.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import Vacation from "../../../interfaces/Vacation";


const AddVacation = (newVacation: Vacation) => {
    // use form for form validation
    const {
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [destination, setdestination] = useState("");
    const [description, setdescription] = useState("");
    const [startOn, setstartOn] = useState("");
    const [endOn, setendOn] = useState("");
    const [price, setprice] = useState("");

    const send = async (event: any) => {
        try {
            event.preventDefault();

            // check price
            if (price < 0 || price > 10000) {
                alert("It is not possible to enter a negative number or higher than 10,000");
                return;
            }
            
            // check endOn>startOn
            if (startOn>endOn) {
                alert("The end date can not be earlier than the start date");
                return;
            }



            console.log('1')

            const res = await fetch(`http://localhost:8080/user/login`, {
                method: "POST",
                body: JSON.stringify({email, password}),
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
            <form>
            <label htmlFor='firstNamelRegisterInput'>
                    destination:
                </label>
                <input
                    value={destination}
                    onChange={event => setdestination(event.target.value)}
                    type="firstName" name="firstNameRegisterInput" id='firstNameRegisterInput'/>
                <label htmlFor='lastNameRegisterInput'>
                    description:
                </label>
                <input
                    value={description}
                    onChange={event => setdescription(event.target.value)}
                    type="lastName" name="LastNameRegisterInput" id='LastNameRegisterInput'/>
                <label htmlFor='emailLoginInput'>
                    start On:
                </label>
                <input
                    value={startOn}
                    onChange={event => setendOn(event.target.value)}
                    type="email" name="emailLoginInput" id='emailLoginInput'/>
                <label htmlFor='passwordLoginInput'>
                    end On:
                </label>
                <input
                    value={endOn}
                    onChange={event => setendOn(event.target.value)}
                    type="password" name="passwordLoginInput" id='passwordLoginInput'/>
                <button onClick={(event)=>send(event)}>Register</button>
                <label htmlFor='passwordLoginInput'>
                    Price:
                </label>
                <input
                    value={price}
                    onChange={event => setprice(event.target.value)}
                    type="password" name="passwordLoginInput" id='passwordLoginInput'/>
                <button onClick={(event)=>send(event)}>Register</button>
            </form>
        </div>
    );
}

export default AddVacation;*/
