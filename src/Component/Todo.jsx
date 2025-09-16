import React from "react";
import iconCross from "../assets/icon-cross.svg";
import iconCheck from "../assets/icon-check.svg";

function Todo({
  isLight,
  removeTodo,
  toggleTodo,
  clearCompleted,
  setFilter,
  filter,
  filterTodos,
  itemsLeft,
  handleDragStart,
  handleDragOver,
}) {
  return (
    <>
      {/* Todo Item */}
      <div className={`list-items ${isLight ? "light" : ""}`}>
        <ul className="list">
          {filterTodos().map((todo, index) => (
            <li key={index} className={`todo-item ${isLight ? "light" : ""}`}>
              <div className={`todo-left ${isLight ? "light" : ""}`}>
                <span
                  className={`${todo.completed ? "img-checked" : "circles"} ${
                    isLight ? "light" : ""
                  }`}
                  onClick={() => toggleTodo(index)}
                >
                  {todo.completed && <img src={iconCheck} alt="Icon Check" />}
                </span>
                <p
                  className={`${todo.completed ? "checked" : ""} ${
                    isLight ? "light" : ""
                  }`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  tabIndex="0"
                >
                  {todo.text}
                </p>
              </div>

              <img
                src={iconCross}
                alt="Icon Cross"
                className="icon-cross"
                onClick={() => removeTodo(index)}
              />
            </li>
          ))}
        </ul>
        {/* Todo Item Bottom */}

        <div className={`todo-item-bottom ${isLight ? "light" : ""}`}>
          <p>{itemsLeft} items left</p>
          <div className={`all-active ${isLight ? "light" : ""}`}>
            <p
              className={filter === "all" ? "active-filter" : ""}
              tabIndex="0"
              onClick={() => setFilter("all")}
            >
              All
            </p>
            <p
              className={filter === "active" ? "active-filter" : ""}
              tabIndex="0"
              onClick={() => setFilter("active")}
            >
              Active
            </p>
            <p
              className={filter === "completed" ? "active-filter" : ""}
              tabIndex="0"
              onClick={() => setFilter("completed")}
            >
              {" "}
              Completed
            </p>
          </div>
          <p tabIndex="0" onClick={clearCompleted} className="clear-completed">
            Clear completed
          </p>
        </div>
      </div>
    </>
  );
}

export default Todo;
