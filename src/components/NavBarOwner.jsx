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
      label: "สินค้า",
      page: "createnewproduct",
    },
    {
      icon: storefrontIcon,
      label: "ร้านค้า",
      page: "startsaleperiod",
    },
    {
      icon: salesIcon,
      label: "ยอดขาย",
      page: "viewsales",
    },
    {
      icon: userIcon,
      label: "โปรไฟล์",
      page: "ownerprofile",
    },
  ];

  return (
    <div className="w-full bg-white shadow-md p-4">
      <h1 className="text-lg font-bold mb-4 text-left">ข้อมูลธุรกิจ</h1>
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
        {buttons.map(({ icon, label, page }) => {
          const isActive = currentPage === page;
          return (
            <div
              key={page}
              className="flex flex-col items-center gap-1 text-center min-w-20"
            >
              <Button
                variant="ghost"
                onClick={() => go(page)}
                className="w-20 h-20 p-2 sm:w-24 sm:h-24"
              >
                <img
                  src={icon}
                  alt={label}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              </Button>
              <span
                className={`text-md ${
                  isActive ? "text-black font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBarOwner;
