import { useEffect, useState } from "react";
import { useRole } from "../react-contexts/RoleContexts";
import { liff } from "../liff";
import { resetMenu } from "../api/resetUserMenu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import editIcon from "@/assets/edit-icon.png";

export default function OwnerProfile() {
  const { profile } = useRole();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const fetchPhoneNumber = async () => {
    if (!profile?.userId) return;
    try {
      const res = await fetch(
        `https://jewelmatters-backend-cold-fog-2174.fly.dev/api/getPhoneNumber/${profile.userId}`
      );
      const data = await res.json();
      setPhoneNumber(data.phoneNumber || "");
    } catch (err) {
      console.error("Failed to fetch phone number:", err);
    } finally {
      setLoading(false);
    }
  };

  const savePhoneNumber = async () => {
    try {
      await fetch(
        `https://jewelmatters-backend-cold-fog-2174.fly.dev/api/changePhoneNumber/${profile.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: tempPhoneNumber }),
        }
      );
      setPhoneNumber(tempPhoneNumber);
      setSaved(true);
      setEditDialogOpen(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save phone number:", err);
    }
  };

  const logout = async () => {
    if (!profile?.userId) return;

    const result = await resetMenu(profile.userId);

    if (result.success) {
      setLoggedOut(true);
      setTimeout(() => {
        localStorage.setItem("justLoggedOut", "true");
        localStorage.clear();
        liff.logout();

        if (liff.isInClient()) {
          liff.closeWindow();
        } else {
          window.location.href =
            "https://jewel-matters.vercel.app/?page=linelogin";
        }
      }, 2000);
    } else {
      alert("ไม่สามารถรีเซ็ตเมนูได้ กรุณาลองใหม่");
    }
  };

  useEffect(() => {
    fetchPhoneNumber();
  }, [profile]);

  if (loading) return <p>กำลังโหลดข้อมูลผู้ใช้งาน กรุณารอสักครู่...</p>;

  return (
    <main className="p-6 flex flex-col items-center">
      {/* Avatar and Name */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <img
          src={profile?.pictureUrl}
          alt={profile?.displayName}
          className="w-32 h-32 mx-auto rounded-full shadow-md"
        />
        <h1 className="text-xl font-semibold mt-4">{profile?.displayName}</h1>

        {/* Phone number section */}
        <div className="mt-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">เบอร์โทรศัพท์:</span>
            <div className="flex items-center">
              <span className="text-gray-800 mr-2">
                {phoneNumber || "ไม่มีข้อมูล"}
              </span>
              <button
                onClick={() => {
                  setTempPhoneNumber(phoneNumber);
                  setEditDialogOpen(true);
                }}
              >
                <img
                  src={editIcon}
                  alt="แก้ไข"
                  className="w-5 h-5 object-contain cursor-pointer"
                />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            เบอร์โทรศัพท์นี้จะถูกนำไปสร้างบิลในรูปแบบ PromptPay
            ให้กับลูกค้าของคุณ
          </p>
          {saved && (
            <p className="text-green-600 text-sm mt-1">การบันทึกสำเร็จ</p>
          )}
        </div>

        {/* Logout button */}
        <Button
          className="mt-8 w-full bg-[#06C755] hover:bg-green-600 text-white"
          onClick={logout}
        >
          ออกจากระบบ
        </Button>

        {loggedOut && (
          <div className="mt-3 text-green-600 text-sm">
            ✅ ออกจากระบบสำเร็จ กำลังปิดหน้าต่าง...
          </div>
        )}
      </div>

      {/* Edit Phone Dialog */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>แก้ไขเบอร์โทรศัพท์</AlertDialogTitle>
          </AlertDialogHeader>

          <Input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={tempPhoneNumber}
            onChange={(e) => setTempPhoneNumber(e.target.value)}
            placeholder="กรุณากรอกเบอร์โทรศัพท์"
          />

          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#192F7B] hover:bg-[#16296b] text-white"
              onClick={savePhoneNumber}
            >
              บันทึก
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
