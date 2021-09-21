import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Почтовые данные
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Ваше имя"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Ваша Фамилия"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Ваша почта"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>





                <Grid item xs={12}>
                    <FormControlLabel

                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Использовать этот адресс электронной почти для деталей заказа"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}