import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const updateAuth = () => {
            const loggedUser = localStorage.getItem("user");
            const adminToken = localStorage.getItem("adminToken");

            setUser(loggedUser ? JSON.parse(loggedUser) : null);
            setIsAdmin(!!adminToken);
        };

        updateAuth(); // Initial
        const interval = setInterval(updateAuth, 500); // Check rapide

        return () => clearInterval(interval);
    }, []);

    return { user, isAdmin, setUser };
};