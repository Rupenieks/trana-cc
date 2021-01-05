import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth-header';
import { useRouter } from 'next/router';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import TextEditor from '../components/TextEditor';


export default function notes() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState();
	const [notes, setNotes] = useState([]);
	const [displayedNotes, setDisplayedNotes] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [selectedNote, setSelectedNote] = useState();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (!authService.checkAuthenticated()) {
			router.push('/');
		} else {
			getUser();
		}
		
	}, [])

	useEffect(() => {
		const newDisplayedNotes = notes.filter(note => note.title.includes(searchText));
		setDisplayedNotes(newDisplayedNotes);
	}, [searchText])

	useEffect(() => {
		if (user !== undefined) {
			//@ts-ignore
			setNotes(user.notes);
			//@ts-ignore
			setDisplayedNotes(user.notes);
			setLoading(false);
		}

	}, [user]);

	function logout() {
		authService.logout();

		router.push('/');
	}

	async function getUser() {
		let user = await userService.getProfile();
		
		if (user !== undefined) {
			setUser(user.user);
		}
	}

	function setNote(note) {
		const newNote = {...note};
		setSelectedNote(newNote);
	}

	async function saveNote(content: string) {
		//@ts-ignore
		await userService.updateNote(selectedNote.title, content, user._id, selectedNote._id);
		getUser();
	}

	async function addNote(e) {
		e.preventDefault();
		//@ts-ignore
		await userService.addNote(`note${Math.floor(Math.random() * Math.floor(999))}`, ' ', user._id);
		getUser();
	}

	async function removeNote(e) {
		e.preventDefault();
		//@ts-ignore
		await userService.removeNote(user._id, selectedNote._id);
		getUser();
	}

	return (
		<div className="notes-container">

			<div className="navbar-container">

				<div className="email-container">
					Email
				</div>

				<div className="logout-container">
					<button onClick={logout}>Logout</button>
				</div>

			</div>

			<div className="main-board-container">

				<div className="sidebar-container">

					<div className="note-list-container">

						<div className="search-bar-container">
							<input type="text" onChange={(e) => setSearchText(e.target.value)} />
						</div>

						<div className="notes-list">
							{!loading && displayedNotes.map(note =>
							<div className="note-item" key={note._id} onClick={() => setNote(note)}>{note.title}</div>)}
						</div>

						<div className="util-container">
							<button onClick={addNote}>Add</button>
							<button onClick={removeNote}>Remove</button>
						</div>
					</div>
				</div>

				<div className="editor-container">
					{selectedNote !== undefined ?
										<TextEditor
										saveNote={saveNote}
										//@ts-ignore
										key={selectedNote._id}
										//@ts-ignore
										content={selectedNote.content}
									/> : <div>Select a note</div>}

				</div>
			</div>
			<style jsx>
				{`
				.search-bar-container {
					flex: 1;
				}

				.notes-list {
					flex: 4;
				}

				.util-container {
					flex: 1;
				}
				.notes-container {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
				}

				.navbar-container {
					display: flex;
					flex: 1;
					border: 1px solid black;
				}

				.email-container {
					flex: 1;
				}

				.logout-container {
					flex: 1;
				}

				.main-board-container {
					flex: 9;
					display: flex;
					flex-direction: row;
				}

				.sidebar-container {
					flex: 2;
					border: 1px solid black;
					display: flex;
					flex-direction: column;
				}

				.editor-container {
					flex: 8;
					border: 1px solid black;
				}

				.note-list-container {
					flex: 1;
				}
				`}
			</style>
		</div>
	)
}



