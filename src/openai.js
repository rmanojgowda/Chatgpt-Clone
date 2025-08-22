export async function sendMsgToOpenAI(message) {
  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("Frontend Error:", error);
    return "Error contacting backend.";
  }
}
