import { useEffect, useState } from "react";
import { initLiff, liff } from "../liff";
import { assignUserMenu } from "../api/assignUserMenu";

export default function LineLogin() {
  const [profile, setProfile] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [error, setError] = useState(null);

  const liffId = "2007432322-Lamoy70b";

  useEffect(() => {
    initLiff(liffId)
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login(); // redirect to LINE login
          return;
        }

        setIdToken(liff.getIDToken());

        liff
          .getProfile()
          .then((p) => setProfile(p))
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  }, []);

  // Assign menu once profile is available
  useEffect(() => {
    console.log("Line Login Called");
    if (!profile) return;
    const assignMenu = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/getUserRole/${profile.userId}`
        );
        const { role } = await res.json();
        console.log("User role:", role);
        await assignUserMenu(profile.userId, role);
      } catch (err) {
        console.error("Error assigning menu:", err);
      }
    };

    assignMenu();
  }, [profile]);

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  /* ---------- UI ---------- */
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>ระบบกำลังตรวจสอบ ความถูกต้อง...</p>;

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
      {profile.statusMessage && <p>{profile.statusMessage}</p>}

      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          maxWidth: 400,
          margin: "1rem auto",
          overflowX: "auto",
        }}
      >
        {JSON.stringify({ idToken, userId: profile.userId }, null, 2)}
      </pre>

      <button
        onClick={logout}
        style={{
          padding: "0.5rem 1.5rem",
          borderRadius: 6,
          background: "#06C755", // LINE-green
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </main>
  );
}
