import { createContext, useState } from "react";

export const AdContext = createContext({
  setUser: () => {},
  getUser: () => {},
  setUserAds: () => {},
  getUserAds: () => {},
  setData: () => {},
  getData: () => {},
  changeDarkMode: () => {},
  getDarkMode: () => {},
});

// eslint-disable-next-line react/prop-types
export function AdProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserAds, setLoggedInUserAds] = useState([]);
  const [adsData, setAdsData] = useState([]);

  function changeDarkMode() {
    setDarkMode(!darkMode);
  }

  function getDarkMode() {
    return darkMode;
  }

  // set and get the Currently loggedIn User
  function setUser(userData) {
    setLoggedInUser(userData);
  }

  function getUser() {
    return loggedInUser;
  }

  //set and get the Currently LoggedIn User's Ads
  function setUserAds(adsArr) {
    setLoggedInUserAds(adsArr);
  }

  function getUserAds() {
    return loggedInUserAds;
  }

  // data = an array state of all house objects that is shown in the MainPage.jsx
  function setData(adsArr) {
    setAdsData(adsArr);
  }

  function getData() {
    return adsData;
  }

  const ContextValue = {
    setUser,
    getUser,
    setUserAds,
    getUserAds,
    setData,
    getData,
    changeDarkMode,
    getDarkMode,
  };

  return (
    <AdContext.Provider value={ContextValue}>{children}</AdContext.Provider>
  );
}
