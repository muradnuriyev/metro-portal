import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import axios from "axios";

const Categories = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [token]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Категории
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {categories.map((cat) => (
            <ListItem key={cat.id} button>
              <ListItemText primary={cat.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Categories;
