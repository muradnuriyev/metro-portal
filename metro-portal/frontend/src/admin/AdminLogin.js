import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/auth/login", { username, password });
      localStorage.setItem("adminToken", res.data.adminToken);
      localStorage.setItem("adminName", res.data.name);
      navigate("/admin"); // переход в админку
    } catch (err) {
      alert(err.response?.data?.msg || "Ошибка входа");
    }
  };

  const handleBack = () => {
    navigate("/login"); // переход на обычную форму логина
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Admin Paneline Giriş
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="İstifadəçi adı"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Şifrə"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Giriş
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ borderRadius: 2 }}
              onClick={handleBack}
            >
              Geri
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
