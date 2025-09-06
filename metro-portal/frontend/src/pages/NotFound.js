import React from "react";
import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h5">Страница не найдена</Typography>
    </Container>
  );
};

export default NotFound;
