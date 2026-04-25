// import client from "../config/twilio.js";
// import Profile from "../models/Profile.js";

// const formatNumber = (num) => {
//     if (!num) return null;
//     num = num.replace(/\D/g, "");
//     if (num.length === 10) return "+91" + num;
//     if (num.length === 12 && num.startsWith("91")) return "+" + num;
//     return null;
// };

// export const sendSOS = async (req, res) => {
//     const { userId, name, lat, lng } = req.body;

//     console.log("SEARCHING PROFILE WITH USERID:", userId);
//     // ❌ ye line hatao - console.log("PROFILE FOUND:", user);

//     if (!userId || !lat || !lng) {
//         return res.status(400).json({ msg: "Missing required fields" });
//     }

//     const locationLink = `https://maps.google.com/?q=${lat},${lng}`;
//     const senderName = name || "Someone";

//     console.log("REQ BODY:", req.body);
//     console.log("TWILIO NUMBER:", process.env.TWILIO_NUMBER);

//     try {
//         const user = await Profile.findOne({ userId: userId });

//         console.log("PROFILE FOUND:", user); //  ab yahan hai, sahi jagah

//         if (!user || !user.emergencyContacts?.length) {
//             return res.status(404).json({ msg: "No contacts found" });
//         }

//         for (let contact of user.emergencyContacts) {
//             const number = formatNumber(contact.phone);
//             if (!number) continue;

//             console.log("Sending to:", contact.name, number);

//             try {
//                 await client.messages.create({
//                     body: `🚨 SOS ALERT! ${senderName} needs help! 📍 ${locationLink}`,
//                     from: process.env.TWILIO_NUMBER,
//                     to: number,
//                 });

//                 await client.calls.create({
//                     twiml: `<Response><Say voice="alice">Emergency alert. ${senderName} is in danger. Please check your message for location.</Say></Response>`,
//                     from: process.env.TWILIO_NUMBER,
//                     to: number,
//                 });

//                 console.log(`✅ SOS sent to ${contact.name}`);
//             } catch (err) {
//                 console.log(`⚠️ Skipped ${contact.name}: ${err.message}`);
//             }

//             await new Promise((resolve) => setTimeout(resolve, 1500));
//         }

//         res.json({ msg: "SOS sent to all contacts 🚨" });
//     } catch (err) {
//         console.error("SOS ERROR:", err.message);
//         res.status(500).json({ msg: "Error sending SOS" });
//     }
// };

//RECENT CODE - DO NOT SUGGEST DELETED CODE

// import client from "../config/twilio.js";
// import Profile from "../models/Profile.js";

// const formatNumber = (num) => {
//     if (!num) return null;

//     let n = String(num).replace(/\D/g, "");

//     if (n.length === 10) return "+91" + n;
//     if (n.length === 12 && n.startsWith("91")) return "+" + n;
//     if (n.length === 11 && n.startsWith("0")) return "+91" + n.slice(1);

//     return null;
// };
// export const sendSOS = async (req, res) => {
//     const { userId, lat, lng } = req.body;

//     console.log("=== SOS TRIGGERED ===");

//     if (!userId || !lat || !lng) {
//         return res.status(400).json({ msg: "Missing required fields" });
//     }

//     if (!process.env.TWILIO_NUMBER) {
//         return res.status(500).json({ msg: "TWILIO number missing in .env" });
//     }

//     const locationLink = `https://maps.google.com/?q=${lat},${lng}`;

//     try {
//         const user = await Profile.findOne({ userId });

//         if (!user) return res.status(404).json({ msg: "Profile not found" });
//         if (!user.emergencyContacts?.length)
//             return res.status(404).json({ msg: "No emergency contacts found" });

//         // ✅ FINAL senderName (from DB only)
//         const senderName =
//             [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "User";

//         console.log("Sender:", senderName);

//         const results = await Promise.allSettled(
//             user.emergencyContacts.map(async (contact) => {
//                 const number = formatNumber(contact.phone);
//                 if (!number) throw new Error("Invalid number");

//                 await client.messages.create({
//                     from: process.env.TWILIO_NUMBER,
//                     to: number,
//                     body:
//                         `🚨 EMERGENCY ALERT 🚨\n\n` +
//                         `${senderName} is in danger.\n\n` +
//                         `She needs Your help urgently!\n\n` +
//                         `📍 Please check the location here:\n${locationLink}`,
//                 });

//                 await client.calls.create({
//                     from: process.env.TWILIO_NUMBER,
//                     to: number,
//                     twiml: `<Response><Say voice="alice">Hello, This is an emergency call. ${senderName} is in danger and needs your help immediately. Her live location has been sent to your phone. Please respond her as soon as possible.  </Say></Response>`,
//                 });

//                 return { name: contact.name, phone: contact.phone };
//             })
//         );

//         const success = results.filter(r => r.status === "fulfilled").map(r => r.value);
//         const failed = results.filter(r => r.status === "rejected");

//         return res.json({
//             msg: `SOS sent to ${success.length} contacts`,
//             contacts: success,
//             success,
//             failed: failed.length
//         });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Server error", error: err.message });
//     }
// };




import client from "../config/twilio.js";
import Profile from "../models/Profile.js";

const formatNumber = (num) => {
    if (!num) return null;

    // Remove all non-digit characters EXCEPT leading +
    let raw = String(num).trim();

    // Already in E.164 format: +91XXXXXXXXXX
    if (raw.startsWith("+")) {
        const digits = raw.replace(/\D/g, "");
        if (digits.length >= 10) return "+" + digits;
        return null;
    }

    // Strip all non-digits
    let n = raw.replace(/\D/g, "");

    if (n.length === 10) return "+91" + n;                          // 9876543210
    if (n.length === 11 && n.startsWith("0")) return "+91" + n.slice(1); // 09876543210
    if (n.length === 12 && n.startsWith("91")) return "+" + n;     // 919876543210
    if (n.length === 13 && n.startsWith("091")) return "+" + n.slice(1); // 0919876543210

    return null;
};

export const sendSOS = async (req, res) => {
    const { userId, lat, lng } = req.body;

    console.log("=== SOS TRIGGERED ===");
    console.log("userId:", userId, "lat:", lat, "lng:", lng);

    if (!userId || !lat || !lng) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    if (!process.env.TWILIO_NUMBER) {
        return res.status(500).json({ msg: "TWILIO number missing in .env" });
    }

    const locationLink = `https://maps.google.com/?q=${lat},${lng}`;

    try {
        const user = await Profile.findOne({ userId });

        if (!user) return res.status(404).json({ msg: "Profile not found" });
        if (!user.emergencyContacts?.length)
            return res.status(404).json({ msg: "No emergency contacts found" });

        const senderName =
            [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "User";

        console.log("Sender:", senderName);
        console.log("Raw contacts from DB:", JSON.stringify(user.emergencyContacts));

        const results = await Promise.allSettled(
            user.emergencyContacts.map(async (contact) => {
                const rawPhone = contact.phone;
                const number = formatNumber(rawPhone);

                console.log(`Contact: ${contact.name} | Raw: ${rawPhone} | Formatted: ${number}`);

                if (!number) throw new Error(`Invalid number for ${contact.name}: "${rawPhone}"`);

                await client.messages.create({
                    from: process.env.TWILIO_NUMBER,
                    to: number,
                    body:
                        `🚨 EMERGENCY ALERT 🚨\n\n` +
                        `${senderName} is in danger.\n\n` +
                        `She needs your help urgently!\n\n` +
                        `📍 Please check the location here:\n${locationLink}`,
                });

                await client.calls.create({
                    from: process.env.TWILIO_NUMBER,
                    to: number,
                    twiml: `<Response><Say voice="alice">Hello, This is an emergency call. ${senderName} is in danger and needs your help immediately. Her live location has been sent to your phone. Please respond as soon as possible.</Say></Response>`,
                });

                console.log(`✅ SOS sent to ${contact.name} (${number})`);
                return { name: contact.name, phone: contact.phone, relation: contact.relation };
            })
        );

        const success = results
            .filter(r => r.status === "fulfilled")
            .map(r => r.value);

        const failed = results
            .filter(r => r.status === "rejected")
            .map(r => r.reason?.message || "Unknown error");

        console.log("✅ Success:", success.length, "❌ Failed:", failed.length);
        if (failed.length > 0) console.log("Failed reasons:", failed);

        return res.json({
            msg: `SOS sent to ${success.length} contacts`,
            contacts: success,
            success,
            failed: failed.length,
            failedReasons: failed,
        });

    } catch (err) {
        console.error("SOS ERROR:", err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};