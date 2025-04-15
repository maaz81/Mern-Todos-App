import { motion } from 'framer-motion';

const TodoFilter = ({ filter, setFilter, remainingCount, onClearCompleted }) => {
  return (
    <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm gap-3">
      <span className="whitespace-nowrap">{remainingCount} {remainingCount === 1 ? 'item' : 'items'} left</span>
      
      <div className="flex space-x-2 order-first sm:order-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('all')}
          className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('active')}
          className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('completed')}
          className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          Completed
        </motion.button>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClearCompleted}
        className="hover:text-red-500 transition-colors whitespace-nowrap"
      >
        Clear completed
      </motion.button>
    </div>
  );
};

export default TodoFilter;