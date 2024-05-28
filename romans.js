/* global gtag */

// Constants for the literals
var INVALID_ROMAN = 'Please enter a valid roman';
var INVALID_INTEGER = 'Please enter a valid integer';
var OUT_OF_RANGE = 'Out of range (1-3999)';

function init() {
  var modeCheckbox = document.querySelector('input[type=\'checkbox\']');
  var header = document.querySelector('h1');
  var convertButton = document.querySelector('.convert-button');
  var outputArea = document.querySelector('.convert-output');
  var inputArea = document.querySelector('input[type=\'text\']');

  modeCheckbox.addEventListener('change', function(e) {
    header.innerHTML = getModeTitle(e.target.checked);
  });

  function getModeTitle(integerToRoman) {
    return integerToRoman ? 'Integer To Roman' : 'Roman To Integer';
  }

  convertButton.addEventListener('click', function() {
    var inputValue = inputArea.value;
    var conversion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
    if (conversion.result) {
      outputArea.innerHTML = conversion.value;
      // Enviar evento a Google Analytics
      gtag('event', 'conversion', {
        'event_category': modeCheckbox.checked ? 'Integer to Roman' : 'Roman to Integer',
        'event_label': inputValue,
        'value': conversion.value
      });
    } else {
      alert(conversion.message);
    }
  });
}

function convertRomanToInteger(roman) {
  var response = {
    value: 0,
    message: '',
    result: false
  };

  var romanNumeralRegex = new RegExp(
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
  );

  roman = roman.toUpperCase();
  var regexResult = romanNumeralRegex.test(roman);

  if (!regexResult || roman.length === 0) {
    response.message = INVALID_ROMAN;
    return response;
  }

  var arr = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  var values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  var sum = 0;
  var prevIndex = 0;

  for (var i = roman.length - 1; i >= 0; i--) {
    if (arr.indexOf(roman[i]) >= prevIndex) {
      sum += values[roman[i]];
    } else {
      sum -= values[roman[i]];
    }

    prevIndex = arr.indexOf(roman[i]);
  }

  response.value = sum;
  response.result = true;

  return response;
}

function convertIntegerToRoman(num) {
  var response = {
    value: '',
    message: '',
    result: false
  };

  var numberRegex = new RegExp(/^\d+$/);
  var regexResult = numberRegex.test(num.toString());

  if (!regexResult) {
    response.message = INVALID_INTEGER;
    return response;
  }

  if (num > 3999 || num < 1) {
    response.message = OUT_OF_RANGE;
    return response;
  }

  var mapping = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
  };

  var count = 1;
  var str = '';
  while (num > 0) {
    var last = parseInt(num % 10) * count;
    if (last < 10) {
      str = lessThan9(last, mapping) + str;
    } else {
      str = greaterThan9(last, mapping) + str;
    }
    count *= 10;
    num = parseInt(num / 10);
  }

  response.value = str;
  response.result = true;

  return response;
}

function lessThan9(num, obj) {
  var result = '';
  if (num === 9) {
    return obj[1] + obj[10];
  } else if (num >= 5 && num < 9) {
    result = obj[5];
    for (var j = 0; j < num % 5; j++) {
      result += obj[1];
    }
    return result;
  } else if (num === 4) {
    return obj[1] + obj[5];
  } else {
    for (var k = 0; k < num; k++) {
      result += obj[1];
    }
    return result;
  }
}

function greaterThan9(num, obj) {
  var result = '';
  if (num >= 10 && num < 50) {
    if (num === 10) {
      return obj[10];
    }
    if (num === 40) {
      return obj[10] + obj[50];
    }
    for (var m = 0; m < parseInt(num / 10); m++) {
      result += obj[10];
    }
    return result;
  } else if (num >= 50 && num < 100) {
    if (num === 50) {
      return obj[50];
    }
    if (num === 90) {
      return obj[10] + obj[100];
    }
    result = obj[50];
    for (var n = 0; n < parseInt((num - 50) / 10); n++) {
      result += obj[10];
    }
    return result;
  } else if (num >= 100 && num < 500) {
    if (num === 100) {
      return obj[100];
    }
    if (num === 400) {
      return obj[100] + obj[500];
    }
    for (var h = 0; h < parseInt(num / 100); h++) {
      result += obj[100];
    }
    return result;
  } else if (num >= 500 && num < 1000) {
    if (num === 500) {
      return obj[500];
    }
    if (num === 900) {
      return obj[100] + obj[1000];
    }
    result = obj[500];
    for (var l = 0; l < parseInt((num - 500) / 100); l++) {
      result += obj[100];
    }
    return result;
  } else if (num >= 1000 && num < 5000) {
    if (num === 1000) {
      return obj[1000];
    }
    for (var t = 0; t < parseInt(num / 1000); t++) {
      result += obj[1000];
    }
    return result;
  }
}
