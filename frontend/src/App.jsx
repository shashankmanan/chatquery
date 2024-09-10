import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App d-flex flex-column align-items-center">
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
