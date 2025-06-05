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

import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import newproductIcon from "@/assets/jewelry-icon.png";
import storefrontIcon from "@/assets/store-icon.png";
import salesIcon from "@/assets/sales-icon.png";
import userIcon from "@/assets/user-icon.png";

const NavBarOwner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get("page");

  const go = (page) =>
    navigate({ search: createSearchParams({ page }).toString() });

  const buttons = [
    {
      icon: newproductIcon,
      label: "คลังสินค้า",
      page: "createnewproduct",
    },
    {
      icon: storefrontIcon,
      label: "จัดการร้านค้า",
      page: "startsaleperiod",
    },
    {
      icon: salesIcon,
      label: "ดูยอดขาย",
      page: "viewsales",
    },
    {
      icon: userIcon,
      label: "โปรไฟล์",
      page: "ownerprofile",
    },
  ];

  return (
    <nav className="flex justify-center gap-6 p-4 shadow-md bg-white">
      {buttons.map(({ icon, label, page }) => {
        const isActive = currentPage === page;
        return (
          <div key={page} className="flex flex-col items-center gap-1">
            <Button
              variant="outline"
              onClick={() => go(page)}
              className="w-12 h-12 p-2"
            >
              <img src={icon} alt={label} className="w-6 h-6 object-contain" />
            </Button>
            <span
              className={`text-sm ${
                isActive ? "text-black font-medium" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </nav>
  );
};

export default NavBarOwner;
