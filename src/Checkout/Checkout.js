import React from "react";

import { useStateValue } from "../StateProvider";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";

const Checkout = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const username = user ? user.email.split("@")[0] : "Guest";

	return (
		<div className="checkout">
			<div className="checkout_left">
				<img
					className="checkout_ad"
					src="https://hiq.co.za/wp-content/uploads/2020/07/26982-H-Q-Website-Banner-1.jpg"
					alt="Checkout"
				/>
				<h2 className="checkout_title">{username}'s Shopping Basket</h2>
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
			<div className="checkout_right">
				<Subtotal />
			</div>
		</div>
	);
};

export default Checkout;
