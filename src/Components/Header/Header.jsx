import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import header from './Header.module.css'


export const Header = ({username,Logout}) => {
  const [anchor, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar id={header.bg_header}  position="static">
        <Toolbar>
          <IconButton id={header.linksdelete}
            size="large"
            edge="start"
            sx={{ mr: 2 }}
          >
          <Link id={header.linksdelete} to={'/'}>Waven</Link>
          </IconButton>

          <Typography variant="h5" component="span" sx={{flexGrow: 1}}/>
            <div>

              <IconButton
                  id={header.linksdelete}
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
               {username}
              </IconButton>


              <Menu
                id="menu-appbar"
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchor)}
                onClose={handleClose}
              >
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
    );
};
