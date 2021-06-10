import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from '../../actions/index.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    Switch,
    Button
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './home.css';
import Footer from '../footer/Footer';
import Header from '../navBar/Header';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    popover: {
        color:'#F32013'
    },
    paper: {
        padding: theme.spacing(1),
    },
    typography: {
        padding: theme.spacing(2),
    },
    typography2: {
        padding: theme.spacing(1),
    },
    button:{
        margin:'5px',
        textTransform: 'none',
    },
    icon:{
        marginTop:'45px',
    }
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
          main: '#F32013',
        },
        primary: {
            main: '#474d66',
        },
    },
});

function Home(props) {
    const classes = useStyles();
    const[nsfw,setNsfw] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);

    useEffect(()=>{
        if(nsfw){
            props.getNsfwJoke();
        } else {
            props.getNormalJoke('two');
        }
    },[])

    const handleNsfw = (e) =>{
        setNsfw(nsfw?false:true);
        setOpenAlert(nsfw?false:true);
        console.log(nsfw);
    }
    
    const handleAnotherJoke = (event) => {
        if(nsfw){
            props.getNsfwJoke();
        } else {
            props.getNormalJoke('two');
        }
    };
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleAlertClose = (event, reason) => {
        setOpenAlert(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <ThemeProvider theme={theme}>
            <div className='home-container'>
                <Header/>
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }} 
                    open={openAlert} 
                    autoHideDuration={6000} 
                    onClose={handleAlertClose}
                >
                    <Alert onClose={handleAlertClose} severity="error">
                        NSFW mode activated !
                    </Alert>
                </Snackbar>
                <div className='home-controls'>
                    <div className='switch-nsfw'>
                        <Switch
                            checked={nsfw}
                            onChange={handleNsfw}
                            color="secondary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <p className='common-text'>NSFW</p>
                    </div>
                    <Button aria-describedby={id} className={classes.button} size="large" variant="contained" color="primary" onClick={handleClick}>
                        <Typography className={classes.typography2}>
                            {props.normalJoke.data?props.normalJoke.data.setup:''}
                        </Typography>
                    </Button>
                    <IconButton className={classes.icon} color="primary" aria-label="add to shopping cart" onClick={handleAnotherJoke}>
                        <RefreshIcon />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        color="primary"
                        className={classes.popover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography className={classes.typography}>
                            {props.normalJoke.data?props.normalJoke.data.delivery:''}
                        </Typography>
                    </Popover>
                </div>
                <div className='footer'>
                    <Footer/>   
                </div>
            </div>
        </ThemeProvider>
    );
}

function mapStateToProps(state) {
    return{
        normalJoke: state.normalJoke,
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators,dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Home);