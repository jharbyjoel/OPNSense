import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import FirmwareStatus from "./components/FirmwareStatus";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/firmwarestatus" element={<FirmwareStatus/>} />

      </Routes>
    </Router>
  );
};

export default App;