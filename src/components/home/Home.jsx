import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from '../../actions/index.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    Switch,
    Button
} from '@material-ui/core';
import './home.css';
// import '../../assets/nuevLogo.jpg'
import Joke from '../joke/Joke';
import Footer from '../footer/Footer'
import logo from '../../assets/nuevLogo.jpg';

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
    const[nsfw,setNsfw] = useState(false);

    const handleNsfw = (e) =>{
        setNsfw(true?false:true);
        console.log(nsfw);
    }
    const handleGetJoke=()=>{
        if(nsfw){
            props.getNsfwJoke();
        } else {
            props.getNormalJoke('two');
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <div className='home-container'>
                <div className='navBar'>
                    <div className='logo'>
                        <img src={logo} className='logo' alt="logo" />
                    </div>
                    <div className='links'>
                        <a href="">My jokes</a>
                        <a href="">Register</a>
                        <a href="">Login</a>
                    </div>
                </div>
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
                    <Button variant="contained" color="primary" onClick={handleGetJoke}>
                        Give me the joke
                    </Button>
                    <Joke/>
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