const dotenv = require("dotenv");
const express = require("express");
const app = express();

// load env variables
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`listening on port ${port}`));
