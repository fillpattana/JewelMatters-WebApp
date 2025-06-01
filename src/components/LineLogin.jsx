// components/LineLogin.jsx
import { useRole } from "../react-contexts/RoleContexts";
import { useEffect } from "react";
import { liff } from "../liff";
import { resetMenu } from "../api/resetUserMenu"; // make sure the path is correct

export default function LineLogin() {
  const { profile, role, loading } = useRole();

  const logout = async () => {
    if (profile?.userId) {
      await resetMenu(profile.userId);
    }
    liff.logout();
    localStorage.clear(); // optional: clear localStorage too
    window.location.reload();
  };

  if (loading) return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (!profile) return <p>ไม่พบข้อมูลผู้ใช้</p>;

  useEffect(() => {
    if (!loading && role && profile?.userId) {
      // Give it a short delay in case the user sees the avatar briefly
      const timeout = setTimeout(() => {
        liff.closeWindow();
      }, 2000); // optional: 1 second delay

      return () => clearTimeout(timeout);
    }
  }, [loading, role, profile]);

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <img
        src={profile.pictureUrl}
        alt={profile.displayName}
        style={{
          width: 128,
          height: 128,
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,.3)",
        }}
      />
      <h1>{profile.displayName}</h1>
      <p>บทบาท: {role}</p>

      <button
        onClick={logout}
        style={{
          padding: "0.5rem 1.5rem",
          borderRadius: 6,
          background: "#06C755",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        ออกจากระบบ
      </button>
    </main>
  );
}
