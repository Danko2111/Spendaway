import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
