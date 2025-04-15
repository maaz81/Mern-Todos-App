import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const TodoModal = ({ todo, onClose }) => {
  if (!todo) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{todo.title}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close description"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {todo.desc}
              </p>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
              <p>Status: {todo.completed ? 'Completed' : 'Active'}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoModal;