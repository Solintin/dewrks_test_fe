import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PagesRoutes from "./routes";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./react-toastify.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const App: FC = () => {
  // py-8 px-5
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <Router>
          <PagesRoutes />
          <ToastContainer
            autoClose={2000}
            hideProgressBar
            theme="colored"
            position="top-right"
          />
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
