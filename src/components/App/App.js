import { useState } from "react";
import { animated, useTransition } from "react-spring";

import Todo from "../Todo/Todo";

import "./App.css";

function App() {
  const [done, setDone] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([
    {
      title: "Créer une todo list",
      done: false,
      id: 1,
    },
  ]);

  const filteredTodos = todos.filter(
    (todo) =>
      done === "" ||
      (done === "todo" && todo.done === false) ||
      (done === "done" && todo.done === true)
  );
  const transitions = useTransition(filteredTodos, (todos) => todos.id, {
    config: {
      mass: 1,
      tension: 200,
      friction: 15,
    },
    from: { transform: "translateX(-100%)", opacity: 0 },
    enter: { transform: "translateX(0%)", opacity: 1 },
    leave: { transform: "translateX(100%)", opacity: 0 },
  });

  function getId() {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  function handleEdit(id, title) {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: title,
            }
          : todo
      )
    );
  }

  function handleFilterChange(event) {
    setDone(event.target.value);
  }

  function handleRemove(id) {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTodos((prevState) => {
      const clone = [...prevState];
      clone.push({
        title: title,
        done: false,
        id: getId(),
      });
      return clone;
    });
    setTitle("");
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleToggle(id) {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo
      )
    );
  }

  const list = transitions.map(({ item: todo, props, key }) => (
    <animated.div key={key} style={props}>
      <Todo
        key={todo.id}
        onEdit={handleEdit}
        onRemove={handleRemove}
        onToggle={handleToggle}
        todo={todo}
      />
    </animated.div>
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
