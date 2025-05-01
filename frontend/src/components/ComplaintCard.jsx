import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import ImageCarousel from './ImageCarousel';

const statusColors = {
  PENDING: 'bg-yellow-50 dark:bg-yellow-900/20',
  REJECTED: 'bg-red-50 dark:bg-red-900/20',
  SOLVED: 'bg-green-50 dark:bg-green-900/20',
};

const statusTextColors = {
  PENDING: 'text-yellow-800 dark:text-yellow-200',
  REJECTED: 'text-red-800 dark:text-red-200',
  SOLVED: 'text-green-800 dark:text-green-200',
};

const ComplaintCard = ({ complaint, onViewDetails, onReport }) => {
  const sampleImages = [
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
  ];

  return (
    <div className={`rounded-lg shadow-md p-6 ${statusColors[complaint.status]} transition-colors duration-200`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{complaint.complaintCategory}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(complaint.timestamp, 'PPp')}
          </p>
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
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
            <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                {/* <Menu.Item>
                  <div className="px-4 py-2">
                    <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
                      Status
                    </label>
                    <select
                      value={complaint.status}
                      onChange={(e) => onStatusChange(complaint.id, e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="SOLVED">Solved</option>
                    </select>
                  </div>
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onReport}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Report
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {complaint?.images && <ImageCarousel images={complaint?.images} />}

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {complaint.complaintDescription}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${statusTextColors[complaint.status]}`}>
          {complaint.status}
        </span>
        <button
          onClick={onViewDetails}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;