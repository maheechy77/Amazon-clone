import React from "react";

import "./Home.css";
import Product from "../Product/Product";

const Home = () => {
	return (
		<div className="home">
			<div className="home_container">
				<img
					className="home_image"
					alt="amazon_image"
					src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
				/>
				<div className="home_row">
					<Product
						key="1"
						id="1023"
						title="The Lean StartUp"
						price={19.99}
						rating={5}
						image="https://m.media-amazon.com/images/I/515aKjXOoKL.jpg"
					/>
					<Product
						key="11"
						id="1123"
						title="The Lean StartUp"
						price={19.99}
						rating={3}
						image="https://m.media-amazon.com/images/I/515aKjXOoKL.jpg"
					/>
				</div>
				<div className="home_row">
					<Product
						key="12"
						id="1223"
						title="The Lean StartUp"
						price={19.99}
						rating={3}
						image="https://m.media-amazon.com/images/I/515aKjXOoKL.jpg"
					/>
					<Product
						key="13"
						id="1423"
						title="The Lean StartUp"
						price={19.99}
						rating={5}
						image="https://m.media-amazon.com/images/I/515aKjXOoKL.jpg"
					/>
					<Product
						key="14"
						id="1523"
						title="The Lean StartUp"
						price={19.99}
						rating={4}
						image="https://m.media-amazon.com/images/I/515aKjXOoKL.jpg"
					/>
				</div>
				<div className="home_row">
					<Product
						key="15"
						id="1623"
						title="The Lean StartUp"
						price={19.99}
						rating={3}
						image="https://m.media-amazon.com/images/I/515aKjXOoKL.jpg"
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
