import axios from "axios";
import userService from "./user.service";

const API_URL = "http://localhost:4001/";

async function register(email, password){
  const response = await  axios.post(API_URL + "user/register", {
    email,
    password,
  });

  return response;
};

async function login(email, password) : Promise<boolean> {
    let response;
    
    try {
        response = await axios
        .post(API_URL + "auth/login", {
          email,
          password,
        }); 

        if (response.data.access_token) {
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        } else {
            return false;
        }
        
        return true;
    } catch (err) {
        console.log(err);
    }
    
};

const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
    }
};

const getCurrentUser = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("user"));
    }
};

async function refreshCurrentUser(){
    let user = getCurrentUser();
    console.log(user);
    let newUserObject;

    if (user.data) {
        newUserObject = await userService.getProfile(user.data._id);
    } else {
        newUserObject = await userService.getProfile(user._id);
    }
    
    console.log(newUserObject);

    if (newUserObject !== undefined) {
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(newUserObject));
            return newUserObject;
        }
    } else {
        return null;
    }
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  refreshCurrentUser
};