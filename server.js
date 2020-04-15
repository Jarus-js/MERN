const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//routes
const items = require("./routes/api/items");
const path = require("path");
//Initialize app
const app = express();

//Connecting to db
mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to db.."))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());

//Routes middlewares
app.use("/api/items", items);

//Serve static assests i.e build folder if it is in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//Defining port & listening to server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
