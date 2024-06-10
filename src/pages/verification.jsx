import VerificationInput from "react-verification-input";
import { AuthenticationApi } from "../api/api";
import { redirect } from "react-router-dom";

export function Verification() {
    const api = new AuthenticationApi;
    function complete(code){
        api.confirm(code)
        .then(response => {
            window.location.href = "/login"
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card d-flex align-items-center" data-bs-theme="dark">
                        <h2 className="d-flex justify-content-center pt-5">Enter your code</h2>
                        <p className="text-white-50 mb-5 ps-5 pe-5 text-center">
                            For added security, please enter the six digit code present in the email that was sent to you
                        </p>
                        <div className="card-body">
                            <VerificationInput validChars='0-9' onComplete={complete}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}