export default function handler(req, res) {
  if (req.method === "POST") {
    // Here, connect to your backend or payment processor.
    // Example: Validate + simulate success.
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}