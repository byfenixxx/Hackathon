import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { clientContext } from '../contexts/ClientContext';
import MediaCard from './MediaCard';

const AllProducts = () => {

    const { products, getProducts } = useContext(clientContext);

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            {
                products ? (
                    <div className="content">
                        <div className="content-block">
                            {products.map((item) => (
                                <Grid xs={4} key={item.id}>
                                    <MediaCard item={item} />
                                </Grid>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h1>Loading</h1>
                )
            }
        </div>
    );
};

export default AllProducts;