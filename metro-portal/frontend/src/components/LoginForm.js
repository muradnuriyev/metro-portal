import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLogin }) {
  const [personalNumber, setPersonalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        personal_number: personalNumber,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка сервера");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "50px auto" }}>
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Персональный номер"
        value={personalNumber}
        onChange={(e) => setPersonalNumber(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Дата рождения (дд-мм-гггг)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button type="submit" style={{ width: "100%" }}>Войти</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
