import { createContext, useState, useContext, useEffect } from "react";

export const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification debería estar usando un NotificationProvider")
    }
    return context;
}

// Provider
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState("")

    useEffect(() => {
        if (notification != "") {
            const timer = setTimeout(() => {
                setNotification("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification])

    return (
        <NotificationContext.Provider value={{
            setNotification,
            notification
        }}>
            {children}
        </NotificationContext.Provider>
    )
}
