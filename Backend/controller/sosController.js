import client from "../config/twilio.js";
import Profile from "../models/Profile.js";

const formatNumber = (num) => {
    if (!num) return null;
    num = num.replace(/\D/g, "");
    if (num.length === 10) return "+91" + num;
    if (num.length === 12 && num.startsWith("91")) return "+" + num;
    return null;
};

export const sendSOS = async (req, res) => {
    const { userId, name, lat, lng } = req.body;
    
    console.log("SEARCHING PROFILE WITH USERID:", userId);
    // ❌ ye line hatao - console.log("PROFILE FOUND:", user);

    if (!userId || !lat || !lng) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    const locationLink = `https://maps.google.com/?q=${lat},${lng}`;
    const senderName = name || "Someone";

    console.log("REQ BODY:", req.body);
    console.log("TWILIO NUMBER:", process.env.TWILIO_NUMBER);

    try {
        const user = await Profile.findOne({ userId: userId });
        
        console.log("PROFILE FOUND:", user); // ✅ ab yahan hai, sahi jagah

        if (!user || !user.emergencyContacts?.length) {
            return res.status(404).json({ msg: "No contacts found" });
        }

        for (let contact of user.emergencyContacts) {
            const number = formatNumber(contact.phone);
            if (!number) continue;

            console.log("Sending to:", contact.name, number);

            try {
                await client.messages.create({
                    body: `🚨 SOS ALERT! ${senderName} needs help! 📍 ${locationLink}`,
                    from: process.env.TWILIO_NUMBER,
                    to: number,
                });

                await client.calls.create({
                    twiml: `<Response><Say voice="alice">Emergency alert. ${senderName} is in danger. Please check your message for location.</Say></Response>`,
                    from: process.env.TWILIO_NUMBER,
                    to: number,
                });

                console.log(`✅ SOS sent to ${contact.name}`);
            } catch (err) {
                console.log(`⚠️ Skipped ${contact.name}: ${err.message}`);
            }

            await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        res.json({ msg: "SOS sent to all contacts 🚨" });
    } catch (err) {
        console.error("SOS ERROR:", err.message);
        res.status(500).json({ msg: "Error sending SOS" });
    }
};