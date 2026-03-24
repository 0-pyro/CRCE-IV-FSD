import { createStore, combineReducers } from 'redux';
import {
    productsReducer,
    cartReducer,
    userReducer,
    filtersReducer,
    ordersReducer,
    shoutReducer,
} from './reducers';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    filters: filtersReducer,
    orders: ordersReducer,
    shout: shoutReducer,
});

export const store = createStore(rootReducer);

// Persistent shoutbox sync
if (typeof window !== 'undefined') {
    store.subscribe(() => {
        const { shout } = store.getState();
        if (shout && shout.shouts) {
            localStorage.setItem('shouts', JSON.stringify(shout.shouts));
        }
    });
}
