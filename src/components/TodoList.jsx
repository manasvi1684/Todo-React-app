import styles from "./todolist.module.css";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchdata()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  useEffect(() => {
    fetchdata()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [todos]);

  async function fetchdata() {
    try {
      const response = await fetch("http://localhost:3000/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      return []; // Return an empty array or handle error as per your application logic
    }
  }


  const sortedTodos = todos.slice().sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <div className={styles.list}>
      {sortedTodos.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </div>
  );
}
