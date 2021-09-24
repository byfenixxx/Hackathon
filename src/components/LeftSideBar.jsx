import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { clientContext } from '../contexts/ClientContext';

const LeftSideBar = () => {

    const [price, setPrice] = useState("");
    const [genre, setGenre] = useState("");
    const history = useHistory();

    const { getProducts, genres, getGenres, changePage, sideBarStatus } = useContext(clientContext);

    const filterProducts = (key, value) => {
        let search = new URLSearchParams(history.location.search);
        search.set(key, value);
        let url = `${history.location.pathname}?${search.toString()}`;
        history.push(url);
        setPrice(search.get("price_lte"));
        setGenre(search.get("genre"));
        getProducts();
        changePage(1);
    }

    let search = new URLSearchParams(history.location.search);

    useEffect(() => {
        setPrice(search.get("price_lte"));
        setGenre(search.get("genre"));
        getGenres();
    }, [])

    const resetFilter = () => {
        setPrice("");
        setGenre("");
        history.push("/main");
        getProducts();
    }

    return (
        <div className="left-sidebar" style={sideBarStatus ? {display: "block"} : {display: "none"}}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Цена</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={price} onChange={(e) => filterProducts("price_lte", e.target.value)}>
                    <FormControlLabel value="60" control={<Radio />} label="60" />
                    <FormControlLabel value="40" control={<Radio />} label="40" />
                    <FormControlLabel value="20" control={<Radio />} label="20" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                </RadioGroup>
            </FormControl>
            <div>
                {
                    genres ? (
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Жанр</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={genre} onChange={(e) => filterProducts("genre", e.target.value)}>
                                {
                                    genres.map(item => (
                                        < FormControlLabel key={item} value={item} control={< Radio />} label={item} />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    ) : (
                        null
                    )
                }
            </div>
            <Button onClick={resetFilter}>Reset</Button>
        </div>
    );
};

export default LeftSideBar;