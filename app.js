const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.static(__dirname + "/uploads"));
app.use(fileUpload({}));

app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/link", require("./routes/link.routes.js"));
app.use("/api/file", require("./routes/file.routes.js"));
app.use("/t", require("./routes/redirect.routes.js"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5002;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
