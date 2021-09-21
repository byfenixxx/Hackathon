import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div>
            <h1>Welcome to admin page</h1>
            <Link to="/admin/all-product-table">
                <Button variant="contained">Get all products</Button>
            </Link>
            <Link to="/admin/add-new-product">
                <Button variant="contained" color="primary">
                    Add new product
                </Button>
            </Link>
        </div>
    );
};

export default AdminPage;