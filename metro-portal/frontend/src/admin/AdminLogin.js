import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/auth/login", { username, password });
      localStorage.setItem("adminToken", res.data.adminToken);
      localStorage.setItem("adminName", res.data.fullName);
      window.location.href = "/admin"; // после входа в админку
    } catch (err) {
      alert(err.response?.data?.msg || "Ошибка входа");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Вход в админ-панель
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
