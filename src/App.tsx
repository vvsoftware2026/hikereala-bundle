import { Routes, Route } from "react-router-dom";
import LaunchPage from "./features/00-app/pages/launch-page";
import MareaCiubarealaPage from "./features/01-marea-ciubareala/pages/marea-ciubareala-page";

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f5b6b3] to-[#fbe4e3]">
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/marea-ciubareala" element={<MareaCiubarealaPage />} />
        <Route path="/spin-the-drink" element={<>Will come...</>} />
        <Route path="/hbs" element={<>Will come...</>} />
      </Routes>
      <footer className="py-3 text-center text-xs text-gray-500">
        vvsoftware@2026
      </footer>
    </div>
  );
}
