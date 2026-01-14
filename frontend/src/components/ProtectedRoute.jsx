// // frontend/src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     // Check if the user is logged in as an admin
//     const isAdmin = localStorage.getItem("isAdmin") === "true";
    
//     // If not an admin, redirect them to the admin login page
//     if (!isAdmin) {
//         return <Navigate to="/admin-login" replace />;
//     }
    
//     // If admin, allow access to the dashboard
//     return children;
// };

// // CRITICAL: This line fixes the "does not provide an export named 'default'" error
// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if the admin flag exists in localStorage
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const token = localStorage.getItem("token");

    // If no token or not an admin, force redirect to login
    if (!token || !isAdmin) {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

export default ProtectedRoute;