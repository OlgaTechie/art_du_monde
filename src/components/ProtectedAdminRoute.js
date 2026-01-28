import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
    const adminToken = localStorage.getItem("adminToken");

    // Si token admin → affiche contenu admin
    if (adminToken) {
        return <Outlet />;
    }

    // Sinon → redirige vers login (admin redemande identifiants)
    return <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;