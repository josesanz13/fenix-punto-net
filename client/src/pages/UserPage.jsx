import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

function UserPage() {
    const { userList, get_users, delete_user } = useUser();
    const { setNotification } = useNotification();

    const user_delete = async (user) => {
        if (await delete_user(user)) {
            setNotification("Usuario eliminado exitosamente.")
            get_users()
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        get_users()
        scrollToTop()
    }, [])

    return (
        <div className="px-5 py-5">
            <div className="bg-gray-800 p-8 rounded-lg relative">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="title">
                        <h1 className="text-3xl text-center">Usuarios</h1>
                    </div>
                    <div className="options mt-3 sm:mt-0">
                        <Link
                            className="flex focus:outline-none justify-center sm:justify-start text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900" to={"/add-user"}
                        >
                            Nuevo
                            <svg className="ms-1" width="20" height="20" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <hr className=" border-gray-500 my-2 mb-4" />
                {
                    userList.length == 0
                        ?
                        <div className=" bg-gray-700 border border-gray-700 p-5 rounded-lg hover:bg-gray-600 mb-3 block w-full">
                            <h1 className="text-center text-2xl">No hay usuarios para gestionar</h1>
                        </div>
                        :
                        userList.map((user, i) => (
                            <div className=" bg-gray-700 border border-gray-700 p-5 rounded-lg hover:bg-gray-600 mb-3 block w-full" key={i}>
                                <h1 className="text-xl sm:text-2xl">{`${user.name} ${user.last_name}`}</h1>
                                <p className="text-base text-gray-400 text-ellipsis overflow-hidden">{user.email}</p>
                                <p className="text-base text-gray-400">{user.mobile}</p>
                                <p className="text-base text-gray-400">{user.genre == "M" ? "Maculino" : "Femenino"}</p>
                                <p className="text-base text-gray-200">{user.role == "ADM" ? "Administrador" : "Usuario"}</p>
                                <hr className=" border-gray-500 my-2 mb-4" />
                                <div className="block sm:flex justify-end">
                                    <Link className="text-white w-full sm:w-auto flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to={`/user/${user.id}`}>
                                        Editar
                                        <svg className="ms-1" width="20" height="20" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" />
                                        </svg>
                                    </Link>
                                    <button
                                        type="button"
                                        className="focus:outline-none w-full sm:w-auto flex justify-center text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-900"
                                        onClick={() => { user_delete(user) }}
                                    >
                                        Eliminar
                                        <svg className="ms-1" width="20" height="20" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        ))
                }
            </div>
        </div>
    )
}

export default UserPage