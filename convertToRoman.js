function convertToRoman(num) {
  // function supports numbers up to 39999
  // Usage
  // console.log(convertToRoman(39));
  if (num > 39999) {
    return undefined;
  }
  // define roman symbols
  // first row contains ones, second tens, third hunderts, fourth thousands...
  // The symbols for 5000 and 10000 are not pure alphabetic characters, so I used lower case v and x
  // The function can be easily extended by adding new symbols to the romans array, based on the defined pattern.
  var romans = [/*empty placeholder for 1 based indexing,,, */'', 'IVX', 'XLC', 'CDM', 'Mvx', 'x'];
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
  // find indices where difference is not smaller than -1 and not greater than 3
  // which corresponds to roman numeration system
  var indices = delta.reduce(function(indices, currentValue, currentIndex, array){
    if (currentValue >= -1 && currentValue <= 3){
      indices.push(currentIndex);
    }
    return indices;
  }, []);
  // now, the roman number will be formed from the base symbol with the smallest differenc from n, so we
  // determine the least difference but between -1 and 3, all other values are ignored
  var minDiff = indices.reduce(function(minDiff, currentValue, currentIndex, array){
    if (minDiff>delta[currentValue]){
      minDiff = delta[currentValue];
    }
    return minDiff;
  }, delta[indices[0]]);
  // determine the index of the minDiff which will correspond to the index of
  // the appropriate symbol inside the romans array
  var index = delta.indexOf(minDiff);

  // for starters, set romanOutput equal to the corresponding base symbol
  var romanOutput = romans[row][index].toString();

  // append the smallest base symbol to the base abs(minDiff) times
  for (var i = 1; i <= Math.abs(minDiff); i++){
    // if minDiff < 0, append at the beginning (case: n=4, minDiff = 4-5; => romanOutput=I+V)
    if (minDiff<0){
      romanOutput = romans[row][0].toString() + romanOutput;
    } else {
      // else append at the end of the base
      // (case: n=6, minDiff = 6-5 = 1; => romanOutput=V+I)
      romanOutput = romanOutput + romans[row][0].toString();
    }
  }
  // if remains is greater than 0, call the function recursevly for the
  // remains and append the output at the end of the current output
  if (remains > 0) {
    romanOutput = romanOutput + convertToRoman(remains);
  }
  return romanOutput;
}
