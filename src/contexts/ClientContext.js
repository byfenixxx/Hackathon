import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { calcSubPriceOfProduct, calcTotalPriceOfProduct } from '../helpers/calc';
import { API } from '../helpers/const';

export const clientContext = createContext();

const INIT_STATE = {
    products: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    cart: null

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return { ...state, products: action.payload }
        case 'PLUS_AND_MINUS_PRODUCT_IN_CART':
            return { ...state, productsCountInCart: action.payload }
        case 'GET_CART':
            return { ...state, cart: action.payload }

        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)


    const getAllProducts = async () => {
        const { data } = await axios(`${API}`);
        dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: data
        })
    }
    // Cart START 
    const plusAndMinusProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0,
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }
        newProduct.subPrice = calcSubPriceOfProduct(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPriceOfProduct(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: 'PLUS_AND_MINUS_PRODUCT_IN_CART',
            payload: cart.products.length
        })
    }
    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            return false
        }
        let newCart = cart.products.filter(item => item.products.id === id)
        return !newCart.length ? true : false;
    }
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        dispatch({
            type: 'GET_CART',
            payload: cart

        })
    }

    // Cart END






    return (
        <adminContext.Provider value={{
            products: state.products,

            getAllProducts,

        }}
        >
            {children}
        </adminContext.Provider>
    );
};

export default ClientContextProvider;