webpackJsonp_name_([1,2],{

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator2 = __webpack_require__(399);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(402);

	var _map2 = _interopRequireDefault(_map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var responseFormat = "json";
	var apiKey = "883c9597c1166a747b0aae229fe79970:18:74940799";

	var article = document.getElementById("article");
	var articleSection = document.getElementById("section");
	var currentInfoIndex = void 0;

	var sectionGenerator = window.SectionGenerator();
	var newsPiece = new window.NewsPiece(responseFormat, apiKey, sectionGenerator.next().value); //implementation of class
	//TODO: try to trigger nav.addEventListener.onClick
	var json = newsPiece.responseJSON;

	/**
	 * creates and returns new tags which contains enumerated hrefs
	 * @param  {array} listOfItems 
	 * @param  {string} id
	 * @param  {string} class
	 * @param  {string} infoIndex contains index of article for selection and gettin info about it
	 * @return {HTMLelement}
	 */
	function getNewLinksHTMLTag(listOfItems) {
		var id = arguments.length <= 1 || arguments[1] === undefined ? "list-of-articles" : arguments[1];
		var className = arguments.length <= 2 || arguments[2] === undefined ? "list-of-articles" : arguments[2];
		var infoIndex = arguments.length <= 3 || arguments[3] === undefined ? "info-index" : arguments[3];

		var listOfArticles = document.getElementById(id);
		if (listOfArticles) {
			listOfArticles.parentNode.removeChild(listOfArticles);
		}
		var content = document.createElement("section");
		content.id = id;
		content.className = className;
		var ul = document.createElement("ul");
		var li = void 0,
		    a = void 0;
		for (var i = 0; i < listOfItems.length; i++) {
			var item = listOfItems[i];
			li = document.createElement("li");
			a = document.createElement('a');
			a.className = "article-item";
			a.setAttribute(infoIndex, i);
			a.href = item.url;
			a.innerHTML = item.title;
			a.target = "_blank";
			li.appendChild(a);
			ul.appendChild(li);
		}
		content.appendChild(ul);
		return content;
	}

	var infoIdMap = new _map2.default(); //keys: id in html; values: name in request

	infoIdMap.set("info-section-text", "section");
	infoIdMap.set("info-abstract-text", "abstract");
	infoIdMap.set("info-subsection-text", "subsection");
	infoIdMap.set("info-published-date-text", "published_date");
	infoIdMap.set("info-byline-text", "byline");

	var infoArray = void 0; //array to contain info about articles

	function initilize() {
		document.getElementById("info-main-section-text").innerHTML = newsPiece.section;
		infoArray = [];
		currentInfoIndex = -1;
		json.then(function (json) {
			document.getElementById("article").appendChild(getNewLinksHTMLTag(json.results));
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(json.results), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var val = _step.value;

					infoArray.push(val);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		});
	}

	initilize(); //initial loading of the 1st news section

	var nav = document.getElementById("nav");

	//switch to the next section
	nav.addEventListener("click", function () {
		var sectionGenerated = sectionGenerator.next();
		if (sectionGenerated.done) {
			sectionGenerator = SectionGenerator();
			sectionGenerated = sectionGenerator.next();
		}
		newsPiece.section = sectionGenerated.value;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = (0, _getIterator3.default)(infoIdMap.keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var key = _step2.value;

				document.getElementById(key).innerHTML = "";
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		json = newsPiece.responseJSON;
		initilize();
	});

	//show the info about a current article
	article.addEventListener("mouseover", function (event) {
		json.then(function (json) {
			if (event.target.className == "article-item") {
				if (currentInfoIndex > -1) {
					var domElements = document.querySelectorAll("[info-index='" + currentInfoIndex + "']");
					for (var i = 0; i < domElements.length; i++) {
						domElements[i].classList.remove("selected");
					}
				}
				currentInfoIndex = event.target.getAttribute("info-index");
				event.target.classList.add("selected");
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = (0, _getIterator3.default)(infoIdMap.keys()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var key = _step3.value;

						if (infoIdMap.get(key)) {
							document.getElementById(key).innerHTML = infoArray[currentInfoIndex][infoIdMap.get(key)];
						} else {
							document.getElementById(key).innerHTML = "no";
						}
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		});
	});

/***/ },

/***/ 399:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(400), __esModule: true };

/***/ },

/***/ 400:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	__webpack_require__(28);
	module.exports = __webpack_require__(401);

/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(13)
	  , get      = __webpack_require__(67);
	module.exports = __webpack_require__(8).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(403), __esModule: true };

/***/ },

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(57);
	__webpack_require__(404);
	__webpack_require__(410);
	module.exports = __webpack_require__(8).Map;

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(405);

	// 23.1 Map Objects
	module.exports = __webpack_require__(406)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(12).f
	  , create      = __webpack_require__(38)
	  , hide        = __webpack_require__(11)
	  , redefineAll = __webpack_require__(75)
	  , ctx         = __webpack_require__(9)
	  , anInstance  = __webpack_require__(63)
	  , defined     = __webpack_require__(31)
	  , forOf       = __webpack_require__(64)
	  , $iterDefine = __webpack_require__(32)
	  , step        = __webpack_require__(60)
	  , setSpecies  = __webpack_require__(76)
	  , DESCRIPTORS = __webpack_require__(16)
	  , fastKey     = __webpack_require__(91).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(7)
	  , $export        = __webpack_require__(6)
	  , meta           = __webpack_require__(91)
	  , fails          = __webpack_require__(17)
	  , hide           = __webpack_require__(11)
	  , redefineAll    = __webpack_require__(75)
	  , forOf          = __webpack_require__(64)
	  , anInstance     = __webpack_require__(63)
	  , isObject       = __webpack_require__(14)
	  , setToStringTag = __webpack_require__(53)
	  , dP             = __webpack_require__(12).f
	  , each           = __webpack_require__(407)(0)
	  , DESCRIPTORS    = __webpack_require__(16);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(9)
	  , IObject  = __webpack_require__(43)
	  , toObject = __webpack_require__(56)
	  , toLength = __webpack_require__(46)
	  , asc      = __webpack_require__(408);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(409);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , isArray  = __webpack_require__(96)
	  , SPECIES  = __webpack_require__(54)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(6);

	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(411)('Map')});

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(62)
	  , from    = __webpack_require__(412);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(64);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ }

});