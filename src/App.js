import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Header from "./Header/Header";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders/Orders";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const promise = loadStripe(
	"pk_test_51GvPqYAMOqITGUqqx3VX1hcUvfeApCMTQSvZAzuMKGtddhkVjB8iN4reO7xLNB8TxUFy02YVtTESSHiXdzqsTTkn00VumuyVkA"
);

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute exact path="/orders">
						<Orders />
					</PrivateRoute>
					<Route path="/checkout">
						<Checkout />
					</Route>
					<PrivateRoute exact path="/payment">
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</PrivateRoute>

					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
