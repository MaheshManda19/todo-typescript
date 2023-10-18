import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleTodo = () => {
    if (todo.trim() !== "") {
      if (editIndex !== null) {
        // If editing an existing item
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = todo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // If adding a new item
        setTodos([...todos, todo]);
      }
      setTodo("");
    }
  };

  const handleEdit = (index: number) => {
    setTodo(todos[index]);
    setEditIndex(index);
  };

  const handleRemove = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const onDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLLIElement>, targetIndex: number) => {
    const sourceIndex = Number(e.dataTransfer.getData("index"));
    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(sourceIndex, 1);
    updatedTodos.splice(targetIndex, 0, draggedTodo);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleTodo}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <ul className="todo-list">
        {todos.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, index)}
            onDragEnd={(e) => e.preventDefault()}
          >
            {item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
