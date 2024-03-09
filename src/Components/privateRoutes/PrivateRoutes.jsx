import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({children, isAuthenticated}) =>{
        if(!isAuthenticated){
            return <Navigate to = '/login' replace={true} />
        }
        return children;
}