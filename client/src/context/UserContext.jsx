import { createContext, useState, useContext, useEffect } from "react";
import { get_users_request, get_user_by_id_request, store_user_request, update_user_request, delete_user_request } from "../api/user"

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debería estar usando un UserProvider")
    }
    return context;
}

// Provider
export const UserProvider = ({ children }) => {
    const [userList, setUserList] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const get_users = async () => {
        try {
            const res = await get_users_request();
            setUserList(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const get_user = async (id) => {
        try {
            const res = await get_user_by_id_request(id);
            setLoading(false)
            return res.data;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const update_user = async (user) => {
        try {
            const res = await update_user_request(user)
            return true;
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const delete_user = async (user) => {
        try {
            const res = await delete_user_request(user)
            return true;
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const store_user = async (user) => {
        try {
            const res = await store_user_request(user);
            return true;
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (errors.length > 0) {
            scrollToTop();
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }

    }, [errors])

    return (
        <UserContext.Provider value={{
            userList,
            loading,
            get_users,
            get_user,
            errors,
            update_user,
            delete_user,
            store_user
        }}>
            {children}
        </UserContext.Provider>
    )
}
