// --- Products Reducer ---
const initialProductsState = {
    products: [],
    filteredProducts: []
};

export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_FILTERED_PRODUCTS':
            return { ...state, filteredProducts: action.payload };
        case 'ADD_PRODUCT': // Still useful if you have a "Sell an Item" feature
            return { ...state, products: [...state.products, action.payload] };
        default:
            return state;
    }
};

// --- Shoutbox Reducer ---
export const shoutReducer = (state = { shouts: [] }, action) => {
    switch (action.type) {
        case 'SET_SHOUTS':
            return { ...state, shouts: action.payload };
        case 'ADD_SHOUT_SUCCESS':
            return { ...state, shouts: [action.payload, ...state.shouts] };
        case 'CLEAR_SHOUTS':
            return { shouts: [] };
        default:
            return state;
    }
};

// --- Orders Reducer ---
export const ordersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.payload };
        case 'ADD_ORDER_SUCCESS':
            return { ...state, orders: [...state.orders, action.payload] };
        default:
            return state;
    }
};

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

// --- Filters Reducer ---
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