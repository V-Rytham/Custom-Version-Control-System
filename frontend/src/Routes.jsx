import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom";

// Pages
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const [ currentUser, setCurrentUser ] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        // Sync user from localStorage → context
        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        // Not logged in → redirect to login
        if (!userIdFromStorage && !['/auth', '/signup'].includes(location.pathname)) {
            navigate("/auth");
        }

        // Already logged in → block login page
        if (userIdFromStorage && location.pathname === '/auth') {
            navigate("/");
        }

    }, [currentUser, navigate, setCurrentUser, location.pathname]);

    const element = useRoutes([
        { path: "/", element: <Dashboard /> },
        { path: "/auth", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/profile", element: <Profile /> }
    ]);

    return element;
};

export default ProjectRoutes;