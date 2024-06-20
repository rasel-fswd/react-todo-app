import React, { useState, useRef, useEffect } from 'react';
import TodoITem from './TodoITem';

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
            <TodoITem
              item={item}
              key={item.id}
              todo={todo}
              onDelete={handleDelete}
              onEdit={handleEditTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
