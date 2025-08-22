import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Translate from "./pages/Translate.jsx";
import StringLab from "./pages/StringLab.jsx";

export default function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Translate />} />
          <Route path="/string-lab" element={<StringLab />} />
          <Route path="*" element={<Translate />} />
        </Routes>
      </main>
      <footer className="text-center py-4 text-xs text-gray-300">
        Made with ♥ React + TailwindCDN
      </footer>
    </div>
  );
}
