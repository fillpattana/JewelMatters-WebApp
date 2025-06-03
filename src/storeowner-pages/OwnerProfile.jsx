import { useEffect, useState } from "react";
import { useRole } from "../react-contexts/RoleContexts";
import { liff } from "../liff";
import { resetMenu } from "../api/resetUserMenu";

export default function OwnerProfile() {
  const { profile } = useRole();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

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
          body: JSON.stringify({ phoneNumber }),
        }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save phone number:", err);
    }
  };

  const logout = async () => {
    if (profile?.userId) {
      await resetMenu(profile.userId);
    }
    liff.logout();
    localStorage.clear();
    window.location.close();
  };

  useEffect(() => {
    fetchPhoneNumber();
  }, [profile]);

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <img
        src={profile?.pictureUrl}
        alt={profile?.displayName}
        style={{
          width: 128,
          height: 128,
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,.3)",
        }}
      />
      <h1>{profile?.displayName}</h1>

      <div style={{ margin: "1rem 0" }}>
        <label>
          เบอร์โทรศัพท์:
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0812345678"
            style={{ marginLeft: 8, padding: 4 }}
          />
        </label>
        <button onClick={savePhoneNumber} style={{ marginLeft: 10 }}>
          บันทึก
        </button>
        {saved && (
          <span style={{ color: "green", marginLeft: 8 }}>✔ บันทึกแล้ว</span>
        )}
      </div>

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
