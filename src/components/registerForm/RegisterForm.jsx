import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from '../../actions/index.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    Switch,
    Button,
    Select,
    TextField,
    Popover,
    Typography,
    IconButton,
    Snackbar
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import MuiAlert from '@material-ui/lab/Alert';

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

function RegisterForm(){

    let [input, setInput] = useState({
        email: '',
        password: '',
    });

    let [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    function validate(inputName, value) {
        const emailPattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        let errors = {};

        switch (inputName) {
            case 'email': {
                if (!emailPattern.test(value) && value.length > 0) {
                    errors.email = true;
                } else {
                    errors.email = false;
                }
                break;
            }
            default:
                return null;
        }
        return errors;
    }

    const handleInputChange = (e) => {
        setErrors(validate(e.target.name, e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        console.log(input)
    };
  
    return (
        <div>
            <TextField
                id='email-input'
                name='email'
                label='Email'
                variant='outlined'
                value={input.email}
                // className={classes.textField}
                onChange={handleInputChange}
                {...(errors.email && {
                    error: errors.email,
                    helperText: 'Email inválido',
                })}
            />
            <TextField
                id='password-input'
                name='password'
                label='Password'
                variant='outlined'
                value={input.password}
                // className={classes.textField}
                onChange={handleInputChange}
                {...(errors.password && {
                    error: errors.password,
                    helperText: 'Password inválida',
                })}
            />
            <Button
                onClick={handleSubmit}
            >
                Registrarse
            </Button>
        </div>
    );
}
export default RegisterForm;