const express = require("express");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const data = require("./data/notes");

const app = express();
connectDB();

app.get("/api/note", (req, res) => {
  res.json(data);
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is started on PORT ${PORT}`));
