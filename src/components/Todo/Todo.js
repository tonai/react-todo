import { useEffect, useRef, useState } from "react";

import "./Todo.css";

function Todo(props) {
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  function handleBlur() {
    setEdit(false);
  }

  function handleEdit() {
    setEdit(true);
  }

  function handleTitleChange(event) {
    props.onEdit(props.todo.id, event.target.value);
  }

  function handleRemove() {
    props.onRemove(props.todo.id);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEdit(false);
  }

  function handleToggle() {
    props.onToggle(props.todo.id);
  }

  const titleClassName =
    "Todo__title " + (props.todo.done ? "Todo__title--done" : "");

  return (
    <div className="Todo">
      <button className="Todo__toggle" onClick={handleToggle}>
        {props.todo.done ? "✓" : "-"}
      </button>
      <div className={titleClassName}>
        {edit && (
          <form className="Todo__title-edit" onSubmit={handleSubmit}>
            <input className="Todo__title-input" onBlur={handleBlur} onChange={handleTitleChange} ref={inputRef} value={props.todo.title} />
          </form>
        )}
        {!edit && (
          <button className="Todo__title-text" onClick={handleEdit}>
            {props.todo.title}
          </button>
        )}
      </div>
      <button className="Todo__remove" onClick={handleRemove}>X</button>
    </div>
  );
}

export default Todo;
