import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        login(values);
    });
    return (
        <div className="grid h-screen place-items-center">
            <form action="" className="bg-gray-900 px-5 py-5 rounded-lg w-2/6 border dark:border-gray-600" onSubmit={onSubmit}>
                {
                    loginErrors.map((error, i) => (
                        <div key={i} className="text-md bg-red-500 text-white px-3 mb-4 rounded-lg py-4">
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-3xl text-center">Portal usuarios</h1>
                <hr className=" border-gray-500 my-2" />
                <div className="mb-5 my-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electronico</label>
                    <input
                        autoFocus
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                        placeholder="correo@dominio.com"
                        max={120}
                        {...register('email', { required: true, maxLength: 120 })}
                    />
                    {
                        errors.email && (
                            <p className="text-red-600 text-sm">El correo electronico es obligatorio</p>
                        )
                    }
                </div>
                <div className="mb-7">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                        {...register('password', { required: true, maxLength: 120 })}
                    />
                    {
                        errors.password && (
                            <p className="text-red-600 text-sm">La contraseña es obligatoria</p>
                        )
                    }
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ingresar</button>
                <hr className=" border-gray-500 my-5" />
                <h1 className="text-sm text-center">Si no estas registrado,
                    <Link to={"/register"} className="text-blue-500 px-1">
                        aquí
                    </Link>
                    puedes hacerlo</h1>
            </form>
        </div>
    )
}

export default LoginPage