import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

function HomePage() {
    const { user } = useAuth();
    const { get_user } = useUser();
    const [currentUser, setCurrentUser] = useState({})
    const [dateUser, setDateUser] = useState("")

    useEffect(() => {
        async function get_current_user() {
            const data = await get_user(user.id);
            setCurrentUser(data);
            const date = new Date(data.date_birth);
            const currentDate = date.toISOString().substring(0, 10);
            setDateUser(currentDate);
        }
        get_current_user();
    }, [])

    return (
        <div className="px-5 py-5">
            <div className="bg-gray-800 p-8 rounded-lg">
                <h1 className="text-3xl">Datos personales</h1>
                <hr className=" border-gray-500 my-2" />

                <p className="mb-3 mt-5 text-lg">Nombre : <span className="text-base text-gray-300">{`${currentUser.name} ${currentUser.last_name}`}</span></p>
                <p className="mb-3 mt-5 text-lg">Email : <span className="text-base text-gray-300">{currentUser.email}</span></p>
                <p className="mb-3 mt-5 text-lg">Celular : <span className="text-base text-gray-300">{currentUser.mobile}</span></p>
                <p className="mb-3 mt-5 text-lg">Teléfono : <span className="text-base text-gray-300">{currentUser.phone}</span></p>
                <p className="mb-3 mt-5 text-lg">Genero : <span className="text-base text-gray-300">{currentUser.genre == "M" ? "Masculino" : "Femenino"}</span></p>
                <p className="mb-3 mt-5 text-lg">Fecha de nacimiento : <span className="text-base text-gray-300">{dateUser}</span></p>

                <hr className=" border-gray-500 my-2" />

                <div className="flex justify-end">
                    <Link className="text-white inline-flex mt-4 ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-0 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to={`/user/${user.id}`} replace>
                        Editar
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage