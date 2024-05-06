import  { useEffect } from "react"
import { getUser } from "../actions/actions"
import { useAppDispatch, useAppSelector } from "../app/redux-hooks"


export default function UserInfo() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)

    useEffect(()=> {
        dispatch(getUser())
    }, [])

    return (
        <div className="mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    User Information
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {user?.id}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Username: {user?.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email: {user?.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date joined: {user?.date_joined}
                </p>

            </div>
        </div>
    )
}