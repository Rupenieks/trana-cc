# Trana Coding Challenge

Small application allowing a user to create, edit and remove notes with a WYSIWYG text editor. Provides admin functionality too.

Created with React, Next.js on Frontend. NestJs, Mongo DB on backend.

## Prerequisites

- Install docker

## How to Run

1. Open terminal/cmd window in root directory.
2. docker-compose up

### Access
- Frontend accessed via browser at: localhost:3000/
- Mongo DB accessed via browser at: localhost:8081/


## Important steps:

- No users will exist on launch so you must create one by registering. 
- After registering, login with the same credentials. 
- To make the account an admin account, access the user collection in the Mongo DB via your browser. Add 'admin' to the array of roles to the users role array.


## Features:
### Backend: 
-Nest.Js setup
-MongoDB Database (w/ Mongoose)
-Admin/User role checking on specific API endpoints
-Password encryption and checking 
-Jwt token authentication 
-API endpoints for all needed operations

### Frontend:
-Login / Register screen
-Dashboard
-Note filtering by search bar
-Add / Remove / Update notes
-WYSIWYG Text editor
-Admin page (admin)
-View users / look through their notes (admin)
-Remove user notes (admin)
-Authentication (jwt) handled with localstorage by placing it in header of every relevant request sent to backend



