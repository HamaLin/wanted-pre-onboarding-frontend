import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppRouter from "./routers/AppRouter";

import SingIn from "./pages/singIn";
import SingUp from "./pages/singUp";
import Todo from "./pages/todo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppRouter
              component={
                <div>
                  <div>
                    <a href="/signin">로그인</a>
                  </div>
                  <div>
                    <a href="/singup">회원가입</a>
                  </div>
                  <div>
                    <a href="/todo">TODO</a>
                  </div>
                </div>
              }
            />
          }
        />
        <Route path="/signin" element={<AppRouter component={<SingIn />} />} />
        <Route path="/singup" element={<AppRouter component={<SingUp />} />} />
        <Route
          path="/todo"
          element={<AppRouter authProtected component={<Todo />} />}
        />
        <Route path="*" element={<AppRouter component={<SingIn />} />} />
      </Routes>
    </Router>
  );
};

export default App;
