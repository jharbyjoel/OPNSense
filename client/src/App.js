import LoginPage from "./components/LoginPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

      </Routes>
    </Router>
  );
};

export default App;