import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import AppRouter from "./routers/AppRouter";

import SignForm from "./containers/signForm";
import Todo from "./containers/todo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={"/singup" || "/signin"}
          element={<AppRouter component={<SignForm />} />}
        />
        <Route
          path="/todo"
          element={<AppRouter authProtected component={<Todo />} />}
        />
        <Route path="*" element={<AppRouter component={<SignForm />} />} />
      </Routes>
      <SnackbarProvider />
    </Router>
  );
};

export default App;
