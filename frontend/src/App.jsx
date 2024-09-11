import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import bgImg from "./assets/Mountain-Background.jpg"
import swampBg from "./assets/swamp.png"
import bgGid from "./assets/bgGid.gif"

function App() {
  return (
    <div style={{ 
      backgroundImage: `url(${bgGid})`,  
      // backgroundSize: 'cover', 
      width:"100%" ,
      height:"100vh"
    }}>
    
    <NavBar />
    <div className=" d-flex flex-column align-items-center" >
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
    </div>
  );
}

export default App;
