import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function UserFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { user } = useAuth();
    const { get_user, loading, update_user, store_user, errors: errorsForm } = useUser();
    const { setNotification } = useNotification();
    const params = useParams();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) => {
        if (params.id) {
            if (await update_user(values)) {
                setNotification("Usuario actualizado exitosamente.")
                user.role == "ADM" ? navigate("/users") : navigate("/");
            }
        } else {
            if (await store_user(values)) {
                setNotification("Usuario creado exitosamente.")
                user.role == "ADM" ? navigate("/users") : navigate("/");
            }
        }
    });

    useEffect(() => {
        async function load_user() {
            if (params.id) {
                const data = await get_user(params.id)
                const date = new Date(data.date_birth);
                const currentDate = date.toISOString().substring(0, 10);

                Object.keys(data).map(key => {
                    setValue(key, data[key])

                    if (key == 'date_birth') {
                        setValue('date_birth', currentDate)
                    }
                })
            }
        }
        load_user();
    }, [])

    if (params.id && loading) {
        return (<div className="grid h-screen place-items-center">
            <h1 className="text-3xl">Cargando...</h1>
        </div>)
    }

    return (
        <div className="px-5 py-5">
            <div className="bg-gray-800 p-8 rounded-lg">
                <h1 className="text-3xl">{params.id ? "Actualizar" : "Nuevo"} usuario</h1>
                <hr className=" border-gray-500 my-2" />

                <form className="  px-5 py-5 rounded-lg" onSubmit={onSubmit}>
                    {
                        errorsForm.map((error, i) => (
                            <div key={i} className="text-md bg-red-500 text-white px-3 mb-4 rounded-lg py-4">
                                {error}
                            </div>
                        ))
                    }
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
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                            {...register('password', { required: (params.id ? false : true), maxLength: 120 })}
                        />
                        {
                            errors.password && (
                                <p className="text-red-600 text-sm">La contraseña es obligatoria</p>
                            )
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                            {...register('name', { required: true, maxLength: 60 })}
                        />
                        {
                            errors.name && (
                                <p className="text-red-600 text-sm">El nombre es obligatorio</p>
                            )
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                        <input
                            type="text"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                            {...register('last_name', { required: true, maxLength: 60 })}
                        />
                        {
                            errors.last_name && (
                                <p className="text-red-600 text-sm">El apellido es obligatorio</p>
                            )
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Celular</label>
                        <input
                            type="text"
                            id="mobile"
                            maxLength={10}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                            {...register('mobile', { required: true, maxLength: 10 })}
                        />
                        {
                            errors.mobile && (
                                <p className="text-red-600 text-sm">El celular es obligatorio</p>
                            )
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                        <input
                            type="text"
                            id="phone"
                            maxLength="7"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                            {...register('phone', { maxLength: 7 })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="date_birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
                        <input
                            type="date"
                            id="date_birth"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"
                            {...register('date_birth', { required: true })}
                        />
                        {
                            errors.date_birth && (
                                <p className="text-red-600 text-sm">La fecha de nacimiento es obligatoria</p>
                            )
                        }
                    </div>
                    {
                        user.role == "ADM" &&
                        <div className="mb-5">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                            <select
                                id="role"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('role', { required: true })}
                            >
                                <option value="ADM">Administrador</option>
                                <option value="USR">Usuario</option>
                            </select>
                            {
                                errors.role && (
                                    <p className="text-red-600 text-sm">El rol es obligatorio</p>
                                )
                            }
                        </div>
                    }
                    <div className="mb-5">
                        <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genero</label>
                        <select
                            id="genre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('genre', { required: true })}
                        >
                            <option value="F">Femenino</option>
                            <option value="M">Masculino</option>
                        </select>
                        {
                            errors.genre && (
                                <p className="text-red-600 text-sm">El genero es obligatorio</p>
                            )
                        }
                    </div>
                    <hr className=" border-gray-500 my-5" />
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Guardar"}</button>
                    <button
                        type="button"
                        className="w-full mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => {
                            user.role == "ADM" ? navigate("/users") : navigate("/");
                        }}
                    >
                        Volver
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserFormPage