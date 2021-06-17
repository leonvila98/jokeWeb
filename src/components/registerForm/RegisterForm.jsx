import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from '../../actions/index.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    },
    dialog:{
        backgroundColor:'#474d66'
    },
    dialogContent:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    textField:{
        width:'100%'
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

function RegisterForm(props){

    const classes = useStyles();

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

    const{openForm,setOpenForm} = props;

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
    const handleClose = () => {
        setOpenForm(false);
    };
  
    return (
        <div>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xs'>
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will be able to save and suggest jokes.
                    </DialogContentText>
                    <DialogContent className={classes.dialogContent} fullWidth='true'>
                        <TextField
                            id='email-input'
                            name='email'
                            label='Email'
                            variant='outlined'
                            value={input.email}
                            className={classes.textField}
                            onChange={handleInputChange}
                            {...(errors.email && {
                                error: errors.email,
                                helperText: 'Email inválido',
                            })}
                        />
                    </DialogContent>
                    <DialogContent className={classes.dialogContent} fullWidth='true'>
                        <TextField
                            id='password-input'
                            name='password'
                            label='Password'
                            variant='outlined'
                            value={input.password}
                            className={classes.textField}
                            onChange={handleInputChange}
                            {...(errors.password && {
                                error: errors.password,
                                helperText: 'Password inválida',
                            })}
                        />
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default RegisterForm;