import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserForm from "./components/UserForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
