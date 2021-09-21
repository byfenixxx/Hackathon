import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PaymentPage from './pages/PaymentPage';
import CartPage from './pages/CartPage';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage} />

                    <Route exact path="/payment" component={PaymentPage} />
                    <Route exact path="/cart" component={CartPage} />



                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Routes;