/* decorator memoization */

function calculation(x, y) {
  var key = x.toString() + "|" + y.toString();
  var result = 0;
  if (!calculation.memento[key]) {
    for (var i= 0; i < y; ++i) {result += x;}
    calculation.memento[key] = result;
  }
  return calculation.memento[key];
}
calculation.memento = {};

console.profile();
console.log("result: " + calculation(2, 1e8));
console.profileEnd();

console.profile();
console.log("result: " + calculation(2, 1.1e8));
console.profileEnd();

console.profile();
console.log("result: " + calculation(2, 1e8));
console.profileEnd();