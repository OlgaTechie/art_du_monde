import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({
    products,
    onEdit,
    onDelete
}) => {
    return (
        <div className="products-section">
            <h2>📦 {products.length} Produits</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;