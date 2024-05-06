import { Routes as Router, Route, Navigate, Outlet, useLocation} from "react-router-dom"
import { useAppSelector } from "./app/redux-hooks"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main"
import Verification from "./pages/Verification"
import Activation from "./pages/Activation"
import { Error403, Error500 } from "./components/Errors"


const PrivateRoutes = () => {
    const { token } = useAppSelector((state) => state.auth)
    const location = useLocation()

    if (token && location.pathname === "/signup") {
        return <Navigate to="/error/403" replace />

    } else if (token && location.pathname === "/login") {
        return <Navigate to="/" replace />}

        
    if (token || location.pathname === "/signup" || location.pathname === "/login") {
        return <Outlet />
    } else {
        return <Navigate to="/login" replace />
    }
}


const Routes = () => {
    return (
        <Router>
            <Route element={<PrivateRoutes />} >
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/verification/" element={<Verification />} />
            <Route path="/activation/:uidb64/:token" element={<Activation />} />
            <Route path="/error/500" element={<Error500 />} />
            <Route path="/error/403" element={<Error403 />} />
        </Router>
    )
}

export default Routes