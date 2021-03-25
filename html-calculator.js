// ----- *** config & initial settings *** ------

const MAX_DECIMAL_NUMBERS = 2
let auxNumber = ''
let auxDecimalNumber = ''
let firstNumber = null
let secondNumber = null
let hasDecimal = false
let operator = null
let lastResult = null
let lastResultIsPressed = false
let operatorIsPressed = false

// ----- *** getting elements *** ------

const getElementByName = (name) =>
	document.querySelector('[name =' + name + ']')

const DISPLAY = document.getElementById('display')
const LAST_RESULT_BUTTON = getElementByName('LAST_RESULT_BUTTON')
const DECIMAL_BUTTON = getElementByName('DECIMAL_BUTTON')
const RESULT_BUTTON = getElementByName('RESULT_BUTTON')
const CLEAN_ALL_BUTTON = getElementByName('CLEAN_ALL_BUTTON')
OPERATOR_BUTTONS = []
NUMBER_BUTTONS = []

const OPERATOR_BUTTON_NAMES = [
	'DIVISION_BUTTON',
	'MULTIPLICATION_BUTTON',
	'ADD_BUTTON',
	'SUBTRACT_BUTTON'
]

OPERATOR_BUTTON_NAMES.forEach((buttonName) => {
	OPERATOR_BUTTONS.push(getElementByName(buttonName))
})

for (let buttonNumber = 0; buttonNumber < 10; buttonNumber++) {
	NUMBER_BUTTONS.push(getElementByName('BUTTON_' + buttonNumber))
}

// ----- *** adding listeners to buttons *** ------

OPERATOR_BUTTONS.forEach((button) => {
	button.addEventListener('click', (e) => {
		setPressButton(getElementByName(button.name), true)
		setOperator(button.value)
	})
})

NUMBER_BUTTONS.forEach((button) => {
	button.addEventListener('click', (e) => {
		setNumber(button.value)
	})
})

LAST_RESULT_BUTTON.addEventListener('click', () => getLastResult())
DECIMAL_BUTTON.addEventListener('click', () => setDecimal())
RESULT_BUTTON.addEventListener('click', () => calculateResult())
CLEAN_ALL_BUTTON.addEventListener('click', () => cleanAll(true))

// ----- *** display functions *** ------
const show = (text) => (DISPLAY.innerHTML = text)

const setPressButton = (element, isPressed) => {
	if (isPressed) {
		element.classList.add('pressed')
	} else {
		element.classList.remove('pressed')
	}
}

const setUnPressAllButtons = () => {
	;[...OPERATOR_BUTTONS, LAST_RESULT_BUTTON, DECIMAL_BUTTON].forEach((button) =>
		button.classList.remove('pressed')
	)
}

const cleanAll = (includeDisplay) => {
	firstNumber = null
	secondNumber = null
	auxNumber = ''
	auxDecimalNumber = ''
	hasDecimal = false
	lastResultIsPressed = false
	operatorIsPressed = false
	operator = null
	setUnPressAllButtons()

	if (includeDisplay) {
		DISPLAY.innerHTML = '0'
	}
}

// ----- *** data entry functions *** ------
const setNumber = (numb) => {
	operatorIsPressed = false
	if (hasDecimal === false) {
		auxNumber = auxNumber.toString() + numb.toString()
		show(auxNumber)
	} else {
		if (auxNumber === '') {
			auxNumber = '0'
		}
		if (auxDecimalNumber.length < MAX_DECIMAL_NUMBERS) {
			auxDecimalNumber = auxDecimalNumber.toString() + numb.toString()
		}

		show(auxNumber + '.' + auxDecimalNumber)
	}
}

const setOperator = (op) => {
	if (!firstNumber && !operatorIsPressed) {
		if (auxNumber !== '' || auxDecimalNumber !== '') {
			firstNumber =
				parseInt(auxNumber) +
				parseFloat(auxDecimalNumber / 10 ** auxDecimalNumber.length)
		} else {
			if (lastResult !== null) {
				firstNumber = lastResult
			} else {
				firstNumber = 0
			}
		}
		auxNumber = ''
		auxDecimalNumber = ''
		hasDecimal = false
		operator = op
	}

	if (firstNumber && !operatorIsPressed) {
		operator = op
	}
}

const setDecimal = () => {
	hasDecimal = true
	show(auxNumber + '.')
}

// ----- *** calc functions *** ------
const calculateResult = () => {
	if (!operatorIsPressed) {
		if (auxNumber !== '' || auxDecimalNumber !== '') {
			secondNumber =
				parseInt(auxNumber) +
				parseFloat(auxDecimalNumber / 10 ** auxDecimalNumber.length)
		} else {
			if (lastResult !== null) {
				secondNumber = lastResult
			} else {
				secondNumber = 0
			}
		}
		auxNumber = ''
		auxDecimalNumber = ''
		hasDecimal = false

		if (firstNumber != null && secondNumber !== null && operator != null) {
			switch (operator) {
				case '/':
					if (secondNumber === 0) {
						result = 'err'
					} else {
						result = firstNumber / secondNumber
					}
					break
				case 'x':
					result = firstNumber * secondNumber
					break
				case '+':
					result = firstNumber + secondNumber
					break
				case '-':
					result = firstNumber - secondNumber
					break
				default:
					break
			}

			cleanAll()
			if (isNaN(result)) {
				firstNumber = null
				lastResult = null
				show(result)
			} else {
				if (!Number.isInteger(result)) {
					result = parseFloat(result.toFixed(2))
				}
				lastResult = result
				show(result)
			}
		}
	}
}

const getLastResult = () => {
	if (!lastResultIsPressed) {
		setPressButton(LAST_RESULT_BUTTON, true)
		if (lastResult !== null) {
			if (!firstNumber) {
				firstNumber = lastResult
			} else {
				secondNumber = lastResult
			}
		} else {
			if (!firstNumber) {
				firstNumber = 0
			} else {
				secondNumber = 0
			}
		}
		show(lastResult)
		lastResultIsPressed = true
	}
}
