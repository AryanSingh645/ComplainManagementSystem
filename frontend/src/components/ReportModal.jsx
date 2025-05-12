import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import { useAdminDashboard } from "../hooks/AdminDashboard";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { format, set } from "date-fns";

const ReportModal = ({
  isOpen,
  onClose,
  onSubmit,
  complaint,
  onStatusChange
}) => {
  const [message, setMessage] = useState("");
  // console.log('ReportModal complaint:', complaint);

  const handleSubmit = async() => {
    try {
      setIsPingLoading(true);
      const response = await axiosInstance.post("/api/admin/pingAdmins", {
        message,
        ...complaint,
        timestamp: format(complaint.timestamp, 'PPpp'),
      });
      if(!response.data.success){
        toast.error(response.data.message);
      }
      else toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error(response.data.message);
    }
    finally{
      setIsPingLoading(false);
      setMessage("");
    }
  };



  
  const joinGroupWithMessage = () => {
    // https://web.whatsapp.com/accept?code=Ig1HG8RUrPVC3wbKaj42hk
    if(message.trim().length == 0){
      toast.error("Please enter a message.");
      return;
    }
    const groupLink = "https://chat.whatsapp.com/HspPRawGcxCHPfhZqdqlAi";
    let formattedMessage = `*${complaint.complaintCategory}*\n${complaint.subCategory}\n\n*Complaint ID:* ${complaint.id}\n*Name:* ${complaint.name}\n*Phone:* ${complaint.phoneNumber}\n*Email:* ${complaint.emailId}\n*Complained At:* ${format(complaint.timestamp, 'PPpp')}\n*Complain Status:* ${complaint.status}\n\n*Message:* ${message.trim()}\n`;
    // const groupLink = "https://web.whatsapp.com/accept?code=Ig1HG8RUrPVC3wbKaj42hk";
    // const message = "Hi everyone! I'm excited to join this group.";
  
    navigator.clipboard.writeText(formattedMessage).then(() => {
      // alert("Message copied! You’ll be redirected to the WhatsApp group.");
      window.open(groupLink, "_blank");
      setMessage("");
    });
  };
  const [currentStatus, setCurrentStatus] = useState(complaint.status);
  const [isLoading, setIsLoading] = useState(false);
  const [isPingLoading, setIsPingLoading] = useState(false);
  const {admin} = useAdminDashboard();

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

                {admin.access === "READ_WRITE" && <div className="flex flex-col">
                  <div className="px-4 py-2">
                    <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
                      Status
                    </label>
                    <select
                      value={currentStatus}
                      defaultValue={complaint.status}
                      onChange={(e) => {
                        setCurrentStatus(e.target.value);
                        // onStatusChange(complaint.id, e.target.value);
                      }}
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 p-10 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="SOLVED">Solved</option>
                    </select>
                  </div>
                  <div className="px-4 w-full">
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => onStatusChange(complaint.id, currentStatus, setIsLoading)}
                    >
                      {isLoading ? <Loader2 className="animate-spin"/> : 'Update Status'}
                    </button>
                  </div>
                </div>}


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
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => joinGroupWithMessage()}
                  >
                    Broadcast
                  </button>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-transparent bg-green-100 dark:bg-green-900 px-4 py-2 text-sm font-medium text-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => handleSubmit()}
                  >
                    {isPingLoading ? <Loader2 className="animate-spin"/> : 'Ping Admins'}
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
