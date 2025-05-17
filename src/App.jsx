import { useState } from "react";
import Home from "./pages/Home.jsx";
import PromptPayQR from "./components/PromptPayQR.jsx";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
// import { defineConfig } from "vite";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Home /> */}
      <PromptPayQR />
      //
    </>
  );
}

export default App;
