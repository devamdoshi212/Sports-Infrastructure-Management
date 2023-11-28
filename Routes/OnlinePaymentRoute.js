const express = require("express");
const route = express.Router();

const stripe = require("stripe")(
  "sk_test_51OHNVKSIijB4dZ7nKK4yvDBMBrAfT0BXzCQxRJzGTVnxU3ooA4lz3cd89uvFA52xpk2nq7bXwDdkWYuVm6wiPLjP00ErldxvkT"
);

route.post("/intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = route;
