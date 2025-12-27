import twilio from "twilio";

let client = null;

const getClient = () => {
  if (!client) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
    const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();
    
    if (!accountSid || !authToken || accountSid === "" || authToken === "") {
      console.warn("Twilio credentials not configured. SMS will be disabled.");
      return null;
    }
    
    try {
      client = twilio(accountSid, authToken);
    } catch (error) {
      console.error("Failed to initialize Twilio client:", error.message);
      return null;
    }
  }
  return client;
};

export default getClient;
