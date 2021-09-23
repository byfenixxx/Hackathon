import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { clientContext } from '../contexts/ClientContext';

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    ,
];


const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();
    const { cart, getCart } = useContext(clientContext)
    console.log(cart)
    useEffect(() => {
        getCart()
    }, [])

    return (
        <React.Fragment>
            {cart ? (<>
                <Typography variant="h6" gutterBottom>
                    Сумма заказа
                </Typography>
                <List disablePadding>
                    {
                        cart.products.map((product) => (
                            <ListItem className={classes.listItem} key={product}>
                                <ListItemText primary={product.product.title} secondary={product.product.year} />
                                <Typography variant="body2">{product.product.price > 0 ? (product.product.price) + "$" : ("FREE")}</Typography>
                            </ListItem>
                        ))}
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Итого:" />
                        <Typography variant="subtitle1" className={classes.total}>
                            {cart.totalPrice}$
                        </Typography>
                    </ListItem>
                </List>
            </>
            ) : (<h2>loading</h2>)}


        </React.Fragment>
    );
}