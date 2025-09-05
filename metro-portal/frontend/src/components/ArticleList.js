import React from "react";

export default function ArticleList({ articles }) {
  return (
    <div>
      <h3>Статьи</h3>
      {articles.map((a) => (
        <div key={a.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h4>{a.title}</h4>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}
