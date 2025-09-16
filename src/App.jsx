import React, { useRef } from "react";
import Todo from "./Component/Todo";
import bgDestopDark from "./assets/bg-desktop-dark.jpg";
import bgDestopLight from "./assets/bg-desktop-light.jpg";
import iconSun from "./assets/icon-sun.svg";
import iconMoon from "./assets/icon-moon.svg";

import { useState, useEffect } from "react";

function App() {
  const [isLight, setIsLight] = useState(false);
  const inputRef = useRef(null);
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [filter, setFilter] = useState("all");
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== index) {
      const newTodos = [...todos];
      const draggedTodo = newTodos.splice(draggedItem, 1)[0];
      newTodos.splice(index, 0, draggedTodo);
      setTodos(newTodos);
      setDraggedItem(null);
    }
  };

  const toggleTheme = () => {
    setIsLight((prev) => !prev);
  };

  useEffect(() => {
    if (isLight) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLight]);

  const removeTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTodo = (index) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filterTodos = () => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <div className="header">
        {/* Header Image */}
        <img
          src={isLight ? bgDestopLight : bgDestopDark}
          alt="Todo background"
          className="header-img"
        />
        {/*Overlay Image */}
        <div className="overlay">
          <h1>T O D O</h1>
          <img
            src={isLight ? iconMoon : iconSun}
            onClick={toggleTheme}
            alt="Sun Icon"
          />
        </div>
        {/*Form On Image */}
        <div className="form-on-image">
          {/* Input Wrapper */}
          <div className="input-wrapper">
            {/* Input */}
            <span className={`circle ${isLight ? "light" : ""}`}></span>
            <input
              type="text"
              placeholder="Create a new todo..."
              className={`${isLight ? "light" : ""}`}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputRef.current.value !== "") {
                  setTodos([
                    ...todos,
                    { text: inputRef.current.value, completed: false },
                  ]);
                  inputRef.current.value = "";
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className={`app-container ${isLight ? "light" : ""}`}>
        <Todo
          isLight={isLight}
          todos={todos}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          clearCompleted={clearCompleted}
          setFilter={setFilter}
          filter={filter}
          filterTodos={filterTodos}
          itemsLeft={itemsLeft}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
        />
        {/* Footer */}
        <div className="footer">
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </>
  );
}

export default App;
