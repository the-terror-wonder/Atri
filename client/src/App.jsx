import React from 'react';
import './App.css'; // We'll add some basic styles

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Project Atri 🌿</h1>
        <h2>Intelligent Classroom Hub</h2>
      </header>
      <main className="main-content">
        <p className="status">Status: <strong>In Active Development</strong></p>
        <p className="description">
          A full-stack, multi-tenant educational platform with role-based access for students, faculty, and administrators. The full application will be live at this URL upon completion.
        </p>
        <a 
          href="https://github.com/the-terror-wonder/Atri" 
          className="github-link"
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Live Progress on GitHub
        </a>
      </main>
      <footer className="footer">
        <p>Built with React, Node.js, Express, and MongoDB.</p>
      </footer>
    </div>
  );
}

export default App;