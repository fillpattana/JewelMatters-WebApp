// App.jsx
import { BrowserRouter, useSearchParams } from "react-router-dom";
import NavBarEmployee from "./components/NavBarEmployee.jsx";
import NavBarOwner from "./components/NavBarOwner.jsx";
import LineLogin from "./components/LineLogin.jsx";
import CreateSlip from "./employee-pages/CreateSlip.jsx";
import WorkShift from "./employee-pages/WorkShift.jsx";
import CreateNewProduct from "./storeowner-pages/CreateNewProduct.jsx";
import StartSalePeriod from "./storeowner-pages/StartSalePeriod.jsx";
import ViewSales from "./storeowner-pages/ViewSales.jsx";
import Home from "./Home.jsx";
import { useRole } from "./react-contexts/RoleContexts.jsx";
import "./styles/App.css";

function PageRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");

  const pages = {
    linelogin: <LineLogin />,
    createslip: <CreateSlip />,
    workshift: <WorkShift />,
    createnewproduct: <CreateNewProduct />,
    startsaleperiod: <StartSalePeriod />,
    viewsales: <ViewSales />,
  };

  return pages[page] || <Home />;
}

function App() {
  const { role, loading } = useRole();

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <BrowserRouter>
      <div className="app-container">
        {role === "employee" && <NavBarEmployee />}
        {role === "owner" && <NavBarOwner />}
        <div className="page-content">
          <PageRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
