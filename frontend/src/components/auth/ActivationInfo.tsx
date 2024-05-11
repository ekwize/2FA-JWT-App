import { useParams } from "react-router-dom"
import { activate } from "../../actions/actions"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/redux-hooks"

export default function ActivationInfo() {
    const dispatch = useAppDispatch()
    const { uidb64, token } = useParams()
    const { error } = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(activate({ uidb64, token }))
    }, [])

    return (
        !error ? (
            <div className="mx-auto mt-20 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Your account has been successfully activated
                    </h1>
                </div>
            </div>
        ) : (
            <div className="mx-auto mt-20 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Your account has not been successfully activated
                    </h1>
                </div>
            </div>
        )
    )
}