// react-contexts/RoleContexts.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { initLiff, liff } from "../liff";
import { assignUserMenu } from "../api/assignUserMenu";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });
  const [loading, setLoading] = useState(true);

  const liffId = "2007432322-Lamoy70b";

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        await initLiff(liffId);

        if (!liff.isLoggedIn()) {
          liff.login(); // redirect to LINE login
          return;
        }

        const userProfile = await liff.getProfile();
        setProfile(userProfile);
        localStorage.setItem("profile", JSON.stringify(userProfile));

        const res = await fetch(
          `https://jewelmatters-backend-cold-fog-2174.fly.dev/api/getUserRole/${userProfile.userId}`
        );
        const { role } = await res.json();

        setRole(role);
        localStorage.setItem("role", role);
        await assignUserMenu(userProfile.userId, role);
      } catch (err) {
        console.error("Error fetching user role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole, profile, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
