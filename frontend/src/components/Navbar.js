import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Toolbar, Menu, MenuItem, IconButton} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from "../slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state)=>state.auth)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutApiCall] = useLogoutMutation()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err)
    }
  }
 
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
          MERN-AUTH
        </Typography>
        {userInfo ? (
        <>
              <IconButton
                id="username"
                title={userInfo.name}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
        </>
        ) : (
          <>
        <Link to="/login"><Button sx={{backgroundColor: "grey", color: "white", "&:hover": {backgroundColor: "brown"}}}><LoginOutlinedIcon/>Login</Button></Link>
        <Link to="/signup"><Button sx={{backgroundColor: "grey", color: "white", "&:hover": {backgroundColor: "brown"},marginLeft: "1rem"}}><HowToRegOutlinedIcon/>Sign Up</Button></Link>
          </>
        )}
               
        
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar