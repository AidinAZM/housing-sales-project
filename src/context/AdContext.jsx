import { createContext, useState } from "react";

export const AdContext = createContext({
  setUser: () => {},
  getUser: () => {},
  setAds: () => {},
  getAds: () => {},
  changeDarkMode: () => {},
  getDarkMode: () => {},
});

// eslint-disable-next-line react/prop-types
export function AdProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userAds, setUserAds] = useState([]);

  function changeDarkMode() {
    setDarkMode(!darkMode);
  }

  function getDarkMode() {
    return darkMode;
  }

  // set and get the Currently loggedIn User
  function setUser(userData) {
    setLoggedInUser(userData);
    console.log("userData:", userData);
  }

  function getUser() {
    return loggedInUser;
  }

  //set and get the Currently LoggedIn User's Ads
  function setAds(adsArr) {
    setUserAds(adsArr);
    console.log("userAds:", userAds);
  }

  function getAds() {
    return userAds;
  }

  const ContextValue = {
    setUser,
    getUser,
    setAds,
    getAds,
    changeDarkMode,
    getDarkMode,
  };

  return (
    <AdContext.Provider value={ContextValue}>{children}</AdContext.Provider>
  );
}
