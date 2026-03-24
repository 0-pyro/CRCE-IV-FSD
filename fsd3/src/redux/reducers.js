// Product Reducer
const initialProductsState = {
    products: [
        // Electronics - Original
        { id: 1, name: 'Wireless Mouse', price: 29.99, category: 'Electronics', image: '/src/assets/react.svg', rating: 4.5 },
        { id: 2, name: 'USB Cable', price: 9.99, category: 'Electronics', image: '/src/assets/vite.svg', rating: 4.0 },
        { id: 3, name: 'Keyboard', price: 79.99, category: 'Electronics', image: '/src/assets/react.svg', rating: 4.8 },

        // Electronics - New Products
        { id: 6, name: 'ASUS ProArt Display PA148CTC', price: 649.99, category: 'Electronics', image: '/src/assets/asus_pro_art.png', rating: 4.7, description: 'Portable 14-inch professional display' },
        { id: 7, name: 'ASUS ZenBook 14 Ultralight', price: 899.99, category: 'Electronics', image: '/src/assets/asus_zenbook_a14.png', rating: 4.8, description: 'Ultra-thin laptop with 14-inch display', specialOffer: true, discount: 0.20 },
        { id: 8, name: 'Logitech MX Master 3S', price: 99.99, category: 'Electronics', image: '/src/assets/react.svg', rating: 4.9, description: 'Advanced wireless mouse for professionals' },
        { id: 9, name: 'USB 3.0 Hub 7-Port', price: 45.99, category: 'Electronics', image: '/src/assets/vite.svg', rating: 4.3, description: 'Expand your USB connectivity' },
        { id: 10, name: '4K USB-C Hub', price: 79.99, category: 'Electronics', image: '/src/assets/vite.svg', rating: 4.6, description: 'Multi-port USB-C adapter for modern devices' },

        // Office - Original
        { id: 4, name: 'Monitor Stand', price: 49.99, category: 'Office', image: '/src/assets/vite.svg', rating: 4.2 },
        { id: 5, name: 'Desk Lamp', price: 39.99, category: 'Office', image: '/src/assets/react.svg', rating: 4.3 },

        // Office - New Products
        { id: 11, name: 'Wooden Desk Organizer', price: 34.99, category: 'Office', image: '/src/assets/react.svg', rating: 4.4, description: 'Multi-compartment desk organizer' },
        { id: 12, name: 'Metal Filing Cabinet', price: 199.99, category: 'Office', image: '/src/assets/vite.svg', rating: 4.5, description: 'Secure 4-drawer filing cabinet' },
        { id: 13, name: 'Whiteboard 36x24', price: 44.99, category: 'Office', image: '/src/assets/react.svg', rating: 4.2, description: 'Magnetic whiteboard with markers' },
        { id: 14, name: 'Executive Office Chair', price: 299.99, category: 'Office', image: '/src/assets/vite.svg', rating: 4.7, description: 'Ergonomic chair with lumbar support' },
        { id: 15, name: 'Inkjet Printer All-in-One', price: 149.99, category: 'Office', image: '/src/assets/react.svg', rating: 4.3, description: 'Print, scan, copy in one device' },

        // Accessories - New Category
        { id: 16, name: 'Phone Stand Adjustable', price: 19.99, category: 'Accessories', image: '/src/assets/vite.svg', rating: 4.5, description: 'Universal phone mount for desk' },
        { id: 17, name: 'Cable Organizer Set', price: 14.99, category: 'Accessories', image: '/src/assets/react.svg', rating: 4.4, description: '5-piece cable management system' },
        { id: 18, name: '1080p Webcam', price: 59.99, category: 'Accessories', image: '/src/assets/vite.svg', rating: 4.6, description: 'Crystal clear video conferencing' },
        { id: 19, name: 'Wireless Headphones Pro', price: 189.99, category: 'Accessories', image: '/src/assets/react.svg', rating: 4.8, description: 'Noise-cancelling wireless headphones' },
        { id: 20, name: 'Extended Mousepad XL', price: 29.99, category: 'Accessories', image: '/src/assets/vite.svg', rating: 4.3, description: 'Large desk-covering mousepad' },

        // Furniture - New Category
        { id: 21, name: 'Walnut Computer Desk', price: 399.99, category: 'Furniture', image: '/src/assets/react.svg', rating: 4.6, description: '5-foot spacious work desk', specialOffer: true, discount: 0.30 },
        { id: 22, name: 'Glass Bookshelf 5-Tier', price: 249.99, category: 'Furniture', image: '/src/assets/vite.svg', rating: 4.4, description: 'Modern glass shelving unit' },
        { id: 23, name: 'Metal Storage Cabinet', price: 189.99, category: 'Furniture', image: '/src/assets/react.svg', rating: 4.5, description: 'Lockable office storage cabinet' },
        { id: 24, name: 'Ergonomic Gaming Chair', price: 349.99, category: 'Furniture', image: '/src/assets/vite.svg', rating: 4.7, description: 'Premium ergonomic seating' },
        { id: 25, name: 'Electric Standing Desk', price: 599.99, category: 'Furniture', image: '/src/assets/react.svg', rating: 4.8, description: 'Motorized height-adjustable desk' }
    ],
    filteredProducts: [],
};

