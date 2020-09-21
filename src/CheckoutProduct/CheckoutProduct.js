import React from "react";
import { useStateValue } from "../StateProvider";

import "./CheckoutProduct.css";

const CheckoutProduct = ({
	id,
	image,
	title,
	price,
	rating,
	quantity,
	hideButton,
}) => {
	const [{ basket }, dispatch] = useStateValue();

	const removeItem = () => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id,
		});
	};
	return (
		<div className="checkoutProduct">
			<img className="checkoutProduct_image" src={image} alt={title} />
			<div className="checkoutProduct_info">
				<p className="checkoutProduct_title">{title}</p>
				<p>Quantity : {quantity}</p>
				<p className="checkoutProduct_price">
					<small>$</small>
					<strong>{price}</strong>
				</p>

				<div className="checkoutProduct_rating">
					{Array(rating)
						.fill()
						.map(() => (
							<p>⭐</p>
						))}
				</div>
				{!hideButton && (
					<button onClick={removeItem}>Remove from basket</button>
				)}
			</div>
		</div>
	);
};

export default CheckoutProduct;
