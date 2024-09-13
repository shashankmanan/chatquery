import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ManualHome from "./pages/ManualHome";
import NavBar from "./components/NavBar";
import bgGid from "./assets/bgGid.gif"
import Test from "./pages/Test";
import Index from "./pages/Index";
import Chat from "./pages/Chat";

function App() {
  const gradStyle = {
    backgroundImage : "linear-gradient(black,	#5388ac)" , 
    width : "100%" , 
    height : "100vh"
  }
  const imgSty = { 
      backgroundImage: `url(${bgGid})`,  
      // backgroundSize: 'cover', 
      width:"100%" ,
      height:"100vh"
    }
  
  return (
   
   <div style={gradStyle}>

    <NavBar />
    <div className=" d-flex flex-column align-items-center" >
      <Routes>
        <Route exact path = "/" element = {<Index />}/>
        <Route exact path = "/home" element={<Index />}/>
        <Route exact path = "/chat" element = {<Chat />}/>
        <Route exact path = "/manual" element={<ManualHome/>} />
        <Route exact path="/test" element = {<Test />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
