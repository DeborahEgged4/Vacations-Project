import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(props: {user?: any}): JSX.Element {
    return (
        <div className="Menu">
			<h2>Menu</h2>
            {  !props.user && <><hr />
           <NavLink to="/login">Login</NavLink>
            <br /></>}
            {!props.user && <><br />
             <NavLink to="/register">Register</NavLink>
            <br /></>}
            <br />
            {props?.user?.isAdmin && <NavLink to="/addVacation">AddVacation</NavLink>}
            <br/>
            <br/>
        </div>
    );
}

export default Menu;
