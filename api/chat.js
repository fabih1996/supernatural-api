export default async function handler(req, res) {
  console.log("Function called. Body received:", req.body);

  const { messages } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.85,
        messages
      })
    });

    console.log("OpenAI response status:", response.status);

    const data = await response.json();

    if (response.ok) {
      console.log("OpenAI data:", data);
      return res.status(200).json(data);
    } else {
      console.error("OpenAI error data:", data);
      return res.status(500).json({ error: data });
    }

  } catch (error) {
    console.error("Catch error:", error.message);
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}
