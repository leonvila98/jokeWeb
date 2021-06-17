import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Snackbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import '../home/home.css';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const headersData = [
	{
		label: "Register",
		href: "/register",
	},
	{
		label: "Log in",
		href: "/login",
	},
];

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "#474d66",
		paddingRight: "79px",
		paddingLeft: "118px",
		"@media (max-width: 900px)": {
			paddingLeft: 0,
		},
	},
	logo: {
		fontFamily: "Work Sans, sans-serif",
		fontWeight: 600,
		color: "#FFFEFE",
		textAlign: "left",
	},
	menuButton: {
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 700,
		size: "18px",
		marginLeft: "38px",
	},
	toolbar: {
		// backgroundColor: "#8f95b2",
		display: "flex",
		justifyContent: "space-between",
	},
	drawerContainer: {
		// backgroundColor: "#8f95b2",
		padding: "20px 30px",
	},
}));
  
export default function Header(props) {
	const{setOpenForm} = props;
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
    const [openAlert2, setOpenAlert2] = React.useState(false);
  
    const [state, setState] = useState({
		mobileView: false,
		drawerOpen: false,
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 900
				? setState((prevState) => ({ ...prevState, mobileView: true }))
				: setState((prevState) => ({ ...prevState, mobileView: false }));
		};
	
		setResponsiveness();
	
		window.addEventListener("resize", () => setResponsiveness());
	
		return () => {
			window.removeEventListener("resize", () => setResponsiveness());
		};
    }, []);

    const handleMenuClick = (e) =>{
      	setOpenAlert2(true);
    }
    const handleAlertClose2 = (event, reason) => {
        setOpenAlert2(false);
    };
    const handleRegister = (event, reason) => {
        setOpenForm(true);
    };
    const handleLogin = (event, reason) => {
        setOpenForm(true);
    };

  
    const displayDesktop = () => {
      return (
		<Toolbar className={toolbar}>
			{femmecubatorLogo}
			<div>
				<Button
						{...{
							key: 'Register',
							color: "inherit",
							// to: href,
							component: RouterLink,
							className: menuButton,
						}}
						onClick={handleMenuClick}
					>
						Register
				</Button>
				<Button
						{...{
							key: 'login',
							color: "inherit",
							// to: href,
							component: RouterLink,
							className: menuButton,
						}}
						onClick={handleMenuClick}
					>
						Log In
				</Button>
			</div>
		</Toolbar>
      );
    };
  
    const displayMobile = () => {
		const handleDrawerOpen = () =>
			setState((prevState) => ({ ...prevState, drawerOpen: true }));
		const handleDrawerClose = () =>
			setState((prevState) => ({ ...prevState, drawerOpen: false }));
	
		return (
			<Toolbar>
			<IconButton
				{...{
					edge: "start",
					color: "inherit",
					"aria-label": "menu",
					"aria-haspopup": "true",
					onClick: handleDrawerOpen,
				}}
			>
				<MenuIcon />
			</IconButton>
	
			<Drawer
				{...{
					anchor: "left",
					open: drawerOpen,
					onClose: handleDrawerClose,
				}}
			>
				<div className={drawerContainer}>
					<Link
						{...{
							component: RouterLink,
							// to: href,
							color: "inherit",
							style: { textDecoration: "none" },
							key: 'Register',
						}}
						onClick={handleRegister}
					>
						<MenuItem>Register</MenuItem>
					</Link>
					<Link
						{...{
							component: RouterLink,
							// to: href,
							color: "inherit",
							style: { textDecoration: "none" },
							key: 'Login',
						}}
						onClick={handleLogin}
					>
						<MenuItem>Log In</MenuItem>
					</Link>
				</div>
			</Drawer>
	
			<div>{femmecubatorLogo}</div>
			</Toolbar>
		);
	};
  
    const femmecubatorLogo = (
		<div className='logo-container'>
			<span className='logo-font'>Jokes</span>
		</div>
    );
  
    return (
		<header>
			<Snackbar 
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}} 
				open={openAlert2} 
				autoHideDuration={1000} 
				onClose={handleAlertClose2}
			>
				<Alert onClose={handleAlertClose2} severity="info">
					Available soon
				</Alert>
			</Snackbar>
			<AppBar className={header}>
				{mobileView ? displayMobile() : displayDesktop()}
			</AppBar>
		</header>
    );
  }