import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { AuthenticationApi } from "../api/api";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {
    const api = new AuthenticationApi;
    const [errorMsg, setErrorMsg] = useState([]);
    const navigate = useNavigate();

    function handleSubmit(e) {
        setErrorMsg([]);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const firstname = formJson.firstname;
        const lastname = formJson.lastname;
        const email = formJson.email;
        const password = formJson.password;
        const repassword = formJson.repassword;

        if(password === repassword){
                    api.register({firstname, lastname, email, password})
            .then(response =>{
                // window.location.href = "/verification";
                navigate("/verification");
            })
            .catch(error => {
                if (error.response.data.validationErrors) {
                    setErrorMsg(error.response.data.validationErrors);
                }
                else {
                    setErrorMsg(a => [...a, error.response.data.error]);
                }
            });
        }
        else{
            setErrorMsg([...errorMsg, "Passwords don't match"]);
        }

    }


    return (
        <>
            <NavBar />
            <form action="postDto" className="pt-5" onSubmit={handleSubmit} noValidate>
                <div className="container vh-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card d-flex align-items-center" data-bs-theme="dark">
                                <div className="card-body">
                                    <h2 className="d-flex justify-content-center pt-5 pb-5">Create an account</h2>
                                    {/* <p className="text-white-50 mb-5">Please enter your login and password!</p> */}
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="firstname" placeholder="Firstname" name="firstname"></input>
                                        <label htmlFor="firstname" className="">Firstname</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="lastname" placeholder="Lastname" name="lastname"></input>
                                        <label htmlFor="lastname" className="">Lastname</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email"></input>
                                        <label htmlFor="email" className="">Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="password" placeholder="Password" name="password"></input>
                                        <label htmlFor="password" className="">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="repassword" placeholder="Repeat password" name="repassword"></input>
                                        <label htmlFor="repassword" className="">Repeat password</label>
                                    </div>
                                    {errorMsg.length > 0 &&
                                        <div className="alert alert-danger">
                                            {errorMsg.map((e, index) => <p key={index}>{e}</p>)}
                                        </div>
                                    }
                                    
                                </div>
                                {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                                <div className="pt-5 pb-5">
                                <p className="mb-0">Have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}