export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
        case 'SET_FILTERED_PRODUCTS':
            return { ...state, filteredProducts: action.payload };
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] };
        default:
            return state;
    }
};

// Cart Reducer
const initialCartState = {
    items: [],
    total: 0,
};

export const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        case 'CALCULATE_TOTAL': {
            const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return { ...state, total };
        }
        case 'CLEAR_CART':
            return { items: [], total: 0 };
        default:
            return state;
    }
};

// User Reducer
const initialUserState = {
    isLoggedIn: false,
    user: null,
    email: '',
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, user: action.payload.name, email: action.payload.email };
        case 'LOGOUT':
            return { isLoggedIn: false, user: null, email: '' };
        case 'UPDATE_PROFILE':
            return { ...state, user: action.payload.name, email: action.payload.email };
        default:
            return state;
    }
};

// Filters Reducer
const initialFiltersState = {
    priceRange: [0, 1000],
    selectedCategory: 'All',
    searchTerm: '',
    sortBy: 'name',
};

export const filtersReducer = (state = initialFiltersState, action) => {
    switch (action.type) {
        case 'SET_PRICE_RANGE':
            return { ...state, priceRange: action.payload };
        case 'SET_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.payload };
        default:
            return state;
    }
};

// Orders Reducer
const initialOrdersState = {
    orders: [],
};

export const ordersReducer = (state = initialOrdersState, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, { ...action.payload, id: Date.now(), date: new Date().toLocaleDateString() }],
            };
        case 'GET_ORDERS':
            return state;
        default:
            return state;
    }
};

// Shoutbox Reducer
const persistedShouts = typeof window !== 'undefined' && localStorage.getItem('shouts')
    ? JSON.parse(localStorage.getItem('shouts'))
    : null;

const initialShoutsState = {
    shouts: persistedShouts || [
        { id: 1, name: 'User123', text: 'Cool products!' },
        { id: 2, name: 'Shopper99', text: 'Great prices!' },
        { id: 3, name: 'BuySmart', text: 'Fast shipping!' },
    ],
};

export const shoutReducer = (state = initialShoutsState, action) => {
    switch (action.type) {
        case 'ADD_SHOUT': {
            const newShout = {
                id: Date.now(),
                name: action.payload.name || 'Anonymous',
                text: action.payload.text,
            };
            const nextState = { ...state, shouts: [...state.shouts, newShout] };
            if (typeof window !== 'undefined') {
                localStorage.setItem('shouts', JSON.stringify(nextState.shouts));
            }
            return nextState;
        }
        case 'CLEAR_SHOUTS':
            if (typeof window !== 'undefined') {
                localStorage.removeItem('shouts');
            }
            return { ...state, shouts: [] };
        default:
            return state;
    }
};
