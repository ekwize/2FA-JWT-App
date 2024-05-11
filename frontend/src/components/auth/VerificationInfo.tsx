import { useAppDispatch, useAppSelector } from "../../app/redux-hooks"
import { verify } from "../../actions/actions"
import { useEffect } from "react"


export default function VerificationInfo() {
    const dispatch = useAppDispatch()
    const { uid, error } = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(verify(uid))
    }, [])

    const sendEmail = async () => {
        await dispatch(verify(uid))
    }

    return (
        !error ? (
            <div className="mx-auto mt-20 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Verify your email
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        We have sent you an email with a verification link. Please click on the link to verify your email.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        If you have not received this email yet, please check your spam folder or we will send you a new one
                    </p>
                    <button onClick={sendEmail} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> 
                        Send new verification message
                    </button>
                </div>
            </div>
        ) : (
            <div className="mx-auto mt-20 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Failed to send a veryfied message
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sorry, try again
                    </p>
                </div>
            </div>
        )
    )
}



