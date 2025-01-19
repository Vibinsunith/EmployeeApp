import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Form from "./form";
import DashBoard from "./Dashboard";
import Register from "./register";

let userToken = localStorage.getItem("userToken");

console.log("-----userToken--------", userToken);

// import Services from "./Header";

// import Practices from "./Practice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {userToken != null && userToken != "undefined" ? (
          <Route path="/dashboard" element={<DashBoard />} />
        ) : (
          <>
            <Route path="/" element={<Form />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    // <Services />
    // <Practices />
  );
}

export default App;
