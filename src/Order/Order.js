import React from "react";
import moment from "moment";
import "./Order.css";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
	return (
		<div className="order">
			<h2>Order</h2>
			<p>{moment.unix(order.data.createdAt).format("MMMM Do YYYY, h:mma")}</p>
			<p className="order_id">
				<small>{order.id}</small>
			</p>
			{order.data.basket?.map((item) => (
				<CheckoutProduct
					key={item.id}
					id={item.id}
					image={item.image}
					title={item.title}
					price={item.price}
					rating={item.rating}
					quantity={item.quantity}
					hideButton
				/>
			))}
			<CurrencyFormat
				renderText={(value) => (
					<>
						<h3 className="order_total">Order Total : {value}</h3>
					</>
				)}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"£"}
			/>
		</div>
	);
};

export default Order;
