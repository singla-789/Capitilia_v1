import { BrowserRouter, Route, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Filter from "./pages/Filter";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";




const App = () =>{
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expense" element={<Expense/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/filter" element={<Filter/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  )
}

export default App;