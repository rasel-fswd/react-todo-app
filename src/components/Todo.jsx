import React, { useState, useRef, useEffect } from 'react';

//Getting Data from the localStorage
function localData() {
  const localTodos = JSON.parse(localStorage.getItem('todos'));

  return localTodos || [];
}

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = React.useState(localData());

  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name: todo,
    };
    if (!todo) return;
    setTodos(prev => [...prev, newTask]);
    setTodo('');
    inputRef.current.focus();
  }

  function handleEditTodo(id, e) {
    function handleEditTodo(id, e) {
      if (!e.target.innerText) return;
      setTodos(items =>
        items.map(item =>
          item.id === id
            ? {
                ...item,
                name: e.target.innerText,
              }
            : item
        )
      );
    }
  }

  function handleDelete(id) {
    setTodos(todos.filter(item => item.id !== id));
  }

  return (
    <div className=" bg-brand-bg_light min-h-screen w-full mx-auto overflow-hidden px-3 md:px-0">
      <div className="pt-16 max-w-[600px] mx-auto">
        <h1 className="text-center text-white text-3xl font-bold mb-10">
          Task Manager➕
        </h1>
        <form className="flex justify-center items-center">
          <input
            type="text"
            value={todo}
            ref={inputRef}
            className="w-full max-w-[350px] h-[42px] outline-none rounded-l-md px-4 bg-gray-200"
            onChange={e => setTodo(e.target.value)}
          />
          <button
            className=" bg-brand h-[42px] outline-none rounded-r-md px-3 text-white uppercase text-sm"
            onClick={addTodo}
          >
            Add
          </button>
        </form>
        <div className=" text-gray-400 mt-12 space-x-4 font-semibold text-sm">
          <button className=" bg-brand-bg_dark py-1 px-2 rounded-md">
            Total: {todos.length}
          </button>
          <button className=" bg-brand-bg_dark py-1 px-2 rounded-md">
            Completed: 0
          </button>
          <button className=" bg-brand-bg_dark py-1 px-2 rounded-md">
            Remaining: 0
          </button>
        </div>
        <ul className=" text-gray-300 my-6 bg-brand-bg_dark rounded-md overflow-hidden">
          {todos.map(item => (
            <li
              className="flex px-6 py-4 border-b-[.5px] border-brand-light hover:bg-brand"
              key={item.id}
            >
              <h2
                contentEditable
                suppressContentEditableWarning
                value={todo}
                onBlur={e => handleEditTodo(item.id, e)}
                className="outline-none focus:border-b-[1px]"
              >
                {item.name}
              </h2>
              <button
                className="p-1 bg-transparent ml-auto self-center"
                onClick={() => handleDelete(item.id)}
              >
                <svg
                  height={18}
                  width={18}
                  fill="#E5581B"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
