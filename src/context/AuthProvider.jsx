import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
// import useLocalStorage from "use-local-storage";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    window.dispatchEvent(new Event("storage"));
    // const [token] = useState(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            const decode = jwtDecode(token);
            const email = decode.subject;
            const fullName = decode.fullName;
            const roles = decode.authorities;

            setAuth({ email, token, fullName, roles });
        }
        // window.addEventListener('storage', () => {
        //     const token = localStorage.getItem('token')
        //     if (token) {
        //         const decode = jwtDecode(token);
        //         const email = decode.subject;
        //         const fullName = decode.fullName;
        //         const roles = decode.authorities;

        //         setAuth({ email, token, fullName, roles });

        //     }
        // });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;