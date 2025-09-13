
<div align="center">
  <img src="https://raw.githubusercontent.com/the-terror-wonder/Atri/main/client/src/assets/atri_logo_only.png" alt="Atri Logo" width="150" />
  <h1>Atri: Intelligent Classroom Hub</h1>
  <p>A full-stack educational platform designed to streamline classroom management and enhance interaction between students and faculty.</p>
  
  <p>
    <a href="https://atri-classroom.netlify.app/"><strong>Live Demo »</strong></a>
    <br />
    <em>Note: You can register as a Student or Faculty account. Admin accounts can be created by updating the role directly in the database.</em>
  </p>
</div>

---

## 🚀 About Atri

**Atri** is a modern, scalable web application built with the MERN stack. It delivers a structured and interactive environment for classrooms, enabling admins, faculty, and students to collaborate effectively. Inspired by platforms like Google Classroom, Atri focuses on ease of use, role-based permissions, and full-featured academic workflows.

This project is an excellent demonstration of full-stack development, authentication, calendar management, and role-based functionality suitable for learning and interviews.

---

## ✨ Features

### 👑 Admin Dashboard
- Manage all users (Students and Faculty)
- View, edit, and delete user accounts
- Oversee all classrooms with administrative privileges

### 🧑‍🏫 Faculty Dashboard
- Create and manage classrooms
- Enroll students using email invitations
- Create assignments and quizzes with deadlines
- Review submissions and assign grades
- Post announcements for classroom engagement

### 🧑‍🎓 Student Dashboard
- Access personalized classrooms
- Submit assignments before deadlines
- Participate in quizzes during scheduled time windows
- View grades and historical performance
- Explore upcoming events in an integrated calendar

---

## 🛠 Tech Stack

| Category    | Technology                  |
| ----------- | -------------------------- |
| Frontend    | React, Vite, Tailwind CSS, Axios, React Router, FullCalendar |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB with Mongoose      |
| Authentication | JWT, bcrypt.js         |
| Deployment  | Netlify (Frontend), Render (Backend) |

---

## ⚙ Local Installation

### Prerequisites
- Node.js (LTS version recommended)
- npm
- MongoDB Atlas or local MongoDB instance


## 📖 API Endpoints

### User Routes
| Method | Endpoint           | Description                      | Access   |
|------ | ----------------- | ------------------------------- | -------- |
| POST  | /api/users        | Register a new user              | Public   |
| POST  | /api/users/login  | Login and receive auth token    | Public   |
| GET   | /api/users/profile| Get logged-in user's profile   | Private  |
| GET   | /api/users        | Get all users                   | Admin    |
| DELETE| /api/users/:id    | Delete a user                   | Admin    |
| PUT   | /api/users/:id    | Update user details             | Admin    |

### Classroom Routes
| Method | Endpoint                        | Description                       | Access   |
|------ | ------------------------------- | -------------------------------- | -------- |
| POST  | /api/classrooms                 | Create a new classroom           | Faculty  |
| GET   | /api/classrooms                 | Get classrooms for logged-in user | Faculty  |
| POST  | /api/classrooms/:id/enroll      | Enroll a student                 | Faculty  |
| POST  | /api/classrooms/:classroomId/assignments | Create an assignment  | Faculty  |

### Quiz & Event Routes
| Method | Endpoint                      | Description                   | Access   |
|------ | ------------------------------ | ---------------------------- | -------- |
| POST  | /api/quizzes/:id/submit        | Submit quiz answers          | Student  |
| GET   | /api/events/my-calendar       | Get calendar events          | Student  |

## 🤝 Contribution

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with clear descriptions of your changes.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 📞 Contact

Created by **The Terror Wonder** – reach out via GitHub or open an issue for feedback, suggestions, or questions.
