import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import keys from "./config/keys";
import "./models/User";
import "./models/Survey";
import "./services/passport";
import authRoutes from "./routes/authRoutes";
import billingRoutes from "./routes/billingRoutes";
import surveyRoutes from "./routes/surveyRoutes";

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, error => {
  if (error) console.log(error);
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
  const root = require("path").join(__dirname, "../client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
