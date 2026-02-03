import React from 'react';

const ProductCard = ({
    product,
    onEdit,
    onDelete
}) => {
    return (
        <div className="product-card-admin">
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">€{product.price}</p>
            <p className="category">{product.category}</p>
            <div className="product-actions">
                <button className="btn-edit" onClick={() => onEdit(product)}>
                    ✏️ Modifier
                </button>
                <button className="delete-btn" onClick={() => onDelete(product._id)}>
                    🗑️ Supprimer
                </button>
            </div>
        </div>
    );
};

export default ProductCard;