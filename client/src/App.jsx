import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import UserFormPage from "./pages/UserFormPage";
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/add-user" element={<UserFormPage />} />
                <Route path="/user/:id" element={<UserFormPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App