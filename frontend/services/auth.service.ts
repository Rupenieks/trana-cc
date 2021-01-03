import axios from "axios";

const API_URL = "http://localhost:4001/";

async function register(email, password){
  const response = await  axios.post(API_URL + "user/register", {
    email,
    password,
  });

  console.log(response);

  return response;
};

async function login(email, password){
    let response
    
    try {
        response = await axios
        .post(API_URL + "user/login", {
          email,
          password,
        }); 

        console.log(response);

        if (response.data.accessToken) {
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        }

        return response.data;
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

export default {
  register,
  login,
  logout,
  getCurrentUser,
};