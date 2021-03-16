import React from "react";
//Component
function Screen(props) {
	//Destructoring props
	const { input } = props;
	const { output } = input;

	let padding = "";
	//changing padding depending on output length
	if (output.length > 9) {
		padding = 0;
	}
	//Rendered Component
	return (
		<div id="screen">
			<p style={{ padding: padding }}>{output}</p>
		</div>
	);
}

export default Screen;
