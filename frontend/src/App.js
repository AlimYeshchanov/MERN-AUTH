import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Navbar/>
      <ToastContainer/>
      <Container  sx={{mt: "5rem", backgroundColor: "#f6f2f4", padding: "3rem"}}>
      <Outlet/>
      </Container>
    </>
  );
}

export default App;
