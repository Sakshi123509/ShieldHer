import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShieldHerLoader from "./Pages/ShieldHerLoader";
import AuthPages from "./pages/AuthPages";
import { Home } from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<ShieldHerLoader />} />

        
        <Route path="/login" element={<AuthPages />} />

        
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;