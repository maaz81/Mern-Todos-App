import React, { useState } from 'react'; // Added useState import
import axios from 'axios';

const Todo = () => { // Changed component name to start with uppercase (convention)
    const [newTodo, setNewTodo] = useState('');
    
    const addTodo = async () => {
        if (!newTodo.trim()) return;
        
        try {
            const response = await axios.post('http://localhost:5000/api/todos', {
                title: newTodo,
                completed: false
            });
            setNewTodo('');
        } catch (err) {
            console.error('Error adding todo:', err);
        }
    };

    return (
        <div className='flex flex-col  h-screen bg-zinc-800 items-center'>
            <input 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} // Added onChange handler
                type="text" 
                placeholder='enter todo' 
                className='rounded-lg px-4 py-2 h-10 mt-20 w-40'
            />
            <button className='bg-blue-500 px-4 py-2 h-10 mt-10 w-20 rounded-lg' onClick={addTodo}>Add</button>
        </div>
    )
}

export default Todo;