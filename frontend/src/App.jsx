import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShieldHerLoader from "./Pages/ShieldHerLoader";
import AuthPages from "./pages/AuthPages";
import { Home } from "./Pages/Home";
import PersonalDetailsPage from "./Pages/PersonalDetailsPage";
import HomePage from "./Pages/HomePage";

import ShieldHerFlipbook from "./Pages/ShieldHerFlipbook";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShieldHerLoader />} />

        <Route path="/login" element={<AuthPages />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/details" element={<PersonalDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
