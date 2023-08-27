const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./connection/mongooseconnection");
const corsMiddleware = require("./middlewares/registrationscors");
const cors = require("cors");
const registrationRoutes = require("./routes/registrationroute");
const loginRoute = require("./routes/loginroute");
const formgetRoute = require("./routes/formgetroute");
const formpostRoute = require("./routes/formpostroute");
const optionsFromBackend = require("./routes/options");
const areaBackend = require("./routes/areaoptions");

const app = express();
const port = 4444;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/options", optionsFromBackend);
app.use("/api/areaoptions", areaBackend);

app.use("/register", registrationRoutes);
app.use("/login", loginRoute);
app.use("/form", formgetRoute);
app.use("/p", formpostRoute);

connectDB().then(() => {
  console.log("connectedDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
