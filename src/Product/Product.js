import React from "react";
import { useStateValue } from "../StateProvider";

import "./Product.css";

const Product = ({ id, title, image, price, rating }) => {
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			id,
			item: {
				id,
				title,
				image,
				price,
				rating,
			},
		});
	};
	return (
		<div className="product">
			<div className="product_info">
				<p>{title}</p>
				<p className="product_price">
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className="product_rating">
					{Array(rating)
						.fill()
						.map(() => (
							<p>⭐</p>
						))}
				</div>
			</div>
			<img src={image} alt="product_image" />
			<button onClick={() => addToBasket()}>Add to Busket</button>
		</div>
	);
};

export default Product;
