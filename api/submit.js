export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbyY5Si4NeCNYjIIfkqKtFvhpE9fJqwKBVgQHdVHhuoBCqTA0rwJGLbMSLWDINUWX57j/exec";

    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (err) {
      console.error("❌ Invalid JSON from Google Script:", text);
      return res.status(500).json({ error: "Invalid response from Google Script" });
    }
  } catch (err) {
    console.error("❌ Proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
