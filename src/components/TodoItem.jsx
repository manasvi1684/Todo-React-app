import styles from "./todoitem.module.css";

export default function TodoItem({ item }) {
    async function fetchById(id) {
        try {
          const response = await fetch(`http://localhost:3000/todos/${id}`);
          
        //   if (!response.ok) {
        //     throw new Error('Failed to fetch todo item');
        //   }
          
          const data = await response.json();
          console.log(data); // Assuming you want to log the fetched data
          
          // Return the fetched data if needed
          return data;
        } catch (error) {
          console.error('Error fetching todo item:', error);
          // Handle error as needed, e.g., throw error or return a default value
          throw error;
        }
      }
      
  async function handleDelete() {
    console.log(item);
    try {
      const response = await fetch(`http://localhost:3000/todos/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
       
      });
      if (!response.ok) {
        throw new Error("Failed to update todo item");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function handleDone() {
    const payload = { ...item, done: !item.done }; // Assuming item is defined somewhere in your component

    try {
      const response = await fetch(`http://localhost:3000/todos/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo item");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  const completeCheck = item.done ? styles.completed : "";
  return (
    <div className={styles.item} onClick={()=>fetchById(item.id)}>
      <div className={styles.itemName}>
        <span className={completeCheck}>{item.name}</span>
        <span>
          <button
            onClick={() => handleDelete(item)}
            className={styles.deleteButton}
          >
            ❌
          </button>
        </span>
        <span>
          <button onClick={() => handleDone()} className={styles.deleteButton}>
            ✅
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
