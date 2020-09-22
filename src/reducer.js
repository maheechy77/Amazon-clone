import React from "react";

export const initialState = {
	basket: [],
	user: null,
	isLoggedIn: false,
};

export const getTotal = (basket) => {
	let total = 0;
	basket.map((item) => (total = total + item.price.toFixed(2) * item.quantity));
	return Math.round(total);
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			let basketIndex = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let addQuantity = [...state.basket];

			if (basketIndex >= 0) {
				const quantity = addQuantity[basketIndex].quantity;
				addQuantity[basketIndex].quantity = quantity + 1;
			} else {
				let newItem = {};
				newItem = action.item;
				newItem.quantity = 1;
				addQuantity = [...state.basket, newItem];
			}

			return {
				...state,
				basket: [...addQuantity],
			};

		case "REMOVE_FROM_BASKET":
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);

			let newBasket = [...state.basket];
			if (index >= 0) {
				if (newBasket[index].quantity === 1) {
					newBasket.splice(index, 1);
				} else {
					newBasket[index].quantity = newBasket[index].quantity - 1;
				}
			} else {
				alert(`Cannot remove ${action.id} as it is not in the basket`);
			}

			return {
				...state,
				basket: newBasket,
			};

		case "EMPTY_BASKET":
			return {
				...state,
				basket: [],
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "LoggedIn":
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		default:
			return state;
	}
};
