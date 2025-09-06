import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, InputAdornment } from "@mui/material";
import { Person, CalendarToday } from "@mui/icons-material";

const LoginForm = ({ onLogin }) => {
  const [personalNumber, setPersonalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        personalNumber,
        password,
      });

      localStorage.setItem("token", res.data.token);
      if (onLogin) onLogin(res.data.token);

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Ошибка входа");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2, // padding по горизонтали для маленьких экранов
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: { xs: 3, sm: 5 }, // padding меньше на мобильных
          width: "100%",
          maxWidth: 400, // не растягивается на больших экранах
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#2575fc",
            fontSize: { xs: "24px", sm: "32px" }, // адаптивный размер заголовка
          }}
        >
          Portala Giriş
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Vəsiqə nömrəniz"
            value={personalNumber}
            onChange={(e) => setPersonalNumber(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
            }}
          />

          <TextField
            label="Şifrəniz"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              width: "100%",
              padding: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 600,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)",
              },
            }}
          >
            Giriş
          </Button>
        </form>

        {error && (
          <Typography color="error" sx={{ mt: 2, fontSize: { xs: "12px", sm: "14px" } }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginForm;
