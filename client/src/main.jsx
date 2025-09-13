import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ClassroomPage from "./pages/ClassroomPage.jsx";
import QuizTakingPage from './pages/QuizTakingPage';
import LoginPage from "./pages/LoginPage.jsx";
import MySubmissionsPage from './pages/MySubmissionsPage';
import AssignmentSubmissionsPage from './pages/AssignmentSubmissionsPage';
import AssignmentSubmissionPage from './pages/AssignmentSubmissionPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import UserEditPage from './pages/UserEditPage';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/classroom/:id"
        element={
          <ProtectedRoute>
            <ClassroomPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path='/quiz/:id' 
        element={
          <ProtectedRoute>
            <QuizTakingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/assignment/:id' 
        element={
          <ProtectedRoute>
            <AssignmentSubmissionPage />
          </ProtectedRoute>
        } 
      />
      <Route
        path='/my-submissions'
        element={
          <ProtectedRoute>
            <MySubmissionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/assignment/:id/submissions'
        element={
          <ProtectedRoute>
            <AssignmentSubmissionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/admin/user/:id/edit'
        element={
          <ProtectedRoute>
            <UserEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/calendar'
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
