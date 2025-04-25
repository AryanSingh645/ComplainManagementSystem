import { useState, useEffect } from 'react';
import ComplaintForm from '../components/ComplaintForm';

function Complain() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 w-full">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        <ComplaintForm />
      </div>
    </div>
  );
}

export default Complain;