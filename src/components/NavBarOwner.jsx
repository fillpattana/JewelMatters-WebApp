// components/NavBarOwner.jsx
import { useNavigate, createSearchParams } from "react-router-dom";

const NavBarOwner = () => {
  const navigate = useNavigate();
  const go = (page) =>
    navigate({ search: createSearchParams({ page }).toString() });

  return (
    <nav className="navbar">
      <button onClick={() => go("createnewproduct")}>New Product</button>
      <button onClick={() => go("startsaleperiod")}>Start Sale</button>
      <button onClick={() => go("viewsales")}>View Sales</button>
    </nav>
  );
};

export default NavBarOwner;
