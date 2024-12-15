const shortId = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = shortId();
  try {
    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });
  } catch (error) {
    console.log("ERR:", error);
  }

  return res.json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};
