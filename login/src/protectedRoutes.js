import {Navigate} from 'react-router-dom';
import {Outlet} from 'react-router'

const ProtectedRoute = ({auth}) => {
    const isAuth = auth;
    
    return isAuth ? <Outlet /> : <Navigate to = "/" />
}

export default ProtectedRoute