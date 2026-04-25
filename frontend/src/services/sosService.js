export const triggerSOS = async (lat, lng) => {

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found");
    return;
  }

  // token decode karo - userId nikalo
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.id;
  
  console.log("userId from token:", userId);

  const res = await fetch("http://localhost:5000/api/sos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      userId, 
      name: payload.name || "User", 
      lat, 
      lng 
    }),
  });

  return res.json();
};