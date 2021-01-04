import React, { useEffect, useState } from 'react'
import authHeader from '../services/auth-header';
import { useRouter } from 'next/router';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import TextEditor from '../components/TextEditor';

export default function notes() {
    const router = useRouter();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleView, setToggleView] = useState(false);
    const [selectedNote, setSelectedNote] = useState({});
    const [user, setUser] = useState({});
    
    useEffect(() => {
        // Check if user object exists
        if (authHeader() === {}) {
            router.push('/');
        }

        async function initialize(){
            const user = await authService.refreshCurrentUser();
        
            setUser(user);
            setNotes(user.notes);
        }

        initialize();

        
        return;
    }, []);

    function editNote(e, note: any){
        e.preventDefault();
        setToggleView(true);

        setSelectedNote(note);
    }

    async function saveNote(content: string){

       await userService.updateNote(
           //@ts-ignore
            selectedNote.title,
            content,
            //@ts-ignore
            user._id,
            //@ts-ignore
            selectedNote._id);
        
        setSelectedNote({...selectedNote, content: content});
        console.log(user);
        //@ts-ignore
        const notes = await userService.getNotesById(user._id);

        setNotes(notes);
        setToggleView(false);
    }

    useEffect(() => {

    }, [selectedNote])


    useEffect(() => {
        setLoading(false);

        return;
    }, [notes])



    return (
        <div className="nodesIndex-container">
            <div className="sidepanel-container">
                <div className="username-wrapper">
                        Username
                </div>
                <div className="search-bar-wrapper">
                    <input type="text"></input>
                </div>
                <div className="button-wrapper">
                    <button>Add</button>
                </div>
                <div className="button-wrapper">
                    <button>Update</button>
                </div>
                <div className="button-wrapper">
                    <button>Remove</button>
                </div>
            </div>
            <div className="main-view-container">
                {!toggleView && <div className="list-board">{!loading && notes.map(note => (<div className='list-item' onClick={(e) =>editNote(e, note)}>{note.title} </div>))} </div>}
                {toggleView &&
                 <TextEditor
                  note={selectedNote}
                  saveNote={saveNote}
                 ></TextEditor> }
            </div>

            <style jsx>
                {`
                
                .nodesIndex-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                }

                .sidepanel-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid black;
                }

                .main-view-container{
                    flex: 5;
                    border: 1px solid black;
                }

                .list-item {
                    flex-wrap: wrap;
                    height: 10em;
                    width: 10em;
                    border: 1px solid black;
                    text-align: center;
                }
                
                `}
            </style>
        </div>
    )
}


