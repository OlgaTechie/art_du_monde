import { useState, useEffect, useCallback } from 'react';

export const useCart = () => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = useCallback((product) => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = existingCart.find(item => item._id === product._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            product.quantity = 1;
            existingCart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));

        // 🔥 UPDATE DIRECT
        const total = existingCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(total);

        // Trigger Header
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: total }));
    }, []);

    // 🔥 Écoute localStorage partout
    useEffect(() => {
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartCount(total);
        };

        updateCount();
        window.addEventListener('storage', updateCount);
        return () => window.removeEventListener('storage', updateCount);
    }, []);

    return { addToCart, cartCount };
};