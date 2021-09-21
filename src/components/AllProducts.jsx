import React, { useContext, useEffect } from 'react';
import { adminContext } from '../contexts/AdminContext';
import MediaCard from './MediaCard';

const AllProducts = () => {

    const { products, getAllProducts } = useContext(adminContext);

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div>
            {
                products ? (
                    products.map((item) => (
                        <MediaCard item={item} key={item.id} />
                    ))
                ) : (
                    <h1>Loading</h1>
                )
            }
        </div>
    );
};

export default AllProducts;