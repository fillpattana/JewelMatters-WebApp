export const assignUserMenu = async (userId, role) => {
  try {
    const response = await fetch("http://localhost:3001/api/assignMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });

    if (response.ok) {
      console.log("Menu assigned successfully.");
    } else {
      console.error("Failed to assign menu.");
    }
  } catch (error) {
    console.error("Error during assignUserMenu:", error);
  }
};
