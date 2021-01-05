import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";

const API_URL = "http://localhost:4001/";
async function addNote(title: string, content: string, id: string){
    const response = await axios.post(API_URL + "user/add-note", {
        title,
        content, 
        id
    }, { headers: authHeader() });
    
    return response;
};

async function updateNote(title: string, content: string, id: string, noteId: string){
    return await axios.post(API_URL + "user/update-note", {
        title,
        content,
        id,
        noteId
    }, { headers: authHeader() });
};

async function removeNote(id: string, noteId: string) {
    return await axios.post(API_URL + "user/remove-note", {
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

async function getAllUsers() {
	let users;

	try {
		const response = await axios.get(API_URL + "user/get-all", { headers: authHeader() });
		
		users = response.data.data;

	} catch (err) {
		throw err;
	}

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