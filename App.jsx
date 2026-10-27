import "./App.css";
import Navbar from "./Navbar";
import Alert from "./Alert";
import About from "./About";
import TextForm from "./TextForm";
import{useState} from "react";

import { BrowserRouter, Routes, Route } from "react-router";   




function App() {
  const [mode, setMode] = useState("light");
  const [alert,setalert] = useState(null);

  const showalert =(message,type)=>{
    setalert({
      msg:message,
      type:type
    })    

    setTimeout(() => {
    setalert(null);
  }, 1000);
  }
  
  
const changetheme =()=>{

if(mode === "light"){
    document.body.style.backgroundColor = "rgba(3, 3, 3, 0.96)"
    setMode("dark");
}else{
    document.body.style.backgroundColor = "rgb(255, 255, 255)"
    setMode("light");
}
}
 
return (
    <>
   <BrowserRouter>
  <Navbar title="Expense Tracker" about="About Us" mode={mode}  showalert={showalert} changetheme={changetheme} />
   
   
   <Alert alert={alert} />


<Routes>
        <Route path="/about" element={<About mode={mode} />} />
        <Route path="/" element={<TextForm mode={mode}  showalert={showalert}  alert={alert} />} />
      </Routes>

</BrowserRouter>
</>
  );
     
}

export default App
