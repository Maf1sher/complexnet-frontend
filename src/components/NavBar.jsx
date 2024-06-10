import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function NavBar() {

    const { auth } = useAuth();

    // useEffect({

    // }, [auth])


    return (
        <div className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand">ComplexNet</div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link"> Home </Link>
                    </li>
                </ul>
                {
                    auth?.fullName ? <span className="navbar-text">zalogowany</span> :
                    // <a className="btn btn-primary" >Login</a>
                    <Link to="/login" className="btn btn-primary"> Login </Link>
                }
                
            </div>
        </div>
    );
}

export default NavBar
