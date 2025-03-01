import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
