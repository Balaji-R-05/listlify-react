import { useRef } from 'react'
import Icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import useLocalStorage from '../hooks/useLocalStorage'

const Todo = () => {
    const [todoList, setTodoList] = useLocalStorage("todos", []);
    const inputRef = useRef();

    const add = (e) => {
        e?.preventDefault();
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
        inputRef.current.focus();
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodo) => {
            return prevTodo.filter((todo) => todo.id !== id)
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

    const editTodo = (id, newText) => {
        setTodoList((prev) => prev.map((todo) => 
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    const clearCompleted = () => {
        setTodoList((prev) => prev.filter(todo => !todo.isComplete));
    };

    const sortedTodoList = [...todoList].sort((a, b) => {
        if (a.isComplete === b.isComplete) return 0;
        return a.isComplete ? 1 : -1;
    });

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
            <form onSubmit={add} className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder='Add your task...'
                    aria-label="Add a task"
                />
                <button
                    type="submit"
                    className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer transition-colors hover:bg-orange-700 active:scale-95'
                >
                    ADD +
                </button>
            </form>

            {/* ToDo List */}
            <div className='flex-1 min-h-[200px] max-h-[320px] overflow-y-auto overflow-x-hidden py-3'>
                {sortedTodoList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 mt-10 text-center px-4 transition-opacity duration-300">
                        <p className="text-lg">All caught up! ✨</p>
                        <p className="text-sm mt-1 opacity-70">Add a new task above.</p>
                    </div>
                ) : (
                    sortedTodoList.map((item) => (
                        <TodoItems key={item.id} id={item.id} text={item.text} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} editTodo={editTodo} />
                    ))
                )}
            </div>

            {/* Clear Completed Button */}
            {todoList.some(todo => todo.isComplete) && (
                <div className='mt-2 flex justify-end'>
                    <button 
                        onClick={clearCompleted}
                        className='text-slate-500 text-sm hover:text-red-500 transition-all underline underline-offset-4 decoration-transparent hover:decoration-red-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 rounded px-2 py-1'
                    >
                        Clear Completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default Todo;