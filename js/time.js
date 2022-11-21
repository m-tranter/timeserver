"use strict";
const { DateTime } = require("luxon");

const sendTime = (res) => {
  let seconds = Math.round(DateTime.now().toSeconds());
  console.log(`Had a request at ${seconds}.`);
  res.json({ epoch: seconds });
};

module.exports = { sendTime };
