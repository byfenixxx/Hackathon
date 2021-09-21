import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminContextProvider from './contexts/AdminContext';
import AddNewProductPage from './pages/AddNewProductPage';
import AdminAllProductsTablePage from './pages/AdminAllProductsTablePage';
import AdminPage from './pages/AdminPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import PaymentPage from './pages/PaymentPage';
import CartPage from './pages/CartPage';

const Routes = () => {
    return (
        <AdminContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/admin/add-new-product" component={AddNewProductPage} />
                    <Route exact path="/main" component={MainPage} />
                    <Route exact path="/admin/all-product-table" component={AdminAllProductsTablePage} />
                    <Route exact path="/admin/edit/:id" component={EditPage} />
                    <Route exact path="/payment" component={PaymentPage} />
                    <Route exact path="/cart" component={CartPage} />

                </Switch>
            </BrowserRouter>
        </AdminContextProvider>
    );
};

export default Routes;