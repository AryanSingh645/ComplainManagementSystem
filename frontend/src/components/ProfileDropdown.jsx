import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useThemeToggle } from "../hooks/ThemeToggle";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";

const ProfileDropdown = () => {
  const { darkMode, setDarkMode } = useThemeToggle();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/logout');
      if(response.data.success){
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Please Refresh and try again!");
    }
  }
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <Menu.Button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  View Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
