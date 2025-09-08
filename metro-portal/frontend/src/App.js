import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import ArticlePage from "./pages/ArticlePage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";

// Компонент AppBar с условным отображением кнопки выхода
const Header = ({ token, handleLogout }) => {
  const location = useLocation();

  // Не показываем кнопку на странице логина
  const showLogout = token && location.pathname !== "/login";

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "18px", sm: "24px" },
            color: "#fff",
          }}
        >
          Dəstək Portalı
        </Typography>

        {showLogout && (
          <Button
            onClick={handleLogout}
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
              background: "#fff",
              color: "#2575fc",
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              py: 0.7,
              "&:hover": {
                background: "#f0f0f0",
              },
            }}
          >
            Çıxış
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    setToken(null);
    setAdminToken(null);
  };

  // приватный роут для обычных пользователей
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  // приватный роут для админки
  const AdminPrivateRoute = ({ children }) => {
    return adminToken ? children : <Navigate to="/admin/login" />;
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setAdminToken(localStorage.getItem("adminToken"));
  }, []);

  return (
    <Router>
      <Header token={token || adminToken} handleLogout={handleLogout} />

      <Routes>
        {/* обычные пользователи */}
        <Route path="/login" element={<LoginForm onLogin={setToken} />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path="/article/:id" element={<PrivateRoute><ArticlePage /></PrivateRoute>} />

        {/* админка */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPrivateRoute><AdminPanel /></AdminPrivateRoute>} />

        {/* редиректы */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;
