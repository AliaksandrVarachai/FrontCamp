/* decorator singleton */

var singleton_A = {
  log: function(text) {console.log(text);}
};

var singleton_B;
(function() {
  var instance;
  var anticlone_proxy;
  
  Singleton_B = function() {
    if (instance) {return instance;}
    instance = {
      _counter: 0,
      log: function(text) {
        this._counter++;
        console.log(text + "->" + this._counter);
      }
    };
    anticlone_proxy = {
      log: function(text) {
        return instance.log(text);
      }
    };
    return anticlone_proxy;
  };
})();

function NonSingleton() {}

NonSingleton.prototype = {
  constructor: NonSingleton,
  scream: function() {console.log("Wooohoooo!");}
};

var singleton = new Singleton_B();
var nonsingleton = new NonSingleton();

singleton.log("3..2..1... ignition!");
singleton.log("3..2..1... ignition!");
singleton.log("3..2..1... ignition!");
nonsingleton.scream();