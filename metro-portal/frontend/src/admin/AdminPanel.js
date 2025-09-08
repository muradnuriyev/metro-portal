import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";

export default function AdminPanel() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    setAdminName(name || "");
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Привет, {adminName}!
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => alert("Здесь будет редактор статей")}
          >
            Редактор статей
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("Здесь будет управление категориями")}
          >
            Управление категориями
          </Button>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="body1" color="textSecondary">
            Дополнительно можно добавить загрузку файлов, PDF, видео и другие инструменты.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
