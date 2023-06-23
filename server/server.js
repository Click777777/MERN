require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");

//express app
const app = express();

// middleware
app.use(express.json());

// route path
app.get("/", (req, res) => {
  res.redirect("/api/blogs");
});

app.use("/api/user", userRoute);

app.use("/api/blogs", blogRoute);

// connection db
mongoose
  .connect(process.env.URI)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log("Running Server");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//invalid route (404 error)
app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});
