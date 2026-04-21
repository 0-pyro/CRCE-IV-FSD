import { createStore, combineReducers } from 'redux';
import {
    productsReducer,
    cartReducer,
    filtersReducer,
    shoutReducer,
    ordersReducer
} from './reducers';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    filters: filtersReducer,
    shout: shoutReducer,
    orders: ordersReducer
});

// The store now starts clean. Data is hydrated via API calls in 
// useEffect hooks within your components.
export const store = createStore(rootReducer);