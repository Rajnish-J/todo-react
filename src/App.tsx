import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header username="John Doe" />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task/:id?" element={<TaskPage />} />
            </Routes>
          </main>
          <Footer authorName="Vista Lab" year={2025} />
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
