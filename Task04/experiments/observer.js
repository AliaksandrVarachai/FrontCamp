/* decorator observer */

Event = function() {
  this._observers = [];
};
Event.prototype = {
  raise: function(data) {
    for (var i in this._observers) {
      var item = this._observers[i];
      item.observer.call(item.context, data);
    }
  },
  subscribe: function(observer, context) {
    var ctx = context || null;
    this._observers.push({
      observer: observer,
      constext: ctx
    });
  },
  unsubscribe: function(observer, context) {
    for (var i in this._observers) {
      if (this._observers[i].observer == observer && this._observers[i].context == context) {
        delete this._observers[i];
      }
    }
  }
};

var someEvent = new Event();
someEvent.subscribe(function(data) {
  console.log("wohoo " + data);
});

var someObject = {
  _topSecretInfo: 42,
  observerFunction: function() {
    console.log(" Top Secret: " + this._topSecretInfo);
  }
};
someEvent.subscribe(someObject.observerFunction, someObject);

someEvent.raise("yeaah!");
someEvent.raise();