import React, { useReducer, useEffect, useState } from "react";
import Screen from "./Screen"; //Screen Component
import reducer from "./reducer"; //reducer
import img from "../imgs/cal.jpg"; //background img
import img2 from "../imgs/bin.jpeg"; //background img for binary mode

//Component
const Buttons = () => {
	//default state
	const defaultState = {
		operator: "",
		output: "0",
		binMode: false,
	};

	//useState hook for the initial styles to change later
	const [styles, setStyles] = useState({
		top: "",
		position: "",
		boxShadow: "",
		color: "",
		backgroundColor: "",
		transform: "",
	});

	//useReducer hook which we pass in the reducer and the state
	const [state, dispatch] = useReducer(reducer, defaultState);

	//useEffect hook change styling based on if binary mode is activated or not
	useEffect(() => {
		if (state.binMode === true) {
			setStyles({
				top: "10px",
				position: "relative",
				boxShadow: "none",
				color: "white",
				backgroundColor: "rebeccapurple",
				transform: "none",
			});
			window.document.body.style.background = `url(${img2}) center/cover fixed`;
		} else {
			setStyles({
				top: "",
				position: "",
				boxShadow: "",
				color: "",
				backgroundColor: "",
				transform: "",
			});
			window.document.body.style.background = `url(${img}) center/cover fixed`;
		}
	}, [state.binMode]);

	//function for when to fire off certain actions to the reducer
	function fire(x) {
		let regex = /[2-9.]/g;
		if (state.binMode && x === "x2") return () => dispatch({ type: x });
		else if (state.binMode && regex.test(x)) return () => -1;
		return () => dispatch({ type: x });
	}
	//Rendered Component
	return (
		<>
			<Screen input={state} />
			<div id="buttons">
				<button className="btn" value="1" onClick={fire("1")}>
					1
				</button>
				<button
					className="btn"
					style={styles}
					id="me"
					value="2"
					onClick={fire("2")}
				>
					2
				</button>
				<button className="btn" style={styles} value="3" onClick={fire("3")}>
					3
				</button>
				<button className="btn" value="c" id="c" onClick={fire("c")}>
					C
				</button>
				<button
					className="btn"
					style={styles}
					value="bin"
					onClick={fire("bin")}
				>
					Bin
				</button>
				<button className="btn" style={styles} value="4" onClick={fire("4")}>
					4
				</button>
				<button className="btn" style={styles} value="5" onClick={fire("5")}>
					5
				</button>
				<button className="btn" style={styles} value="6" onClick={fire("6")}>
					6
				</button>
				<button className="btn " value="+" onClick={fire("+")}>
					+
				</button>
				<button className="btn" value="-" onClick={fire("-")}>
					-
				</button>
				<button className="btn" style={styles} value="7" onClick={fire("7")}>
					7
				</button>
				<button className="btn" style={styles} value="8" onClick={fire("8")}>
					8
				</button>
				<button className="btn" style={styles} value="9" onClick={fire("9")}>
					9
				</button>
				<button className="btn" value="÷" onClick={fire("÷")}>
					&divide;
				</button>
				<button className="btn" value="x2" onClick={fire("x2")}>
					x<sup>2</sup>
				</button>
				<button className="btn" style={styles} value="." onClick={fire(".")}>
					.
				</button>
				<button className="btn" value="0" onClick={fire("0")}>
					0
				</button>
				<button className="btn" value="=" id="eq" onClick={fire("=")}>
					=
				</button>
				<button className="btn" value="*" onClick={fire("*")}>
					*
				</button>
				<button className="btn" value="sqrt" onClick={fire("sqrt")}>
					&radic;
				</button>
			</div>
		</>
	);
};

export default Buttons;
