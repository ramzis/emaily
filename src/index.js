import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import keys from "./config/keys";
import authRoutes from "./routes/authRoutes";
import billingRoutes from "./routes/billingRoutes";
import "./models/User";
import "./services/passport";

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
