import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<h2>Menu</h2>
            <hr />
            <NavLink to="/login">Login</NavLink>
            <br />
            <br />
            <NavLink to="/register">Register</NavLink>
            <br />
            <br />
            <NavLink to="/addVacation">AddVacation</NavLink>
            <br/>
            <br/>
            <NavLink to="/editVacation">EditVacation</NavLink>
        </div>
    );
}

export default Menu;
