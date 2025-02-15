export const persistToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const clearToken = () => {
    localStorage.removeItem("token");
  };

  export const clearUserData = () => {
    localStorage.removeItem("userData");
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const getUserData = () => {
    return JSON.parse(localStorage.getItem("userData"));
  };
  
  
  export const setUserData = (userData) => {
    return localStorage.setItem("userData", JSON.stringify(userData));
  }