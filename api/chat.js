export default async function handler(req, res) {
  const { messages } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
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

    const data = await openaiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error contacting OpenAI" });
  }
}