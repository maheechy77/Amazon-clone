import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "../StateProvider";

const PrivateRoute = ({ children, ...rest }) => {
	const [{ isLoggedIn }, dispatch] = useStateValue();
	console.log(isLoggedIn);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLoggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
