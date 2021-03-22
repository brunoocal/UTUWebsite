const setLocalAuth = (value) => {
  localStorage.setItem("isAdmin", value);
  const retValue = JSON.parse(localStorage.getItem("isAdmin"));
  return retValue;
};

export default setLocalAuth;
