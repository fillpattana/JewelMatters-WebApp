import { BrowserRouter, useSearchParams } from "react-router-dom";
import LineLogin from "./components/LineLogin.jsx";
import CreateSlip from "./employee-pages/CreateSlip.jsx";
import Home from "../src/employee-pages/Home.jsx";
import "./styles/App.css";

function PageRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");

  const pages = {
    createslip: <CreateSlip />,
    linelogin: <LineLogin />,
  };

  return pages[page] || <Home />; // fallback to <Home /> if page is not recognized
}

function App() {
  return (
    <BrowserRouter>
      <PageRouter />
    </BrowserRouter>
  );
}

export default App;
