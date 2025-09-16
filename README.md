# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

-Semantic HTML5 markup
-CSS custom properties for dark/light themes
-Flexbox & CSS Grid for layout
-Mobile-first workflow

- [React](https://reactjs.org/) - JS library
  -React (useState, useEffect, useRef) for state management
  -Conditional class toggling for dark/light theme
  -Filtering logic for all, active, and completed

### What I learned

I learned a lot while working on this project:

Theme toggling with React state

```js
import { useState } from "react";

const [isLight, setIsLight] = useState(false);
const toggleTheme = () => setIsLight((prev) => !prev);
```

Using useEffect to update the body class lets me change the whole background color dynamically.

Filtering todos

```js
const filterTodos = () => {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
};
```

This taught me how to render different subsets of state conditionally.

Updating a specific todo

```js
const toggleTodo = (index) => {
  setTodos((prev) =>
    prev.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
  );
};
```

Here I practiced immutably updating arrays in React.

Managing input with useRef

```js
const inputRef = useRef();
if (e.key === "Enter") {
  setTodos([...todos, { text: inputRef.current.value, completed: false }]);
  inputRef.current.value = "";
}
```

### Continued development

-Drag & drop: Currently planned with @dnd-kit/core or native HTML5 drag events.
-Reminders/alarms: We started experimenting with setting due times and triggering alerts with setInterval. This would make the app useful as a personal reminder tool.
-Animations: Adding smooth transitions when filtering or deleting todos.
-Persistence: Save todos to localStorage so they stay after refresh.

### Useful resources

- [React Docs](https://react.dev/) - for useState, useEffect, and managing components.
- [CSS Tricks](https://css-tricks.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

- Frontend Mentor - [@dandy707](https://www.frontendmentor.io/profile/dandy707)
- Twitter - [@dandyfrank10](https://www.twitter.com/dandyfrank10)
