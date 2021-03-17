const DISPLAY = document.getElementById('display')

let firstNumber = null
let auxFirstNumber = ''
let auxDecimalNumber = ''
let auxFirstDecimal = false
let auxSecondDecimal = false
let secondNumber = null
let auxSecondNumber = ''
let operator = null
let lastResult = null

const show = (text) => (DISPLAY.innerHTML = text)

const getNumber = (numb) => {
	//debugger
	if (operator === null) {
		if (auxFirstDecimal === true) {
			auxDecimalNumber = auxDecimalNumber.toString() + numb.toString()
			show(auxFirstNumber + '.' + auxDecimalNumber)
		} else {
			auxFirstNumber = auxFirstNumber.toString() + numb.toString()
			show(auxFirstNumber)
		}
	} else {
		if (auxSecondDecimal === true) {
			auxDecimalNumber = auxDecimalNumber.toString() + numb.toString()
			show(
				firstNumber +
					' ' +
					operator +
					' ' +
					auxSecondNumber +
					',' +
					auxDecimalNumber
			)
		} else {
			auxSecondNumber = auxSecondNumber.toString() + numb.toString()
			show(firstNumber + ' ' + operator + ' ' + auxSecondNumber)
		}
	}
}

const getOperator = (op) => {
	if (auxFirstNumber === null && firstNumber === null && lastResult === null) {
		firstNumber = 0
	} else if (
		auxFirstNumber === '' &&
		firstNumber === null &&
		lastResult !== null
	) {
		firstNumber = lastResult
	} else {
		firstNumber = parseInt(auxFirstNumber) + parseFloat(auxDecimalNumber / 10)
		auxFirstDecimal = false
		auxDecimalNumber = ''
	}

	operator = op

	show(firstNumber + ' ' + operator)
}

const getDecimal = () => {
	if (auxFirstDecimal === false || auxSecondDecimal === false) {
		if (operator === null) {
			if (auxFirstNumber === null && firstNumber === null) {
				auxFirstNumber = 0
			}
			show(auxFirstNumber + ',')
			auxFirstDecimal = true
		} else {
			if (auxSecondNumber === null && secondNumber === null) {
				auxSecondNumber = 0
			}

			show(firstNumber + ' ' + operator + ' ' + auxSecondNumber + ',')
			auxSecondDecimal = true
		}
	}
}

const cleanAll = (includeDisplay) => {
	firstNumber = null
	secondNumber = null
	auxFirstNumber = ''
	auxSecondNumber = ''
	auxDecimalNumber = ''
	auxFirstDecimal = false
	auxSecondDecimal = false

	operator = null
	if (includeDisplay) {
		DISPLAY.innerHTML = '0'
	}
}

const getResult = () => {
	secondNumber = parseInt(auxSecondNumber) + parseFloat(auxDecimalNumber / 10)
	auxSecondDecimal = false
	auxDecimalNumber = ''
	if (firstNumber != null && (secondNumber !== null) & (operator != null)) {
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

const getLastResult = () => {
	if (lastResult !== null) {
		getNumber(lastResult)
	}
}
