import React, { useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { adminContext } from '../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import Truncate from 'react-truncate';
import { height } from 'dom-helpers';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function AllProductsTable() {
    const classes = useStyles();

    const { products, getAllProducts, deleteProduct, productToEdit } = useContext(adminContext);

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="right">Publisher</StyledTableCell>
                        <StyledTableCell align="right">Developer</StyledTableCell>
                        <StyledTableCell align="right">Year</StyledTableCell>
                        <StyledTableCell align="right">Genre</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Poster</StyledTableCell>
                        <StyledTableCell align="right">#</StyledTableCell>
                        <StyledTableCell align="right">#</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products ? (
                            products.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.publisher}</StyledTableCell>
                                    <StyledTableCell align="right">{row.developer}</StyledTableCell>
                                    <StyledTableCell align="right">{row.year}</StyledTableCell>
                                    <StyledTableCell align="right">{row.genre}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Truncate lines={3}>{row.description}</Truncate>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                                    <StyledTableCell align="right"><img style={{ height: "80px" }} src={row.poster} alt="#" /></StyledTableCell>
                                    <StyledTableCell align="right"><Button onClick={() => { deleteProduct(row.id) }} variant="contained">Delete</Button></StyledTableCell>
                                    <StyledTableCell align="right"><Link to={`/admin/edit/${row.id}`}><Button variant="contained">Edit</Button></Link></StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            null
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
