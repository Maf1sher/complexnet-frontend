import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';


function NavBar() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    // useEffect({

    // }, [auth])

    function logout() {
        // localStorage.removeItem('token');
        deleteFromStorage('token');
        navigate("/login");
    }

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
                    // auth?.fullName ? <span className="navbar-text"><button className="btn" onClick={logout}>Logout</button></span> :
                    auth?.fullName ? <button className="btn btn-outline-danger" onClick={logout}>Logout</button> :
                    // <a className="btn btn-primary" >Login</a>
                    <Link to="/login" className="btn btn-outline-success"> Login </Link>
                }
                
            </div>
        </div>
    );
}

export default NavBar
