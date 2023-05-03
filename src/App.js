import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AddUser from "./Components/AddUser";

function App() {
  return (
    <Router forceRefresh={false}>
      <Routes>
        <Route path={"/"} exact element={<Home/>} />
        <Route path={"/new-entry"} exact element={<AddUser/>} />
      </Routes>
    </Router>
  );
}

export default App;
