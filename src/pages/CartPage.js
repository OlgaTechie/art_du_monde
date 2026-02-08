import { useCart } from '../hooks/useCart';
import './CartPage.css';
import { useState } from 'react';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null });

    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // 🔥 OUVRIR pop-up confirmation
    const handleDeleteClick = (productId) => {
        setDeleteConfirm({ show: true, productId });
    };

    // 🔥 CONFIRMER suppression
    const confirmDelete = () => {
        if (deleteConfirm.productId) {
            removeFromCart(deleteConfirm.productId);
        }
        setDeleteConfirm({ show: false, productId: null });
    };

    // 🔥 ANNULER
    const cancelDelete = () => {
        setDeleteConfirm({ show: false, productId: null });
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Votre panier est vide</h2>
                <p>Ajoutez des produits depuis la page d'accueil !</p>
            </div>
        );
    }

    return (
        <>
            <div className="cart-page">
                <h1>Mon Panier ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)})</h1>

                <div className="cart-items">
                    {cartItems.map((item) => {
                        const qty = item.quantity || 1;
                        return (
                            <div key={item._id} className="cart-item">
                                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p className="price">{item.price} €</p>
                                </div>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item._id, qty - 1)}
                                        disabled={qty <= 1}
                                        className="qty-btn"
                                    >-</button>
                                    <span className="qty">{qty}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, qty + 1)}
                                        className="qty-btn"
                                    >+</button>
                                </div>
                                <button
                                    onClick={() => handleDeleteClick(item._id)}
                                    className="remove-btn"
                                >
                                    Supprimer
                                </button>
                                <p className="subtotal">{(item.price * qty).toFixed(2)} €</p>
                            </div>
                        );
                    })}
                </div>

                <div className="cart-total">
                    <h2>Total: <span className="total-amount">{total.toFixed(2)} €</span></h2>
                    <button className="checkout-btn">Commander</button>
                </div>
            </div>

            {/* 🔥 POP-UP CONFIRMATION */}
            {deleteConfirm.show && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <h3>⚠️ Confirmer la suppression</h3>
                        <p>Êtes-vous sûr de vouloir supprimer ce produit du panier ?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={cancelDelete}
                                className="modal-btn cancel"
                            >
                                ❌ Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="modal-btn delete"
                            >
                                ✅ Oui, supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartPage;