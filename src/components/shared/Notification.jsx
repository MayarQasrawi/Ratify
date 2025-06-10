import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import useGetNotifications from "../../hooks/useGetNotification";

export default function Notification({size=false}) {
  const { data: notificationsResponse } = useGetNotifications();
  console.log(notificationsResponse,'notificationsResponse')
  const [isOpen, setIsOpen] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };
  const unreadCount =notificationsResponse &&  notificationsResponse.data.filter((n) => !n.isRead).length;
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <BsBell className={`${size?'text-lg':'text-md'} text-[var(--text-color)]`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 font-mono">
              Notifications
            </h3>
          </div>
          <div className="max-h-72 overflow-y-auto scrollbar-custom divide-y divide-gray-200 dark:divide-gray-700">
            {notificationsResponse.data.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <p>No notifications yet</p>
              </div>
            ) : (
              notificationsResponse.data.map((n) => (
                <div
                  key={n.id}
                  className={`cursor-pointer px-4 py-3 transition hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    !n.isRead
                      ? "bg-gray-50 dark:bg-gray-700"
                      : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      !n.isRead
                        ? "font-medium text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {n.message.split('on')[0]}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(n.date)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
