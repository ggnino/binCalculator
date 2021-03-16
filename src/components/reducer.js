import { getDisplayValues, getResults } from "./myFunctions";

export default function reducer(state, action) {
	// Destructoring state
	const { output, operator, binMode } = state;
	// Variable to store the display values later
	let displayValues;

	/////////////////////////// NUMBERS 0-9 BUTTONS \\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (output === "0" && action.type === "0") {
		return { ...state, output: action.type };
	} else if (action.type === "0")
		return { ...state, output: output + action.type };
	if (output === "0" && action.type === "1") {
		return { ...state, output: action.type };
	} else if (action.type === "1")
		return { ...state, output: output + action.type };
	if (output === "0" && action.type === "2") {
		return { ...state, output: action.type };
	} else if (action.type === "2")
		return { ...state, output: output + action.type };
	if (output === "0" && action.type === "3") {
		return { ...state, output: action.type };
	} else if (action.type === "3")
		return { ...state, output: output + action.type };
	if (output === "0" && action.type === "4") {
		return {
			...state,
			output: action.type,
		};
	} else if (action.type === "4")
		return {
			...state,
			output: output + action.type,
		};
	if (output === "0" && action.type === "5") {
		return {
			...state,
			output: action.type,
		};
	} else if (action.type === "5")
		return {
			...state,
			output: output + action.type,
		};
	if (output === "0" && action.type === "6") {
		return {
			...state,
			output: action.type,
		};
	} else if (action.type === "6")
		return {
			...state,
			output: output + action.type,
		};
	if (output === "0" && action.type === "7") {
		return {
			...state,
			output: action.type,
		};
	} else if (action.type === "7")
		return {
			...state,
			output: output + action.type,
		};
	if (output === "0" && action.type === "8") {
		return {
			...state,
			output: action.type,
		};
	} else if (action.type === "8")
		return {
			...state,
			output: output + action.type,
		};
	if (output === "0" && action.type === "9") {
		return {
			...state,
			output: action.type,
		};
	} else if (action.type === "9")
		return {
			...state,
			output: output + action.type,
		};
	//////////////////////////// SQUARE ROOT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (output === "0" && action.type === "sqrt") {
		return {
			...state,
		};
	} else if (action.type === "sqrt") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	}
	/////////////////////////////// x2 BUTTON \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (output === "0" && action.type === "x2") {
		return {
			...state,
		};
	} else if (action.type === "x2") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	}

	/////////////////////////// Multiplication \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (operator.length > 0 && action.type === "*") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	} else if (action.type === "*")
		return {
			...state,
			operator: action.type,
			output: output + action.type,
		};
	////////////////////////////// DIVISION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	/// NO DIVISION BY ZERO!!!
	if (output === "0" && action.type === "÷") {
		return {
			...state,
		};
	} else if (operator.length > 0 && action.type === "÷") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	} else if (action.type === "÷")
		return {
			...state,
			operator: action.type,
			output: output + action.type,
		};

	////////////////////////////    ADDITION   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (operator.length > 0 && action.type === "+") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	} else if (action.type === "+") {
		return {
			...state,
			operator: action.type,
			output: output + action.type,
		};
	}

	////////////////////////////    SUBTRACTION   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (operator.length > 0 && action.type === "-") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	} else if (action.type === "-") {
		return {
			...state,
			operator: action.type,
			output: output + action.type,
		};
	}
	//////////////////////////////// C BUTTON \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	// Resets the calculator completely
	if (action.type === "c")
		return {
			...state,
			operator: "",
			output: "0",
		};
	////////////////////////////// BIN BUTTON  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (action.type === "bin") {
		return {
			...state,
			binMode: !binMode,
			output: "0",
		};
	}
	////////////////////////////// . BUTTON  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	/// makes sure of no duplicate decimals
	if (output.includes(".") && operator.length === 0 && action.type === ".") {
		return {
			...state,
		};
	} else if (action.type === ".") {
		// makes sure the zero is added when the . button is pressed
		if (!(output[output.length - 1] >= 0)) {
			return {
				...state,
				output: output + "0" + action.type,
			};
		} else
			return {
				...state,
				output: output + action.type,
			};
	}
	/////////////////////////////////// EQUALS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	if (operator && action.type === "=") {
		displayValues = getDisplayValues(output);
		return getResults(displayValues, state, action.type);
	} else if (action.type === "=") {
		return {
			...state,
		};
	}
}
