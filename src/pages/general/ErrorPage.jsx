import { HiLockClosed, HiRefresh, HiServer, HiWifi } from "react-icons/hi";
import { HiExclamationTriangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"; // Add this for navigation

function ErrorPage({ error, onDismiss }) {
  const navigate = useNavigate(); // Hook for navigation

  if (!error) return null;

  const errorContent = {
    "not-found": {
      icon: (
        <HiExclamationTriangle
          size={48}
          className="text-amber-400 animate-bounce duration-5000"
        />
      ),
      title: "Resource Not Found",
      description: "The requested resource doesn't exist or was moved.",
      action: "Go back to home page",
      actionHandler: () => navigate("/"),
      color: "border-amber-400 bg-amber-50",
    },
    unauthorized: {
      icon: <HiLockClosed size={48} className="text-red-400" />,
      title: "Access Denied",
      description: "You don't have permission to access this resource.",
      action: "Log in with different credentials",
      actionHandler: () => navigate("/login"),
      color: "border-red-400 bg-red-50",
    },
    server: {
      icon: <HiServer size={48} className="text-purple-400" />,
      title: "Server Error",
      description: "Our server encountered an error. Please try again later.",
      action: "Try again",
      actionHandler: () => window.location.reload(),
      color: "border-purple-400 bg-purple-50",
    },
    timeout: {
      icon: (
        <HiWifi
          size={48}
          className="text-blue-400 animate-pulse duration-4000"
        />
      ),
      title: "Connection Timeout",
      description:
        "The server took too long to respond. Check your connection.",
      action: "Retry connection",
      actionHandler: () => window.location.reload(),
      color: "border-blue-400 bg-blue-50",
    },
    "rate-limit": {
      icon: (
        <HiRefresh
          size={60}
          className="text-orange-400 animate-spin duration-4000"
        />
      ),
      title: "Too Many Requests",
      description: "You've made too many requests. Please try again later.",
      action: "Go to home page",
      actionHandler: () => navigate("/"),
      color: "border-orange-400 bg-orange-50",
    },
    unknown: {
      icon: <HiExclamationTriangle size={48} className="text-gray-400" />,
      title: "Something Went Wrong",
      description: "An unexpected error occurred.",
      action: "Go to home page",
      actionHandler: () => navigate("/"),
      color: "border-gray-400 bg-gray-50",
    },
  };

  const content = errorContent[error.type] || errorContent.unknown;

  return (
    <div
      className={`w-full m-4  mx-auto p-4 rounded-xl font-light  border ${content.color} `}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{content.icon}</div>
        <h2 className="text-xl font-bold text-gray-600 mb-2">{content.title}</h2>
        <p className="text-gray-600 mb-6">{content.description}</p>

        {error.message && (
          <div className="w-[50%] bg-white/80 backdrop-blur-lg p-4 rounded mb-6 text-sm text-gray-700 break-words">
            <span className="font-medium">Error details:</span> {error.message}
            {error.status && (
              <span className="ml-1 text-gray-500">
                (Status: {error.status})
              </span>
            )}
          </div>
        )}

        <div className="flex gap-4">
          {/* <button
            className="px-4 py-2 bg-gray-600/10 hover:bg-gray-600/20 rounded-md transition-colors"
            onClick={onDismiss || (() => {})}
          >
            Dismiss
          </button> */}
          <button
            className={`px-4 py-2 bg-gray-600/50 text-white font-medium hover:bg-gray-600/70 rounded-md transition-colors`}
            onClick={content.actionHandler}
          >
            {content.action}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
