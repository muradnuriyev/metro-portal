import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import ArticleList from "./components/ArticleList";
import CategoryList from "./components/CategoryList";

function App() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:5000/categories").then((res) => setCategories(res.data));
      axios.get("http://localhost:5000/articles").then((res) => setArticles(res.data));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Привет, {user.name}</h1>
        <button onClick={handleLogout}>Выйти</button>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "25%", marginRight: "20px" }}>
          <CategoryList categories={categories} />
        </div>
        <div style={{ width: "75%" }}>
          <ArticleList articles={articles} />
        </div>
      </div>
    </div>
  );
}

export default App;
