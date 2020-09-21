import { Link } from "@material-ui/core";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { getTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import axios from "../axios";
import { db } from "../firebase";

import "./Payment.css";
import { useHistory } from "react-router-dom";

const Payment = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const stripe = useStripe();
	const elements = useElements();
	const history = useHistory();

	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [processing, setProcessing] = useState("");
	const [succeeded, setSucceeded] = useState(false);
	const [clientSecret, setClientSecret] = useState("");

	const totalItems = basket.reduce(
		(totalItems, item) => (totalItems += item.quantity),
		0
	);

	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payment/create?total=${getTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						createdAt: paymentIntent.created,
					});
				setSucceeded(true);
				setError(null);
				setProcessing(false);
				dispatch({
					type: "EMPTY_BASKET",
				});

				history.replace("/orders");
			});
	};
	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	return (
		<div className="payment">
			<div className="payment_container">
				<h1>
					Check out(<Link to="/checkout">{basket && totalItems} items</Link>)
				</h1>
				<div className="payment_section">
					<div className="payment_title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment_address">
						<p>{user?.email}</p>
						<p>123 react lane</p>
						<p>LA, CA</p>
					</div>
				</div>
				<div className="payment_section">
					<div className="payment_title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment_items">
						{basket.map((item) => (
							<CheckoutProduct
								key={item.id}
								id={item.id}
								image={item.image}
								title={item.title}
								price={item.price}
								rating={item.rating}
								quantity={item.quantity}
							/>
						))}
					</div>
				</div>

				<div className="payment_section">
					<div className="payment_title">
						<h3>Payment method</h3>
					</div>
					<div className="payment_details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment_priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<>
											<h3>Order Total : {value}</h3>
										</>
									)}
									decimalScale={2}
									value={getTotal(basket).toFixed(2)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"£"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
								{error && <div>{error}</div>}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
