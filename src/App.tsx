import { Routes, Route } from "react-router-dom";
import "./index.css";
import Index from "./pages/Index";
import { ThemeProvider } from "./components/shared/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </ThemeProvider>
  );
}