import { BrowserRouter, useSearchParams } from "react-router-dom";
import LineLogin from "./components/LineLogin.jsx";
import CreateSlip from "./employee-pages/CreateSlip.jsx";
import Home from "./Home.jsx";
import CreateNewProduct from "./storeowner-pages/CreateNewProduct.jsx";
import StartSalePeriod from "./storeowner-pages/StartSalePeriod.jsx";
import ViewSales from "./storeowner-pages/ViewSales.jsx";
import WorkShift from "./employee-pages/WorkShift.jsx";
import "./styles/App.css";

function PageRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");

  const pages = {
    createslip: <CreateSlip />,
    linelogin: <LineLogin />,
    createnewproduct: <CreateNewProduct />,
    startsaleperiod: <StartSalePeriod />,
    viewsales: <ViewSales />,
    workshift: <WorkShift />,
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
