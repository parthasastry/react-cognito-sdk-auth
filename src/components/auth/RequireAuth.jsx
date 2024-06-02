import { useLocation, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/Helper"

const RequireAuth = ({ children }) => {

    const location = useLocation();
    const isAuth = isAuthenticated()

    if (!isAuth) {
        localStorage.clear()
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children
}

export default RequireAuth