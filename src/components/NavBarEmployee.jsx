import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import shuffleIcon from "@/assets/shuffle-icon.png";
import receiptIcon from "@/assets/receipt-icon.png";

const NavBarEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get("page");

  const go = (page) =>
    navigate({ search: createSearchParams({ page }).toString() });

  const buttons = [
    {
      icon: shuffleIcon,
      label: "เข้า-ออกงาน",
      page: "workshift",
    },
    {
      icon: receiptIcon,
      label: "สร้างบิล",
      page: "createslip",
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md p-4 rounded-b-xl">
      <h2 className="text-lg font-bold mb-4 text-left">ข้อมูลธุรกิจ</h2>
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
                className={`w-20 h-20 p-2 sm:w-24 sm:h-24 transition-transform duration-200 ${
                  isActive ? "scale-105" : "hover:scale-105"
                }`}
              >
                <img
                  src={icon}
                  alt={label}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              </Button>
              <span
                className={`text-md font-bold transition-colors duration-300 ${
                  isActive ? "text-black" : "text-gray-400"
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

export default NavBarEmployee;
