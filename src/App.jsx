import React, { useRef } from "react";
import Todo from "./Component/Todo";
import bgDestopDark from "./assets/bg-desktop-dark.jpg";
import bgDestopLight from "./assets/bg-desktop-light.jpg";
import iconSun from "./assets/icon-sun.svg";
import iconMoon from "./assets/icon-moon.svg";
import alarmSound from "./assets/NO EXCUSES - Best Motivational Video.mp3";
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
    stopAlarm();
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTodo = (index) => {
    setTodos((prev) =>
      prev.map((todo, i) => {
        if (i === index) {
          const updated = { ...todo, completed: !todo.completed };
          if (updated.completed) {
            stopAlarm();
          }
          return updated;
        }
        return todo;
      })
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

  {
    /* Alarm Sound */
  }
  const audioRef = useRef(null);

  const playAlarm = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(alarmSound);
      audioRef.current.loop = true; // keep ringing
    }
    audioRef.current.play().catch((err) => {
      console.error("Audio play failed:", err);
    });
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().toTimeString().slice(0, 5); // "HH:MM"

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.reminder && !todo.notified && todo.time === now) {
            playAlarm();
            return { ...todo, notified: true };
          }
          return todo;
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
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
                    {
                      text: inputRef.current.value,
                      completed: false,
                      time: "",
                      reminder: true,
                      notified: false,
                    },
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
          setTodos={setTodos}
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
