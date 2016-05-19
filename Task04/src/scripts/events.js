function Event() {
    this._listeners = [];
}

Event.prototype = {
    subscribe: function(listener) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (listener === this._listeners[i]) {
                return null;
            }
        }
        return this._listeners.push(listener);
    },
    unsubscribe: function(listener) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (listener === this._listeners[i]) {
                return this._listeners.splice(i, 1);
            }
        }
        return null;
    },
    notify: function() {
        for (let i = 0; i < this._listeners.length; i++) {
            this._listeners[i]();
        }
    }
}

export {
    Event
}