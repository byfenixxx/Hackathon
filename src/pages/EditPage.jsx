import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { adminContext } from '../contexts/AdminContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const EditPage = () => {

    const classes = useStyles();

    const { productToEdit, getProductToEdit, saveEditedProduct } = useContext(adminContext);

    const [editedProduct, setEditedProduct] = useState(productToEdit);

    const { id } = useParams();

    useEffect(() => {
        getProductToEdit(id)
    }, [])

    useEffect(() => {
        setEditedProduct(productToEdit)
    }, [productToEdit])

    function handleInputs(e) {
        let obj = {
            ...editedProduct,
            [e.target.name]: e.target.value
        }

        setEditedProduct(obj);
    }

    return (
        <div>
            {
                editedProduct ? (
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" value={editedProduct.title} onChange={handleInputs} name="title" label="title" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.publisher} onChange={handleInputs} name="publisher" label="publisher" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.developer} onChange={handleInputs} name="developer" label="developer" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.year} onChange={handleInputs} name="year" label="year" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.genre} onChange={handleInputs} name="genre" label="genre" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.description} onChange={handleInputs} name="description" label="description" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.price} onChange={handleInputs} name="price" label="price" variant="outlined" />
                        <TextField id="outlined-basic" value={editedProduct.poster} onChange={handleInputs} name="poster" label="poster" variant="outlined" />
                        <Button variant="contained" onClick={() => saveEditedProduct(editedProduct)}>Submit</Button>
                    </form>
                ) : (
                    <h2>Loading</h2>
                )
            }
        </div>
    );
};

export default EditPage;