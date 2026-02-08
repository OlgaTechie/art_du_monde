import React from 'react';

const AdminHeader = ({
    onNewProduct,
    onRefreshBanner,
    onLogout,
    fetchBanner
}) => (
    <div className="admin-header">
        <h1>Art du Monde - Admin</h1>
        <div className="admin-actions">
            <button className="admin-btn secondary" onClick={fetchBanner}>
                🔄 Refresh Banner
            </button>
            <button className="admin-btn primary" onClick={onNewProduct}>
                ➕ Nouveau Produit
            </button>
            <button className="admin-btn danger" onClick={onLogout}>
                🚪 Déconnexion
            </button>
        </div>
    </div>
);

export default AdminHeader;