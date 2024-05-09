// Cap
// test("Example", function(assert) {
//   assert.propEqual(convertRomanToInteger("I"), {value: 1, message: '', result: true}, "TC-1");
// });

// Tests for convertIntegerToRoman(num)
test("TC-1: Test minimum valid input. convertIntegerToRoman(1)", function(assert) {
  assert.propEqual(convertIntegerToRoman(1), {value: "I", message: '', result: true}, "TC-1");
});

test("TC-2: Test maximum valid input. convertIntegerToRoman(3999)", function(assert) {
  assert.propEqual(convertIntegerToRoman(3999), {value: "MMMCMXCIX", message: '', result: true}, "TC-2");
});

test("TC-3: Test just below minimum valid input (invalid input). convertIntegerToRoman(0)", function(assert) {
  assert.propEqual(convertIntegerToRoman(0), {value: "", message: 'Out of range (1-3999)', result: false}, "TC-3");
});

test("TC-4: Test just above maximum valid input (invalid input). convertIntegerToRoman(4000)", function(assert) {
  assert.propEqual(convertIntegerToRoman(4000), {value: "", message: 'Out of range (1-3999)', result: false}, "TC-4");
});

test("TC-5: Test with a non-integer input (string). convertIntegerToRoman(V)", function(assert) {
  assert.propEqual(convertIntegerToRoman("V"), {value: "", message: 'Please enter a valid integer', result: false}, "TC-5");
});

test("TC-6: Test with a negative integer. convertIntegerToRoman(-1)", function(assert) {
  assert.propEqual(convertIntegerToRoman(-1), {value: "", message: 'Please enter a valid integer', result: false}, "TC-6");
});

test("TC-7: Test with a decimal number. convertIntegerToRoman(3.14)", function(assert) {
  assert.propEqual(convertIntegerToRoman(3.14), {value: "", message: 'Please enter a valid integer', result: false}, "TC-7");
});

// Tests for convertRomanToInteger(roman)
test("TC-8: Test minimum valid input. convertRomanToInteger(I)", function(assert) {
  assert.propEqual(convertRomanToInteger("I"), {value: 1, message: '', result: true}, "TC-8");
});

test("TC-9: Test maximum valid input. convertRomanToInteger(MMMCMXCIX)", function(assert) {
  assert.propEqual(convertRomanToInteger("MMMCMXCIX"), {value: 3999, message: '', result: true}, "TC-9");
});

test("TC-10: Test with a valid Roman numeral in lowercase. convertRomanToInteger(mmcmxcix)", function(assert) {
  assert.propEqual(convertRomanToInteger("mmcmxcix"), {value: 2999, message: '', result: true}, "TC-10");
});

test("TC-11: Test with a partially lowercase Roman numeral. convertRomanToInteger(MmCmXcIx)", function(assert) {
  assert.propEqual(convertRomanToInteger("MmCmXcIx"), {value: 2999, message: '', result: true}, "TC-11");
});

test("TC-12: Test with an invalid Roman numeral (non-existent sequence). convertRomanToInteger(XXXX)", function(assert) {
  assert.propEqual(convertRomanToInteger("XXXX"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-12");
});

test("TC-13: Test with an invalid Roman numeral (incorrect ordering). convertRomanToInteger(IIX)", function(assert) {
  assert.propEqual(convertRomanToInteger("IIX"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-13");
});

test("TC-14: Test with a string that is not a Roman numeral. convertRomanToInteger(T)", function(assert) {
  assert.propEqual(convertRomanToInteger("T"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-14");
});

test("TC-15: Test with an empty string. convertRomanToInteger()", function(assert) {
  assert.propEqual(convertRomanToInteger(""), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-15");
});

test("TC-16: Test with a numerical string (which is invalid for this method). convertRomanToInteger(1)", function(assert) {
  assert.propEqual(convertRomanToInteger("1"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-16");
});

