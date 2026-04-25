import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShieldHerLoader from "./Pages/ShieldHerLoader";
import AuthPages from "./pages/AuthPages";
import { Home } from "./Pages/Home";
import PersonalDetailsPage from "./Pages/PersonalDetailsPage";
import SOSConfirmation from "./Pages/sosConfirmation";
import HomePage from "./Pages/HomePage";
import ShieldHerFlipbook from "./Pages/ShieldHerFlipbook";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShieldHerLoader />} />

        <Route path="/login" element={<AuthPages />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/details" element={<PersonalDetailsPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sos-confirmation" element={<SOSConfirmation />} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
