import { useState } from "react";
import styles from "./form.module.css";
export default function Form() {
  const [todo, setTodo] = useState({ name: "", done: false });

  function postdata(e) {
    e.preventDefault();
    let todoName = todo.name.trim();
    const data = {
      name: todoName,
      done: todo.done,
    };
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    if (todoName) {
      fetch("http://localhost:3000/todos", option);
      setTodo({ name: "", done: false });
    } else {
      alert("please enter Task");
    }
  }
  return (
    <div className={styles.todoform} onSubmit={postdata}>
      <div className={styles.inputContainer}>
        <input
          className={styles.modernInput}
          onChange={(e) => setTodo({ name: e.target.value, done: false })}
          value={todo.name}
          type="text"
          placeholder="Enter your task...."
        />
        <button className={styles.modernButton} onClick={postdata}>
          Add
        </button>
      </div>
    </div>
  );
}
