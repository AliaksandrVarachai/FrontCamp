var context = require.context('.', true, /.+\.spec\.js$/);
//context.keys().forEach(context);
context.keys().forEach(function(key) {
  console.log(key);
  context(key);
});
module.exports = context;
