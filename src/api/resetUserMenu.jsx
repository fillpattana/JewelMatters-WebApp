// api/resetUserMenu.jsx
export const resetMenu = async (userId) => {
  try {
    const response = await fetch(
      "https://jewelmatters-backend-cold-fog-2174.fly.dev/api/resetUserMenu",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (response.ok) {
      console.log("Menu reset successfully for", userId);
      return { success: true };
    } else {
      console.error("Failed to reset menu.");
      return { success: false };
    }
  } catch (error) {
    console.error("Error during resetMenu:", error);
    return { success: false };
  }
};
