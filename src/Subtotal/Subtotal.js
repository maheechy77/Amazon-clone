import React from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { getTotal } from "../reducer";

import { useStateValue } from "../StateProvider";
import "./Subtotal.css";

const Subtotal = () => {
	const history = useHistory();
	const [{ basket }, dispatch] = useStateValue();
	const totalItems = basket.reduce(
		(totalItems, item) => (totalItems += item.quantity),
		0
	);

	return (
		<div className="subtotal">
			<h2>Sub total</h2>
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal({totalItems} item/s):{" "}
							<strong>{getTotal(basket).toFixed(2)}</strong>
						</p>
						<small className="subtotal_gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getTotal(basket).toFixed(2)}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"£"}
			/>
			<button onClick={(e) => history.push("/payment")}>
				Proceed to Checkout
			</button>
		</div>
	);
};

export default Subtotal;
