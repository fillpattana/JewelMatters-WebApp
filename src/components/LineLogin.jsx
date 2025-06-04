// components/LineLogin.jsx
import { useRole } from "../react-contexts/RoleContexts";
import { useEffect } from "react";
import { liff } from "../liff";

export default function LineLogin() {
  const { profile, role, loading } = useRole();

  if (loading) return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (!profile) return <p>ไม่พบข้อมูลผู้ใช้</p>;

  useEffect(() => {
    if (!loading && role && profile?.userId) {
      // Give it a short delay in case the user sees the avatar briefly
      const timeout = setTimeout(() => {
        liff.closeWindow();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [loading, role, profile]);

  return (
    <main style={{ textAlign: "center", padding: "3rem" }}>
      <h1>ยินดีต้อนรับค่ะ คุณ {profile.displayName}</h1>
      <p>บทบาทของคุณเป็น {role}</p>
      <p style={{ color: "green" }}>✅ ระบบกำลังปิดหน้าต่าง</p>
    </main>
  );
}
