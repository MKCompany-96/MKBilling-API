export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbyY5Si4NeCNYjIIfkqKtFvhpE9fJqwKBVgQHdVHhuoBCqTA0rwJGLbMSLWDINUWX57j/exec";

    const response = await fetch(googleScriptURL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
