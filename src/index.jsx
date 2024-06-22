import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import Login from './pages/Login';
import Signup from "./pages/Signup.jsx";

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
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

reportWebVitals();
