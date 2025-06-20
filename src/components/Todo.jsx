import React, { useEffect, useRef, useState } from 'react'
import Icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {
    const [todoList, setTodoList] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    })
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodo) => {
            return prevTodo.filter((todo) => todo.id != id)
        });
    }

    const toggle = (id) => {
        setTodoList((prevTodo) => {
            return prevTodo.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            })
        });
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])

    return (
        <div className="bg-white place-self-center w-10/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
            {/* Title */}
                <div className='flex items-center mt-7 gap-2'>
                <img src={Icon} alt="Todo Icon" className='w-8' />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
                <p className='text-slate-500 border-b-neutral-950'>
                    {new Date().toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Input Box */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder='Add your task...'
                />
                <button
                    onClick={add}
                    className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                >
                    ADD +
                </button>
            </div>

            {/* ToDo List */}
            <div className='flex-1 min-h-[200px] max-h-[320px] overflow-y-auto py-3'>
                {todoList.map((item, index) => (
                    <TodoItems key={index} id={item.id} text={item.text} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                ))}
            </div>
        </div>
    );
};

export default Todo;