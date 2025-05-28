<h1 align="center">🚀 MERN_ChatApp</h1> <p align="center"> <img src="https://img.shields.io/badge/MERN-Stack-3DDC84?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Socket.io-RealTime-black?style=for-the-badge&logo=socket.io" /> <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" /> </p> <p align="center"> <b>A modern, real-time chat app built with MongoDB, Express, React, Node.js, and Socket.io.</b> </p> <p align="center"> <i>Secure authentication, scalable architecture, and a responsive user experience!</i> </p>

<h2>✨ Features</h2>
⚡ Real-time Messaging (Socket.io)<p></p>

🔒 JWT Authentication

👥 One-to-One & Group Chats

🛠️ Environment-based Configuration

🏷️ Dynamic Chat Rooms

🟢 Online Status Indicators

📱 Responsive UI (React)

🔁 RESTful API Backend

<br>
<br>

<h2>🛠️ Tech Stack</h2>
<p align="left"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original-wordmark.svg" alt="socketio" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </p>

<br>
<br>

<h3>📦 Project Structure</h3>
📁 client/ &nbsp; <i># React frontend</i><br>
├── 📁 public/<br>
└── 📁 src/<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── 📁 assets/ &nbsp; <i># Static files like images</i><br>
&nbsp;&nbsp;&nbsp;&nbsp;├── 📁 components/ &nbsp; <i># Reusable React components</i><br>
&nbsp;&nbsp;&nbsp;&nbsp;├── 📁 context/ &nbsp; <i># Context API setup</i><br>
&nbsp;&nbsp;&nbsp;&nbsp;├── 📁 hooks/ &nbsp; <i># Custom React hooks</i><br>
&nbsp;&nbsp;&nbsp;&nbsp;├── 📁 pages/ &nbsp; <i># Main pages like Chat, Login, Signup</i><br>
&nbsp;&nbsp;&nbsp;&nbsp;├── 📁 utils/ &nbsp; <i># Axios config, helper functions</i><br>
&nbsp;&nbsp;&nbsp;&nbsp;├── App.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
<br>
📁 server/ &nbsp; <i># Express backend</i><br>
├── 📁 config/ &nbsp; <i># DB connection, environment setup</i><br>
├── 📁 controllers/ &nbsp; <i># Route logic (e.g., auth, chat)</i><br>
├── 📁 middleware/ &nbsp; <i># Auth, error handling</i><br>
├── 📁 models/ &nbsp; <i># Mongoose schemas (User, Chat, Message)</i><br>
├── 📁 routes/ &nbsp; <i># Route files (userRoutes, chatRoutes)</i><br>
├── 📁 utils/ &nbsp; <i># Token generation, validation</i><br>
└── index.js &nbsp; <i># Server entry point</i><br>
<br>
.env &nbsp; <i># Environment variables</i><br>
README.md &nbsp; <i># Project documentation</i><br>
package.json &nbsp; <i># Project metadata and dependencies</i><br>
yarn.lock / package-lock.json<br>

<br>
<br>

<h2 style="font-family:Arial, sans-serif; color:#e67e22;">⚡ Getting Started</h2>

<h3 style="font-family:Arial, sans-serif; color:#34495e;">1. 🔽 Clone the Repository</h3>
<div style="background-color:#f4f4f4; padding:12px; border-radius:8px; border:1px solid #ddd; font-family:Courier New, monospace; white-space:pre-line;">
git clone https://github.com/shankar-mallidi/MERN_ChatApp.git
cd MERN_ChatApp
</div>

<br/>

<h3 style="font-family:Arial, sans-serif; color:#34495e;">2. ⚙️ Setup Environment Variables</h3>
<p style="font-family:Arial, sans-serif;">Create a <code>.env</code> file in the <strong>backend</strong> directory with the following values (example):</p>
<div style="background-color:#fdf6e3; padding:12px; border-radius:8px; border:1px solid #eee; font-family:Courier New, monospace; white-space:pre-line;">
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
</div>

<br/>

<h3 style="font-family:Arial, sans-serif; color:#34495e;">3. 📦 Install Dependencies</h3>

<p style="font-family:Arial, sans-serif;"><strong>Backend:</strong></p>
<div style="background-color:#f4f4f4; padding:12px; border-radius:8px; border:1px solid #ddd; font-family:Courier New, monospace; white-space:pre-line;">
cd backend
npm install
</div>

<p style="font-family:Arial, sans-serif;"><strong>Frontend:</strong></p>
<div style="background-color:#f4f4f4; padding:12px; border-radius:8px; border:1px solid #ddd; font-family:Courier New, monospace; white-space:pre-line;">
cd ../frontend
npm install
</div>

<br/>

<h3 style="font-family:Arial, sans-serif; color:#34495e;">4. 🚀 Run the Application</h3>

<p style="font-family:Arial, sans-serif;"><strong>Start Backend Server:</strong></p>
<div style="background-color:#f4f4f4; padding:12px; border-radius:8px; border:1px solid #ddd; font-family:Courier New, monospace; white-space:pre-line;">
cd backend
npm start
</div>

<p style="font-family:Arial, sans-serif;"><strong>Start Frontend Development Server:</strong></p>
<div style="background-color:#f4f4f4; padding:12px; border-radius:8px; border:1px solid #ddd; font-family:Courier New, monospace; white-space:pre-line;">
cd ../frontend
npm start
</div>

<p style="font-family:Arial, sans-serif;">The app will be available at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>

