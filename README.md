NOTETRACKE is a web application that allows users to store and manage their notes in one safe place. The app is built using the following technologies:

Frontend: React JS
Backend: Node JS with Express JS
Database: MongoDB
UI Framework: Bootstrap

Getting Started
To run the TRACKE web app locally, follow the steps below:

Prerequisites
Make sure you have the following installed on your system:

Node.js
MongoDB
Installation
Clone the repository to your local machine:

 https://github.com/akashu0/Notetracker-react-web-app.git
Change into the project directory:

Install the required dependencies:

npm install

--------Configuration-------------
=>Rename the .env.example file to .env and update the values with your own configurations:
env

MONGO_URI=<your-mongodb-uri>
PORT=<your-port-number>

=>Create an admin account by running the following command:

npm run create-admin
Running the App
==>To start the app, run the following command:

-------npm start---------
The app should now be running at http://localhost:3000.

-------------Features-----------
User Management: Users can create an account, log in, and log out.
Admin Management: Admin users have access to manage other users and their notes.
Note Management: Users can create, view, edit, and delete their notes.


Happy note-taking with TRACKE!
