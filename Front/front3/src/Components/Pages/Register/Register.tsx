import {Button, TextField} from "@mui/material";
import "./Register.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useState} from "react";

const Register = () => {
    // use form for form validation
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const send = async (event: any) => {
        try {
            event.preventDefault();

            // check email
            if (email === "") {
                alert("Email is missing");
                return;
            }

            // check password
            if (password === "") {
                alert("Password is missing");
                return;
            }

            // check if email is valid email using regex
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert("Email is not valid");
                return;
            }

            // check if password is at least 4 characters long
            if (password.length < 4) {
                alert("Password is too short");
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
        // <div className="Login Box">
        //   <form onSubmit={handleSubmit(send)}>
        //   <h1>Login</h1>
        //   <TextField placeholder="enter your email"
        //   {...register("email", {
        //     required: true,
        //     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //   })}
        //   error={Boolean(errors.email)}
        //   helperText={
        //     errors.email &&
        //     "Email is required and must be a valid email address"
        //   }
        //   ></TextField>
        //   <br/>
        //   <br/>
        //   <TextField placeholder="enter your password"
        //     {...register("password", {
        //       required: true,
        //       minLength: 4,
        //     })}
        //     error={Boolean(errors.password)}
        //     helperText={
        //       errors.password &&
        //       "Password must have a minimum of 4 characters"
        //     }
        //   ></TextField>
        //   <br/>
        //   <br/>
        //   <Button onClick={()=>navigate("/VacationsList")}>Login</Button>
        //   </form>
        // </div>
        <div>
            <form className="Box">
            <label htmlFor='firstNamelRegisterInput'>
                    First Name:
                </label>
                <input
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    type="firstName" name="firstNameRegisterInput" id='firstNameRegisterInput'/>
                    <br/>
                    <br/>
                <label htmlFor='lastNameRegisterInput'>
                    Last Name:
                </label>
                <input
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    type="lastName" name="LastNameRegisterInput" id='LastNameRegisterInput'/>
                    <br/>
                    <br/>
                <label htmlFor='emailLoginInput'>
                    Email:
                </label>
                <input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="email" name="emailLoginInput" id='emailLoginInput'/>
                    <br/>
                    <br/>
                <label htmlFor='passwordLoginInput'>
                    Password:
                </label>
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    type="password" name="passwordLoginInput" id='passwordLoginInput'/>
                    <br/>
                    <br/>
                <button onClick={(event)=>send(event)}>Register</button>
            </form>
        </div>
    );
}

export default Register;