import { Link } from "react-router-dom";

const NavBar = () => {
    return (<>
        <Link to={'/addPatient'}>
            <input type="button" value="הוסף חבר" />
        </Link>
    </>);
}

export default NavBar;