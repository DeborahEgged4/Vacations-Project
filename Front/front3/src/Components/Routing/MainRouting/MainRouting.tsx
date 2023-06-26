import {Route, Routes} from "react-router-dom";
import "./MainRouting.css";
import Page404 from "../../Pages/Page404/Page404";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import VacationsList from "../../Pages/VacationsList/VacationsList";
import React from "react";
import EditVacation from "../../Pages/EditVacation/EditVacation";

interface IMainRoutingProps {
    user: any,
    isLogged: boolean,
    isAdmin: boolean,
    setUser: React.Dispatch<any>
    setIsLogged: React.Dispatch<any>
    setIsAdmin: React.Dispatch<any>
}

const MainRouting = (props: IMainRoutingProps) => {
    return (
        <div className="MainRouting">
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login
                    setUser={props.setUser}
                    setIsLogged={props.setIsLogged}
                    setIsAdmin={props.setIsAdmin}
                />}/>
                <Route path="*" element={<Page404/>}/>
                <Route path="/addVacation" element={<AddVacation/>}/>
                <Route path={'vacationsList'} element={<VacationsList
                    isAdmin={props.isAdmin}
                />}/>
                <Route path="/editVacation" element={<EditVacation/>}/>
            </Routes>
        </div>
    );
}

export default MainRouting;
