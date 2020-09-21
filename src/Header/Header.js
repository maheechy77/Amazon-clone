import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

const Header = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const username = user ? user.email.split("@")[0] : "Guest";

	const handleAuth = () => {
		if (user) {
			auth.signOut();
		}
	};
	return (
		<div className="header">
			<Link to="/">
				<img
					className="header_logo"
					alt="header_logo"
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
				/>
			</Link>

			<div className="header_search">
				<input type="text" className="header_searchInput" />
				<SearchIcon className="header_searchIcon" />
			</div>
			<div className="header_nav">
				<Link to={!user && "/login"}>
					<div onClick={handleAuth} className="header_option">
						<span className="header_optionLineOne">Hello {username}</span>

						<span className="header_optionLineTwo">
							{user ? "Sign-Out" : "Sign In"}
						</span>
					</div>
				</Link>
				<Link to="/orders">
					<div className="header_option">
						<span className="header_optionLineOne">Return's</span>
						<span className="header_optionLineTwo">& Order</span>
					</div>
				</Link>
				<div className="header_option">
					<span className="header_optionLineOne">Your</span>
					<span className="header_optionLineTwo">Prime</span>
				</div>
				<Link to="/checkout">
					<div className="header_optionBasket">
						<ShoppingBasketIcon />
						<span className="header_optionLineTwo header_basketCount">
							{basket.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
