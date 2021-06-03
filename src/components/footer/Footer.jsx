import React from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './footer.css';
const GITHUB = 'https://github.com/leonvila98';
const LINKEDIN = 'https://www.linkedin.com/in/leonvila/';
const EMAIL = 'leonvila98@gmail.com';

const useStyles = makeStyles({
  root: {
    width: 500,
    // textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "50px",
    width: "100%",
    backgroundColor:'#474d66',
  },
  icon:{
      backgroundColor:'#474d66',
      color:'#F9FAFC',
  },
  footer:{
    backgroundColor:'#474d66',
  }
});

function Footer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                console.log(newValue)
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <div className='linksFooter'>
                <a href={GITHUB}><BottomNavigationAction label="" icon={<GitHubIcon className={classes.icon}/>} /></a>
                <a href={LINKEDIN}><BottomNavigationAction label="" icon={<LinkedInIcon className={classes.icon}/>} /></a>
            </div>
        </BottomNavigation>
    );
}
  
export default Footer;