import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4001/user/";

const addNote = (title: string, content: string, id: string) => {
    return axios.post(API_URL + "add-note", {
        title,
        content, 
        id
    }, { headers: authHeader() });
};

const updateNote = (title: string, content: string, id: string, noteId: string) => {
    return axios.post(API_URL + "update-note", {
        title,
        content,
        id,
        noteId
    }, { headers: authHeader() });
};

const removeNote = (id: string, noteId: string) => {
    return axios.post(API_URL + "remove-note", {
        id, 
        noteId
    }, { headers: authHeader() });
};

async function getNotesById(id: string){
    const response = await axios.post(API_URL + "get-notes-by-id",  
        {
            id
        },
        { headers: authHeader() });

    const notes = response.data.data;

    return notes;
}

async function getAllUsers(){
    const response = await axios.get(API_URL + "get-all", { headers: authHeader() });
    
    const users = response.data.data;

    return users;
}

async function getProfile(id: string){
    const response = await axios.post(API_URL + "profile", 
    {
        id
    },
    { headers: authHeader() });
    
    const profile = response.data.data;
    
    return profile;
}

export default {
    addNote,
    updateNote,
    removeNote,
    getNotesById,
    getAllUsers,
    getProfile
};