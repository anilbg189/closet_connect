import React from "react";
import Logo from "../images/connect-desktop-header-bi.svg";

export const Header = () => {
  return (
    <div>
      <header className="App-header">
        <img src={Logo} alt="logo" className="logo" />
      </header>
    </div>
  );
};
