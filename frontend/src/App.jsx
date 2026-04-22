import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/AuthPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPages />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;  