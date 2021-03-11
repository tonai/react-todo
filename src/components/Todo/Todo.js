import { useEffect, useRef, useState } from "react";

import "./Todo.css";

function Todo(props) {
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  function handleBlur() {
    setEdit(false);
    setTitle('');
  }

  function handleEdit() {
    setEdit(true);
    setTitle(props.todo.title);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleRemove() {
    props.onRemove(props.todo.id);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onEdit(props.todo.id, title);
    setEdit(false);
    setTitle('');
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
            <input className="Todo__title-input" onBlur={handleBlur} onChange={handleTitleChange} ref={inputRef} value={title} />
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
