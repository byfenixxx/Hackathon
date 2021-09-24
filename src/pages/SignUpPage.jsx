import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router'
import { clientContext } from '../contexts/ClientContext';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backBtn: {
        height: '60px',
        width: '40px',
        position: 'fixed',
        left: "25%",
        top: '13%',
        cursor: 'pointer',
    },
    avatar: {
        backgroundColor: "#3f51b5",
        marginBottom: '10px'
    }, root: {
        backgroundImage: 'url(https://wallpaperaccess.com/full/7446.jpg)',
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const { createNewAccount } = useContext(clientContext)
    const [newAccount, setNewAccount] = useState({
        email: '',
        password: '',
        status: 'user'
    })
    function handleChange(e) {
        let obj = {
            ...newAccount,
            [e.target.name]: e.target.value
        }
        setNewAccount(obj)
    }

    function handleClick(e) {
        e.preventDefault()
        createNewAccount(newAccount, history)
    }
    return (

        <Container component="main" maxWidth="xs">
            <ArrowBackRoundedIcon onClick={() => { history.push('/main') }} className={classes.backBtn} />
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar color='primary' className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <form onSubmit={handleClick} className={classes.form} noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Электронная почта"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Я согласен получать новости и другие рассылки на свою почту"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => { history.push('/sign-in') }} variant="body2">
                                У Вас уже есть аккаунт ? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}