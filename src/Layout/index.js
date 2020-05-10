
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Menu from '@material-ui/core/Menu';
import { MenuList, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1px",
        padding: "1px"
    // display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  Button: {
    marginLeft: theme.spacing(2)
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
content: {
        [theme.breakpoints.up("sm")]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`
        },
    }
}));

function Layout(props) {
  const { window } = props;
  const {children} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorel, setAnchorel] = React.useState(false);

  const handleClick = (event) => {
    setAnchorel(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorel(false);
  };

  const drawer = (
    <div onClose={handleClose}
    onClick={handleClick}>
        <Hidden xsDown implementation="css">
      <div className={classes.toolbar} />
      </Hidden>
      {/* hello

      <Divider /> */}
      <MenuList        
        anchorel={anchorel}
        keepMounted
        open={Boolean(anchorel)}
        onClose={handleClose}
        onClick={handleClick}
 >
          <MenuItem onClick={handleClose} component={Link} to="/">
            Home
          </MenuItem>
          <MenuItem component={Link} to="/world" onClick={handleClose}>
            World
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/zones">
            Maps
          </MenuItem>
          {/* <MenuItem onClick={handleClose} component={Link} to="/statistics">
            Statistics
          </MenuItem> */}
          <MenuItem onClick={handleClose} component={Link} to="/about"  >
            About
          </MenuItem>
      </MenuList>
   
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar style={{ background: '#3887BE' }} position="fixed" className={classes.appBar} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" align="center" noWrap>
            Covid19 Interactive
          </Typography>
          <div style={{marginLeft:"auto", marginRight:0 }}>
          <Button className={classes.Button} color="inherit" component={Link} to="/zones">Maps</Button>
          </div>
        </Toolbar>
        
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            onClick={handleDrawerToggle}
            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
                <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
                    {children}
      </main>
    </div>
  );
}

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };



        export default Layout;