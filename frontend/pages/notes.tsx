import React, { useEffect, useState } from 'react';
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
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState();
	const [selectedUserNotes, setSelectedUserNotes] = useState([]);

	useEffect(() => {
		if (!authService.checkAuthenticated()) {
			router.push('/');
		} else {
			getUser();
			checkIsAdmin();
		}
		
	}, [])

	useEffect(() => {
		const newDisplayedNotes = notes.filter(note => note.title.includes(searchText));
		setDisplayedNotes(newDisplayedNotes);
	}, [searchText]);

	useEffect(() => {
		if (selectedUser !== undefined) {
			//@ts-ignore
			setSelectedUserNotes(selectedUser.notes);
		}
	}, [selectedUser]);

	useEffect(() => {
		if (users !== undefined && users.length > 0 && selectedUser !== undefined) {
			//@ts-ignore
			const user = users.find(user => user._id === selectedUser._id);
			setSelectedUserNotes(user.notes);
		}
	}, [users]);

	useEffect(() => {
		setDisplayedNotes(notes);
		setSearchText('');
	}, [notes]);

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

	/* ADMIN STUFF */

	async function checkIsAdmin() {
		if (await authService.checkIsAdmin()) {
			setIsAdmin(true);
			getUsers();
		}
	}

	async function getUsers() {
		const users = await userService.getAllUsers();
		setUsers(users);
	}

	function changeSelectedUser(user) {
		setSelectedUser(user);
	}

	async function adminRemoveNote(e) {
		e.preventDefault();
		//@ts-ignore
		await userService.removeNote(selectedUser._id, selectedNote._id);
		getUsers();
	}

	/* END ADMIN STUFF */

	function setNote(note) {
		const newNote = { ...note };
		
		// //@ts-ignore
		// if (newNote._id !== user._id) {
		// 	setReadOnly(true);
		// } else {
		// 	setReadOnly(false);
		// }

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

			<div id="navbar-container" className="styled-container">

				<div className="email-container">
					{isAdmin && 'ADMIN'}
					{user !== undefined && <p>{user.email}</p>}
					
				</div>

				<div className="logout-container">
					<button className="styled-container" id="logout-button" onClick={logout}>Logout</button>
				</div>

			</div>

			<div className="main-board-container">

				<div id="sidebar-container" className="styled-container">

					<div className="note-list-container">

						<div className="search-bar-container">
							<input placeholder="search" className="styled-container" type="text" onChange={(e) => setSearchText(e.target.value)} />
						</div>
						Your notes
						<div id="notes-list">
							{!loading && displayedNotes !== undefined && displayedNotes.map(note =>
							<div className="note-item" key={note._id} onClick={() => setNote(note)}>{note.title}</div>)}
						</div>

						<div className="util-container">
							<button className="styled-container" id="property-button" onClick={addNote}>Add</button>
							<button className="styled-container" id="property-button" onClick={removeNote}>Remove</button>
						</div>

					</div>
					{isAdmin && 
						<div className="admin-panel-container">
						User Notes
						<div className="selected-user-notes-container">
								{selectedUserNotes !== undefined && selectedUserNotes.map(note => (
									<li className="note-item" onClick={() => setSelectedNote(note)}>{note.title}</li>
								))}
							</div>
									<button className="styled-container" id="property-button" onClick={adminRemoveNote}>Remove</button>
						User List
						<div className="userlist-container">
								{users !== undefined &&
									<ul>
										{users.map(user => (
											<li className="note-item" onClick={() => changeSelectedUser(user)}>{user.email}</li>
										))}
									</ul>
								}
							</div>

						</div>}
				</div>

				<div id="editor-container" className="styled-container">
					{selectedNote !== undefined ?
						<TextEditor
							saveNote={saveNote}
							//@ts-ignore
							key={selectedNote._id}
							//@ts-ignore
							content={selectedNote.content}
						/> :
						<div>Select a note</div>}

				</div>
			</div>
			<style jsx>
				{`

				li {
					display: block;
				}

				.admin-panel-container {
					display: flex;
					flex: 1;
					border: 1px solid black;
					flex-direction: column;
					height: 100%;
					width: 100%;
				}

				.selected-user-notes-container {
					flex: 1;
					border: 1px solid black;
					overflow-y: scroll;
					height: 100%;
					width: 100%;
				}

				.userlist-container {
					flex: 1;
					border: 1px solid black;
					overflow-y: scroll;
					height: 100%;
					width: 100%;
				}

				.user-item {
					color: red;
				}

				.user-list {
					flex: 1;
					overflow-y: scroll;
					height: 100%;
				}

				.note-list-container {
					flex: 1;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
				}

				.search-bar-container {
					flex: 1;
					height: 100%;
				}

				#property-button:hover {
					color: white;
					background: grey;
				}

				#notes-list {
					border: 1px solid black;
					width: 100%;
					flex: 4;
					height: 100%;
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

				#navbar-container {
					display: flex;
					flex: 1;
					border: 1px solid black;
					width: 100%;
					border:dashed 2px #41403E;
				}

				.note-item:hover {
					background: black;
					color: white;
				}



				.email-container {
					flex: 1;
				}

				.logout-container {
					flex: 1;
					
				}

				#logout-button {
					float: right;
				}

				#logout-button:hover {
					background: black;
					color: white;
				}

				.main-board-container {
					flex: 9;
					display: flex;
					flex-direction: row;
				}

				#sidebar-container {
					height: 100%;
					width: 100%;
					flex: 2;
					border: 1px solid black;
					display: flex;
					flex-direction: column;
					border:dashed 2px #41403E;
				}

				#editor-container {
					flex: 8;
					border: 1px solid black;
					border:dashed 2px #41403E;
					height: 90%;
					width: 90%;
					overflow-y: scroll;
				}


				`}
			</style>
		</div>
	)
}



