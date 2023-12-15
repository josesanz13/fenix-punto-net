import { createContext, useState, useContext, useEffect } from "react";
import { register_request, login_request, verify_token_request } from "../api/auth"

// Export
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debería estar usando un AuthProvider")
    }
    return context;
}

// Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await register_request(user);
            userAuthenticated(res.data.user)
        } catch (error) {
            userInvalid();
            setErrors(error.response.data);
        }
    }

    const login = async (user) => {
        try {
            const res = await login_request(user);
            localStorage.setItem("token", res.data.token)
            userAuthenticated(res.data.user)
        } catch (error) {
            userInvalid();
            setErrors(error.response.data);
        }
    }

    const logout = async () => {
        localStorage.removeItem("token");
        userInvalid();
    }

    const userAuthenticated = (data_user) => {
        setUser(data_user);
        setIsAuthenticated(true);
        setLoading(false);
    }

    const userInvalid = () => {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        async function verify_login() {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await verify_token_request(token);
                    userAuthenticated(res.data)
                } catch (error) {
                    userInvalid();
                }
            } else {
                userInvalid();
            }
        }
        verify_login();
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            login,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}