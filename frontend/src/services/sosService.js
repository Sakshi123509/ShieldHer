export const triggerSOS = async (lat, lng) => {
  const res = await fetch("http://localhost:5000/sos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Srushti",
      lat,
      lng,
    }),
  });

  return res.json();
};