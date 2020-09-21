const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51GvPqYAMOqITGUqqIPb9f5RN02joj5m5Ay1gcb7XmtToHJeCdoGLDTGPxJbg5c46iPtfTuQNFLXMjkt5rZl8ZcbR00Vi1Fpqvj"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payment/create", async (req, res) => {
	const total = req.query.total;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd",
	});

	res.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

exports.api = functions.https.onRequest(app);
