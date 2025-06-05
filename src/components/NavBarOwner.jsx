// import { useNavigate, createSearchParams } from "react-router-dom";

// const NavBarOwner = () => {
//   const navigate = useNavigate();
//   const go = (page) =>
//     navigate({ search: createSearchParams({ page }).toString() });

//   return (
//     <nav className="navbar">
//       <button onClick={() => go("createnewproduct")}>New Product</button>
//       <button onClick={() => go("startsaleperiod")}>Start Sale</button>
//       <button onClick={() => go("viewsales")}>View Sales</button>
//       <button onClick={() => go("ownerprofile")}>Profile</button>
//     </nav>
//   );
// };

// export default NavBarOwner;

import { useNavigate, createSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBarOwner = () => {
  const navigate = useNavigate();
  const go = (page) =>
    navigate({ search: createSearchParams({ page }).toString() });

  return (
    <nav className="flex justify-center gap-4 p-4 shadow-md bg-white">
      <Button
        onClick={() => go("createnewproduct")}
        className="flex gap-2 items-center"
      >
        <Plus size={18} />
        New Product
      </Button>
      <Button
        onClick={() => go("startsaleperiod")}
        className="flex gap-2 items-center"
      >
        <Play size={18} />
        Start Sale
      </Button>
      <Button
        onClick={() => go("viewsales")}
        className="flex gap-2 items-center"
      >
        <LineChart size={18} />
        View Sales
      </Button>
      <Button
        onClick={() => go("ownerprofile")}
        className="flex gap-2 items-center"
      >
        <User size={18} />
        Profile
      </Button>
    </nav>
  );
};

export default NavBarOwner;
