import { Button } from '@material-ui/core';
import React from 'react';
import AllProductsTable from "../components/AllProductsTable"

const AdminAllProductsTablePage = () => {
    return (
        <div>
            <AllProductsTable />
            <div>
                <Button variant="outlined" href="/">Back to main page</Button>
            </div>
        </div>
    );
};

export default AdminAllProductsTablePage;