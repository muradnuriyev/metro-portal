import React from "react";

export default function CategoryList({ categories }) {
  return (
    <div>
      <h3>Категории</h3>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
