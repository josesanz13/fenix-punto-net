import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout } = useAuth();
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
                <div className="w-full block md:w-auto" id="navbar-default">
                    <ul className="flex-col sm:flex-row flex items-center justify-center md:justify-end p-4 ">
                        {
                            user.role == "ADM" &&
                            <li>
                                <Link className="flex text-sm md:text-base px-4 py-2 text-white rounded hover:bg-gray-700" to={"/"}>
                                    Inicio
                                    <svg className="ps-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                    </svg>
                                </Link>
                            </li>
                        }
                        {
                            user.role == "ADM" &&
                            <li>
                                <Link className="flex text-sm md:text-base px-4 py-2 text-white rounded hover:bg-gray-700" to={"/users"}>
                                    Usuarios
                                    <svg width="24" height="24" className="ps-2" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                                    </svg>
                                </Link>
                            </li>
                        }
                        <li className="">
                            <Link className="text-sm md:text-base px-4 flex py-2 text-white rounded hover:bg-gray-700" onClick={logout}>
                                Cerrar sesión
                                <svg className="ps-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header