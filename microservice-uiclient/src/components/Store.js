// store.js

import { createStore } from 'redux';

// Définir le type d'action
const SET_ORDER = 'SET_ORDER';

// Créer une action pour définir la commande
export const setOrder = (order) => ({
    type: SET_ORDER,
    payload: order,
});

// Définir le reducer pour mettre à jour le magasin
const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ORDER:
            return action.payload;
        default:
            return state;
    }
};

// Créer le magasin Redux
const store = createStore(orderReducer);

export default store;