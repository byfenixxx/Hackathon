import React, { useContext, useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { useHistory } from "react-router-dom";
import { clientContext } from '../contexts/ClientContext';
import axios from 'axios';
import { NEWAPI } from '../helpers/const';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        cursor: 'pointer',
    },

    search: {

        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        width: '70vw',
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: {
        backgroundColor: 'black'
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const token = JSON.parse(localStorage.getItem("token"))
    const { productsCountInCart, getAllUsers, users } = useContext(clientContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [productIncart, setProductIncart] = React.useState(productsCountInCart)
    useEffect(() => {
        setProductIncart(productsCountInCart)
    }, [productsCountInCart])
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        getAllUsers()
    }, [])

    let userOnline = JSON.parse(localStorage.getItem('userEmail'))
    let newArr = []
    if (users) {
        newArr = users.filter(item => item.status === 'admin')
    }
    let adminToggle = false

    function changeAdminStatus(user) {
        let array = newArr.filter(item => item.email === user)
        console.log(array)
        array.length > 0 ? adminToggle = true : adminToggle = false
    }
    changeAdminStatus(userOnline)



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                adminToggle ?
                    <MenuItem onClick={() => {
                        history.push('/admin')
                    }}>??????????????????????????</MenuItem>
                    : ''
            }

            <MenuItem onClick={() => {
                history.push('/sign-up')
            }}>??????????????????????</MenuItem>
            {
                token ? (
                    <MenuItem onClick={() => {
                        let token1 = ''
                        localStorage.setItem('token', JSON.stringify(token1))
                        history.push('/main')
                    }}>??????????</MenuItem>

                ) : (<MenuItem onClick={() => {
                    history.push('/sign-in')
                }}>??????????</MenuItem>)
            }



        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={productIncart ? `${productIncart}` : ""} color={productIncart ? "secondary" : "default"}>
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>??????????????</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge color="secondary">
                        <StarRoundedIcon />
                    </Badge>
                </IconButton>
                <p>??????????????????</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>?????? ??????????????</p>
            </MenuItem>
        </Menu>
    );


    const { getProducts, changePage, changeLeftSideBarDisplayStatus } = useContext(clientContext);
    const history = useHistory();


    // search start
    const [seacrhValue, setSearchValue] = useState("");

    const filterProducts = (key, value) => {
        let search = new URLSearchParams(history.location.search);
        search.set(key, value);
        let url = `${history.location.pathname}?${search.toString()}`;
        history.push(url)
        setSearchValue(search.get("q"));
        changePage(1);
        getProducts();
    }

    let search = new URLSearchParams(history.location.search);
    useEffect(() => {
        setSearchValue(search.get("q") || "")
    }, [history.location])

    // search end


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={changeLeftSideBarDisplayStatus}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography onClick={() => { history.push('/main'); getProducts() }} className={classes.title} variant="h6" noWrap>
                        GAMEE
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search???"
                            onChange={(e) => {
                                filterProducts("q", e.target.value)
                            }}
                            value={seacrhValue}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={productIncart ? `${productIncart}` : ""} color={productIncart ? "secondary" : "default"}>
                                <ShoppingCartOutlinedIcon
                                    onClick={() => {
                                        history.push('/cart')
                                    }}
                                />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge color="secondary">
                                <StarRoundedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
