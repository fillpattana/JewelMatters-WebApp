// components/LineLogin.jsx
import { useRole } from "../react-contexts/RoleContexts";
import { liff } from "../liff";

export default function LineLogin() {
  const { profile, role, loading } = useRole();

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  if (loading) return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (!profile) return <p>ไม่พบข้อมูลผู้ใช้</p>;

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
