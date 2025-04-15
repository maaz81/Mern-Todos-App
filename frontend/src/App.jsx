import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoFilter from './components/TodoFilter';
import TodoModal from './components/TodoModal';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [viewingTodo, setViewingTodo] = useState(null);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Add new todo (only API call we're keeping)
  // const addTodo = async (title, description) => {
  //   try {
  //     // API call
  //     const response = await axios.post('http://localhost:5000/api/todos', {
  //       title,
  //       description
  //     });
      
  //     // Update local state with the response
  //     setTodos([...todos, {
  //       id: Date.now(), // fallback ID if API doesn't return one
  //       text: title,
  //       desc: description,
  //       completed: false,
  //       createdAt: new Date().toISOString(),
  //       ...response.data // spread any additional data from API
  //     }]);
  //   } catch (err) {
  //     console.error('Error adding todo:', err);
  //     // Fallback to local state if API fails
  //     setTodos([...todos, {
  //       id: Date.now(),
  //       text: title,
  //       desc: description,
  //       completed: false,
  //       createdAt: new Date().toISOString()
  //     }]);
  //   }
  // };

  // Toggle todo completion (local only)
  // const toggleTodo = (id) => {
  //   setTodos(
  //     todos.map(todo =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

  // // Delete todo (local only)
  // const deleteTodo = (id) => {
  //   setTodos(todos.filter(todo => todo.id !== id));
  // };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Clear completed todos (local only)
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-md">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Todo List</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
        </motion.div>

        <TodoForm setTodos={setTodos} />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="shadow-lg rounded-lg overflow-hidden"
        >
          <AnimatePresence>
            {filteredTodos.length > 0 ? (
              <motion.ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onView={setViewingTodo}
                  />
                ))}
              </motion.ul>
            ) : (
              <motion.div className="p-8 text-center bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {filter === 'all'
                  ? 'No tasks yet. Add one above!'
                  : filter === 'active'
                    ? 'No active tasks!'
                    : 'No completed tasks!'}
              </motion.div>
            )}
          </AnimatePresence>

          <TodoFilter 
            filter={filter}
            setFilter={setFilter}
            remainingCount={remainingCount}
            onClearCompleted={clearCompleted}
          />
        </motion.div>
      </div>

      <TodoModal 
        todo={viewingTodo}
        onClose={() => setViewingTodo(null)}
      />
    </div>
  );
};

export default App;