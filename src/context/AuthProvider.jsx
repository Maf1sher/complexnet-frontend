import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from "@rehooks/local-storage";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [ token ] = useLocalStorage("token");
    // window.dispatchEvent(new Event("storage"));
    // const [token] = useState(localStorage.getItem("token"));
    // const token = localStorage.getItem("token");
    useEffect(() => {
        // console.log(token);
        if (token) {
            const decode = jwtDecode(token, {});
            const email = decode.subject;
            const fullName = decode.fullName;
            const roles = decode.authorities;

            setAuth({ email, token, fullName, roles });
        }
        else{
            setAuth({});
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;