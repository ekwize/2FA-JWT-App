import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { validationLoginSchema, ILogin } from "../../types/AuthTypes"
import { useNavigate } from "react-router-dom"
import { login } from "../../actions/actions"
import { useAppDispatch, useAppSelector } from "../../app/redux-hooks"


export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { error } = useAppSelector((state) => state.auth)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<ILogin>({
        resolver: yupResolver(validationLoginSchema)
    })
    
    const navigateOnMain = () => {
        navigate("/")
    }
    
    const handleLogin = async (data: ILogin) => {
        await dispatch(login(data))
        
        if (error) {
            if (error.message === "Request failed with status code 400") {
                setError("username", {message: "User is not veryfied"})
            } else
            if (error.message === "Request failed with status code 401") {
                setError("password", {message: "Invalid password"})
            } else
            if (error.message === "Request failed with status code 500") {
                setError("username", {message: "There is no such user"})
            } 
        } else {
            setTimeout(navigateOnMain, 1000)
        }
    }
    
    return (
        <>
        <div className="mx-auto mt-20 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Log in to your account
                </h1>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 md:space-y-6">
                    <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="MuscleMachine" {...register("username")}
                            />
                            {errors.username && (
                                <p className="text-xs italic text-red-500">{errors.username.message}</p>
                            )}   
                    </div>
                    <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Levrone1964" {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-xs italic text-red-500">{errors.password.message}</p>
                            )}   
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log In</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
        </>
    )
}