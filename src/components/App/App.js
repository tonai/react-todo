import { useEffect, useState } from "react";

import Todo from "../Todo/Todo";

import "./App.css";

function App() {
  const [done, setDone] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  function handleEdit(id, title) {
    const todo = todos.find((todo) => todo.id === id);
    const newTodo = {
      ...todo,
      title: title,
    };
    setTodos((prevState) =>
      prevState.map((todo) => (todo.id === id ? newTodo : todo))
    )
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    });
  }

  function handleFilterChange(event) {
    setDone(event.target.value);
  }

  function handleRemove(id) {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        done: false,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos((prevState) => {
          const clone = [...prevState];
          clone.push(todo);
          return clone;
        });
        setTitle("");
      });
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleToggle(id) {
    const todo = todos.find((todo) => todo.id === id);
    const newTodo = {
      ...todo,
      done: !todo.done,
    };
    setTodos((prevState) =>
      prevState.map((todo) => (todo.id === id ? newTodo : todo))
    )
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    });
  }

  const list = todos
    .filter(
      (todo) =>
        done === "" ||
        (done === "todo" && todo.done === false) ||
        (done === "done" && todo.done === true)
    )
    .map((todo) => (
      <Todo
        key={todo.id}
        onEdit={handleEdit}
        onRemove={handleRemove}
        onToggle={handleToggle}
        todo={todo}
      />
    ));

  const todosToDo = todos.filter((todo) => !todo.done);

  return (
    <div className="App">
      <h1>What needs to be done ?</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="App__input"
          onChange={handleTitleChange}
          value={title}
        />
      </form>
      <div className="App__list">{list}</div>
      <div className="App__footer">
        <span>
          {todosToDo.length} items left / {todos.length}
        </span>
        <span>
          <label>
            All
            <input
              checked={done === ""}
              name="done"
              onChange={handleFilterChange}
              type="radio"
              value=""
            />
          </label>
          <label>
            To do
            <input
              checked={done === "todo"}
              name="done"
              onChange={handleFilterChange}
              type="radio"
              value="todo"
            />
          </label>
          <label>
            Done
            <input
              checked={done === "done"}
              name="done"
              onChange={handleFilterChange}
              type="radio"
              value="done"
            />
          </label>
        </span>
      </div>
    </div>
  );
}

export default App;
