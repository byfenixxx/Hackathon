import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../helpers/const';

export const adminContext = createContext();

const INIT_STATE = {
    products: null,
    productToEdit: null
}

const reducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return {...state, products: action.payload}

        case "GET_PRODUCT_TO_EDIT":
            return {...state, productToEdit: action.payload}

        default:
            return {...state}
    }
}

const AdminContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const addNewProduct = async (newProduct) => {
        await axios.post(`${API}`, newProduct);
    }

    const getAllProducts = async () => {
        const { data } = await axios(`${API}`);
        dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: data
        })
    }

    const deleteProduct = async (id) => {
        await axios.delete(`${API}/${id}`);
        getAllProducts()
    }

    const getProductToEdit = async (id) => {
        const { data } = await axios(`${API}/${id}`);
        dispatch({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }

    const saveEditedProduct = async (editedProduct) => {
        await axios.patch(`${API}/${editedProduct.id}`, editedProduct);
        getAllProducts()
    }

    return (
        <adminContext.Provider value={{
            products: state.products,
            productToEdit: state.productToEdit,
            addNewProduct,
            getAllProducts,
            deleteProduct,
            getProductToEdit,
            saveEditedProduct
        }}
        >
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;