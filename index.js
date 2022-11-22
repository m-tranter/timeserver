// Technical task
// Mark Tranter

// Modules
const express = require("express");
const cors = require("cors");
const promBundle = require("express-prom-bundle");
const { sendTime } = require("./js/time");
const dotenv = require("dotenv");
dotenv.config();

// Set some variables
const port = process.env.PORT || 5000;
const auth = process.env.AUTH;

// Start the server.
const app = express();
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

// Start Prometheus
const metrics = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    project_name: "Time Server",
    project_type: "React Tech Task",
  },
  promClient: {
    collectDefaultMetrics: {},
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  if (req.headers.authorization !== auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  next();
});
app.use(metrics);

// Routes
app.get("/time/", (_, res) => {
  sendTime(res);
});

app.get("/metrics/", (_, res) => {
  res.json();
});

// Anything else.
app.all("*", function (_, res) {
  res.status(404).send("Page not found.");
});
