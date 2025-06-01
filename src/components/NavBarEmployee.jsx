import { useNavigate, createSearchParams } from "react-router-dom";

const NavBarEmployee = () => {
  const navigate = useNavigate();
  const go = (page) =>
    navigate({ search: createSearchParams({ page }).toString() });

  return (
    <nav className="navbar">
      <button onClick={() => go("createslip")}>Create Slip</button>
      <button onClick={() => go("workshift")}>Work Shift</button>
    </nav>
  );
};

export default NavBarEmployee;
