# How to run project?

You need installed Node.js, PostgreSQL and created audio-player database

1. Install repository.
2. Open 2 terminals.
3. In directory `server/db.js` rewrite your PostgreSQL audio-player database settings
4. Create tables (commands in `server/database.sql`)
5. In first terminal (to run server)
- In audio-player directory `cd server`
- `npm install`
- `npm start`
6. In second terminal (to run frontend)
- In audio-player directory `cd client`
- `npm install`
- `npm start`

Frontend will be running on port 3000 and the server on 5000

# Frameworks and Libraries

### 1. Frontend - React

- React Redux
- React Router
- Bootstrap styles
- Scss
- MaterialUI

### 2. Backend - Express

- Express Fileupload
- pg - for PostgreSQL
- UUID
