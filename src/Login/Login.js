import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email[0], password[0])
			.then((auth) => {
				console.log(auth);
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();
		console.log(email, password);
		auth
			.createUserWithEmailAndPassword(email[0], password[0])
			.then((auth) => {
				console.log(auth);
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
