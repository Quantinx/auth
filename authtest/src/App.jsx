import "./App.css";
import HeaderBar from "./components/header";
import LoginPage from "./pages/login";
import Profile from "./pages/profile";
import RegisterPage from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route index element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
