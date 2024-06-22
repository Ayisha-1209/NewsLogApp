import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";

// Creating the router configuration using React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

// Rendering the application using ReactDOM.createRoot (React Concurrent Mode)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Providing the Redux store to the entire application */}
    <RouterProvider router={router} />
    {/* Providing the router configuration to the entire application */}
  </Provider>
);

reportWebVitals(); // Function to report web vitals metrics
