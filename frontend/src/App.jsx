import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShieldHerLoader from "./Pages/ShieldHerLoader";
import AuthPages from "./pages/AuthPages";
import { Home } from "./Pages/Home";
import PersonalDetailsPage from "./Pages/PersonalDetailsPage";
function App() {
  return (
    <BrowserRouter>
    <PersonalDetailsPage/>
      <Routes>
     
        {/* <Route path="/" element={<ShieldHerLoader />} />

        
        <Route path="/login" element={<AuthPages />} />

        
        <Route path="/home" element={<Home/>} /> */}

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;