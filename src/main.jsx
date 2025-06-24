import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/route.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./contexts/AuthProvider.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    
       <RouterProvider router={routes} />
    
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
=======
    <RouterProvider router={routes} />
    <ReactQueryDevtools initialIsOpen={false} />
>>>>>>> a333b403dd5f8f90af4276665c0c4606c2ea2bab
  </QueryClientProvider>
);
