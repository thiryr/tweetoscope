import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./assets/style.css";
import { BaseContainer, NavContainer, TlContainer, WglContainer, WgrContainer } from "./baseStyle";

import TwitterTimeline from "./containers/twitterTimeline/twitterTimeline";
import NavBar from "./containers/NavBar/NavBar";
/**
 * Entry point for the app
 * Initialize app-wide systems (request service)
 * Store any app-wide data if needed (should it be in a component?)
 */

function App() {

  return (
    <BaseContainer>
      <NavContainer>
        <NavBar></NavBar>
      </NavContainer>
      <WglContainer>
        Widget Left
        {/* ADD LEFT WIDGETS HERE */}
      </WglContainer>
      <TlContainer>
        <TwitterTimeline someProperty="test"></TwitterTimeline>
      </TlContainer>
      <WgrContainer>
        Widget Right
        {/* ADD RIGHT WIDGETS HERE */}
      </WgrContainer>
    </BaseContainer>
  );
}


export default App;
