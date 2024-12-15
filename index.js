const express = require("express");
const { connectToMongoDB } = require("./connect.js");
const URL = require("./models/url.js");
const URLRoute = require("./routes/url.js");
const app = express();
const port = 8001;
connectToMongoDB(
  "mongodb+srv://farhandazzler1999:gLwclrOMlhRpoR07@backenddb.aw3vz5r.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
).then(() => {
  console.log("MongoDB connected");
});
app.use(express.json());
app.use("/url", URLRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
