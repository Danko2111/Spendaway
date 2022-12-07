import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
