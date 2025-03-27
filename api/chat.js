export default async function handler(req, res) {
  if (req.method !== 'POST' || !req.body) {
    return res.status(400).json({ error: "Missing body or wrong method" });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Missing 'messages' in request body" });
  }

  if (!process.env.OPENAI_API_KEY) {
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

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ error: data });
    }

  } catch (error) {
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}
