const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const router = express.Router();
const appRoutes = require("./app/routes/api")(router);
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", appRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://localhost:27017/lesson-system",
  (err) => {
    if (err) {
      console.log(`Not connected to the database: ${err}`);
    } else {
      console.log(`Successfully connected to MongoDB`);
    }
  },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/app/views/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
