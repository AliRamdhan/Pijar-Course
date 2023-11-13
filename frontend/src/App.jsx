import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Courses from "./pages/Courses";
import Pricing from "./pages/Pricing";
import Error from "./pages/Error";
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/:courseName" element={<Courses />} />
          <Route path="/pricing/course/:courseName" element={<Pricing />} />
          <Route
            path="/aaaa"
            element={
              <ProtectedRoute>
                <Error />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
