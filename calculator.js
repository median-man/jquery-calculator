// object to map operator values to symbols
var operatorSymbols = {
  plus: '+',
  minus: '&minus;',
  times: '&times;',
  divide: '&divide;',
  power: '^',

};

// Updates the result display
function updateDisplay(num1, operator, num2, result) {
  $('#first-number').text(num1 || '');
  $('#second-number').text(num2 || '');
  $('#result').text(result || '');

  // display string for the operator
  if (operator) operator = operatorSymbols[operator] || '';
  $('#operator').html(operator || '');
}

// Evaluates expression and returns the result
function evalExpression(num1, num2, operator) {
  var result = null;
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  switch (operator) {
    case 'plus':
      result = num1 + num2;
      break;
    case 'minus':
      result = num1 - num2;
      break;
    case 'times':
      result = num1 * num2;
      break;
    case 'divide':
      result = num1 / num2;
      break;
    case 'power':
      result = Math.pow(num1, num2);
      break;
    default:
      console.log('Invalid operator:', operator);
  }
  return result;
}

$(document).ready(function () {

  var resetNext = false;
  var firstNum = '';
  var secondNum = '';
  var operator = '';
  var result = '';

  function resetValues() {
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    resetNext = false;
  }

  // when calculator is clicked
  $('button').on('click', function () {
    var $btn = $(this);

    // reset values if resetNext flag is set
    if (resetNext) resetValues();

    // if the button clicked is clear, reset calculator
    if ($btn.hasClass('clear')) {
      resetValues();

    // if the button clicked is equals and there are two numbers and an operator
    } else if ($btn.hasClass('equal') && firstNum && secondNum) {
        // ... evaluate the expression
        result = evalExpression(firstNum, secondNum, operator).toString();

        // set resetNext flag to clear values on next button click
        resetNext = true;

    // if the button clicked is an operator and there is a first number but no second number
    } else if ($btn.hasClass('operator') && firstNum && !secondNum) {
      // ... set the operator
      operator = $btn.val();

    // if the button clicked is a number and there is no operator
    } else if ($btn.hasClass('number') && !operator){
      // ... set or update the first number
      firstNum += $btn.val();
    }

    // if the button clicked is a number and the operator is set
    else if ($btn.hasClass('number')) {
      // ... set or update the second number
      secondNum += $btn.val();
    }

    // update the result display  
    updateDisplay(firstNum, operator, secondNum, result);
  });
});
