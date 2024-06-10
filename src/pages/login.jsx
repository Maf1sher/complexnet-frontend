
import React, { useState } from 'react';
import { AuthenticationApi, PostControllerApi } from "../api/api";
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export function Login() {

    // const [authRequest, setAuthRequest] = useState({ email: "", password: "" });
    // const { auth, setAuth } = useContext(AuthContext);
    const { auth, setAuth } = useAuth();
    const [errorMsg, setErrorMsg] = useState([]);
    const api = new AuthenticationApi;
    const postApi = new PostControllerApi;
    const navigate = useNavigate();

    function handleSubmit(e) {
        setErrorMsg([]);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        const email = formJson.email;
        const password = formJson.password;
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);

        api.authenticate({ email, password })
            .then(response => {
                console.log('Authentication successful:', response);
                const token = response.data.token;
                // const decode = jwtDecode(token);
                // const fullName = decode.fullName;
                // const roles = decode.authorities;
                // setAuth({email, password, token, fullName, roles});

                localStorage.setItem("token", token);
                console.log("auth", auth);
                navigate(-1);
            })
            .catch(error => {
                console.log(error);
                if (error.response.data.validationErrors) {
                    setErrorMsg(error.response.data.validationErrors);
                }
                else {
                    // console.error('Authentication failed:', error);
                    // errorMsg.push(error.)
                    setErrorMsg(a => [...a, error.response.data.error]);
                }
            });

        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson)
    }

    function clickButton() {
        const token = auth.token;

        postApi.getAllPosts({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => console.log(response)
            .catch(e => console.log(e)));
    }


    // const errors = errorMsg.map(erorr => <p> {erorr}</p>)

    return (
        <>
            <NavBar />
            <form action="postDto" onSubmit={handleSubmit}>
                <div className="container vh-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card d-flex align-items-center" data-bs-theme="dark">
                                <div className="card-body">
                                    <h2 className="d-flex justify-content-center pt-5">Login</h2>
                                    <p class="text-white-50 mb-5">Please enter your login and password!</p>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email"></input>
                                        <label for="email" className="">Email</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="password" placeholder="password" name="password"></input>
                                        <label for="password" className="">Password</label>
                                    </div>
                                </div>
                                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                <div className="pt-5 pb-5">
                                    <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


            {/* <form action="postDto" onSubmit={handleSubmit}>
                <div className="container-fluid card login-container w-50">
                    <h3 className="text-center">Login</h3>

                    {errorMsg.length > 0 &&
                        <div className="alert alert-danger">
                            {errorMsg.map((e, index) => <p key={index}>{e}</p>)}
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="login" placeholder="name@example.com" name="email"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password"></input>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <input type="submit" className="btn btn-primary"></input>
                    <em className="fas fa-sign-in-alt">&nbsp;Sign in</em>
                </div>
                <div>
                    Don't have an account?&nbsp;
                    <a href="#" className="btn btn-link">Register</a>
                </div>
            </form>
            <button className='btn btn-primary' onClick={clickButton}>

            </button> */}

        </>


    )
}
