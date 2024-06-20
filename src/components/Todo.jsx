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

  function handleDelete(id) {
    setTodos(todos.filter(item => item.id !== id));
  }

  return (
    <div className=" bg-brand-bg_light min-h-screen w-full mx-auto overflow-hidden px-3 md:px-0">
      <div className="pt-16 max-w-[600px] mx-auto">
        <h1 className="text-center text-white text-3xl font-bold mb-10">
          🌴Task Tree🌴
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
        <ul className=" text-gray-300 my-6 bg-brand-bg_dark rounded-md">
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
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
