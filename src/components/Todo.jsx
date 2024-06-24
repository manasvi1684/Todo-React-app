import Form from "./Form";
import TodoList from "./TodoList";
import Footer from "./Footer";
import {useState, useEffect } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    fetchdata()
  },[todos])
  async function fetchdata() {
    try {
      const response = await fetch("http://localhost:3000/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data)
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      return []; // Return an empty array or handle error as per your application logic
    }
  }
  

  const completedTodos = todos?.filter((todo) => todo?.done)?.length;
  const totalTodos = todos?.length;

  return (
    <div>
      <Form />
      <TodoList/>
      <Footer completedTodos={completedTodos} totalTodos={totalTodos} />
    </div>
  );
}
