import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const notifications = [
  {
    id: 1,
    title: 'New Complaint Submitted',
    description: 'A new complaint has been submitted regarding the swimming pool maintenance. The issue reported is about water quality and cleanliness. Please review and take necessary action.',
    timestamp: new Date(2024, 1, 15, 14, 30),
    read: false,
  },
  {
    id: 2,
    title: 'Maintenance Update',
    description: 'Scheduled maintenance for the elevator in Block A has been completed. All systems are now functioning normally.',
    timestamp: new Date(2024, 1, 15, 10, 15),
    read: true,
  },
  {
    id: 3,
    title: 'Security Alert',
    description: 'Unauthorized vehicle reported in visitor parking area. Security personnel have been notified and are investigating the situation.',
    timestamp: new Date(2024, 1, 14, 18, 45),
    read: false,
  },
];

const NotificationsDropdown = ({ onNotificationClick }) => {
  const [notificationState, setNotificationState] = useState(notifications);

  const markAsRead = (id) => {
    setNotificationState(prevState =>
      prevState.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
        <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
        {notificationState.some(n => !n.read) && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-700" />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <div className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Notifications
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {notificationState.map((notification) => (
                <Menu.Item key={notification.id}>
                  <button
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md ${
                      notification.read ? 'opacity-75' : ''
                    }`}
                    onClick={() => {
                      markAsRead(notification.id);
                      onNotificationClick(notification);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          notification.read 
                            ? 'text-gray-600 dark:text-gray-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {truncateText(notification.description, 100)}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                        {format(notification.timestamp, 'HH:mm')}
                      </span>
                    </div>
                  </button>
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsDropdown;