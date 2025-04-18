import axios from "axios";

const API_ENDPOINT =
  "https://5cfc-2401-4900-531d-532a-d3e-6136-59c4-cec4.ngrok-free.app/interpret-command";

export const sendCommand = async (command) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}?command=${encodeURIComponent(command)}`,
      {
        command,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
