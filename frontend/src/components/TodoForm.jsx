import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

import axios from 'axios';
import React, {useState} from 'react';

//   const [newTodo, setNewTodo] = useState('');
//   const [newDesc, setNewDesc] = useState('');
//   const [isAdding, setIsAdding] = useState(false);

//   const addTodo = async () => {
//     if (!newTodo.trim()) return;

//     setIsAdding(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/todos', {
//         title: newTodo,
//         desc: newDesc,
//         createdAt: new Date().toISOString()  
//       });
//       setTodos(prevTodos => [...prevTodos, response.data]);
//       setNewTodo('');
//       setNewDesc('');
//     } catch (err) {
//       console.error('Error adding todo:', err);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       addTodo();
//     }
//   };

//   return (
//     <motion.div className="flex justify-center flex-col mb-6">
//       <motion.div
//       className="flex justify-center flex-col mb-6"
//     >
//       <motion.div
//         whileHover={{ scale: 1.01 }}
//         whileTap={{ scale: 0.98 }}
//         className="mb-4"
//       >
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Add Title"
//           required // Add HTML5 validation
//           minLength="3" // Add minimum length if needed
//           maxLength="50" // Add maximum length if needed
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//         />
//       </motion.div>

//       <motion.div
//         whileHover={{ scale: 1.01 }}
//         whileTap={{ scale: 0.98 }}
//         className="mb-4"
//       >
//         <textarea
//           value={newDesc}
//           onChange={(e) => setNewDesc(e.target.value)}
//           onKeyPress={handleKeyPress} // Added key press handler for description
//           placeholder="Add Description"
//           rows={4}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//         />
//       </motion.div>

//       <motion.button
//         onClick={addTodo} // Now properly calling addTodo
//         whileHover={{ scale: 1.03 }}
//         whileTap={{ scale: 0.97 }}
//         disabled={isAdding}
//         className="px-4 py-3 mx-auto w-40 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
//       >
//         {isAdding ? (
//           <motion.span
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           >
//             <FiPlus size={20} />
//           </motion.span>
//         ) : (
//           <>
//             <FiPlus size={20} />
//             <span>Add</span>
//           </>
//         )}
//       </motion.button>
//     </motion.div>
//     </motion.div>
//   );
// };

// export default TodoForm;


const TodoForm = ({ setTodos }) => {
  const [newTodo, setNewTodo] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    setIsAdding(true);
    try {
      const response = await axios.post('http://localhost:5000/api/todos', {
        title: newTodo,
        desc: newDesc,
        createdAt: new Date().toISOString()
      });
      
      // Ensure the response data has a unique ID
      const newTodoItem = {
        ...response.data,
        id: response.data.id || Date.now() // Fallback to Date.now() if no ID from server
      };
      
      setTodos(prevTodos => [...prevTodos, newTodoItem]);
      setNewTodo('');
      setNewDesc('');
    } catch (err) {
      console.error('Error adding todo:', err);
    } finally {
      setIsAdding(false);
    }
  };

  // ... rest of the code remains the same
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <motion.div className="flex justify-center flex-col mb-6">
      <motion.div
      className="flex justify-center flex-col mb-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="mb-4"
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add Title"
          required // Add HTML5 validation
          minLength="3" // Add minimum length if needed
          maxLength="50" // Add maximum length if needed
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="mb-4"
      >
        <textarea
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          onKeyPress={handleKeyPress} // Added key press handler for description
          placeholder="Add Description"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </motion.div>

      <motion.button
        onClick={addTodo} // Now properly calling addTodo
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={isAdding}
        className="px-4 py-3 mx-auto w-40 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        {isAdding ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiPlus size={20} />
          </motion.span>
        ) : (
          <>
            <FiPlus size={20} />
            <span>Add</span>
          </>
        )}
      </motion.button>
    </motion.div>
    </motion.div>
  );
};

export default TodoForm;