import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div style={{height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <h1 style={{textAlign: "center"}}>Welcome to admin page</h1>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Link to="/admin/all-product-table">
                    <Button variant="contained">Get all products</Button>
                </Link>
                <Link to="/admin/add-new-product">
                    <Button variant="contained" color="primary">
                        Add new product
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;