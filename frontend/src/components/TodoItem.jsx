import { motion } from 'framer-motion';
import { FiTrash2, FiEye } from 'react-icons/fi';

const TodoItem = ({ todo, onToggle, onDelete, onView }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white dark:bg-gray-800"
    >
      <div className="flex items-center px-4 py-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
        />
        <div className="ml-3 flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
            {todo.title}
          </p>
          {todo.desc && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {todo.desc}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(todo)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="View details"
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-gray-400 hover:text-red-500"
            aria-label="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default TodoItem;
