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
import newproductIcon from "@/assets/jewelry-icon.png";
import storefrontIcon from "@/assets/store-icon.png";
import salesIcon from "@/assets/sales-icon.png";
import userIcon from "@/assets/user-icon.png";

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
        <img src={newproductIcon} alt="สินค้า" className="w-5 h-5" />
        คลังสินค้า
      </Button>
      <Button
        onClick={() => go("startsaleperiod")}
        className="flex gap-2 items-center"
      >
        <img src={storefrontIcon} alt="ร้านค้า" className="w-5 h-5" />
        จัดการร้านค้า
      </Button>
      <Button
        onClick={() => go("viewsales")}
        className="flex gap-2 items-center"
      >
        <img src={salesIcon} alt="ยอดขาย" className="w-5 h-5" />
        ดูยอดขาย
      </Button>
      <Button
        onClick={() => go("ownerprofile")}
        className="flex gap-2 items-center"
      >
        <img src={userIcon} alt="โปรไฟล์" className="w-5 h-5" />
        โปรไฟล์
      </Button>
    </nav>
  );
};

export default NavBarOwner;
