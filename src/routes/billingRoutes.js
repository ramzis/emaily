import keys from "../config/keys";
import Stripe from "stripe";
import requireLogin from "../middlewares/requireLogin";

const stripe = Stripe(keys.stripeSecretKey);

const billingRoutes = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};

export default billingRoutes;
