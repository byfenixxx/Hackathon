import axios from 'axios';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { calcSubPriceOfProduct, calcTotalPriceOfProduct } from '../helpers/calc';
import { API } from '../helpers/const';

export const clientContext = createContext();

const INIT_STATE = {
    products: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    cart: null,
    genres: null,
    sideBarStatus: false

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case 'PLUS_AND_MINUS_PRODUCT_IN_CART':
            return { ...state, productsCountInCart: action.payload }
        case 'GET_CART':
            return { ...state, cart: action.payload }
        case "GET_GENRES":
            return { ...state, genres: action.payload }
        case "CHANGE_SIDEBAR_STATUS":
            return { ...state, sideBarStatus: action.payload }

        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)


    const getProducts = async () => {
        // console.log(window.location)
        const { data } = await axios(`${API}${window.location.search}`);
        console.log(window.location.search);
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const getGenres = async () => {
        const { data } = await axios(API);
        const arr = [];
        data.forEach(element => {
            arr.push(element.genre)
        });
        const newArr = [];
        arr.forEach(elem => {
            let check = newArr.filter(item => item.trim() === elem.trim());
            if (check.length === 0) {
                newArr.push(elem)
            }
        })
        dispatch({
            type: "GET_GENRES",
            payload: newArr
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
    const itemInCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
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
        let newCart = cart.products.filter(item => item.product.id === id)
        return !newCart.length ? true : false;
    }
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        dispatch({
            type: 'GET_CART',
            payload: cart

        })
    }
    const changeProductsCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            return
        }
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPriceOfProduct(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPriceOfProduct(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }


    // Cart END
    // CREATE NEW ACCOUNT AND LOGIN START
    const createNewAccount = async (newAccount, history) => {
        try {
            const data = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/registration', newAccount)
            history.push('/main')
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }
    // CREATE NEW ACCOUNT AND LOGIN END



    // Pagination start

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    useEffect(() => {
        const fetchProducts = () => {
            const data = state.products || [];
            setItems(data)
        }
        fetchProducts();
    }, [state.products])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = items.length;

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    }


    // Pagination end

    const changeLeftSideBarDisplayStatus = () => {
        if (!state.sideBarStatus) {
            dispatch({
                type: "CHANGE_SIDEBAR_STATUS",
                payload: true
            })
        } else {
            dispatch({
                type: "CHANGE_SIDEBAR_STATUS",
                payload: false
            })
        }
    }

    return (
        <clientContext.Provider value={{
            products: state.products,
            getProducts, plusAndMinusProductInCart, checkProductInCart, getCart,
            productsCountInCart: state.productsCountInCart,
            cart: state.cart, changeProductsCount,
            itemInCart,
            currentItems, itemsPerPage, totalItems, currentPage,
            changePage,
            genres: state.genres, getGenres,
            changeLeftSideBarDisplayStatus, sideBarStatus: state.sideBarStatus
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;