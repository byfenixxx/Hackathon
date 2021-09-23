import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { clientContext } from '../contexts/ClientContext';
import MediaCard from './MediaCard';
import Pagination from './Pagination';

const AllProducts = () => {

    const { products, getProducts, currentItems } = useContext(clientContext);

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div style={{width: "100%"}}>
            {
                products ? (
                    <div className="content">
                        <div className="content-block">
                            {currentItems.map((item) => (
                                <Grid  item xs={4} key={item.id}>
                                    <MediaCard item={item} />
                                </Grid>
                            ))}
                        </div>
                        <Pagination />
                    </div>
                ) : (
                    <h1>Loading</h1>
                )
            }
        </div>
    );
};

export default AllProducts;