import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../helpers/const';

export const clientContext = createContext();

const INIT_STATE = {
    products: null
}

const reducer = (state=INIT_STATE, action) => {

    switch (action.type) {
        case "GET_PRODUCTS":
            return {...state, products: action.payload}

        default:
            return {...state}
    }
}

const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const getProducts = async () => {
        // console.log(window.location)
        const { data } = await axios(`${API}${window.location.search}`);
        console.log(`${API}${window.location.search}`);
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    return (
        <clientContext.Provider value={{
            products: state.products,
            getProducts
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;