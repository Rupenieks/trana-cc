import axios from "axios";

const API_URL = "http://localhost:4001/";

async function register(email, password){
  const response = await  axios.post(API_URL + "auth/register", {
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
          password
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
        throw err;
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

export default {
  register,
  login,
  logout,
  getCurrentUser
};