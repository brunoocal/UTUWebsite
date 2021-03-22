const getLocalAuth = () => {
  if (localStorage.getItem("isAdmin") !== null) {
    return JSON.parse(localStorage.getItem("isAdmin"));
  } else {
    localStorage.setItem("isAdmin", false);
    const value = JSON.parse(localStorage.getItem("isAdmin"));
    return value;
  }
};

export default getLocalAuth;
