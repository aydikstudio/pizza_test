import { Route, Router, Routes } from "react-router-dom";
import Main from "./page/main";
import Add from "./page/add";
import Edit from "./page/edit";




export default function App() {
  
  return (
<div>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/add" element={<Add />}/>
      </Routes>
      </div>
  )
}