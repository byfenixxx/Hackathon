import { Button, Container } from '@material-ui/core';
import React from 'react';

const IndexPage = () => {
    return (
        <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button variant="contained" color="primary" href="/admin">Admin panel</Button>
                <Button variant="contained" color="secondary" href="/main">For clients</Button>
        </div>
    );
};

export default IndexPage;