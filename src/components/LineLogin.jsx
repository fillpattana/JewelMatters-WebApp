// components/LineLogin.jsx
import { useRole } from "../react-contexts/RoleContexts";
import { useEffect } from "react";
import { liff } from "../liff";

export default function LineLogin() {
  const { profile, role, loading } = useRole();

  if (loading) return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (!profile) return <p>ไม่พบข้อมูลผู้ใช้</p>;
  if (!role) return <p>กำลังตรวจสอบบทบาทผู้ใช้...</p>;

  // useEffect(() => {
  //   if (!loading && role && profile?.userId) {
  //     // Give it a short delay in case the user sees the avatar briefly
  //     const timeout = setTimeout(() => {
  //       liff.closeWindow();
  //     }, 5000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [loading, role, profile]);

  return (
    <main style={{ textAlign: "left", padding: "3rem" }}>
      <h2>ยินดีต้อนรับค่ะ คุณ {profile.displayName}</h2>
      <p>บทบาทของคุณเป็น {role}</p>
      <p>ผู้ใช้สามารถเริ่มต้นใช้งานระบบได้เลยค่ะ</p>
    </main>
  );
}
