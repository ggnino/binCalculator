import React from "react";
import ReactDom from "react-dom";
import Calculator from "./components/Calculator";
import "./index.css";

function App() {
	return <Calculator />;
}

ReactDom.render(<App />, document.getElementById("root"));
