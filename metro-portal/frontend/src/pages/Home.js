import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import CategoryList from "../components/CategoryList";
import ArticleList from "../components/ArticleList";

export default function Home({ token }) {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/articles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setArticles(res.data))
      .catch(() => setArticles([]))
      .finally(() => setLoadingArticles(false));

    axios.get("http://localhost:5000/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoadingCategories(false));
  }, [token]);

  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать на портал BakıMetro
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Категории
              </Typography>
              {loadingCategories ? <CircularProgress /> : <CategoryList categories={categories} />}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статьи
              </Typography>
              {loadingArticles ? <CircularProgress /> : <ArticleList articles={articles} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
