// Constants for the literals
const INVALID_ROMAN = "Please enter a valid roman";
const INVALID_INTEGER = "Please enter a valid integer";
const OUT_OF_RANGE = "Out of range (1-3999)";

// Functions declared at the top level so they are in the global scope
let convertIntegerToRoman;
let convertRomanToInteger;

function init() {
    var modeCheckbox = document.querySelector("input[type='checkbox']");
    var header = document.querySelector("h1");
    var convertButton = document.querySelector(".convert-button");
    var outputArea = document.querySelector(".convert-output");
    var inputArea = document.querySelector("input[type='text']");

    modeCheckbox.addEventListener("change", (e) => {
        header.innerHTML = e.target.checked ? "Integer To Roman" : "Roman To Integer";
    });

    convertButton.addEventListener("click", () => {
        let inputValue = inputArea.value;
        let conversion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
        if (conversion.result) {
            outputArea.innerHTML = conversion.value;
        } else {
            alert(conversion.message);
        }
    });

    setupConversionFunctions();
}

function setupConversionFunctions() {
    convertRomanToInteger = function (roman) {
        let response = {
            value: 0,
            message: '',
            result: false
        };

        // Regexp to check if a string is a valid roman number
        const romanNumeralRegex = new RegExp(
            /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
        );

        roman = roman.toUpperCase();
        const regexResult = romanNumeralRegex.test(roman);

        if (!regexResult || roman.length === 0) {
            response.message = INVALID_ROMAN;
            return response;
        }

        const values = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000
        };
        let sum = 0;
        let prevValue = 0;

        for (let i = roman.length - 1; i >= 0; i--) {
            let value = values[roman[i]];
            if (value >= prevValue) {
                sum += value;
            } else {
                sum -= value;
            }
            prevValue = value;
        }

        response.value = sum;
        response.result = true;
        return response;
    };

    convertIntegerToRoman = function (num) {
        let response = {
            value: '',
            message: '',
            result: false
        };

        if (!/^\d+$/.test(num)) {
            response.message = INVALID_INTEGER;
            return response;
        }

        num = parseInt(num);
        if (num < 1 || num > 3999) {
            response.message = OUT_OF_RANGE;
            return response;
        }

        const values = [
            ["I", "V"], // 1-4, 5-8
            ["X", "L"], // 10-40, 50-80
            ["C", "D"], // 100-400, 500-800
            ["M"]       // 1000-3000
        ];

        let digits = num.toString().split('').reverse().map(Number);
        for (let i = 0; i < digits.length; i++) {
            let level = values[i];
            let digit = digits[i];
            if (digit === 9) {
                response.value = level[0] + values[i + 1][0] + response.value;
            } else if (digit >= 5) {
                response.value = level[1] + level[0].repeat(digit - 5) + response.value;
            } else if (digit === 4) {
                response.value = level[0] + level[1] + response.value;
            } else {
                response.value = level[0].repeat(digit) + response.value;
            }
        }

        response.result = true;
        return response;
    };
}

if (typeof window !== "undefined") {
    window.onload = init;
    window.convertIntegerToRoman = convertIntegerToRoman;
    window.convertRomanToInteger = convertRomanToInteger;
} else if (typeof module !== "undefined") {
    module.exports = {
        convertIntegerToRoman,
        convertRomanToInteger
    };
}
