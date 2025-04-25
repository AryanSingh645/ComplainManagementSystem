import { useState, useEffect } from 'react';
import ComplaintForm from '../components/ComplaintForm';
import NotificationsDropdown from '../components/NotificationsDropdown';
import NotificationModal from '../components/NotificationModal';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
        <div className="fixed top-4 right-4 z-50">
          <NotificationsDropdown onNotificationClick={setSelectedNotification} />
        </div>
        <ComplaintForm />
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      </div>
    </div>
  );
}

export default App;