import { useState, useEffect, useCallback } from 'react';

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    // 🔥 LOAD UNE SEULE FOIS au montage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cart');
            const items = saved ? JSON.parse(saved) : [];
            setCartItems(items);
            const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartCount(total);
        } catch (e) {
            console.error('Erreur localStorage:', e);
            setCartItems([]);
            setCartCount(0);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // 🔥 SAUVE + events (UNIQUEMENT après init)
    useEffect(() => {
        if (!isInitialized) return;

        localStorage.setItem('cart', JSON.stringify(cartItems));
        const total = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(total);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: total }));
    }, [cartItems, isInitialized]);

    // 🔥 Multi-onglets
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'cart') {
                try {
                    const items = JSON.parse(e.newValue || '[]');
                    setCartItems(items);
                    const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
                    setCartCount(total);
                } catch (e) {
                    console.error('Erreur storage change:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = useCallback((product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            let newCart;
            if (existing) {
                newCart = prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                newCart = [...prev, { ...product, quantity: 1 }];
            }
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((id) => {
        setCartItems(prev => {
            const newCart = prev.filter(item => item._id !== id);
            return newCart;
        });
    }, []);

    const updateQuantity = useCallback((id, newQty) => {
        if (newQty < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems(prev => {
            const newCart = prev.map(item =>
                item._id === id ? { ...item, quantity: newQty } : item
            ).filter(item => item.quantity > 0);
            return newCart;
        });
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    return {
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};