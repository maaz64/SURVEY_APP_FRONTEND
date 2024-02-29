import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import axiosInstance from '../axios/axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const drawerWidth = 240;



function NavBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const LogOut = async () => {
        setAuth({});
        try {
            await axiosInstance.post('/logout');
            
            navigate('/');
            toast.success("Logged Out!!!");

        } catch (error) {
            if (!error?.response) {
                toast.error('No Server Response');
            } else if (error?.response.status) {
                toast.error('Unauthorised')
            }
            else
                toast.error('Logout Failed');
        }

    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                SURVEY
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding component={Link} to="/">
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={'Home'} />

                    </ListItemButton>
                </ListItem>
                {auth?.userId ?
                    <>
                        <ListItem disablePadding component={Link} to="/profile">
                            <ListItemButton sx={{ textAlign: 'center' }} >
                                <ListItemText primary={'Profile'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding >
                            <ListItemButton sx={{ textAlign: 'center', color: 'red' }} onClick={LogOut}>
                                <ListItemText primary={'LogOut'} />
                            </ListItemButton>
                        </ListItem>
                    </>
                    :
                    <>
                        <ListItem disablePadding component={Link} to="/login">
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={'Login'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding component={Link} to="/signup">
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={'Sign Up'} />
                            </ListItemButton>
                        </ListItem>
                    </>

                }

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            SURVEY
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button sx={{ color: '#fff' }} component={Link} to='/'>
                                Home
                            </Button>
                            {auth?.userId ? <>
                                <Button sx={{ color: '#fff' }} component={Link} to='/profile'>
                                    Profile
                                </Button>
                                <Button sx={{ color: '#fff' }} onClick={LogOut}>
                                    LogOut
                                </Button>

                            </> : <>
                                <Button sx={{ color: '#fff' }} component={Link} to="/login">
                                    Login
                                </Button>
                                <Button sx={{ color: '#fff' }} component={Link} to='/signup'>
                                    SignUp
                                </Button>
                            </>}

                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Box component="main" sx={{ p: 3 }}>
                    <Toolbar />
                </Box>
            </Box>
            <Outlet />
        </>
    );
}

NavBar.propTypes = {

    window: PropTypes.func,
};

export default NavBar;