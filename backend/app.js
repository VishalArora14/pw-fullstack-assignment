const express = require("express");
var cors = require('cors');
const path = require("path");
const app = express();

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const routes = require("./routes");
app.use("/api/v1" , routes);

app.use(express.static(path.join(__dirname, "../pwassign/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../pwassign/build/index.html"));
});

module.exports = app