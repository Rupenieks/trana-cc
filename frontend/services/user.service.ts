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

const getNotesById = (id: string, userId: string) => {
    return axios.get(API_URL + "get-notes-by-id", { 
        params: {
            id,
            userId
        },
        headers: authHeader() });
}

const getAllUsers = () => {
    return axios.get(API_URL + "get-all", { headers: authHeader() });
}

export default {
    addNote,
    updateNote,
    removeNote,
    getNotesById,
    getAllUsers
};