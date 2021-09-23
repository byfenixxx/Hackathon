import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { clientContext } from '../contexts/ClientContext';
import "./CartTable.css"
import { useHistory } from 'react-router'





export default function CartTable() {
    const { cart, getCart, changeProductsCount } = useContext(clientContext)
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),

        }, table: {
            minWidth: 650,
        },
        totalPrice: {
            background: "green",
            color: 'white',

            marginTop: '5px',
            position: 'absolute',
            left: '87vw',
            width: "150px",
            height: '70px'

        },
        totalPriceCell: {

            color: 'white',
            border: 'none',

            margin: "5px 40px",
            width: "200px",
            height: '60px'

        },
        div: {
            height: "80px"
        }
    }));
    const classes = useStyles();
    useEffect(() => {
        getCart()
    }

        , [])
    console.log(cart);

    function handleChange(id, count) {
        if (count < 1) {
            return
        }
        changeProductsCount(count, id)
    }
    const history = useHistory()
    return (
        <>
            {
                cart ? (<>
                    <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="caption table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>

                                    <TableCell align="left">Название</TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">Год</TableCell>

                                    <TableCell align="left">Жанр</TableCell>
                                    <TableCell align="left">Цена</TableCell>
                                    <TableCell align="left">Количество</TableCell>
                                    <TableCell align="left"> Сумма</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.products.map((row, index) => (
                                    <TableRow key={row.product.name}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}

                                        </TableCell>
                                        <TableCell width='80px' align="right">
                                            <img width='100' src={row.product.poster} />
                                        </TableCell>
                                        <TableCell align="left">{row.product.title}</TableCell>
                                        <TableCell align="left">{row.product.year}</TableCell>
                                        <TableCell align="left">{row.product.genre}</TableCell>
                                        <TableCell align="left">
                                            {
                                                row.product.price > 0 ? (row.product.price + " USD") : ("FREE")


                                            }

                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="number">
                                                <button className="number-minus" type="button" onClick={() => { handleChange(row.product.id, row.count + 1) }} >+</button>
                                                <input type="number" min="0" onChange={(e) => handleChange(row.product.id, e.target.value)} value={row.count} />
                                                <button className="number-plus" type="button" onClick={() => { handleChange(row.product.id, row.count - 1) }} >-</button>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">{

                                            row.subPrice > 0 ? (row.subPrice + " USD") : ("FREE")



                                        }</TableCell>

                                    </TableRow>
                                ))}
                                <Button
                                    onClick={() => history.push('/payment')}
                                    className={classes.totalPrice}
                                    variant="contained"
                                    color='default'
                                >Итого: <br />{cart.totalPrice} $ </Button>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={classes.div}></div>
                </>
                ) : (<h2>Loading...</h2>)
            }
        </>


    );
}

