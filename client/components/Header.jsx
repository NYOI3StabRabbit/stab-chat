import React, { useState, useEffect } from "react";
import { darkModeStore } from "../store";

function Header() {
  //when users pressed log out button the cookie is cleared and window redirected to login
  function logOut() {
    Cookies.remove("user");
    Cookies.remove("ownedChannels");
    Cookies.remove("subscribedChannels");
    window.location.href = "/login";
  }

  //==========dark mode===========
  const { toggleHuH, HuH } = darkModeStore();
  useEffect(() => {
    if (HuH) {
      document.body.classList.add("bodyDM");
      // const list = document.querySelector('.chatPageHeader');
      // list.classList.add('.chatPageHeaderDM')
      // document.input.classList.add("inputDM");
    } else {
      document.body.classList.remove("bodyDM");
      // const list = document.querySelector('.chatPageHeader');
      // list.classList.remove('.chatPageHeaderDM')
      // document.input.classList.remove("inputDM");
    }
  }, [HuH]);

  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);
  //==========dark mode===========

  return (
      <div className="chatPageHeader">
        <div id="chatPageHeaderTitle">
          STAB CHAT
        </div>
        <div id="chatPageHeaderButtons">
          <button type="button" onClick={logOut}>Logout</button>
          <button onClick={toggleHuH}>Change Theme</button>
        </div>
      </div>
  );
}

export default Header;
