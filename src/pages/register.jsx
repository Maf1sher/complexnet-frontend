import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { AuthenticationApi } from "../api/api";
import { redirect } from "react-router-dom";

export function Register() {
    const api = new AuthenticationApi;

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const firstname = formJson.firstname;
        const lastname = formJson.lastname;
        const email = formJson.email;
        const password = formJson.password;
        const repassword = formJson.repassword;

        console.log({firstname, lastname, email, password});

        api.register({firstname, lastname, email, password})
            .then(response =>{
                window.location.href = "/verification";
            })
            .catch(error =>{
                console.log(error);
            });
    }


    return (
        <>
            <NavBar />
            <form action="postDto" className="pt-5" onSubmit={handleSubmit}>
                <div className="container vh-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card d-flex align-items-center" data-bs-theme="dark">
                                <div className="card-body">
                                    <h2 className="d-flex justify-content-center pt-5 pb-5">Create an account</h2>
                                    {/* <p class="text-white-50 mb-5">Please enter your login and password!</p> */}
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="firstname" placeholder="Firstname" name="firstname"></input>
                                        <label for="firstname" className="">Firstname</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="lastname" placeholder="Lastname" name="lastname"></input>
                                        <label for="lastname" className="">Lastname</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email"></input>
                                        <label for="email" className="">Email</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="password" placeholder="Password" name="password"></input>
                                        <label for="password" className="">Password</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="repassword" placeholder="Repeat password" name="repassword"></input>
                                        <label for="repassword" className="">Repeat password</label>
                                    </div>
                                    
                                </div>
                                {/* <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                                <div className="pt-5 pb-5">
                                <p class="mb-0">Have an account? <Link to="/register" className="text-white-50 fw-bold">Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}