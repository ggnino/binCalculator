export const getDisplayValues = (display) => {
	let displayValues = display.split(/(^-\d+)?-/g);
	//The following lines are for cleaning up
	//the displayValues values array for proper operations
	while (displayValues.includes(undefined)) {
		displayValues.splice(displayValues.indexOf(undefined), 1);
	}
	// cleaning...
	if (displayValues[0] === "") {
		displayValues.shift();
		if (display[0].includes("-") && !displayValues[0].includes("-")) {
			if (displayValues.length > 1) {
				displayValues = [`-${displayValues[0]}`, displayValues[1]];
			} else {
				displayValues = [`-${displayValues[0]}`];
			}
		}
	}

	// Still cleaning up to see any operators in the array
	if (displayValues.length > 1) {
		if (displayValues[1].includes("÷")) {
			displayValues = displayValues.concat(...displayValues.pop().split("÷"));
		} else if (displayValues[1].includes("*")) {
			displayValues = displayValues.concat(...displayValues.pop().split("*"));
		} else if (displayValues[1].includes("+")) {
			displayValues = displayValues.concat(...displayValues.pop().split("+"));
		}
	} else {
		displayValues = displayValues.join("").split(/[+|*|÷]/g);
	}

	return displayValues;
};

export const getResults = (displayValues, state, action) => {
	// Destructoring state
	const { operator, output, binMode } = state;
	// Variable to store the results later
	let result;

	// We check to see if any operations to perform beforehand
	// First we check if we have more than two values in displayValues to operate on
	if (displayValues.length > 2) {
		//checking to see if a displayValues value is empty
		//so we dont do no operations on empty values
		//checking first for division operation
		if (operator === "÷") {
			//check to see if binary mode is active for proper conversion
			if (binMode) {
				if (displayValues[displayValues.length - 1] === "")
					result = parseInt(displayValues[displayValues.length - 2], 2);
				else
					result =
						parseInt(displayValues[displayValues.length - 2], 2) /
						parseInt(displayValues[displayValues.length - 1], 2);
				if ((result + "").includes(".")) result = 0;
			} // if not convert numbers normally for proper operations
			else {
				if (displayValues[displayValues.length - 1] === "")
					result = Number(displayValues[displayValues.length - 2]);
				else
					result =
						Number(displayValues[displayValues.length - 2]) /
						Number(displayValues[displayValues.length - 1]);
			}
			displayValues.splice(displayValues.length - 2);
			// decimal check
			if ((result + "").includes(".")) result = result.toFixed(2);
			//Following lines are for checking the output
			//so we can maintain the order of operations
			if (action === "*" || action === "÷") {
				if (binMode) result = result.toString(2);
				if (output.includes("+")) {
					return {
						...state,
						output: displayValues + "+" + result + action,
						operator: action,
					};
				}
				if (output.includes("-")) {
					return {
						...state,
						output: displayValues + "-" + result + action,
						operator: action,
					};
				}
			} //if no multiplication or division apply operator normally
			else {
				if (output.includes("+")) {
					if (binMode) {
						result = parseInt(result, 2) + parseInt(displayValues[0], 2);
						result = result.toString(2);
					} else result += Number(displayValues[0]);
				} else if (output.includes("-")) {
					if (binMode) {
						result = parseInt(result, 2) - parseInt(displayValues[0], 2);
						result = result.toString(2);
					} else result = Number(displayValues[0]) - result;
				}
			}
			//equals button
			if (action === "=") {
				return {
					...state,
					operator: "",
					output: `${result}`,
				};
			} //squared button
			else if (action === "x2") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					result = Math.pow(result, 2);
					result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					result = Math.pow(result, 2);
				}
				return {
					...state,
					operator: "",
					output: `${result}`,
				};
			} // square root button
			else if (action === "sqrt") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					result = Math.sqrt(result);
					if ((result + "").includes(".")) result = 0;
					result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					result = Math.sqrt(result);
					if ((result + "").includes(".")) result = result.toFixed(2);
				}
				return {
					...state,
					operator: "",
					output: `${result}`,
				};
			}

			return {
				...state,
				output: result + action,
				operator: action,
			};
		}
		//checking to see if a displayValues value is empty
		//so we dont do no operations on empty values
		//checking for multiplication operation
		if (operator === "*") {
			//check to see if binary mode is active for proper conversion
			if (binMode) {
				if (displayValues[displayValues.length - 1] === "")
					result = parseInt(displayValues[displayValues.length - 2], 2);
				else
					result =
						parseInt(displayValues[displayValues.length - 2], 2) *
						parseInt(displayValues[displayValues.length - 1], 2);
				if (action) result = result.toString(2);
			} // if not convert numbers normally for proper operations
			else {
				if (displayValues[displayValues.length - 1] === "")
					result = Number(displayValues[displayValues.length - 2]);
				else
					result =
						Number(displayValues[displayValues.length - 2]) *
						Number(displayValues[displayValues.length - 1]);
			}
			displayValues.splice(displayValues.length - 2);

			//Following lines are for checking the output
			//so we can maintain the order of operations
			if (action === "*" || action === "÷") {
				if (binMode) result = result.toString(2);

				if (output.includes("+")) {
					return {
						...state,
						output: displayValues + "+" + result + action,
						operator: action,
					};
				}
				if (output.includes("-")) {
					return {
						...state,
						output: displayValues + "-" + result + action,
						operator: action,
					};
				}
			} //if no multiplication or division apply operator normally
			else {
				if (output.includes("+")) {
					if (binMode) {
						result = parseInt(result, 2) + parseInt(displayValues[0], 2);
						result = result.toString(2);
					} else result += Number(displayValues[0]);
				} else if (output.includes("-")) {
					if (binMode) {
						result = parseInt(displayValues[0], 2) - parseInt(result, 2);
						result = result.toString(2);
					} else result = Number(displayValues[0]) - result;
				}
			}

			// equals button
			if (action === "=") {
				return {
					...state,
					operator: "",
					output: `${result}`,
				};
			} // squared button
			else if (action === "x2") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					result = Math.pow(result, 2);
					result = result.toString(2);
				} else {
					result = Math.pow(result, 2);
				}
				return {
					...state,
					operator: "",
					output: `${result}`,
				};
			} // square root button
			else if (action === "sqrt") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					result = Math.sqrt(result);
					if ((result + "").includes(".")) result = 0;
					result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					result = Math.sqrt(result);
					if ((result + "").includes(".")) result = result.toFixed(2);
				}
				return {
					...state,
					operator: "",
					output: `${result}`,
				};
			}

			return {
				...state,
				operator: action,
				output: result + action,
			};
		}
	}
	// If we only have just two values to operate on
	else if (displayValues.length > 1) {
		//checking to see if a displayValues value is empty
		//so we dont do no operations on empty values
		if (action === "÷" || action === "*") {
			if (operator === "÷") {
				// checking for binary mode is active for proper conversion
				if (binMode) {
					if (displayValues[1] === "") result = parseInt(displayValues[0], 2);
					else
						result =
							parseInt(displayValues[0], 2) / parseInt(displayValues[1], 2);
					if ((result + "").includes(".")) result = 0;
					if (action) result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					if (displayValues[1] === "") result = Number(displayValues[0]);
					else result = Number(displayValues[0]) / Number(displayValues[1]);
				}

				// decimal check
				if ((result + "").includes(".")) result = result.toFixed(2);

				// equals button
				if (action === "=") {
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					output: result + action,
					operator: action,
				};
			}

			// checking for multiplication operation
			if (operator === "*") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					if (displayValues[1] === "") result = parseInt(displayValues[0], 2);
					else
						result =
							parseInt(displayValues[0], 2) * parseInt(displayValues[1], 2);
					if (action) result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					if (displayValues[1] === "") result = Number(displayValues[0]);
					else result = Number(displayValues[0]) * Number(displayValues[1]);
				}

				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			}
			//checking if operator and no secound value
			if (operator === "+" && displayValues[1] === "") {
				if (binMode) {
					result = parseInt(displayValues[0], 2);
					if (action) result = result.toString(2);
				} else result = Number(displayValues[0]);
				// equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			} //checking if operator and no secound value
			if (operator === "-" && displayValues[1] === "") {
				if (binMode) {
					result = parseInt(displayValues[0], 2);
					if (action) result = result.toString(2);
				} else result = Number(displayValues[0]);
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			}

			return {
				...state,
				operator: action,
				output: output + action,
			};
		} else {
			// checking for dividing operation
			if (operator === "÷") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					if (displayValues[1] === "") result = parseInt(displayValues[0], 2);
					else
						result =
							parseInt(displayValues[0], 2) / parseInt(displayValues[1], 2);
					if (action) result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					if (displayValues[1] === "") result = Number(displayValues[0]);
					else result = Number(displayValues[0]) / Number(displayValues[1]);
				}
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} else {
						result = Number(displayValues[0]);
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} // square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Number(displayValues[0]);
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			}
			//checking for multiplication operation
			if (operator === "*") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					if (displayValues[1] === "") result = parseInt(displayValues[0], 2);
					else
						result =
							parseInt(displayValues[0], 2) * parseInt(displayValues[1], 2);
					if (action) result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					if (displayValues[1] === "") result = Number(displayValues[0]);
					else result = Number(displayValues[0]) * Number(displayValues[1]);
				}
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Number(displayValues[0]);
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Number(displayValues[0]);
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			}
			//checking if operator and no secound value
			if (operator === "+" && displayValues[1] === "") {
				if (binMode) {
					result = parseInt(displayValues[0], 2);
					if (action) result = result.toString(2);
				} else result = Number(displayValues[0]);
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			}
			//checking if operator and no secound value
			if (operator === "-" && displayValues[1] === "") {
				if (binMode) {
					result = parseInt(displayValues[0], 2);
					if (action) result = result.toString(2);
				} else result = Number(displayValues[0]);
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					operator: action,
					output: result + action,
				};
			}
			//checking for addition operation
			if (operator === "+") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					result =
						parseInt(displayValues[0], 2) + parseInt(displayValues[1], 2);
					if (action) {
						result = result.toString(2);
					}
				} // if not convert numbers normally for proper operations
				else result = Number(displayValues[0]) + Number(displayValues[1]);
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					output: result + action,
					operator: action,
				};
			}
			//checking for subtraction operation
			if (operator === "-") {
				//check to see if binary mode is active for proper conversion
				if (binMode) {
					result =
						parseInt(displayValues[0], 2) - parseInt(displayValues[1], 2);
					if (action) result = result.toString(2);
				} // if not convert numbers normally for proper operations
				else {
					result = Number(displayValues[0]) - Number(displayValues[1]);
				}
				//equals button
				if (action === "=") {
					if (binMode) result = result.toString(2);
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //squared button
				else if (action === "x2") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.pow(result, 2);
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.pow(result, 2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				} //square root button
				else if (action === "sqrt") {
					//check to see if binary mode is active for proper conversion
					if (binMode) {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = 0;
						result = result.toString(2);
					} // if not convert numbers normally for proper operations
					else {
						result = Math.sqrt(result);
						if ((result + "").includes(".")) result = result.toFixed(2);
					}
					return {
						...state,
						operator: "",
						output: `${result}`,
					};
				}

				return {
					...state,
					output: result + action,
					operator: action,
				};
			}
		}
	}
	// squared button
	if (action === "x2") {
		//check to see if binary mode is active for proper conversion
		if (binMode) {
			result = parseInt(displayValues[0], 2);
			result = Math.pow(result, 2);
			result = result.toString(2);
		} // if not convert numbers normally for proper operations
		else {
			result = Number(displayValues[0]);
			result = Math.pow(result, 2);
		}

		return {
			...state,
			operator: "",
			output: `${result}`,
		};
	}
	// square root button
	if (action === "sqrt") {
		//check to see if binary mode is active for proper conversion
		if (binMode) {
			result = parseInt(displayValues[0], 2);
			result = Math.sqrt(result);
			if ((result + "").includes(".")) result = 0;
			result = result.toString(2);
		} // if not convert numbers normally for proper operations
		else {
			result = Number(displayValues[0]);
			result = Math.sqrt(result);
			if ((result + "").includes(".")) result = result.toFixed(2);
		}
		return {
			...state,
			operator: "",
			output: `${result}`,
		};
	}
};
