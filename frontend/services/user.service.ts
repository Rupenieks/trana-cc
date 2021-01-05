import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4001/";
async function addNote(title: string, content: string, id: string){
    console.log(title, "content: ", content, "id", id);
    const response = await axios.post(API_URL + "user/add-note", {
        title,
        content, 
        id
    }, { headers: authHeader() });
    console.log(response);
    return response;
};

const updateNote = (title: string, content: string, id: string, noteId: string) => {
    return axios.post(API_URL + "user/update-note", {
        title,
        content,
        id,
        noteId
    }, { headers: authHeader() });
};

const removeNote = (id: string, noteId: string) => {
    return axios.post(API_URL + "user/remove-note", {
        id, 
        noteId
    }, { headers: authHeader() });
};

async function getNotesById(id: string){
    const response = await axios.post(API_URL + "user/get-notes-by-id",  
        {
            id
        },
        { headers: authHeader() });

    const notes = response.data.data;

    return notes;
}

async function getAllUsers(){
    const response = await axios.get(API_URL + "user/get-all", { headers: authHeader() });
    
    const users = response.data.data;

    return users;
}

async function getProfile(){
    const response = await axios.get(API_URL + "profile", 
    { headers: authHeader() });
    
    const profile = response.data;
    
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