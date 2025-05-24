export const resetMenu = async (userId) => {
  try {
    const response = await fetch("http://localhost:3001/api/resetMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      console.log("Menu reset successfully.");
    } else {
      console.error("Failed to reset menu.");
    }
  } catch (error) {
    console.error("Error during resetMenu:", error);
  }
};
