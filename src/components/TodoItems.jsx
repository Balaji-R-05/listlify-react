import tick_icon from '../assets/tick.png'
import not_tick_icon from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import { useState } from 'react'

const TodoItems = ({text, id, isComplete, deleteTodo, toggle, editTodo}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEditComplete = () => {
    setIsEditing(false);
    if (editText.trim() !== text && editText.trim() !== "") {
      editTodo && editTodo(id, editText.trim());
    } else {
      setEditText(text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEditComplete();
    else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(text); // Cancel edit
    }
  };

  return (
    <div className='flex items-center my-3 gap-2'>
        <div 
          onClick={() => { if (!isEditing) toggle(id); }} 
          onKeyDown={(e) => { if (!isEditing && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(id); } }}
          role="button"
          tabIndex={isEditing ? -1 : 0}
          className={`flex flex-1 items-center ${!isEditing ? 'cursor-pointer' : ''} select-none rounded p-1 hover:bg-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-200`}
        >
            <img className='w-7 shrink-0' src={isComplete ? tick_icon : not_tick_icon} alt={isComplete ? "Completed" : "Incomplete"} />
            
            {isEditing ? (
              <input
                type="text"
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEditComplete}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className='w-full ml-4 text-[17px] bg-transparent border-b-2 border-orange-400 outline-none text-slate-800'
              />
            ) : (
              <p 
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 break-words
                ${isComplete ? "line-through text-slate-400": ""}`}>
                {text}
              </p>
            )}
        </div>
        <img 
          onClick={() => deleteTodo(id)} 
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') deleteTodo(id); }}
          role="button"
          tabIndex={0}
          className='w-4 cursor-pointer hover:scale-110 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-200 rounded box-content p-1' 
          src={delete_icon} 
          alt="Delete task" 
        />
    </div>
  )
}

export default TodoItems