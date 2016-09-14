function convertToRoman(num) {
  // define roman symbols
  // first element contains ones, second tens, third hunderts
  var romans = ['', 'IVX', 'XLC', 'CDM', 'Mvx'];
  // default case:
  // one digit, no remains
  var digits = 1;
  var remains = 0;
  var n = num;

  // determine the number of digits
  // set n equal to the first digit
  while(n>10){
    n = Math.floor(n/10);
    digits = digits + 1;
    remains = num - n*Math.pow(10, digits-1);
  }

  // determine which row from the romans array will be used:
  // 1 for ones, 2 for tens, 3 for hunderts - it will correspond to the number of digits
  var row = digits;

  // the problem is now reduced to a number less than 10, and the function
  // will be called recursivelly for the remains
  var arabic = [1, 5, 10];
  //calculate the difference between n and base numbers (1,5,10)
  var delta = arabic.map(function( input){ return n-input; });
  // find the index of the smallest difference in the range between -1 and 3 inclusive
  // which corresponds to roman numeration system
  var index = delta.reduce(function(index, currentValue, currentIndex, array){
    if (currentValue >= -1 && currentValue <= 3){
      if (currentValue < array[index]) {
        index = currentIndex;
      }
    }
    return index;
  }, 0);

  // set the least difference minDiff
  var minDiff = delta[index];

  // for starters, set romanOutput equal to the corresponding base symbol
  var romanOutput = romans[row][index];

  // append the smallest base symbol to the base abs(minDiff) times
  for (var i = 1; i <= Math.abs(minDiff); i++){
    // if minDiff < 0, append at the beginning (case: n=4, minDiff = 4-5; => romanOutput=I+V)
    if (minDiff<0){
      romanOutput = romans[row][0] + romanOutput;
    } else {
      // else append at the end of the base
      // (case: n=6, minDiff = 6-5 = 1; => romanOutput=V+I)
      romanOutput = romanOutput + romans[row][0];
    }
  }
  // if remains is greater than 0, call the function recursevly for the
  // remains and append the output at the end of the current output
  if (remains > 0) {
    romanOutput = romanOutput + convertToRoman(remains);
  }
  return romanOutput;
}
