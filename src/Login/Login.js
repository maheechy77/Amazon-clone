import React, { useState } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";

function Login() {
	const [{}, dispatch] = useStateValue();
	let history = useHistory();
	let location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");

	let { from } = location.state || { from: { pathname: "/" } };

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email[0], password[0])
			.then((auth) => {
				if (auth) {
					dispatch({
						type: "LoggedIn",
						isLoggedIn: true,
					});
					history.replace(from);
				}
			})
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email[0], password[0])
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login_container">
				<h1>Sign In</h1>
				<form action="">
					<h5>E-mail</h5>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail([e.target.value])}
					/>
					<h5>Password</h5>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassowrd([e.target.value])}
					/>
					<button type="submit" onClick={signIn} className="login_signinButton">
						Sign In
					</button>
				</form>
				<p>
					By signing-in you agree to the Fake Amazon Clone Conditions of Use and
					Sale.Please see our Privacy Notice, our cookies and our interest-based
					ad notice
				</p>
				<button
					type="submit"
					onClick={register}
					className="login_registerButton"
				>
					Create Your Amazon Account
				</button>
			</div>
		</div>
	);
}

export default Login;
