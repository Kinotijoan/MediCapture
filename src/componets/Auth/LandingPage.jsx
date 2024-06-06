import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Auth3 from './Auth3.png';
import './style.css';


const LandingPage = () => {
    const {  isAuthenticated } = useAuth0();

    return(
        
        !isAuthenticated && (
            <div>
              <img src={Auth3} className="App-logo" alt="logo" />
                <h2>Hi welcome to Auth0 Landing Page</h2>
                <h2><b>Get Started.</b></h2>
           </div>
        )
    )
}

export default LandingPage;