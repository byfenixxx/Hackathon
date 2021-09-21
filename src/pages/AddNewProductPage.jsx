import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { adminContext } from '../contexts/AdminContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const AddNewProductPage = () => {

    const classes = useStyles();

    const [newProduct, setNewProduct] = useState({
        title: "",
        publisher: "",
        developer: "",
        year: "",
        genre: "",
        description: "",
        price: "",
        poster: ""
    })

    const { addNewProduct } = useContext(adminContext);

    function handleInputs(e) {
        let obj = {
            ...newProduct,
            [e.target.name]: e.target.value
        }

        setNewProduct(obj);
    }

    function handleClick(e) {
        e.preventDefault();
        addNewProduct(newProduct);
    }


    return (
        <div>
            <h1>Welcome to add new product page</h1>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" value={newProduct.title} onChange={handleInputs} name="title" label="title" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.publisher} onChange={handleInputs} name="publisher" label="publisher" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.developer} onChange={handleInputs} name="developer" label="developer" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.year} onChange={handleInputs} name="year" label="year" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.genre} onChange={handleInputs} name="genre" label="genre" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.description} onChange={handleInputs} name="description" label="description" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.price} onChange={handleInputs} name="price" label="price" variant="outlined" />
                <TextField id="outlined-basic" value={newProduct.poster} onChange={handleInputs} name="poster" label="poster" variant="outlined" />
                <Button variant="contained" onClick={handleClick}>Submit</Button>
            </form>
        </div>
    );
};

export default AddNewProductPage;