import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
import { useNotification } from "./context/NotificationContext";
import Header from "./components/Header";

function ProtectedRoute() {
    const { user, isAuthenticated, loading } = useAuth();
    const { notification } = useNotification();

    if (loading) {
        return (<div className="grid h-screen place-items-center">
            <h1 className="text-3xl">Cargando...</h1>
        </div>)
    }

    if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />
    return (
        <div className="h-screen">
            <Header />
            <Outlet />
            {
                notification != "" &&
                <div className="fixed p-3 bg-green-700 right-3 bottom-3 rounded">
                    <p className="px-4 text-base">{notification}</p>
                </div>
            }
        </div>
    )
}

export default ProtectedRoute