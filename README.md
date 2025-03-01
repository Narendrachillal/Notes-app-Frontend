# Notes App Frontend

This is the frontend of the **Stickeez Notes App**, built using **React.js** and **Material UI**. It provides an intuitive interface for users to create, edit, and manage notes with authentication.

## Features
- **User Authentication** (Signup/Login with JWT)
- **Create, Edit, Delete Notes**
- **Responsive UI** using Material UI
- **Protected Routes** (Only authenticated users can access notes)
- **Form Validation**
- **Animations & Loading Spinners**
- **API Integration** with Express.js Backend

## Tech Stack
- **Frontend:** React.js (Vite), Material UI
- **State Management:** Context API
- **Routing:** React Router
- **Backend:** Express.js (API Integration)

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Narendrachillal/Notes-app-Frontend.git
   cd Notes-app-Frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```
4. **Run the application:**
   ```sh
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

## Folder Structure
```
Notes-app-Frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main application pages
│   ├── services/         # API calls and utilities
│   ├── routes/           # App routing logic
│   ├── App.jsx           # Main application file
│   ├── main.jsx          # Root file
│   ├── index.css         # Global styles
├── public/               # Static assets
├── .gitignore            # Git ignore file
├── package.json          # Dependencies & scripts
├── README.md             # Project documentation
```

## Backend API
Make sure the backend is running before testing the frontend. You can find the backend repository here:
[Notes App Backend](https://github.com/Narendrachillal/Notes-app-backend)

## Deployment
To deploy the app on **Vercel**, follow these steps:
1. **Install Vercel CLI:**
   ```sh
   npm install -g vercel
   ```
2. **Deploy:**
   ```sh
   vercel
   ```
   Follow the instructions to complete the deployment.

## Contributions
Contributions are welcome! Feel free to submit issues or pull requests.

## License
This project is licensed under the **MIT License**.
