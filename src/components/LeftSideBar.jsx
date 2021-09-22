import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

const LeftSideBar = () => {
    return (
        <div className="left-sidebar">
        <FormControl component="fieldset">
            <FormLabel component="legend">Цена</FormLabel>
            <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel value="5000" control={<Radio />} label="5000" />
                <FormControlLabel value="10000" control={<Radio />} label="10000" />
                <FormControlLabel value="15000" control={<Radio />} label="15000" />
                <FormControlLabel value="20000" control={<Radio />} label="20000" />
            </RadioGroup>
        </FormControl>
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Бренд</FormLabel>
                {/* <RadioGroup aria-label="gender" name="gender1" value={brand} onChange={(e) => filterProducts("brand", e.target.value)}>
                    {
                        brands.map(item => (
                            < FormControlLabel key={item} value={item} control={< Radio />} label={item} />
                        ))
                    }
                </RadioGroup> */}
            </FormControl>
        </div>
        {/* <Button onClick={resetFilter}>Reset</Button> */}
    </div>
    );
};

export default LeftSideBar;