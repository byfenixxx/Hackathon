import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CreditCardIcon from '@material-ui/icons/CreditCard';


export default function PaymentForm() {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Платежный метод
            </Typography>
            <CreditCardIcon />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardName" label="ФИО на карте" fullWidth autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Номер карты"
                        fullWidth
                        autoComplete="cc-number"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="expDate" label="Срок действия карты" fullWidth autoComplete="cc-exp" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV код"
                        helperText="3 цифры на обратной стороне карты"
                        fullWidth
                        autoComplete="cc-csc"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Запомнить данные моей карты"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}