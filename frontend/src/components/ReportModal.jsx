import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ReportModal = ({ isOpen, onClose, onSubmit, complaint, onStatusChange }) => {
  const [message, setMessage] = useState('');
  // console.log('ReportModal complaint:', complaint);

  const handleSubmit = (reportType) => {
    onSubmit(complaint.id, reportType, message);
    setMessage('');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
                >
                  Report Complaint
                </Dialog.Title>

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

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600"
                    placeholder="Enter your message here..."
                  />
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    className="flex-1 justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => handleSubmit('broadcast')}
                  >
                    Broadcast
                  </button>
                  <button
                    type="button"
                    className="flex-1 justify-center rounded-md border border-transparent bg-green-100 dark:bg-green-900 px-4 py-2 text-sm font-medium text-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => handleSubmit('ping_admins')}
                  >
                    Ping Admins
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReportModal;