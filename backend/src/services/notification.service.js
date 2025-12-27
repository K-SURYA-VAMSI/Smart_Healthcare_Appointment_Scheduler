import getClient from "../config/twilio.js";

export const sendSMS = async (to, message) => {
  if (!to) return;

  const client = getClient();
  if (!client) {
    console.log("SMS skipped: Twilio not configured");
    return;
  }

  const phoneNumber = process.env.TWILIO_PHONE_NUMBER?.trim();
  if (!phoneNumber || phoneNumber === "") {
    console.log("SMS skipped: TWILIO_PHONE_NUMBER not configured");
    return;
  }

  try {
    await client.messages.create({
      body: message,
      from: phoneNumber,
      to
    });
    console.log(`SMS sent successfully to ${to}`);
  } catch (error) {
    console.error("SMS failed:", error.message);
    
  }
};
