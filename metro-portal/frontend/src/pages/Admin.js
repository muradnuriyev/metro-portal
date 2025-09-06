import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";

const Admin = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Панель администратора
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Здесь можно управлять пользователями, статьями и категориями.</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Добавить статью
        </Button>
      </Paper>
    </Container>
  );
};

export default Admin;
