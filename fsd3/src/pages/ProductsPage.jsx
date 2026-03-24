import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

export function ProductsPage({ filters }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const filterState = useSelector(state => state.filters);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        dispatch({ type: 'CALCULATE_TOTAL' });
    };

    const handleSortChange = (event) => {
        dispatch({ type: 'SET_SORT_BY', payload: event.target.value });
    };

    // Apply filters
    let filteredProducts = products.filter(product => {
        const matchesPrice = product.price <= filterState.priceRange[1];
        const matchesCategory = filterState.selectedCategory === 'All' || product.category === filterState.selectedCategory;
        const matchesSearch = filterState.searchTerm === '' ||
            product.name.toLowerCase().includes(filterState.searchTerm.toLowerCase());
        return matchesPrice && matchesCategory && matchesSearch;
    });

    // Apply sort
    filteredProducts = [...filteredProducts];
    if (filterState.sortBy === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterState.sortBy === 'priceAsc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filterState.sortBy === 'priceDesc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const activeCategory = filterState.selectedCategory === 'All' ? 'All Products' : `${filterState.selectedCategory} Products`;

    return (
        <div className="page-content">
            <div className="products-top">
                <h1 style={{ color: '#0066cc', textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}>
                    {activeCategory}
                </h1>
                <p style={{ color: '#666' }}>Showing {filteredProducts.length} products</p>
            </div>

            <div className="filters-bar">
                <div className="filter-group">
                    <label>Sort by:</label>
                    <select className="filter-select" value={filterState.sortBy} onChange={handleSortChange}>
                        <option value="name">Name (A-Z)</option>
                        <option value="priceAsc">Price (Low to High)</option>
                        <option value="priceDesc">Price (High to Low)</option>
                    </select>
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
                            </div>
                            <h3>{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <div className="rating">
                                {'★'.repeat(Math.floor(product.rating))} ({product.rating})
                            </div>
                            <div className="price-tag">${product.price}</div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="btn-2000s"
                                    style={{ flex: 1, textAlign: 'center', padding: '6px' }}
                                >
                                    Details
                                </Link>
                                <button
                                    className="btn-primary"
                                    onClick={() => handleAddToCart(product)}
                                    style={{ padding: '6px 10px' }}
                                >
                                    Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                        <p>No products found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
