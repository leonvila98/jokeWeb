import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from '../../actions/index.js';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import getSingleJoke from '../getSingleJoke';

import './joke.css';
const LOGO = '../../public/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordion:{
        width:'50%',
        minWidth:'500px',
        backgroundColor:'#474d66',
        color:'#F9FAFC',
    },
    icon:{
        // backgroundColor:'#474d66',
        color:'#F9FAFC',
    }
}));

function Joke(props) {
    const classes = useStyles();
    const[expand,setExpand]=useState()

    return (
        <div className='joke-container'>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{props.normalJoke.data?props.normalJoke.data.setup:''}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.normalJoke.data?props.normalJoke.data.delivery:''}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Joke);