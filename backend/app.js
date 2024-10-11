const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./utils/db.js");

const userRoutes = require("./routes/user.routes.js");
const companyRoutes = require("./routes/company.route.js");
const jobRoutes = require("./routes/job.route.js");
const applicationRoutes = require("./routes/application.route.js");

dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//api's
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
