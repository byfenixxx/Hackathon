import React from 'react';
import Navbar from '../components/Navbar'

import AllProducts from '../components/AllProducts';
import LeftSideBar from '../components/LeftSideBar';
import { Container } from '@material-ui/core';

const MainPage = () => {
    return (
        <div>
            <Navbar />
                <div className="main">
                    <LeftSideBar />
                    <AllProducts />
                </div>
        </div>
    );
};

export default MainPage;