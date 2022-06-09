(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('http'), require('https'), require('url'), require('stream'), require('assert'), require('tty'), require('util'), require('os'), require('zlib'), require('path'), require('fs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'http', 'https', 'url', 'stream', 'assert', 'tty', 'util', 'os', 'zlib', 'path', 'fs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.aquarequest = {}, global.http, global.https, global.url, global.stream, global.assert, global.tty, global.util, global.os, global.zlib, global.path, global.fs));
})(this, (function (exports, http, https, url, stream, assert, tty, util, os, zlib, path, fs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
  var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
  var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
  var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
  var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
  var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
  var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
  var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
  var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
  var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
  var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _hasProperty(obj, prop) {
    var _has = Object.prototype.hasOwnProperty;
    return _has.call(obj, prop);
  }
  function _isObjEmpty(obj) {
    return obj && Object.keys(obj).length === 0;
  }
  function _hasFiles(data) {
    return data instanceof File || data instanceof Blob || data instanceof FileList && data.length > 0 || data instanceof FormData && Array.from(data.values()).some(function (value) {
      return _hasFiles(value);
    }) || _typeof(data) === 'object' && data !== null && Object.values(data).some(function (value) {
      return _hasFiles(value);
    });
  }
  function _objectToFormData(source) {
    var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new FormData();
    var parentKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    source = source || {};

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        append(form, composeKey(parentKey, key), source[key]);
      }
    }

    return form;
  }

  function composeKey(parent, key) {
    return parent ? parent + '[' + key + ']' : key;
  }

  function append(form, key, value) {
    if (Array.isArray(value)) {
      return Array.from(value.keys()).forEach(function (index) {
        return append(form, composeKey(key, index.toString()), value[index]);
      });
    } else if (value instanceof Date) {
      return form.append(key, value.toISOString());
    } else if (value instanceof File) {
      return form.append(key, value, value.name);
    } else if (value instanceof Blob) {
      return form.append(key, value);
    } else if (typeof value === 'boolean') {
      return form.append(key, value ? '1' : '0');
    } else if (typeof value === 'string') {
      return form.append(key, value);
    } else if (typeof value === 'number') {
      return form.append(key, "".concat(value));
    } else if (value === null || value === undefined) {
      return form.append(key, '');
    }

    _objectToFormData(value, form, key);
  }
  function dispatch(name) {
    var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    document.dispatchEvent(new CustomEvent(name, {
      detail: detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }

  var Method = Object.freeze({
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete'
  });
  var STATE = Object.freeze({
    busy: false,
    response: null,
    result: null,
    cancelled: false,
    statusCode: null,
    downloadProgress: 0,
    uploadProgress: 0
  });
  var HOOK_NAME = Object.freeze({
    BEFORE: 'onBefore',
    START: 'onStart',
    DOWNLOAD: 'onDownload',
    UPLOAD: 'onUpload',
    CANCEL: 'onCancel',
    STATUS_CODE: 'onStatusCode',
    SUCCESS: 'onSuccess',
    ERROR: 'onError',
    FINISH: 'onFinish'
  });
  var PUBLIC_EVENTS = Object.freeze({
    BEFORE: 'aquarequest:onBefore',
    START: 'aquarequest:onStart',
    DOWNLOAD: 'aquarequest:onDownload',
    UPLOAD: 'aquarequest:onUpload',
    CANCEL: 'aquarequest:onCancel',
    SUCCESS: 'aquarequest:onSuccess',
    ERROR: 'aquarequest:onError',
    FINISH: 'aquarequest:onFinish'
  });

  var State = /*#__PURE__*/function (_HOOK_NAME$BEFORE, _HOOK_NAME$START, _HOOK_NAME$STATUS_COD, _HOOK_NAME$SUCCESS, _HOOK_NAME$CANCEL, _HOOK_NAME$UPLOAD, _HOOK_NAME$DOWNLOAD, _HOOK_NAME$ERROR, _HOOK_NAME$FINISH) {
    function State() {
      _classCallCheck(this, State);

      this.state = Object.assign({}, STATE);
    }

    _createClass(State, [{
      key: _HOOK_NAME$BEFORE,
      value: function value() {// EVERYTHING NEEDED TO BE DONE HERE ALREADY DONE IN MAIN CONTEXT
        // LEAVE IT
      }
    }, {
      key: _HOOK_NAME$START,
      value: function value() {
        this.state.busy = true;
      }
    }, {
      key: _HOOK_NAME$STATUS_COD,
      value: function value(code) {
        this.state.statusCode = code;
      }
    }, {
      key: _HOOK_NAME$SUCCESS,
      value: function value(response) {
        this.state.response = response;
        this.state.result = response.data;
      }
    }, {
      key: _HOOK_NAME$CANCEL,
      value: function value(message) {
        this.state.cancelled = true;
      }
    }, {
      key: _HOOK_NAME$UPLOAD,
      value: function value(progress) {
        var total = progress === null || progress === void 0 ? void 0 : progress.total;
        var loaded = progress === null || progress === void 0 ? void 0 : progress.loaded;
        if (!total || !loaded) return;
        var percentage = Math.round(loaded / total * 100);
        this.state.uploadProgress = percentage;
      }
    }, {
      key: _HOOK_NAME$DOWNLOAD,
      value: function value(progress) {
        var total = progress === null || progress === void 0 ? void 0 : progress.total;
        var loaded = progress === null || progress === void 0 ? void 0 : progress.loaded;
        if (!total || !loaded) return;
        var percentage = Math.round(loaded / total * 100);
        this.state.downloadProgress = percentage;
      }
    }, {
      key: _HOOK_NAME$ERROR,
      value: function value(response) {
        this.state.response = response;
      }
    }, {
      key: _HOOK_NAME$FINISH,
      value: function value() {
        this.state.busy = false;
      }
    }]);

    return State;
  }(HOOK_NAME.BEFORE, HOOK_NAME.START, HOOK_NAME.STATUS_CODE, HOOK_NAME.SUCCESS, HOOK_NAME.CANCEL, HOOK_NAME.UPLOAD, HOOK_NAME.DOWNLOAD, HOOK_NAME.ERROR, HOOK_NAME.FINISH);

  var Hook = /*#__PURE__*/function (_HOOK_NAME$BEFORE, _HOOK_NAME$START, _HOOK_NAME$STATUS_COD, _HOOK_NAME$SUCCESS, _HOOK_NAME$CANCEL, _HOOK_NAME$UPLOAD, _HOOK_NAME$DOWNLOAD, _HOOK_NAME$ERROR, _HOOK_NAME$FINISH) {
    function Hook(mainContext) {
      _classCallCheck(this, Hook);

      this.mainContext = mainContext;
      this.stateHub = new State();
    }

    _createClass(Hook, [{
      key: _HOOK_NAME$BEFORE,
      value: function value(options) {
        dispatch(PUBLIC_EVENTS.BEFORE, options);
        this.stateHub[HOOK_NAME.BEFORE].call(this.mainContext);
      }
    }, {
      key: _HOOK_NAME$START,
      value: function value(options) {
        dispatch(PUBLIC_EVENTS.START, options);
        this.stateHub[HOOK_NAME.START].call(this.mainContext, options);
      }
    }, {
      key: _HOOK_NAME$STATUS_COD,
      value: function value(code) {
        this.stateHub[HOOK_NAME.STATUS_CODE].call(this.mainContext, code);
      }
    }, {
      key: _HOOK_NAME$SUCCESS,
      value: function value(response) {
        dispatch(PUBLIC_EVENTS.SUCCESS, response);
        this.stateHub[HOOK_NAME.SUCCESS].call(this.mainContext, response);
      }
    }, {
      key: _HOOK_NAME$CANCEL,
      value: function value(message) {
        dispatch(PUBLIC_EVENTS.CANCEL, message);
        this.stateHub[HOOK_NAME.CANCEL].call(this.mainContext, message);
      }
    }, {
      key: _HOOK_NAME$UPLOAD,
      value: function value(progress) {
        dispatch(PUBLIC_EVENTS.UPLOAD, progress);
        this.stateHub[HOOK_NAME.UPLOAD].call(this.mainContext, progress);
      }
    }, {
      key: _HOOK_NAME$DOWNLOAD,
      value: function value(progress) {
        dispatch(PUBLIC_EVENTS.DOWNLOAD, progress);
        this.stateHub[HOOK_NAME.DOWNLOAD].call(this.mainContext, progress);
      }
    }, {
      key: _HOOK_NAME$ERROR,
      value: function value(response) {
        dispatch(PUBLIC_EVENTS.ERROR, response);
        this.stateHub[HOOK_NAME.ERROR].call(this.mainContext, response);
      }
    }, {
      key: _HOOK_NAME$FINISH,
      value: function value() {
        dispatch(PUBLIC_EVENTS.FINISH, {});
        this.mainContext._cancelToken = null;
        this.stateHub[HOOK_NAME.FINISH].call(this.mainContext);
      }
    }]);

    return Hook;
  }(HOOK_NAME.BEFORE, HOOK_NAME.START, HOOK_NAME.STATUS_CODE, HOOK_NAME.SUCCESS, HOOK_NAME.CANCEL, HOOK_NAME.UPLOAD, HOOK_NAME.DOWNLOAD, HOOK_NAME.ERROR, HOOK_NAME.FINISH);

  var HookHub = /*#__PURE__*/function () {
    function HookHub(mainContext) {
      _classCallCheck(this, HookHub);

      this.hook = new Hook(mainContext);
      this.handlers = {};
    }

    _createClass(HookHub, [{
      key: "registerInternalHooks",
      value: function registerInternalHooks() {
        var H = HOOK_NAME;
        this.register(H.BEFORE, this.hook[H.BEFORE].bind(this.hook));
        this.register(H.START, this.hook[H.START].bind(this.hook));
        this.register(H.STATUS_CODE, this.hook[H.STATUS_CODE].bind(this.hook));
        this.register(H.CANCEL, this.hook[H.CANCEL].bind(this.hook));
        this.register(H.UPLOAD, this.hook[H.UPLOAD].bind(this.hook));
        this.register(H.DOWNLOAD, this.hook[H.DOWNLOAD].bind(this.hook));
        this.register(H.SUCCESS, this.hook[H.SUCCESS].bind(this.hook));
        this.register(H.ERROR, this.hook[H.ERROR].bind(this.hook));
        this.register(H.FINISH, this.hook[H.FINISH].bind(this.hook));
      }
    }, {
      key: "registerUserHooks",
      value: function registerUserHooks(hooksList) {
        var H = HOOK_NAME;
        var self = this;
        hooksList.forEach(function (hooks) {
          Object.values(HOOK_NAME).forEach(function (NAME) {
            if (!_hasProperty(hooks, NAME)) hooks[NAME] = function () {
              /*NOTHING*/
            };
          });
          self.register(H.BEFORE, hooks[H.BEFORE]);
          self.register(H.START, hooks[H.START]);
          self.register(H.STATUS_CODE, hooks[H.STATUS_CODE]);
          self.register(H.CANCEL, hooks[H.CANCEL]);
          self.register(H.UPLOAD, hooks[H.UPLOAD]);
          self.register(H.DOWNLOAD, hooks[H.DOWNLOAD]);
          self.register(H.SUCCESS, hooks[H.SUCCESS]);
          self.register(H.ERROR, hooks[H.ERROR]);
          self.register(H.FINISH, hooks[H.FINISH]);
        });
      }
    }, {
      key: "register",
      value: function register(event, handler) {
        if (!this.handlers) this.handlers = {};

        if (!this.handlers[event]) {
          this.handlers[event] = [];
        }

        this.handlers[event].push(handler);
      }
    }, {
      key: "off",
      value: function off(event, handler) {
        var _this$handlers;

        var handlers = (_this$handlers = this.handlers) === null || _this$handlers === void 0 ? void 0 : _this$handlers[event];
        if (!handlers) return;

        for (var i = 0; i < handlers.length; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i--, 1); // remember js works as reference so this will mutate this.handlers
          }
        }
      }
    }, {
      key: "run",
      value: function run(event) {
        var _this$handlers2,
            _this = this;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!((_this$handlers2 = this.handlers) !== null && _this$handlers2 !== void 0 && _this$handlers2[event])) {
          return; // no handlers for that event name
        } // call the handlers


        this.handlers[event].forEach(function (handler) {
          return handler.apply(_this, args);
        });
      }
    }]);

    return HookHub;
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var _mapping = createCommonjsModule(function (module, exports) {
  /** Used to map aliases to their real names. */
  exports.aliasToReal = {

    // Lodash aliases.
    'each': 'forEach',
    'eachRight': 'forEachRight',
    'entries': 'toPairs',
    'entriesIn': 'toPairsIn',
    'extend': 'assignIn',
    'extendAll': 'assignInAll',
    'extendAllWith': 'assignInAllWith',
    'extendWith': 'assignInWith',
    'first': 'head',

    // Methods that are curried variants of others.
    'conforms': 'conformsTo',
    'matches': 'isMatch',
    'property': 'get',

    // Ramda aliases.
    '__': 'placeholder',
    'F': 'stubFalse',
    'T': 'stubTrue',
    'all': 'every',
    'allPass': 'overEvery',
    'always': 'constant',
    'any': 'some',
    'anyPass': 'overSome',
    'apply': 'spread',
    'assoc': 'set',
    'assocPath': 'set',
    'complement': 'negate',
    'compose': 'flowRight',
    'contains': 'includes',
    'dissoc': 'unset',
    'dissocPath': 'unset',
    'dropLast': 'dropRight',
    'dropLastWhile': 'dropRightWhile',
    'equals': 'isEqual',
    'identical': 'eq',
    'indexBy': 'keyBy',
    'init': 'initial',
    'invertObj': 'invert',
    'juxt': 'over',
    'omitAll': 'omit',
    'nAry': 'ary',
    'path': 'get',
    'pathEq': 'matchesProperty',
    'pathOr': 'getOr',
    'paths': 'at',
    'pickAll': 'pick',
    'pipe': 'flow',
    'pluck': 'map',
    'prop': 'get',
    'propEq': 'matchesProperty',
    'propOr': 'getOr',
    'props': 'at',
    'symmetricDifference': 'xor',
    'symmetricDifferenceBy': 'xorBy',
    'symmetricDifferenceWith': 'xorWith',
    'takeLast': 'takeRight',
    'takeLastWhile': 'takeRightWhile',
    'unapply': 'rest',
    'unnest': 'flatten',
    'useWith': 'overArgs',
    'where': 'conformsTo',
    'whereEq': 'isMatch',
    'zipObj': 'zipObject'
  };

  /** Used to map ary to method names. */
  exports.aryMethod = {
    '1': [
      'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
      'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
      'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
      'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
      'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
      'uniqueId', 'words', 'zipAll'
    ],
    '2': [
      'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
      'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
      'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
      'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
      'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
      'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
      'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
      'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
      'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
      'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
      'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
      'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
      'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
      'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
      'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
      'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
      'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
      'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
      'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
      'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
      'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
      'zipObjectDeep'
    ],
    '3': [
      'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
      'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
      'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
      'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
      'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
      'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
      'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
      'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
      'xorWith', 'zipWith'
    ],
    '4': [
      'fill', 'setWith', 'updateWith'
    ]
  };

  /** Used to map ary to rearg configs. */
  exports.aryRearg = {
    '2': [1, 0],
    '3': [2, 0, 1],
    '4': [3, 2, 0, 1]
  };

  /** Used to map method names to their iteratee ary. */
  exports.iterateeAry = {
    'dropRightWhile': 1,
    'dropWhile': 1,
    'every': 1,
    'filter': 1,
    'find': 1,
    'findFrom': 1,
    'findIndex': 1,
    'findIndexFrom': 1,
    'findKey': 1,
    'findLast': 1,
    'findLastFrom': 1,
    'findLastIndex': 1,
    'findLastIndexFrom': 1,
    'findLastKey': 1,
    'flatMap': 1,
    'flatMapDeep': 1,
    'flatMapDepth': 1,
    'forEach': 1,
    'forEachRight': 1,
    'forIn': 1,
    'forInRight': 1,
    'forOwn': 1,
    'forOwnRight': 1,
    'map': 1,
    'mapKeys': 1,
    'mapValues': 1,
    'partition': 1,
    'reduce': 2,
    'reduceRight': 2,
    'reject': 1,
    'remove': 1,
    'some': 1,
    'takeRightWhile': 1,
    'takeWhile': 1,
    'times': 1,
    'transform': 2
  };

  /** Used to map method names to iteratee rearg configs. */
  exports.iterateeRearg = {
    'mapKeys': [1],
    'reduceRight': [1, 0]
  };

  /** Used to map method names to rearg configs. */
  exports.methodRearg = {
    'assignInAllWith': [1, 0],
    'assignInWith': [1, 2, 0],
    'assignAllWith': [1, 0],
    'assignWith': [1, 2, 0],
    'differenceBy': [1, 2, 0],
    'differenceWith': [1, 2, 0],
    'getOr': [2, 1, 0],
    'intersectionBy': [1, 2, 0],
    'intersectionWith': [1, 2, 0],
    'isEqualWith': [1, 2, 0],
    'isMatchWith': [2, 1, 0],
    'mergeAllWith': [1, 0],
    'mergeWith': [1, 2, 0],
    'padChars': [2, 1, 0],
    'padCharsEnd': [2, 1, 0],
    'padCharsStart': [2, 1, 0],
    'pullAllBy': [2, 1, 0],
    'pullAllWith': [2, 1, 0],
    'rangeStep': [1, 2, 0],
    'rangeStepRight': [1, 2, 0],
    'setWith': [3, 1, 2, 0],
    'sortedIndexBy': [2, 1, 0],
    'sortedLastIndexBy': [2, 1, 0],
    'unionBy': [1, 2, 0],
    'unionWith': [1, 2, 0],
    'updateWith': [3, 1, 2, 0],
    'xorBy': [1, 2, 0],
    'xorWith': [1, 2, 0],
    'zipWith': [1, 2, 0]
  };

  /** Used to map method names to spread configs. */
  exports.methodSpread = {
    'assignAll': { 'start': 0 },
    'assignAllWith': { 'start': 0 },
    'assignInAll': { 'start': 0 },
    'assignInAllWith': { 'start': 0 },
    'defaultsAll': { 'start': 0 },
    'defaultsDeepAll': { 'start': 0 },
    'invokeArgs': { 'start': 2 },
    'invokeArgsMap': { 'start': 2 },
    'mergeAll': { 'start': 0 },
    'mergeAllWith': { 'start': 0 },
    'partial': { 'start': 1 },
    'partialRight': { 'start': 1 },
    'without': { 'start': 1 },
    'zipAll': { 'start': 0 }
  };

  /** Used to identify methods which mutate arrays or objects. */
  exports.mutate = {
    'array': {
      'fill': true,
      'pull': true,
      'pullAll': true,
      'pullAllBy': true,
      'pullAllWith': true,
      'pullAt': true,
      'remove': true,
      'reverse': true
    },
    'object': {
      'assign': true,
      'assignAll': true,
      'assignAllWith': true,
      'assignIn': true,
      'assignInAll': true,
      'assignInAllWith': true,
      'assignInWith': true,
      'assignWith': true,
      'defaults': true,
      'defaultsAll': true,
      'defaultsDeep': true,
      'defaultsDeepAll': true,
      'merge': true,
      'mergeAll': true,
      'mergeAllWith': true,
      'mergeWith': true,
    },
    'set': {
      'set': true,
      'setWith': true,
      'unset': true,
      'update': true,
      'updateWith': true
    }
  };

  /** Used to map real names to their aliases. */
  exports.realToAlias = (function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        object = exports.aliasToReal,
        result = {};

    for (var key in object) {
      var value = object[key];
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }
    return result;
  }());

  /** Used to map method names to other names. */
  exports.remap = {
    'assignAll': 'assign',
    'assignAllWith': 'assignWith',
    'assignInAll': 'assignIn',
    'assignInAllWith': 'assignInWith',
    'curryN': 'curry',
    'curryRightN': 'curryRight',
    'defaultsAll': 'defaults',
    'defaultsDeepAll': 'defaultsDeep',
    'findFrom': 'find',
    'findIndexFrom': 'findIndex',
    'findLastFrom': 'findLast',
    'findLastIndexFrom': 'findLastIndex',
    'getOr': 'get',
    'includesFrom': 'includes',
    'indexOfFrom': 'indexOf',
    'invokeArgs': 'invoke',
    'invokeArgsMap': 'invokeMap',
    'lastIndexOfFrom': 'lastIndexOf',
    'mergeAll': 'merge',
    'mergeAllWith': 'mergeWith',
    'padChars': 'pad',
    'padCharsEnd': 'padEnd',
    'padCharsStart': 'padStart',
    'propertyOf': 'get',
    'rangeStep': 'range',
    'rangeStepRight': 'rangeRight',
    'restFrom': 'rest',
    'spreadFrom': 'spread',
    'trimChars': 'trim',
    'trimCharsEnd': 'trimEnd',
    'trimCharsStart': 'trimStart',
    'zipAll': 'zip'
  };

  /** Used to track methods that skip fixing their arity. */
  exports.skipFixed = {
    'castArray': true,
    'flow': true,
    'flowRight': true,
    'iteratee': true,
    'mixin': true,
    'rearg': true,
    'runInContext': true
  };

  /** Used to track methods that skip rearranging arguments. */
  exports.skipRearg = {
    'add': true,
    'assign': true,
    'assignIn': true,
    'bind': true,
    'bindKey': true,
    'concat': true,
    'difference': true,
    'divide': true,
    'eq': true,
    'gt': true,
    'gte': true,
    'isEqual': true,
    'lt': true,
    'lte': true,
    'matchesProperty': true,
    'merge': true,
    'multiply': true,
    'overArgs': true,
    'partial': true,
    'partialRight': true,
    'propertyOf': true,
    'random': true,
    'range': true,
    'rangeRight': true,
    'subtract': true,
    'zip': true,
    'zipObject': true,
    'zipObjectDeep': true
  };
  });
  _mapping.aliasToReal;
  _mapping.aryMethod;
  _mapping.aryRearg;
  _mapping.iterateeAry;
  _mapping.iterateeRearg;
  _mapping.methodRearg;
  _mapping.methodSpread;
  _mapping.mutate;
  _mapping.realToAlias;
  _mapping.remap;
  _mapping.skipFixed;
  _mapping.skipRearg;

  /**
   * The default argument placeholder value for methods.
   *
   * @type {Object}
   */
  var placeholder = {};

  /** Built-in value reference. */
  var push = Array.prototype.push;

  /**
   * Creates a function, with an arity of `n`, that invokes `func` with the
   * arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} n The arity of the new function.
   * @returns {Function} Returns the new function.
   */
  function baseArity(func, n) {
    return n == 2
      ? function(a, b) { return func.apply(undefined, arguments); }
      : function(a) { return func.apply(undefined, arguments); };
  }

  /**
   * Creates a function that invokes `func`, with up to `n` arguments, ignoring
   * any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function baseAry(func, n) {
    return n == 2
      ? function(a, b) { return func(a, b); }
      : function(a) { return func(a); };
  }

  /**
   * Creates a clone of `array`.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the cloned array.
   */
  function cloneArray(array) {
    var length = array ? array.length : 0,
        result = Array(length);

    while (length--) {
      result[length] = array[length];
    }
    return result;
  }

  /**
   * Creates a function that clones a given object using the assignment `func`.
   *
   * @private
   * @param {Function} func The assignment function.
   * @returns {Function} Returns the new cloner function.
   */
  function createCloner(func) {
    return function(object) {
      return func({}, object);
    };
  }

  /**
   * A specialized version of `_.spread` which flattens the spread array into
   * the arguments of the invoked `func`.
   *
   * @private
   * @param {Function} func The function to spread arguments over.
   * @param {number} start The start position of the spread.
   * @returns {Function} Returns the new function.
   */
  function flatSpread(func, start) {
    return function() {
      var length = arguments.length,
          lastIndex = length - 1,
          args = Array(length);

      while (length--) {
        args[length] = arguments[length];
      }
      var array = args[start],
          otherArgs = args.slice(0, start);

      if (array) {
        push.apply(otherArgs, array);
      }
      if (start != lastIndex) {
        push.apply(otherArgs, args.slice(start + 1));
      }
      return func.apply(this, otherArgs);
    };
  }

  /**
   * Creates a function that wraps `func` and uses `cloner` to clone the first
   * argument it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} cloner The function to clone arguments.
   * @returns {Function} Returns the new immutable function.
   */
  function wrapImmutable(func, cloner) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return;
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var result = args[0] = cloner.apply(undefined, args);
      func.apply(undefined, args);
      return result;
    };
  }

  /**
   * The base implementation of `convert` which accepts a `util` object of methods
   * required to perform conversions.
   *
   * @param {Object} util The util object.
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
   * @param {boolean} [options.curry=true] Specify currying.
   * @param {boolean} [options.fixed=true] Specify fixed arity.
   * @param {boolean} [options.immutable=true] Specify immutable operations.
   * @param {boolean} [options.rearg=true] Specify rearranging arguments.
   * @returns {Function|Object} Returns the converted function or object.
   */
  function baseConvert(util, name, func, options) {
    var isLib = typeof name == 'function',
        isObj = name === Object(name);

    if (isObj) {
      options = func;
      func = name;
      name = undefined;
    }
    if (func == null) {
      throw new TypeError;
    }
    options || (options = {});

    var config = {
      'cap': 'cap' in options ? options.cap : true,
      'curry': 'curry' in options ? options.curry : true,
      'fixed': 'fixed' in options ? options.fixed : true,
      'immutable': 'immutable' in options ? options.immutable : true,
      'rearg': 'rearg' in options ? options.rearg : true
    };

    var defaultHolder = isLib ? func : placeholder,
        forceCurry = ('curry' in options) && options.curry,
        forceFixed = ('fixed' in options) && options.fixed,
        forceRearg = ('rearg' in options) && options.rearg,
        pristine = isLib ? func.runInContext() : undefined;

    var helpers = isLib ? func : {
      'ary': util.ary,
      'assign': util.assign,
      'clone': util.clone,
      'curry': util.curry,
      'forEach': util.forEach,
      'isArray': util.isArray,
      'isError': util.isError,
      'isFunction': util.isFunction,
      'isWeakMap': util.isWeakMap,
      'iteratee': util.iteratee,
      'keys': util.keys,
      'rearg': util.rearg,
      'toInteger': util.toInteger,
      'toPath': util.toPath
    };

    var ary = helpers.ary,
        assign = helpers.assign,
        clone = helpers.clone,
        curry = helpers.curry,
        each = helpers.forEach,
        isArray = helpers.isArray,
        isError = helpers.isError,
        isFunction = helpers.isFunction,
        isWeakMap = helpers.isWeakMap,
        keys = helpers.keys,
        rearg = helpers.rearg,
        toInteger = helpers.toInteger,
        toPath = helpers.toPath;

    var aryMethodKeys = keys(_mapping.aryMethod);

    var wrappers = {
      'castArray': function(castArray) {
        return function() {
          var value = arguments[0];
          return isArray(value)
            ? castArray(cloneArray(value))
            : castArray.apply(undefined, arguments);
        };
      },
      'iteratee': function(iteratee) {
        return function() {
          var func = arguments[0],
              arity = arguments[1],
              result = iteratee(func, arity),
              length = result.length;

          if (config.cap && typeof arity == 'number') {
            arity = arity > 2 ? (arity - 2) : 1;
            return (length && length <= arity) ? result : baseAry(result, arity);
          }
          return result;
        };
      },
      'mixin': function(mixin) {
        return function(source) {
          var func = this;
          if (!isFunction(func)) {
            return mixin(func, Object(source));
          }
          var pairs = [];
          each(keys(source), function(key) {
            if (isFunction(source[key])) {
              pairs.push([key, func.prototype[key]]);
            }
          });

          mixin(func, Object(source));

          each(pairs, function(pair) {
            var value = pair[1];
            if (isFunction(value)) {
              func.prototype[pair[0]] = value;
            } else {
              delete func.prototype[pair[0]];
            }
          });
          return func;
        };
      },
      'nthArg': function(nthArg) {
        return function(n) {
          var arity = n < 0 ? 1 : (toInteger(n) + 1);
          return curry(nthArg(n), arity);
        };
      },
      'rearg': function(rearg) {
        return function(func, indexes) {
          var arity = indexes ? indexes.length : 0;
          return curry(rearg(func, indexes), arity);
        };
      },
      'runInContext': function(runInContext) {
        return function(context) {
          return baseConvert(util, runInContext(context), options);
        };
      }
    };

    /*--------------------------------------------------------------------------*/

    /**
     * Casts `func` to a function with an arity capped iteratee if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @returns {Function} Returns the cast function.
     */
    function castCap(name, func) {
      if (config.cap) {
        var indexes = _mapping.iterateeRearg[name];
        if (indexes) {
          return iterateeRearg(func, indexes);
        }
        var n = !isLib && _mapping.iterateeAry[name];
        if (n) {
          return iterateeAry(func, n);
        }
      }
      return func;
    }

    /**
     * Casts `func` to a curried function if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @param {number} n The arity of `func`.
     * @returns {Function} Returns the cast function.
     */
    function castCurry(name, func, n) {
      return (forceCurry || (config.curry && n > 1))
        ? curry(func, n)
        : func;
    }

    /**
     * Casts `func` to a fixed arity function if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @param {number} n The arity cap.
     * @returns {Function} Returns the cast function.
     */
    function castFixed(name, func, n) {
      if (config.fixed && (forceFixed || !_mapping.skipFixed[name])) {
        var data = _mapping.methodSpread[name],
            start = data && data.start;

        return start  === undefined ? ary(func, n) : flatSpread(func, start);
      }
      return func;
    }

    /**
     * Casts `func` to an rearged function if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @param {number} n The arity of `func`.
     * @returns {Function} Returns the cast function.
     */
    function castRearg(name, func, n) {
      return (config.rearg && n > 1 && (forceRearg || !_mapping.skipRearg[name]))
        ? rearg(func, _mapping.methodRearg[name] || _mapping.aryRearg[n])
        : func;
    }

    /**
     * Creates a clone of `object` by `path`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {Array|string} path The path to clone by.
     * @returns {Object} Returns the cloned object.
     */
    function cloneByPath(object, path) {
      path = toPath(path);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          result = clone(Object(object)),
          nested = result;

      while (nested != null && ++index < length) {
        var key = path[index],
            value = nested[key];

        if (value != null &&
            !(isFunction(value) || isError(value) || isWeakMap(value))) {
          nested[key] = clone(index == lastIndex ? value : Object(value));
        }
        nested = nested[key];
      }
      return result;
    }

    /**
     * Converts `lodash` to an immutable auto-curried iteratee-first data-last
     * version with conversion `options` applied.
     *
     * @param {Object} [options] The options object. See `baseConvert` for more details.
     * @returns {Function} Returns the converted `lodash`.
     */
    function convertLib(options) {
      return _.runInContext.convert(options)(undefined);
    }

    /**
     * Create a converter function for `func` of `name`.
     *
     * @param {string} name The name of the function to convert.
     * @param {Function} func The function to convert.
     * @returns {Function} Returns the new converter function.
     */
    function createConverter(name, func) {
      var realName = _mapping.aliasToReal[name] || name,
          methodName = _mapping.remap[realName] || realName,
          oldOptions = options;

      return function(options) {
        var newUtil = isLib ? pristine : helpers,
            newFunc = isLib ? pristine[methodName] : func,
            newOptions = assign(assign({}, oldOptions), options);

        return baseConvert(newUtil, realName, newFunc, newOptions);
      };
    }

    /**
     * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
     * arguments, ignoring any additional arguments.
     *
     * @private
     * @param {Function} func The function to cap iteratee arguments for.
     * @param {number} n The arity cap.
     * @returns {Function} Returns the new function.
     */
    function iterateeAry(func, n) {
      return overArg(func, function(func) {
        return typeof func == 'function' ? baseAry(func, n) : func;
      });
    }

    /**
     * Creates a function that wraps `func` to invoke its iteratee with arguments
     * arranged according to the specified `indexes` where the argument value at
     * the first index is provided as the first argument, the argument value at
     * the second index is provided as the second argument, and so on.
     *
     * @private
     * @param {Function} func The function to rearrange iteratee arguments for.
     * @param {number[]} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     */
    function iterateeRearg(func, indexes) {
      return overArg(func, function(func) {
        var n = indexes.length;
        return baseArity(rearg(baseAry(func, n), indexes), n);
      });
    }

    /**
     * Creates a function that invokes `func` with its first argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function() {
        var length = arguments.length;
        if (!length) {
          return func();
        }
        var args = Array(length);
        while (length--) {
          args[length] = arguments[length];
        }
        var index = config.rearg ? 0 : (length - 1);
        args[index] = transform(args[index]);
        return func.apply(undefined, args);
      };
    }

    /**
     * Creates a function that wraps `func` and applys the conversions
     * rules by `name`.
     *
     * @private
     * @param {string} name The name of the function to wrap.
     * @param {Function} func The function to wrap.
     * @returns {Function} Returns the converted function.
     */
    function wrap(name, func, placeholder) {
      var result,
          realName = _mapping.aliasToReal[name] || name,
          wrapped = func,
          wrapper = wrappers[realName];

      if (wrapper) {
        wrapped = wrapper(func);
      }
      else if (config.immutable) {
        if (_mapping.mutate.array[realName]) {
          wrapped = wrapImmutable(func, cloneArray);
        }
        else if (_mapping.mutate.object[realName]) {
          wrapped = wrapImmutable(func, createCloner(func));
        }
        else if (_mapping.mutate.set[realName]) {
          wrapped = wrapImmutable(func, cloneByPath);
        }
      }
      each(aryMethodKeys, function(aryKey) {
        each(_mapping.aryMethod[aryKey], function(otherName) {
          if (realName == otherName) {
            var data = _mapping.methodSpread[realName],
                afterRearg = data && data.afterRearg;

            result = afterRearg
              ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
              : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

            result = castCap(realName, result);
            result = castCurry(realName, result, aryKey);
            return false;
          }
        });
        return !result;
      });

      result || (result = wrapped);
      if (result == func) {
        result = forceCurry ? curry(result, 1) : function() {
          return func.apply(this, arguments);
        };
      }
      result.convert = createConverter(realName, func);
      result.placeholder = func.placeholder = placeholder;

      return result;
    }

    /*--------------------------------------------------------------------------*/

    if (!isObj) {
      return wrap(name, func, defaultHolder);
    }
    var _ = func;

    // Convert methods by ary cap.
    var pairs = [];
    each(aryMethodKeys, function(aryKey) {
      each(_mapping.aryMethod[aryKey], function(key) {
        var func = _[_mapping.remap[key] || key];
        if (func) {
          pairs.push([key, wrap(key, func, _)]);
        }
      });
    });

    // Convert remaining methods.
    each(keys(_), function(key) {
      var func = _[key];
      if (typeof func == 'function') {
        var length = pairs.length;
        while (length--) {
          if (pairs[length][0] == key) {
            return;
          }
        }
        func.convert = createConverter(key, func);
        pairs.push([key, func]);
      }
    });

    // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
    each(pairs, function(pair) {
      _[pair[0]] = pair[1];
    });

    _.convert = convertLib;
    _.placeholder = _;

    // Assign aliases.
    each(keys(_), function(key) {
      each(_mapping.realToAlias[key] || [], function(alias) {
        _[alias] = _[key];
      });
    });

    return _;
  }

  var _baseConvert = baseConvert;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$h = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$e = objectProto$h.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$h.toString;

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$e.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$g = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$g.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$1(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject$1;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction$1(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction$1;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$f = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$d = objectProto$f.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$d).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var WeakMap = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap;

  /** Used to store function metadata. */
  var metaMap = _WeakMap && new _WeakMap;

  var _metaMap = metaMap;

  /**
   * The base implementation of `setData` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var baseSetData = !_metaMap ? identity_1 : function(func, data) {
    _metaMap.set(func, data);
    return func;
  };

  var _baseSetData = baseSetData;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /**
   * Creates a function that produces an instance of `Ctor` regardless of
   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
   *
   * @private
   * @param {Function} Ctor The constructor to wrap.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCtor(Ctor) {
    return function() {
      // Use a `switch` statement to work with class constructors. See
      // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
      // for more details.
      var args = arguments;
      switch (args.length) {
        case 0: return new Ctor;
        case 1: return new Ctor(args[0]);
        case 2: return new Ctor(args[0], args[1]);
        case 3: return new Ctor(args[0], args[1], args[2]);
        case 4: return new Ctor(args[0], args[1], args[2], args[3]);
        case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
        case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      }
      var thisBinding = _baseCreate(Ctor.prototype),
          result = Ctor.apply(thisBinding, args);

      // Mimic the constructor's `return` behavior.
      // See https://es5.github.io/#x13.2.2 for more details.
      return isObject_1(result) ? result : thisBinding;
    };
  }

  var _createCtor = createCtor;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$6 = 1;

  /**
   * Creates a function that wraps `func` to invoke it with the optional `this`
   * binding of `thisArg`.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createBind(func, bitmask, thisArg) {
    var isBind = bitmask & WRAP_BIND_FLAG$6,
        Ctor = _createCtor(func);

    function wrapper() {
      var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(isBind ? thisArg : this, arguments);
    }
    return wrapper;
  }

  var _createBind = createBind;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$3 = Math.max;

  /**
   * Creates an array that is the composition of partially applied arguments,
   * placeholders, and provided arguments into a single array of arguments.
   *
   * @private
   * @param {Array} args The provided arguments.
   * @param {Array} partials The arguments to prepend to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @params {boolean} [isCurried] Specify composing for a curried function.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgs(args, partials, holders, isCurried) {
    var argsIndex = -1,
        argsLength = args.length,
        holdersLength = holders.length,
        leftIndex = -1,
        leftLength = partials.length,
        rangeLength = nativeMax$3(argsLength - holdersLength, 0),
        result = Array(leftLength + rangeLength),
        isUncurried = !isCurried;

    while (++leftIndex < leftLength) {
      result[leftIndex] = partials[leftIndex];
    }
    while (++argsIndex < holdersLength) {
      if (isUncurried || argsIndex < argsLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
    }
    while (rangeLength--) {
      result[leftIndex++] = args[argsIndex++];
    }
    return result;
  }

  var _composeArgs = composeArgs;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$2 = Math.max;

  /**
   * This function is like `composeArgs` except that the arguments composition
   * is tailored for `_.partialRight`.
   *
   * @private
   * @param {Array} args The provided arguments.
   * @param {Array} partials The arguments to append to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @params {boolean} [isCurried] Specify composing for a curried function.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgsRight(args, partials, holders, isCurried) {
    var argsIndex = -1,
        argsLength = args.length,
        holdersIndex = -1,
        holdersLength = holders.length,
        rightIndex = -1,
        rightLength = partials.length,
        rangeLength = nativeMax$2(argsLength - holdersLength, 0),
        result = Array(rangeLength + rightLength),
        isUncurried = !isCurried;

    while (++argsIndex < rangeLength) {
      result[argsIndex] = args[argsIndex];
    }
    var offset = argsIndex;
    while (++rightIndex < rightLength) {
      result[offset + rightIndex] = partials[rightIndex];
    }
    while (++holdersIndex < holdersLength) {
      if (isUncurried || argsIndex < argsLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
    }
    return result;
  }

  var _composeArgsRight = composeArgsRight;

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  var _countHolders = countHolders;

  /**
   * The function whose prototype chain sequence wrappers inherit from.
   *
   * @private
   */
  function baseLodash() {
    // No operation performed.
  }

  var _baseLodash = baseLodash;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /**
   * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
   *
   * @private
   * @constructor
   * @param {*} value The value to wrap.
   */
  function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = MAX_ARRAY_LENGTH;
    this.__views__ = [];
  }

  // Ensure `LazyWrapper` is an instance of `baseLodash`.
  LazyWrapper.prototype = _baseCreate(_baseLodash.prototype);
  LazyWrapper.prototype.constructor = LazyWrapper;

  var _LazyWrapper = LazyWrapper;

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop$1() {
    // No operation performed.
  }

  var noop_1 = noop$1;

  /**
   * Gets metadata for `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {*} Returns the metadata for `func`.
   */
  var getData = !_metaMap ? noop_1 : function(func) {
    return _metaMap.get(func);
  };

  var _getData = getData;

  /** Used to lookup unminified function names. */
  var realNames = {};

  var _realNames = realNames;

  /** Used for built-in method references. */
  var objectProto$e = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$e.hasOwnProperty;

  /**
   * Gets the name of `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {string} Returns the function name.
   */
  function getFuncName(func) {
    var result = (func.name + ''),
        array = _realNames[result],
        length = hasOwnProperty$c.call(_realNames, result) ? array.length : 0;

    while (length--) {
      var data = array[length],
          otherFunc = data.func;
      if (otherFunc == null || otherFunc == func) {
        return data.name;
      }
    }
    return result;
  }

  var _getFuncName = getFuncName;

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable explicit method chain sequences.
   */
  function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
  }

  LodashWrapper.prototype = _baseCreate(_baseLodash.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  var _LodashWrapper = LodashWrapper;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray$1 = Array.isArray;

  var isArray_1 = isArray$1;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /**
   * Creates a clone of `wrapper`.
   *
   * @private
   * @param {Object} wrapper The wrapper to clone.
   * @returns {Object} Returns the cloned wrapper.
   */
  function wrapperClone(wrapper) {
    if (wrapper instanceof _LazyWrapper) {
      return wrapper.clone();
    }
    var result = new _LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
    result.__actions__ = _copyArray(wrapper.__actions__);
    result.__index__  = wrapper.__index__;
    result.__values__ = wrapper.__values__;
    return result;
  }

  var _wrapperClone = wrapperClone;

  /** Used for built-in method references. */
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chain sequences. Methods that operate on and return arrays, collections,
   * and functions can be chained together. Methods that retrieve a single value
   * or may return a primitive value will automatically end the chain sequence
   * and return the unwrapped value. Otherwise, the value must be unwrapped
   * with `_#value`.
   *
   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
   * enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion.
   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
   * the creation of intermediate arrays and can greatly reduce the number of
   * iteratee executions. Sections of a chain sequence qualify for shortcut
   * fusion if the section is applied to an array and iteratees accept only
   * one argument. The heuristic for whether a section qualifies for shortcut
   * fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
   * `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
   * `upperFirst`, `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash(value) {
    if (isObjectLike_1(value) && !isArray_1(value) && !(value instanceof _LazyWrapper)) {
      if (value instanceof _LodashWrapper) {
        return value;
      }
      if (hasOwnProperty$b.call(value, '__wrapped__')) {
        return _wrapperClone(value);
      }
    }
    return new _LodashWrapper(value);
  }

  // Ensure wrappers are instances of `baseLodash`.
  lodash.prototype = _baseLodash.prototype;
  lodash.prototype.constructor = lodash;

  var wrapperLodash = lodash;

  /**
   * Checks if `func` has a lazy counterpart.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
   *  else `false`.
   */
  function isLaziable(func) {
    var funcName = _getFuncName(func),
        other = wrapperLodash[funcName];

    if (typeof other != 'function' || !(funcName in _LazyWrapper.prototype)) {
      return false;
    }
    if (func === other) {
      return true;
    }
    var data = _getData(other);
    return !!data && func === data[0];
  }

  var _isLaziable = isLaziable;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets metadata for `func`.
   *
   * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
   * period of time, it will trip its breaker and transition to an identity
   * function to avoid garbage collection pauses in V8. See
   * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
   * for more details.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var setData = _shortOut(_baseSetData);

  var _setData = setData;

  /** Used to match wrap detail comments. */
  var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /**
   * Extracts wrapper details from the `source` body comment.
   *
   * @private
   * @param {string} source The source to inspect.
   * @returns {Array} Returns the wrapper details.
   */
  function getWrapDetails(source) {
    var match = source.match(reWrapDetails);
    return match ? match[1].split(reSplitDetails) : [];
  }

  var _getWrapDetails = getWrapDetails;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

  /**
   * Inserts wrapper `details` in a comment at the top of the `source` body.
   *
   * @private
   * @param {string} source The source to modify.
   * @returns {Array} details The details to insert.
   * @returns {string} Returns the modified source.
   */
  function insertWrapDetails(source, details) {
    var length = details.length;
    if (!length) {
      return source;
    }
    var lastIndex = length - 1;
    details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
    details = details.join(length > 2 ? ', ' : ' ');
    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
  }

  var _insertWrapDetails = insertWrapDetails;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString);

  var _setToString = setToString;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var _baseFindIndex = baseFindIndex;

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  var _baseIsNaN = baseIsNaN;

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var _strictIndexOf = strictIndexOf;

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? _strictIndexOf(array, value, fromIndex)
      : _baseFindIndex(array, _baseIsNaN, fromIndex);
  }

  var _baseIndexOf = baseIndexOf;

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && _baseIndexOf(array, value, 0) > -1;
  }

  var _arrayIncludes = arrayIncludes;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$5 = 1,
      WRAP_BIND_KEY_FLAG$4 = 2,
      WRAP_CURRY_FLAG$5 = 8,
      WRAP_CURRY_RIGHT_FLAG$2 = 16,
      WRAP_PARTIAL_FLAG$2 = 32,
      WRAP_PARTIAL_RIGHT_FLAG$2 = 64,
      WRAP_ARY_FLAG$3 = 128,
      WRAP_REARG_FLAG$2 = 256,
      WRAP_FLIP_FLAG$1 = 512;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG$3],
    ['bind', WRAP_BIND_FLAG$5],
    ['bindKey', WRAP_BIND_KEY_FLAG$4],
    ['curry', WRAP_CURRY_FLAG$5],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG$2],
    ['flip', WRAP_FLIP_FLAG$1],
    ['partial', WRAP_PARTIAL_FLAG$2],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG$2],
    ['rearg', WRAP_REARG_FLAG$2]
  ];

  /**
   * Updates wrapper `details` based on `bitmask` flags.
   *
   * @private
   * @returns {Array} details The details to modify.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @returns {Array} Returns `details`.
   */
  function updateWrapDetails(details, bitmask) {
    _arrayEach(wrapFlags, function(pair) {
      var value = '_.' + pair[0];
      if ((bitmask & pair[1]) && !_arrayIncludes(details, value)) {
        details.push(value);
      }
    });
    return details.sort();
  }

  var _updateWrapDetails = updateWrapDetails;

  /**
   * Sets the `toString` method of `wrapper` to mimic the source of `reference`
   * with wrapper details in a comment at the top of the source body.
   *
   * @private
   * @param {Function} wrapper The function to modify.
   * @param {Function} reference The reference function.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @returns {Function} Returns `wrapper`.
   */
  function setWrapToString(wrapper, reference, bitmask) {
    var source = (reference + '');
    return _setToString(wrapper, _insertWrapDetails(source, _updateWrapDetails(_getWrapDetails(source), bitmask)));
  }

  var _setWrapToString = setWrapToString;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$4 = 1,
      WRAP_BIND_KEY_FLAG$3 = 2,
      WRAP_CURRY_BOUND_FLAG$1 = 4,
      WRAP_CURRY_FLAG$4 = 8,
      WRAP_PARTIAL_FLAG$1 = 32,
      WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

  /**
   * Creates a function that wraps `func` to continue currying.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {Function} wrapFunc The function to create the `func` wrapper.
   * @param {*} placeholder The placeholder value.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to
   *  the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
    var isCurry = bitmask & WRAP_CURRY_FLAG$4,
        newHolders = isCurry ? holders : undefined,
        newHoldersRight = isCurry ? undefined : holders,
        newPartials = isCurry ? partials : undefined,
        newPartialsRight = isCurry ? undefined : partials;

    bitmask |= (isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1);
    bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

    if (!(bitmask & WRAP_CURRY_BOUND_FLAG$1)) {
      bitmask &= ~(WRAP_BIND_FLAG$4 | WRAP_BIND_KEY_FLAG$3);
    }
    var newData = [
      func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
      newHoldersRight, argPos, ary, arity
    ];

    var result = wrapFunc.apply(undefined, newData);
    if (_isLaziable(func)) {
      _setData(result, newData);
    }
    result.placeholder = placeholder;
    return _setWrapToString(result, func, bitmask);
  }

  var _createRecurry = createRecurry;

  /**
   * Gets the argument placeholder value for `func`.
   *
   * @private
   * @param {Function} func The function to inspect.
   * @returns {*} Returns the placeholder value.
   */
  function getHolder(func) {
    var object = func;
    return object.placeholder;
  }

  var _getHolder = getHolder;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin$1 = Math.min;

  /**
   * Reorder `array` according to the specified indexes where the element at
   * the first index is assigned as the first element, the element at
   * the second index is assigned as the second element, and so on.
   *
   * @private
   * @param {Array} array The array to reorder.
   * @param {Array} indexes The arranged array indexes.
   * @returns {Array} Returns `array`.
   */
  function reorder(array, indexes) {
    var arrLength = array.length,
        length = nativeMin$1(indexes.length, arrLength),
        oldArray = _copyArray(array);

    while (length--) {
      var index = indexes[length];
      array[length] = _isIndex(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
  }

  var _reorder = reorder;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER$1 = '__lodash_placeholder__';

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER$1) {
        array[index] = PLACEHOLDER$1;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  var _replaceHolders = replaceHolders;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$3 = 1,
      WRAP_BIND_KEY_FLAG$2 = 2,
      WRAP_CURRY_FLAG$3 = 8,
      WRAP_CURRY_RIGHT_FLAG$1 = 16,
      WRAP_ARY_FLAG$2 = 128,
      WRAP_FLIP_FLAG = 512;

  /**
   * Creates a function that wraps `func` to invoke it with optional `this`
   * binding of `thisArg`, partial application, and currying.
   *
   * @private
   * @param {Function|string} func The function or method name to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to
   *  the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [partialsRight] The arguments to append to those provided
   *  to the new function.
   * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & WRAP_ARY_FLAG$2,
        isBind = bitmask & WRAP_BIND_FLAG$3,
        isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
        isCurried = bitmask & (WRAP_CURRY_FLAG$3 | WRAP_CURRY_RIGHT_FLAG$1),
        isFlip = bitmask & WRAP_FLIP_FLAG,
        Ctor = isBindKey ? undefined : _createCtor(func);

    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length;

      while (index--) {
        args[index] = arguments[index];
      }
      if (isCurried) {
        var placeholder = _getHolder(wrapper),
            holdersCount = _countHolders(args, placeholder);
      }
      if (partials) {
        args = _composeArgs(args, partials, holders, isCurried);
      }
      if (partialsRight) {
        args = _composeArgsRight(args, partialsRight, holdersRight, isCurried);
      }
      length -= holdersCount;
      if (isCurried && length < arity) {
        var newHolders = _replaceHolders(args, placeholder);
        return _createRecurry(
          func, bitmask, createHybrid, wrapper.placeholder, thisArg,
          args, newHolders, argPos, ary, arity - length
        );
      }
      var thisBinding = isBind ? thisArg : this,
          fn = isBindKey ? thisBinding[func] : func;

      length = args.length;
      if (argPos) {
        args = _reorder(args, argPos);
      } else if (isFlip && length > 1) {
        args.reverse();
      }
      if (isAry && ary < length) {
        args.length = ary;
      }
      if (this && this !== _root && this instanceof wrapper) {
        fn = Ctor || _createCtor(fn);
      }
      return fn.apply(thisBinding, args);
    }
    return wrapper;
  }

  var _createHybrid = createHybrid;

  /**
   * Creates a function that wraps `func` to enable currying.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {number} arity The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCurry(func, bitmask, arity) {
    var Ctor = _createCtor(func);

    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length,
          placeholder = _getHolder(wrapper);

      while (index--) {
        args[index] = arguments[index];
      }
      var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
        ? []
        : _replaceHolders(args, placeholder);

      length -= holders.length;
      if (length < arity) {
        return _createRecurry(
          func, bitmask, _createHybrid, wrapper.placeholder, undefined,
          args, holders, undefined, undefined, arity - length);
      }
      var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
      return _apply(fn, this, args);
    }
    return wrapper;
  }

  var _createCurry = createCurry;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$2 = 1;

  /**
   * Creates a function that wraps `func` to invoke it with the `this` binding
   * of `thisArg` and `partials` prepended to the arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to
   *  the new function.
   * @returns {Function} Returns the new wrapped function.
   */
  function createPartial(func, bitmask, thisArg, partials) {
    var isBind = bitmask & WRAP_BIND_FLAG$2,
        Ctor = _createCtor(func);

    function wrapper() {
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(leftLength + argsLength),
          fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      return _apply(fn, isBind ? thisArg : this, args);
    }
    return wrapper;
  }

  var _createPartial = createPartial;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$1 = 1,
      WRAP_BIND_KEY_FLAG$1 = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG$2 = 8,
      WRAP_ARY_FLAG$1 = 128,
      WRAP_REARG_FLAG$1 = 256;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Merges the function metadata of `source` into `data`.
   *
   * Merging metadata reduces the number of wrappers used to invoke a function.
   * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
   * may be applied regardless of execution order. Methods like `_.ary` and
   * `_.rearg` modify function arguments, making the order in which they are
   * executed important, preventing the merging of metadata. However, we make
   * an exception for a safe combined case where curried functions have `_.ary`
   * and or `_.rearg` applied.
   *
   * @private
   * @param {Array} data The destination metadata.
   * @param {Array} source The source metadata.
   * @returns {Array} Returns `data`.
   */
  function mergeData(data, source) {
    var bitmask = data[1],
        srcBitmask = source[1],
        newBitmask = bitmask | srcBitmask,
        isCommon = newBitmask < (WRAP_BIND_FLAG$1 | WRAP_BIND_KEY_FLAG$1 | WRAP_ARY_FLAG$1);

    var isCombo =
      ((srcBitmask == WRAP_ARY_FLAG$1) && (bitmask == WRAP_CURRY_FLAG$2)) ||
      ((srcBitmask == WRAP_ARY_FLAG$1) && (bitmask == WRAP_REARG_FLAG$1) && (data[7].length <= source[8])) ||
      ((srcBitmask == (WRAP_ARY_FLAG$1 | WRAP_REARG_FLAG$1)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG$2));

    // Exit early if metadata can't be merged.
    if (!(isCommon || isCombo)) {
      return data;
    }
    // Use source `thisArg` if available.
    if (srcBitmask & WRAP_BIND_FLAG$1) {
      data[2] = source[2];
      // Set when currying a bound function.
      newBitmask |= bitmask & WRAP_BIND_FLAG$1 ? 0 : WRAP_CURRY_BOUND_FLAG;
    }
    // Compose partial arguments.
    var value = source[3];
    if (value) {
      var partials = data[3];
      data[3] = partials ? _composeArgs(partials, value, source[4]) : value;
      data[4] = partials ? _replaceHolders(data[3], PLACEHOLDER) : source[4];
    }
    // Compose partial right arguments.
    value = source[5];
    if (value) {
      partials = data[5];
      data[5] = partials ? _composeArgsRight(partials, value, source[6]) : value;
      data[6] = partials ? _replaceHolders(data[5], PLACEHOLDER) : source[6];
    }
    // Use source `argPos` if available.
    value = source[7];
    if (value) {
      data[7] = value;
    }
    // Use source `ary` if it's smaller.
    if (srcBitmask & WRAP_ARY_FLAG$1) {
      data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
    }
    // Use source `arity` if one is not provided.
    if (data[9] == null) {
      data[9] = source[9];
    }
    // Use source `func` and merge bitmasks.
    data[0] = source[0];
    data[1] = newBitmask;

    return data;
  }

  var _mergeData = mergeData;

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var _trimmedEndIndex = trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim(string) {
    return string
      ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  var _baseTrim = baseTrim;

  /** `Object#toString` result references. */
  var symbolTag$3 = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$3);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = _baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Used as references for various `Number` constants. */
  var INFINITY$2 = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber_1(value);
    if (value === INFINITY$2 || value === -INFINITY$2) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  var toFinite_1 = toFinite;

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite_1(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  var toInteger_1 = toInteger;

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_FLAG$1 = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max;

  /**
   * Creates a function that either curries or invokes `func` with optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to wrap.
   * @param {number} bitmask The bitmask flags.
   *    1 - `_.bind`
   *    2 - `_.bindKey`
   *    4 - `_.curry` or `_.curryRight` of a bound function
   *    8 - `_.curry`
   *   16 - `_.curryRight`
   *   32 - `_.partial`
   *   64 - `_.partialRight`
   *  128 - `_.rearg`
   *  256 - `_.ary`
   *  512 - `_.flip`
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to be partially applied.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
      partials = holders = undefined;
    }
    ary = ary === undefined ? ary : nativeMax$1(toInteger_1(ary), 0);
    arity = arity === undefined ? arity : toInteger_1(arity);
    length -= holders ? holders.length : 0;

    if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
      var partialsRight = partials,
          holdersRight = holders;

      partials = holders = undefined;
    }
    var data = isBindKey ? undefined : _getData(func);

    var newData = [
      func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
      argPos, ary, arity
    ];

    if (data) {
      _mergeData(newData, data);
    }
    func = newData[0];
    bitmask = newData[1];
    thisArg = newData[2];
    partials = newData[3];
    holders = newData[4];
    arity = newData[9] = newData[9] === undefined
      ? (isBindKey ? 0 : func.length)
      : nativeMax$1(newData[9] - length, 0);

    if (!arity && bitmask & (WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG)) {
      bitmask &= ~(WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG);
    }
    if (!bitmask || bitmask == WRAP_BIND_FLAG) {
      var result = _createBind(func, bitmask, thisArg);
    } else if (bitmask == WRAP_CURRY_FLAG$1 || bitmask == WRAP_CURRY_RIGHT_FLAG) {
      result = _createCurry(func, bitmask, arity);
    } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
      result = _createPartial(func, bitmask, thisArg, partials);
    } else {
      result = _createHybrid.apply(undefined, newData);
    }
    var setter = data ? _baseSetData : _setData;
    return _setWrapToString(setter(result, newData), func, bitmask);
  }

  var _createWrap = createWrap;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_ARY_FLAG = 128;

  /**
   * Creates a function that invokes `func`, with up to `n` arguments,
   * ignoring any additional arguments.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to cap arguments for.
   * @param {number} [n=func.length] The arity cap.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the new capped function.
   * @example
   *
   * _.map(['6', '8', '10'], _.ary(parseInt, 1));
   * // => [6, 8, 10]
   */
  function ary(func, n, guard) {
    n = guard ? undefined : n;
    n = (func && n == null) ? func.length : n;
    return _createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
  }

  var ary_1 = ary;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$a.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /** `Object#toString` result references. */
  var argsTag$3 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag$3;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$9.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$2 = '[object Array]',
      boolTag$3 = '[object Boolean]',
      dateTag$3 = '[object Date]',
      errorTag$3 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$5 = '[object Map]',
      numberTag$3 = '[object Number]',
      objectTag$4 = '[object Object]',
      regexpTag$3 = '[object RegExp]',
      setTag$5 = '[object Set]',
      stringTag$3 = '[object String]',
      weakMapTag$3 = '[object WeakMap]';

  var arrayBufferTag$3 = '[object ArrayBuffer]',
      dataViewTag$4 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
  typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
  typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
  typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
  typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] =
  typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] =
  typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] =
  typedArrayTags[errorTag$3] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] =
  typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] =
  typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] =
  typedArrayTags[weakMapTag$3] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray$1 = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray$1;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$8.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object);
  }

  var _baseAssign = baseAssign;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /* Built-in method references that are verified to be native. */
  var Map = _getNative(_root, 'Map');

  var _Map = Map;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? undefined : result;
    }
    return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object);
  }

  var _baseAssignIn = baseAssignIn;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object);
  }

  var _copySymbols = copySymbols;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function(object) {
    var result = [];
    while (object) {
      _arrayPush(result, _getSymbols(object));
      object = _getPrototype(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object);
  }

  var _copySymbolsIn = copySymbolsIn;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set');

  var _Set = Set;

  /** `Object#toString` result references. */
  var mapTag$4 = '[object Map]',
      objectTag$3 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$4 = '[object Set]',
      weakMapTag$2 = '[object WeakMap]';

  var dataViewTag$3 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$3) ||
      (_Map && getTag(new _Map) != mapTag$4) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$4) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$2)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$3 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$3;
          case mapCtorString: return mapTag$4;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$4;
          case weakMapCtorString: return weakMapTag$2;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$3.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray;

  /** Built-in value references. */
  var Uint8Array$1 = _root.Uint8Array;

  var _Uint8Array = Uint8Array$1;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      mapTag$3 = '[object Map]',
      numberTag$2 = '[object Number]',
      regexpTag$2 = '[object RegExp]',
      setTag$3 = '[object Set]',
      stringTag$2 = '[object String]',
      symbolTag$2 = '[object Symbol]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$2 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$2:
        return _cloneArrayBuffer(object);

      case boolTag$2:
      case dateTag$2:
        return new Ctor(+object);

      case dataViewTag$2:
        return _cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return _cloneTypedArray(object, isDeep);

      case mapTag$3:
        return new Ctor;

      case numberTag$2:
      case stringTag$2:
        return new Ctor(object);

      case regexpTag$2:
        return _cloneRegExp(object);

      case setTag$3:
        return new Ctor;

      case symbolTag$2:
        return _cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$2;
  }

  var _baseIsMap = baseIsMap;

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

  var isMap_1 = isMap;

  /** `Object#toString` result references. */
  var setTag$2 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$2;
  }

  var _baseIsSet = baseIsSet;

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

  var isSet_1 = isSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG$1 = 4;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$2 = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      objectTag$2 = '[object Object]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]',
      weakMapTag$1 = '[object WeakMap]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] =
  cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] =
  cloneableTags[boolTag$1] = cloneableTags[dateTag$1] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag$1] =
  cloneableTags[numberTag$1] = cloneableTags[objectTag$2] =
  cloneableTags[regexpTag$1] = cloneableTags[setTag$1] =
  cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag$2] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag$1] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG$1,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject_1(value)) {
      return value;
    }
    var isArr = isArray_1(value);
    if (isArr) {
      result = _initCloneArray(value);
      if (!isDeep) {
        return _copyArray(value, result);
      }
    } else {
      var tag = _getTag(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$2 || tag == argsTag$1 || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : _initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = _initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? _getAllKeysIn : _getAllKeys)
      : (isFlat ? keysIn_1 : keys_1);

    var props = isArr ? undefined : keysFunc(value);
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_SYMBOLS_FLAG = 4;

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    return _baseClone(value, CLONE_SYMBOLS_FLAG);
  }

  var clone_1 = clone;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_CURRY_FLAG = 8;

  /**
   * Creates a function that accepts arguments of `func` and either invokes
   * `func` returning its result, if at least `arity` number of arguments have
   * been provided, or returns a function that accepts the remaining `func`
   * arguments, and so on. The arity of `func` may be specified if `func.length`
   * is not sufficient.
   *
   * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for provided arguments.
   *
   * **Note:** This method doesn't set the "length" property of curried functions.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Function
   * @param {Function} func The function to curry.
   * @param {number} [arity=func.length] The arity of `func`.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the new curried function.
   * @example
   *
   * var abc = function(a, b, c) {
   *   return [a, b, c];
   * };
   *
   * var curried = _.curry(abc);
   *
   * curried(1)(2)(3);
   * // => [1, 2, 3]
   *
   * curried(1, 2)(3);
   * // => [1, 2, 3]
   *
   * curried(1, 2, 3);
   * // => [1, 2, 3]
   *
   * // Curried with placeholders.
   * curried(1)(_, 3)(2);
   * // => [1, 2, 3]
   */
  function curry(func, arity, guard) {
    arity = guard ? undefined : arity;
    var result = _createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
    result.placeholder = curry.placeholder;
    return result;
  }

  // Assign default placeholders.
  curry.placeholder = {};

  var curry_1 = curry;

  /** `Object#toString` result references. */
  var objectTag$1 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject$1(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$1) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject$1;

  /** `Object#toString` result references. */
  var domExcTag = '[object DOMException]',
      errorTag$1 = '[object Error]';

  /**
   * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
   * `SyntaxError`, `TypeError`, or `URIError` object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
   * @example
   *
   * _.isError(new Error);
   * // => true
   *
   * _.isError(Error);
   * // => false
   */
  function isError(value) {
    if (!isObjectLike_1(value)) {
      return false;
    }
    var tag = _baseGetTag(value);
    return tag == errorTag$1 || tag == domExcTag ||
      (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject_1(value));
  }

  var isError_1 = isError;

  /** `Object#toString` result references. */
  var weakMapTag = '[object WeakMap]';

  /**
   * Checks if `value` is classified as a `WeakMap` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
   * @example
   *
   * _.isWeakMap(new WeakMap);
   * // => true
   *
   * _.isWeakMap(new Map);
   * // => false
   */
  function isWeakMap(value) {
    return isObjectLike_1(value) && _getTag(value) == weakMapTag;
  }

  var isWeakMap_1 = isWeakMap;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  var _setCacheAdd = setCacheAdd;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new _MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
  SetCache.prototype.has = _setCacheHas;

  var _SetCache = SetCache;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  var _arraySome = arraySome;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Check that cyclic values are equal.
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new _SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!_arraySome(other, function(othValue, othIndex) {
              if (!_cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag:
        var convert = _mapToArray;

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
        convert || (convert = _setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$2;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  var _equalByTag = equalByTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
        objProps = _getAllKeys(object),
        objLength = objProps.length,
        othProps = _getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
        return false;
      }
    }
    // Check that cyclic values are equal.
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      objectTag = '[object Object]';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_1(object),
        othIsArr = isArray_1(other),
        objTag = objIsArr ? arrayTag : _getTag(object),
        othTag = othIsArr ? arrayTag : _getTag(other);

    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;

    var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer_1(object)) {
      if (!isBuffer_1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack);
      return (objIsArr || isTypedArray_1(object))
        ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new _Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new _Stack);
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
      return value !== value && other !== other;
    }
    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  var _baseIsEqual = baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new _Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  var _baseIsMatch = baseIsMatch;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject_1(value);
  }

  var _isStrictComparable = isStrictComparable;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys_1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, _isStrictComparable(value)];
    }
    return result;
  }

  var _getMatchData = getMatchData;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = _getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || _baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol_1(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  var _isKey = isKey;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = _MapCache;

  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize_1(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = _memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$1(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString$1;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }
    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = _castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) &&
      (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn);
  }

  var hasIn_1 = hasIn;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get_1(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn_1(object, path)
        : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return _baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
  }

  var property_1 = property;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity_1;
    }
    if (typeof value == 'object') {
      return isArray_1(value)
        ? _baseMatchesProperty(value[0], value[1])
        : _baseMatches(value);
    }
    return property_1(value);
  }

  var _baseIteratee = baseIteratee;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1;

  /**
   * Creates a function that invokes `func` with the arguments of the created
   * function. If `func` is a property name, the created function returns the
   * property value for a given element. If `func` is an array or object, the
   * created function returns `true` for elements that contain the equivalent
   * source properties, otherwise it returns `false`.
   *
   * @static
   * @since 4.0.0
   * @memberOf _
   * @category Util
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, _.iteratee(['user', 'fred']));
   * // => [{ 'user': 'fred', 'age': 40 }]
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, _.iteratee('user'));
   * // => ['barney', 'fred']
   *
   * // Create custom iteratee shorthands.
   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
   *     return func.test(string);
   *   };
   * });
   *
   * _.filter(['abc', 'def'], /ef/);
   * // => ['def']
   */
  function iteratee(func) {
    return _baseIteratee(typeof func == 'function' ? func : _baseClone(func, CLONE_DEEP_FLAG));
  }

  var iteratee_1 = iteratee;

  /** Built-in value references. */
  var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray_1(value) || isArguments_1(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  var _isFlattenable = isFlattenable;

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = _isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          _arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  var _baseFlatten = baseFlatten;

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseFlatten(array, 1) : [];
  }

  var flatten_1 = flatten;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return _setToString(_overRest(func, undefined, flatten_1), func + '');
  }

  var _flatRest = flatRest;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_REARG_FLAG = 256;

  /**
   * Creates a function that invokes `func` with arguments arranged according
   * to the specified `indexes` where the argument value at the first index is
   * provided as the first argument, the argument value at the second index is
   * provided as the second argument, and so on.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to rearrange arguments for.
   * @param {...(number|number[])} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var rearged = _.rearg(function(a, b, c) {
   *   return [a, b, c];
   * }, [2, 0, 1]);
   *
   * rearged('b', 'c', 'a')
   * // => ['a', 'b', 'c']
   */
  var rearg = _flatRest(function(func, indexes) {
    return _createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
  });

  var rearg_1 = rearg;

  /**
   * Converts `value` to a property path array.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {*} value The value to convert.
   * @returns {Array} Returns the new property path array.
   * @example
   *
   * _.toPath('a.b.c');
   * // => ['a', 'b', 'c']
   *
   * _.toPath('a[0].b.c');
   * // => ['a', '0', 'b', 'c']
   */
  function toPath(value) {
    if (isArray_1(value)) {
      return _arrayMap(value, _toKey);
    }
    return isSymbol_1(value) ? [value] : _copyArray(_stringToPath(toString_1(value)));
  }

  var toPath_1 = toPath;

  var _util = {
    'ary': ary_1,
    'assign': _baseAssign,
    'clone': clone_1,
    'curry': curry_1,
    'forEach': _arrayEach,
    'isArray': isArray_1,
    'isError': isError_1,
    'isFunction': isFunction_1,
    'isWeakMap': isWeakMap_1,
    'iteratee': iteratee_1,
    'keys': _baseKeys,
    'rearg': rearg_1,
    'toInteger': toInteger_1,
    'toPath': toPath_1
  };

  /**
   * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied. If `name` is an object its methods
   * will be converted.
   *
   * @param {string} name The name of the function to wrap.
   * @param {Function} [func] The function to wrap.
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function|Object} Returns the converted function or object.
   */
  function convert(name, func, options) {
    return _baseConvert(_util, name, func, options);
  }

  var convert_1 = convert;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq_1(object[key], value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;
        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        }
        else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    _baseFor(source, function(srcValue, key) {
      stack || (stack = new _Stack);
      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike_1(object) && _isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq_1(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return _baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge$2 = _createAssigner(function(object, source, srcIndex) {
    _baseMerge(object, source, srcIndex);
  });

  var merge_1 = merge$2;

  var func = convert_1('merge', merge_1);

  func.placeholder = placeholder;
  var merge$1 = func;

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;

  // eslint-disable-next-line func-names
  var kindOf = (function(cache) {
    // eslint-disable-next-line func-names
    return function(thing) {
      var str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
  })(Object.create(null));

  function kindOfTest(type) {
    type = type.toLowerCase();
    return function isKindOf(thing) {
      return kindOf(thing) === type;
    };
  }

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return Array.isArray(val);
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  var isArrayBuffer = kindOfTest('ArrayBuffer');


  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
  function isPlainObject(val) {
    if (kindOf(val) !== 'object') {
      return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }

  /**
   * Determine if a value is a Date
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  var isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  var isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  var isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} thing The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(thing) {
    var pattern = '[object FormData]';
    return thing && (
      (typeof FormData === 'function' && thing instanceof FormData) ||
      toString.call(thing) === pattern ||
      (isFunction(thing.toString) && thing.toString() === pattern)
    );
  }

  /**
   * Determine if a value is a URLSearchParams object
   * @function
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  var isURLSearchParams = kindOfTest('URLSearchParams');

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   */

  function inherits(constructor, superConstructor, props, descriptors) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    props && Object.assign(constructor.prototype, props);
  }

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function} [filter]
   * @returns {Object}
   */

  function toFlatObject(sourceObj, destObj, filter) {
    var props;
    var i;
    var prop;
    var merged = {};

    destObj = destObj || {};

    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if (!merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = Object.getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

    return destObj;
  }

  /*
   * determines whether a string ends with the characters of a specified string
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   * @returns {boolean}
   */
  function endsWith(str, searchString, position) {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    var lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }


  /**
   * Returns new array from array like object
   * @param {*} [thing]
   * @returns {Array}
   */
  function toArray(thing) {
    if (!thing) return null;
    var i = thing.length;
    if (isUndefined(i)) return null;
    var arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  }

  // eslint-disable-next-line func-names
  var isTypedArray = (function(TypedArray) {
    // eslint-disable-next-line func-names
    return function(thing) {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

  var utils = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
    inherits: inherits,
    toFlatObject: toFlatObject,
    kindOf: kindOf,
    kindOfTest: kindOfTest,
    endsWith: endsWith,
    toArray: toArray,
    isTypedArray: isTypedArray,
    isFileList: isFileList
  };

  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }

  utils.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });

  var prototype = AxiosError.prototype;
  var descriptors = {};

  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED'
  // eslint-disable-next-line func-names
  ].forEach(function(code) {
    descriptors[code] = {value: code};
  });

  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype, 'isAxiosError', {value: true});

  // eslint-disable-next-line func-names
  AxiosError.from = function(error, code, config, request, response, customProps) {
    var axiosError = Object.create(prototype);

    utils.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    });

    AxiosError.call(axiosError, error.message, code, config, request, response);

    axiosError.name = error.name;

    customProps && Object.assign(axiosError, customProps);

    return axiosError;
  };

  var AxiosError_1 = AxiosError;

  var transitional = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  transitional.silentJSONParsing;
  transitional.forcedJSONParsing;
  transitional.clarifyTimeoutError;

  /**
   * Convert a data object to FormData
   * @param {Object} obj
   * @param {?Object} [formData]
   * @returns {Object}
   **/

  function toFormData(obj, formData) {
    // eslint-disable-next-line no-param-reassign
    formData = formData || new FormData();

    var stack = [];

    function convertValue(value) {
      if (value === null) return '';

      if (utils.isDate(value)) {
        return value.toISOString();
      }

      if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
        return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }

      return value;
    }

    function build(data, parentKey) {
      if (utils.isPlainObject(data) || utils.isArray(data)) {
        if (stack.indexOf(data) !== -1) {
          throw Error('Circular reference detected in ' + parentKey);
        }

        stack.push(data);

        utils.forEach(data, function each(value, key) {
          if (utils.isUndefined(value)) return;
          var fullKey = parentKey ? parentKey + '.' + key : key;
          var arr;

          if (value && !parentKey && typeof value === 'object') {
            if (utils.endsWith(key, '{}')) {
              // eslint-disable-next-line no-param-reassign
              value = JSON.stringify(value);
            } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
              // eslint-disable-next-line func-names
              arr.forEach(function(el) {
                !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
              });
              return;
            }
          }

          build(value, fullKey);
        });

        stack.pop();
      } else {
        formData.append(parentKey, convertValue(data));
      }
    }

    build(obj);

    return formData;
  }

  var toFormData_1 = toFormData;

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_1(
        'Request failed with status code ' + response.status,
        [AxiosError_1.ERR_BAD_REQUEST, AxiosError_1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  };

  var cookies = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })()
  );

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  var buildFullPath = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) { return parsed; }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var isURLSameOrigin = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;

        /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
        function resolveURL(url) {
          var href = url;

          if (msie) {
          // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })()
  );

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function CanceledError(message) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError_1.call(this, message == null ? 'canceled' : message, AxiosError_1.ERR_CANCELED);
    this.name = 'CanceledError';
  }

  utils.inherits(CanceledError, AxiosError_1, {
    __CANCEL__: true
  });

  var CanceledError_1 = CanceledError;

  var parseProtocol = function parseProtocol(url) {
    var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  };

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }

        if (config.signal) {
          config.signal.removeEventListener('abort', onCanceled);
        }
      }

      if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      var fullPath = buildFullPath(config.baseURL, config.url);

      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

      // Set the request timeout in MS
      request.timeout = config.timeout;

      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
          request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new AxiosError_1('Request aborted', AxiosError_1.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError_1('Network Error', AxiosError_1.ERR_NETWORK, config, request, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
        var transitional$1 = config.transitional || transitional;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError_1(
          timeoutErrorMessage,
          transitional$1.clarifyTimeoutError ? AxiosError_1.ETIMEDOUT : AxiosError_1.ECONNABORTED,
          config,
          request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = config.responseType;
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken || config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = function(cancel) {
          if (!request) {
            return;
          }
          reject(!cancel || (cancel && cancel.type) ? new CanceledError_1() : cancel);
          request.abort();
          request = null;
        };

        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
        }
      }

      if (!requestData) {
        requestData = null;
      }

      var protocol = parseProtocol(fullPath);

      if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
        reject(new AxiosError_1('Unsupported protocol ' + protocol + ':', AxiosError_1.ERR_BAD_REQUEST, config));
        return;
      }


      // Send the request
      request.send(requestData);
    });
  };

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

  function setup(env) {
  	createDebug.debug = createDebug;
  	createDebug.default = createDebug;
  	createDebug.coerce = coerce;
  	createDebug.disable = disable;
  	createDebug.enable = enable;
  	createDebug.enabled = enabled;
  	createDebug.humanize = ms;
  	createDebug.destroy = destroy;

  	Object.keys(env).forEach(key => {
  		createDebug[key] = env[key];
  	});

  	/**
  	* The currently active debug mode names, and names to skip.
  	*/

  	createDebug.names = [];
  	createDebug.skips = [];

  	/**
  	* Map of special "%n" handling functions, for the debug "format" argument.
  	*
  	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  	*/
  	createDebug.formatters = {};

  	/**
  	* Selects a color for a debug namespace
  	* @param {String} namespace The namespace string for the debug instance to be colored
  	* @return {Number|String} An ANSI color code for the given namespace
  	* @api private
  	*/
  	function selectColor(namespace) {
  		let hash = 0;

  		for (let i = 0; i < namespace.length; i++) {
  			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
  			hash |= 0; // Convert to 32bit integer
  		}

  		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  	}
  	createDebug.selectColor = selectColor;

  	/**
  	* Create a debugger with the given `namespace`.
  	*
  	* @param {String} namespace
  	* @return {Function}
  	* @api public
  	*/
  	function createDebug(namespace) {
  		let prevTime;
  		let enableOverride = null;
  		let namespacesCache;
  		let enabledCache;

  		function debug(...args) {
  			// Disabled?
  			if (!debug.enabled) {
  				return;
  			}

  			const self = debug;

  			// Set `diff` timestamp
  			const curr = Number(new Date());
  			const ms = curr - (prevTime || curr);
  			self.diff = ms;
  			self.prev = prevTime;
  			self.curr = curr;
  			prevTime = curr;

  			args[0] = createDebug.coerce(args[0]);

  			if (typeof args[0] !== 'string') {
  				// Anything else let's inspect with %O
  				args.unshift('%O');
  			}

  			// Apply any `formatters` transformations
  			let index = 0;
  			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
  				// If we encounter an escaped % then don't increase the array index
  				if (match === '%%') {
  					return '%';
  				}
  				index++;
  				const formatter = createDebug.formatters[format];
  				if (typeof formatter === 'function') {
  					const val = args[index];
  					match = formatter.call(self, val);

  					// Now we need to remove `args[index]` since it's inlined in the `format`
  					args.splice(index, 1);
  					index--;
  				}
  				return match;
  			});

  			// Apply env-specific formatting (colors, etc.)
  			createDebug.formatArgs.call(self, args);

  			const logFn = self.log || createDebug.log;
  			logFn.apply(self, args);
  		}

  		debug.namespace = namespace;
  		debug.useColors = createDebug.useColors();
  		debug.color = createDebug.selectColor(namespace);
  		debug.extend = extend;
  		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

  		Object.defineProperty(debug, 'enabled', {
  			enumerable: true,
  			configurable: false,
  			get: () => {
  				if (enableOverride !== null) {
  					return enableOverride;
  				}
  				if (namespacesCache !== createDebug.namespaces) {
  					namespacesCache = createDebug.namespaces;
  					enabledCache = createDebug.enabled(namespace);
  				}

  				return enabledCache;
  			},
  			set: v => {
  				enableOverride = v;
  			}
  		});

  		// Env-specific initialization logic for debug instances
  		if (typeof createDebug.init === 'function') {
  			createDebug.init(debug);
  		}

  		return debug;
  	}

  	function extend(namespace, delimiter) {
  		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  		newDebug.log = this.log;
  		return newDebug;
  	}

  	/**
  	* Enables a debug mode by namespaces. This can include modes
  	* separated by a colon and wildcards.
  	*
  	* @param {String} namespaces
  	* @api public
  	*/
  	function enable(namespaces) {
  		createDebug.save(namespaces);
  		createDebug.namespaces = namespaces;

  		createDebug.names = [];
  		createDebug.skips = [];

  		let i;
  		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  		const len = split.length;

  		for (i = 0; i < len; i++) {
  			if (!split[i]) {
  				// ignore empty strings
  				continue;
  			}

  			namespaces = split[i].replace(/\*/g, '.*?');

  			if (namespaces[0] === '-') {
  				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
  			} else {
  				createDebug.names.push(new RegExp('^' + namespaces + '$'));
  			}
  		}
  	}

  	/**
  	* Disable debug output.
  	*
  	* @return {String} namespaces
  	* @api public
  	*/
  	function disable() {
  		const namespaces = [
  			...createDebug.names.map(toNamespace),
  			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
  		].join(',');
  		createDebug.enable('');
  		return namespaces;
  	}

  	/**
  	* Returns true if the given mode name is enabled, false otherwise.
  	*
  	* @param {String} name
  	* @return {Boolean}
  	* @api public
  	*/
  	function enabled(name) {
  		if (name[name.length - 1] === '*') {
  			return true;
  		}

  		let i;
  		let len;

  		for (i = 0, len = createDebug.skips.length; i < len; i++) {
  			if (createDebug.skips[i].test(name)) {
  				return false;
  			}
  		}

  		for (i = 0, len = createDebug.names.length; i < len; i++) {
  			if (createDebug.names[i].test(name)) {
  				return true;
  			}
  		}

  		return false;
  	}

  	/**
  	* Convert regexp to namespace
  	*
  	* @param {RegExp} regxep
  	* @return {String} namespace
  	* @api private
  	*/
  	function toNamespace(regexp) {
  		return regexp.toString()
  			.substring(2, regexp.toString().length - 2)
  			.replace(/\.\*\?$/, '*');
  	}

  	/**
  	* Coerce `val`.
  	*
  	* @param {Mixed} val
  	* @return {Mixed}
  	* @api private
  	*/
  	function coerce(val) {
  		if (val instanceof Error) {
  			return val.stack || val.message;
  		}
  		return val;
  	}

  	/**
  	* XXX DO NOT USE. This is a temporary stub function.
  	* XXX It WILL be removed in the next major release.
  	*/
  	function destroy() {
  		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  	}

  	createDebug.enable(createDebug.load());

  	return createDebug;
  }

  var common = setup;

  var browser = createCommonjsModule(function (module, exports) {
  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */

  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
  	let warned = false;

  	return () => {
  		if (!warned) {
  			warned = true;
  			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  		}
  	};
  })();

  /**
   * Colors.
   */

  exports.colors = [
  	'#0000CC',
  	'#0000FF',
  	'#0033CC',
  	'#0033FF',
  	'#0066CC',
  	'#0066FF',
  	'#0099CC',
  	'#0099FF',
  	'#00CC00',
  	'#00CC33',
  	'#00CC66',
  	'#00CC99',
  	'#00CCCC',
  	'#00CCFF',
  	'#3300CC',
  	'#3300FF',
  	'#3333CC',
  	'#3333FF',
  	'#3366CC',
  	'#3366FF',
  	'#3399CC',
  	'#3399FF',
  	'#33CC00',
  	'#33CC33',
  	'#33CC66',
  	'#33CC99',
  	'#33CCCC',
  	'#33CCFF',
  	'#6600CC',
  	'#6600FF',
  	'#6633CC',
  	'#6633FF',
  	'#66CC00',
  	'#66CC33',
  	'#9900CC',
  	'#9900FF',
  	'#9933CC',
  	'#9933FF',
  	'#99CC00',
  	'#99CC33',
  	'#CC0000',
  	'#CC0033',
  	'#CC0066',
  	'#CC0099',
  	'#CC00CC',
  	'#CC00FF',
  	'#CC3300',
  	'#CC3333',
  	'#CC3366',
  	'#CC3399',
  	'#CC33CC',
  	'#CC33FF',
  	'#CC6600',
  	'#CC6633',
  	'#CC9900',
  	'#CC9933',
  	'#CCCC00',
  	'#CCCC33',
  	'#FF0000',
  	'#FF0033',
  	'#FF0066',
  	'#FF0099',
  	'#FF00CC',
  	'#FF00FF',
  	'#FF3300',
  	'#FF3333',
  	'#FF3366',
  	'#FF3399',
  	'#FF33CC',
  	'#FF33FF',
  	'#FF6600',
  	'#FF6633',
  	'#FF9900',
  	'#FF9933',
  	'#FFCC00',
  	'#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  // eslint-disable-next-line complexity
  function useColors() {
  	// NB: In an Electron preload script, document will be defined but not fully
  	// initialized. Since we know we're in Chrome, we'll just detect this case
  	// explicitly
  	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
  		return true;
  	}

  	// Internet Explorer and Edge do not support colors.
  	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
  		return false;
  	}

  	// Is webkit? http://stackoverflow.com/a/16459606/376773
  	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
  		// Is firebug? http://stackoverflow.com/a/398120/376773
  		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
  		// Is firefox >= v31?
  		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
  		// Double check webkit in userAgent just in case we are in a worker
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	args[0] = (this.useColors ? '%c' : '') +
  		this.namespace +
  		(this.useColors ? ' %c' : ' ') +
  		args[0] +
  		(this.useColors ? '%c ' : ' ') +
  		'+' + module.exports.humanize(this.diff);

  	if (!this.useColors) {
  		return;
  	}

  	const c = 'color: ' + this.color;
  	args.splice(1, 0, c, 'color: inherit');

  	// The final "%c" is somewhat tricky, because there could be other
  	// arguments passed either before or after the %c, so we need to
  	// figure out the correct index to insert the CSS into
  	let index = 0;
  	let lastC = 0;
  	args[0].replace(/%[a-zA-Z%]/g, match => {
  		if (match === '%%') {
  			return;
  		}
  		index++;
  		if (match === '%c') {
  			// We only are interested in the *last* %c
  			// (the user may have provided their own)
  			lastC = index;
  		}
  	});

  	args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.debug()` when available.
   * No-op when `console.debug` is not a "function".
   * If `console.debug` is not available, falls back
   * to `console.log`.
   *
   * @api public
   */
  exports.log = console.debug || console.log || (() => {});

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	try {
  		if (namespaces) {
  			exports.storage.setItem('debug', namespaces);
  		} else {
  			exports.storage.removeItem('debug');
  		}
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */
  function load() {
  	let r;
  	try {
  		r = exports.storage.getItem('debug');
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}

  	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  	if (!r && typeof process !== 'undefined' && 'env' in process) {
  		r = process.env.DEBUG;
  	}

  	return r;
  }

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
  	try {
  		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
  		// The Browser also has localStorage in the global context.
  		return localStorage;
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
  	try {
  		return JSON.stringify(v);
  	} catch (error) {
  		return '[UnexpectedJSONParseError]: ' + error.message;
  	}
  };
  });
  browser.formatArgs;
  browser.save;
  browser.load;
  browser.useColors;
  browser.storage;
  browser.destroy;
  browser.colors;
  browser.log;

  var hasFlag = (flag, argv) => {
  	argv = argv || process.argv;
  	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
  	const pos = argv.indexOf(prefix + flag);
  	const terminatorPos = argv.indexOf('--');
  	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };

  const env = process.env;

  let forceColor;
  if (hasFlag('no-color') ||
  	hasFlag('no-colors') ||
  	hasFlag('color=false')) {
  	forceColor = false;
  } else if (hasFlag('color') ||
  	hasFlag('colors') ||
  	hasFlag('color=true') ||
  	hasFlag('color=always')) {
  	forceColor = true;
  }
  if ('FORCE_COLOR' in env) {
  	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
  }

  function translateLevel(level) {
  	if (level === 0) {
  		return false;
  	}

  	return {
  		level,
  		hasBasic: true,
  		has256: level >= 2,
  		has16m: level >= 3
  	};
  }

  function supportsColor(stream) {
  	if (forceColor === false) {
  		return 0;
  	}

  	if (hasFlag('color=16m') ||
  		hasFlag('color=full') ||
  		hasFlag('color=truecolor')) {
  		return 3;
  	}

  	if (hasFlag('color=256')) {
  		return 2;
  	}

  	if (stream && !stream.isTTY && forceColor !== true) {
  		return 0;
  	}

  	const min = forceColor ? 1 : 0;

  	if (process.platform === 'win32') {
  		// Node.js 7.5.0 is the first version of Node.js to include a patch to
  		// libuv that enables 256 color output on Windows. Anything earlier and it
  		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
  		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
  		// release that supports 256 colors. Windows 10 build 14931 is the first release
  		// that supports 16m/TrueColor.
  		const osRelease = os__default["default"].release().split('.');
  		if (
  			Number(process.versions.node.split('.')[0]) >= 8 &&
  			Number(osRelease[0]) >= 10 &&
  			Number(osRelease[2]) >= 10586
  		) {
  			return Number(osRelease[2]) >= 14931 ? 3 : 2;
  		}

  		return 1;
  	}

  	if ('CI' in env) {
  		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
  			return 1;
  		}

  		return min;
  	}

  	if ('TEAMCITY_VERSION' in env) {
  		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  	}

  	if (env.COLORTERM === 'truecolor') {
  		return 3;
  	}

  	if ('TERM_PROGRAM' in env) {
  		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

  		switch (env.TERM_PROGRAM) {
  			case 'iTerm.app':
  				return version >= 3 ? 3 : 2;
  			case 'Apple_Terminal':
  				return 2;
  			// No default
  		}
  	}

  	if (/-256(color)?$/i.test(env.TERM)) {
  		return 2;
  	}

  	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
  		return 1;
  	}

  	if ('COLORTERM' in env) {
  		return 1;
  	}

  	if (env.TERM === 'dumb') {
  		return min;
  	}

  	return min;
  }

  function getSupportLevel(stream) {
  	const level = supportsColor(stream);
  	return translateLevel(level);
  }

  var supportsColor_1 = {
  	supportsColor: getSupportLevel,
  	stdout: getSupportLevel(process.stdout),
  	stderr: getSupportLevel(process.stderr)
  };
  supportsColor_1.supportsColor;
  supportsColor_1.stdout;
  supportsColor_1.stderr;

  var node = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   */

  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.destroy = util__default["default"].deprecate(
  	() => {},
  	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
  );

  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1];

  try {
  	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  	// eslint-disable-next-line import/no-extraneous-dependencies
  	const supportsColor = supportsColor_1;

  	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
  		exports.colors = [
  			20,
  			21,
  			26,
  			27,
  			32,
  			33,
  			38,
  			39,
  			40,
  			41,
  			42,
  			43,
  			44,
  			45,
  			56,
  			57,
  			62,
  			63,
  			68,
  			69,
  			74,
  			75,
  			76,
  			77,
  			78,
  			79,
  			80,
  			81,
  			92,
  			93,
  			98,
  			99,
  			112,
  			113,
  			128,
  			129,
  			134,
  			135,
  			148,
  			149,
  			160,
  			161,
  			162,
  			163,
  			164,
  			165,
  			166,
  			167,
  			168,
  			169,
  			170,
  			171,
  			172,
  			173,
  			178,
  			179,
  			184,
  			185,
  			196,
  			197,
  			198,
  			199,
  			200,
  			201,
  			202,
  			203,
  			204,
  			205,
  			206,
  			207,
  			208,
  			209,
  			214,
  			215,
  			220,
  			221
  		];
  	}
  } catch (error) {
  	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(key => {
  	return /^debug_/i.test(key);
  }).reduce((obj, key) => {
  	// Camel-case
  	const prop = key
  		.substring(6)
  		.toLowerCase()
  		.replace(/_([a-z])/g, (_, k) => {
  			return k.toUpperCase();
  		});

  	// Coerce string value into JS value
  	let val = process.env[key];
  	if (/^(yes|on|true|enabled)$/i.test(val)) {
  		val = true;
  	} else if (/^(no|off|false|disabled)$/i.test(val)) {
  		val = false;
  	} else if (val === 'null') {
  		val = null;
  	} else {
  		val = Number(val);
  	}

  	obj[prop] = val;
  	return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
  	return 'colors' in exports.inspectOpts ?
  		Boolean(exports.inspectOpts.colors) :
  		tty__default["default"].isatty(process.stderr.fd);
  }

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	const {namespace: name, useColors} = this;

  	if (useColors) {
  		const c = this.color;
  		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
  		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

  		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
  		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
  	} else {
  		args[0] = getDate() + name + ' ' + args[0];
  	}
  }

  function getDate() {
  	if (exports.inspectOpts.hideDate) {
  		return '';
  	}
  	return new Date().toISOString() + ' ';
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log(...args) {
  	return process.stderr.write(util__default["default"].format(...args) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	if (namespaces) {
  		process.env.DEBUG = namespaces;
  	} else {
  		// If you set a process.env field to null or undefined, it gets cast to the
  		// string 'null' or 'undefined'. Just delete instead.
  		delete process.env.DEBUG;
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
  	return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init(debug) {
  	debug.inspectOpts = {};

  	const keys = Object.keys(exports.inspectOpts);
  	for (let i = 0; i < keys.length; i++) {
  		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  formatters.o = function (v) {
  	this.inspectOpts.colors = this.useColors;
  	return util__default["default"].inspect(v, this.inspectOpts)
  		.split('\n')
  		.map(str => str.trim())
  		.join(' ');
  };

  /**
   * Map %O to `util.inspect()`, allowing multiple lines if needed.
   */

  formatters.O = function (v) {
  	this.inspectOpts.colors = this.useColors;
  	return util__default["default"].inspect(v, this.inspectOpts);
  };
  });
  node.init;
  node.log;
  node.formatArgs;
  node.save;
  node.load;
  node.useColors;
  node.destroy;
  node.colors;
  node.inspectOpts;

  var src = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer / nwjs process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  	module.exports = browser;
  } else {
  	module.exports = node;
  }
  });

  var debug;

  var debug_1 = function () {
    if (!debug) {
      try {
        /* eslint global-require: off */
        debug = src("follow-redirects");
      }
      catch (error) { /* */ }
      if (typeof debug !== "function") {
        debug = function () { /* */ };
      }
    }
    debug.apply(null, arguments);
  };

  var URL = url__default["default"].URL;


  var Writable = stream__default["default"].Writable;



  // Create handlers that pass events from native requests
  var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
  var eventHandlers = Object.create(null);
  events.forEach(function (event) {
    eventHandlers[event] = function (arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });

  // Error types with codes
  var RedirectionError = createErrorType(
    "ERR_FR_REDIRECTION_FAILURE",
    "Redirected request failed"
  );
  var TooManyRedirectsError = createErrorType(
    "ERR_FR_TOO_MANY_REDIRECTS",
    "Maximum number of redirects exceeded"
  );
  var MaxBodyLengthExceededError = createErrorType(
    "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
    "Request body larger than maxBodyLength limit"
  );
  var WriteAfterEndError = createErrorType(
    "ERR_STREAM_WRITE_AFTER_END",
    "write after end"
  );

  // An HTTP(S) request that can be redirected
  function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];

    // Attach a callback if passed
    if (responseCallback) {
      this.on("response", responseCallback);
    }

    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function (response) {
      self._processResponse(response);
    };

    // Perform the first request
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);

  RedirectableRequest.prototype.abort = function () {
    abortRequest(this._currentRequest);
    this.emit("abort");
  };

  // Writes buffered data to the current native request
  RedirectableRequest.prototype.write = function (data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
      throw new WriteAfterEndError();
    }

    // Validate input and shift parameters if necessary
    if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({ data: data, encoding: encoding });
      this._currentRequest.write(data, encoding, callback);
    }
    // Error when we exceed the maximum body length
    else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };

  // Ends the current native request
  RedirectableRequest.prototype.end = function (data, encoding, callback) {
    // Shift parameters if necessary
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    }
    else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Write data if needed and end
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    }
    else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function () {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };

  // Sets a header value on the current native request
  RedirectableRequest.prototype.setHeader = function (name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };

  // Clears a header value on the current native request
  RedirectableRequest.prototype.removeHeader = function (name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };

  // Global timeout for all underlying requests
  RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
    var self = this;

    // Destroys the socket on timeout
    function destroyOnTimeout(socket) {
      socket.setTimeout(msecs);
      socket.removeListener("timeout", socket.destroy);
      socket.addListener("timeout", socket.destroy);
    }

    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
      if (self._timeout) {
        clearTimeout(self._timeout);
      }
      self._timeout = setTimeout(function () {
        self.emit("timeout");
        clearTimer();
      }, msecs);
      destroyOnTimeout(socket);
    }

    // Stops a timeout from triggering
    function clearTimer() {
      // Clear the timeout
      if (self._timeout) {
        clearTimeout(self._timeout);
        self._timeout = null;
      }

      // Clean up all attached listeners
      self.removeListener("abort", clearTimer);
      self.removeListener("error", clearTimer);
      self.removeListener("response", clearTimer);
      if (callback) {
        self.removeListener("timeout", callback);
      }
      if (!self.socket) {
        self._currentRequest.removeListener("socket", startTimer);
      }
    }

    // Attach callback if passed
    if (callback) {
      this.on("timeout", callback);
    }

    // Start the timer if or when the socket is opened
    if (this.socket) {
      startTimer(this.socket);
    }
    else {
      this._currentRequest.once("socket", startTimer);
    }

    // Clean up on events
    this.on("socket", destroyOnTimeout);
    this.on("abort", clearTimer);
    this.on("error", clearTimer);
    this.on("response", clearTimer);

    return this;
  };

  // Proxy all other public ClientRequest methods
  [
    "flushHeaders", "getHeader",
    "setNoDelay", "setSocketKeepAlive",
  ].forEach(function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b);
    };
  });

  // Proxy all public ClientRequest properties
  ["aborted", "connection", "socket"].forEach(function (property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function () { return this._currentRequest[property]; },
    });
  });

  RedirectableRequest.prototype._sanitizeOptions = function (options) {
    // Ensure headers are always present
    if (!options.headers) {
      options.headers = {};
    }

    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
      // Use hostname if set, because it has precedence
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }

    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      }
      else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };


  // Executes the next native request (initial or redirect)
  RedirectableRequest.prototype._performRequest = function () {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new TypeError("Unsupported protocol " + protocol));
      return;
    }

    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
      var scheme = protocol.slice(0, -1);
      this._options.agent = this._options.agents[scheme];
    }

    // Create the native request and set up its event handlers
    var request = this._currentRequest =
          nativeProtocol.request(this._options, this._onNativeResponse);
    request._redirectable = this;
    for (var event of events) {
      request.on(event, eventHandlers[event]);
    }

    // RFC7230§5.3.1: When making a request directly to an origin server, […]
    // a client MUST send only the absolute path […] as the request-target.
    this._currentUrl = /^\//.test(this._options.path) ?
      url__default["default"].format(this._options) :
      // When making a request to a proxy, […]
      // a client MUST send the target URI in absolute-form […].
      this._currentUrl = this._options.path;

    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
      // Write the request entity and end
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        // Only write if this request has not been redirected yet
        /* istanbul ignore else */
        if (request === self._currentRequest) {
          // Report any write errors
          /* istanbul ignore if */
          if (error) {
            self.emit("error", error);
          }
          // Write the next buffer if there are still left
          else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          }
          // End the request if `end` has been called on us
          else if (self._ended) {
            request.end();
          }
        }
      }());
    }
  };

  // Processes a response from the current native request
  RedirectableRequest.prototype._processResponse = function (response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: statusCode,
      });
    }

    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.

    // If the response is not a redirect; return it as-is
    var location = response.headers.location;
    if (!location || this._options.followRedirects === false ||
        statusCode < 300 || statusCode >= 400) {
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);

      // Clean up
      this._requestBodyBuffers = [];
      return;
    }

    // The response is a redirect, so abort the current request
    abortRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // Store the request headers if applicable
    var requestHeaders;
    var beforeRedirect = this._options.beforeRedirect;
    if (beforeRedirect) {
      requestHeaders = Object.assign({
        // The Host header was set by nativeProtocol.request
        Host: response.req.getHeader("host"),
      }, this._options.headers);
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    var method = this._options.method;
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

    // If the redirect is relative, carry over the host of the last request
    var currentUrlParts = url__default["default"].parse(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
      url__default["default"].format(Object.assign(currentUrlParts, { host: currentHost }));

    // Determine the URL of the redirection
    var redirectUrl;
    try {
      redirectUrl = url__default["default"].resolve(currentUrl, location);
    }
    catch (cause) {
      this.emit("error", new RedirectionError(cause));
      return;
    }

    // Create the redirected request
    debug_1("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url__default["default"].parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop confidential headers when redirecting to a less secure protocol
    // or to a different domain that is not a superdomain
    if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
       redirectUrlParts.protocol !== "https:" ||
       redirectUrlParts.host !== currentHost &&
       !isSubdomain(redirectUrlParts.host, currentHost)) {
      removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof beforeRedirect === "function") {
      var responseDetails = {
        headers: response.headers,
        statusCode: statusCode,
      };
      var requestDetails = {
        url: currentUrl,
        method: method,
        headers: requestHeaders,
      };
      try {
        beforeRedirect(this._options, responseDetails, requestDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      this.emit("error", new RedirectionError(cause));
    }
  };

  // Wraps the key/value object of protocols with redirect functionality
  function wrap(protocols) {
    // Default settings
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024,
    };

    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function (scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

      // Executes a request, following redirects
      function request(input, options, callback) {
        // Parse parameters
        if (typeof input === "string") {
          var urlStr = input;
          try {
            input = urlToOptions(new URL(urlStr));
          }
          catch (err) {
            /* istanbul ignore next */
            input = url__default["default"].parse(urlStr);
          }
        }
        else if (URL && (input instanceof URL)) {
          input = urlToOptions(input);
        }
        else {
          callback = options;
          options = input;
          input = { protocol: protocol };
        }
        if (typeof options === "function") {
          callback = options;
          options = null;
        }

        // Set defaults
        options = Object.assign({
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, input, options);
        options.nativeProtocols = nativeProtocols;

        assert__default["default"].equal(options.protocol, protocol, "protocol mismatch");
        debug_1("options", options);
        return new RedirectableRequest(options, callback);
      }

      // Executes a GET request, following redirects
      function get(input, options, callback) {
        var wrappedRequest = wrappedProtocol.request(input, options, callback);
        wrappedRequest.end();
        return wrappedRequest;
      }

      // Expose the properties on the wrapped protocol
      Object.defineProperties(wrappedProtocol, {
        request: { value: request, configurable: true, enumerable: true, writable: true },
        get: { value: get, configurable: true, enumerable: true, writable: true },
      });
    });
    return exports;
  }

  /* istanbul ignore next */
  function noop() { /* empty */ }

  // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ?
        /* istanbul ignore next */
        urlObject.hostname.slice(1, -1) :
        urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href,
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }

  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return (lastValue === null || typeof lastValue === "undefined") ?
      undefined : String(lastValue).trim();
  }

  function createErrorType(code, defaultMessage) {
    function CustomError(cause) {
      Error.captureStackTrace(this, this.constructor);
      if (!cause) {
        this.message = defaultMessage;
      }
      else {
        this.message = defaultMessage + ": " + cause.message;
        this.cause = cause;
      }
    }
    CustomError.prototype = new Error();
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.name = "Error [" + code + "]";
    CustomError.prototype.code = code;
    return CustomError;
  }

  function abortRequest(request) {
    for (var event of events) {
      request.removeListener(event, eventHandlers[event]);
    }
    request.on("error", noop);
    request.abort();
  }

  function isSubdomain(subdomain, domain) {
    const dot = subdomain.length - domain.length - 1;
    return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
  }

  // Exports
  var followRedirects = wrap({ http: http__default["default"], https: https__default["default"] });
  var wrap_1 = wrap;
  followRedirects.wrap = wrap_1;

  var data = {
    "version": "0.27.2"
  };

  var httpFollow = followRedirects.http;
  var httpsFollow = followRedirects.https;


  var VERSION$1 = data.version;




  var isHttps = /https:?/;

  var supportedProtocols = [ 'http:', 'https:', 'file:' ];

  /**
   *
   * @param {http.ClientRequestArgs} options
   * @param {AxiosProxyConfig} proxy
   * @param {string} location
   */
  function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;

    // Basic proxy authorization
    if (proxy.auth) {
      var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
      options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }

    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
      redirection.headers.host = redirection.host;
      setProxy(redirection, proxy, redirection.href);
    };
  }

  /*eslint consistent-return:0*/
  var http_1 = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }

        if (config.signal) {
          config.signal.removeEventListener('abort', onCanceled);
        }
      }
      var resolve = function resolve(value) {
        done();
        resolvePromise(value);
      };
      var rejected = false;
      var reject = function reject(value) {
        done();
        rejected = true;
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;
      var headerNames = {};

      Object.keys(headers).forEach(function storeLowerName(name) {
        headerNames[name.toLowerCase()] = name;
      });

      // Set User-Agent (required by some servers)
      // See https://github.com/axios/axios/issues/69
      if ('user-agent' in headerNames) {
        // User-Agent is specified; handle case where no UA header is desired
        if (!headers[headerNames['user-agent']]) {
          delete headers[headerNames['user-agent']];
        }
        // Otherwise, use specified value
      } else {
        // Only set header if it hasn't been set in config
        headers['User-Agent'] = 'axios/' + VERSION$1;
      }

      // support for https://www.npmjs.com/package/form-data api
      if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
        Object.assign(headers, data.getHeaders());
      } else if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = Buffer.from(data, 'utf-8');
        } else {
          return reject(new AxiosError_1(
            'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
            AxiosError_1.ERR_BAD_REQUEST,
            config
          ));
        }

        if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
          return reject(new AxiosError_1(
            'Request body larger than maxBodyLength limit',
            AxiosError_1.ERR_BAD_REQUEST,
            config
          ));
        }

        // Add Content-Length header if data exists
        if (!headerNames['content-length']) {
          headers['Content-Length'] = data.length;
        }
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var fullPath = buildFullPath(config.baseURL, config.url);
      var parsed = url__default["default"].parse(fullPath);
      var protocol = parsed.protocol || supportedProtocols[0];

      if (supportedProtocols.indexOf(protocol) === -1) {
        return reject(new AxiosError_1(
          'Unsupported protocol ' + protocol,
          AxiosError_1.ERR_BAD_REQUEST,
          config
        ));
      }

      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }

      if (auth && headerNames.authorization) {
        delete headers[headerNames.authorization];
      }

      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

      try {
        buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, '');
      } catch (err) {
        var customErr = new Error(err.message);
        customErr.config = config;
        customErr.url = config.url;
        customErr.exists = true;
        reject(customErr);
      }

      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method.toUpperCase(),
        headers: headers,
        agent: agent,
        agents: { http: config.httpAgent, https: config.httpsAgent },
        auth: auth
      };

      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }

      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url__default["default"].parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;

          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(',').map(function trim(s) {
              return s.trim();
            });

            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === '*') {
                return true;
              }
              if (proxyElement[0] === '.' &&
                  parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                return true;
              }

              return parsed.hostname === proxyElement;
            });
          }

          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port,
              protocol: parsedProxyUrl.protocol
            };

            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(':');
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }

      if (proxy) {
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
      }

      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? https__default["default"] : http__default["default"];
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        if (config.beforeRedirect) {
          options.beforeRedirect = config.beforeRedirect;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }

      if (config.maxBodyLength > -1) {
        options.maxBodyLength = config.maxBodyLength;
      }

      if (config.insecureHTTPParser) {
        options.insecureHTTPParser = config.insecureHTTPParser;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // uncompress the response body transparently if required
        var stream = res;

        // return the last request in case of redirects
        var lastRequest = res.req || req;


        // if no content, is HEAD request or decompress disabled we should not decompress
        if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
          switch (res.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
          // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib__default["default"].createUnzip());

            // remove the content-encoding in order to not confuse downstream operations
            delete res.headers['content-encoding'];
            break;
          }
        }

        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };

        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          var totalResponseBytes = 0;
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);
            totalResponseBytes += chunk.length;

            // make sure the content length is not over the maxContentLength if specified
            if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
              // stream.destoy() emit aborted event before calling reject() on Node.js v16
              rejected = true;
              stream.destroy();
              reject(new AxiosError_1('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                AxiosError_1.ERR_BAD_RESPONSE, config, lastRequest));
            }
          });

          stream.on('aborted', function handlerStreamAborted() {
            if (rejected) {
              return;
            }
            stream.destroy();
            reject(new AxiosError_1(
              'maxContentLength size of ' + config.maxContentLength + ' exceeded',
              AxiosError_1.ERR_BAD_RESPONSE,
              config,
              lastRequest
            ));
          });

          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(AxiosError_1.from(err, null, config, lastRequest));
          });

          stream.on('end', function handleStreamEnd() {
            try {
              var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
              if (config.responseType !== 'arraybuffer') {
                responseData = responseData.toString(config.responseEncoding);
                if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                  responseData = utils.stripBOM(responseData);
                }
              }
              response.data = responseData;
            } catch (err) {
              reject(AxiosError_1.from(err, null, config, response.request, response));
            }
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        // @todo remove
        // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
        reject(AxiosError_1.from(err, null, config, req));
      });

      // set tcp keep alive to prevent drop connection by peer
      req.on('socket', function handleRequestSocket(socket) {
        // default interval of sending ack packet is 1 minute
        socket.setKeepAlive(true, 1000 * 60);
      });

      // Handle request timeout
      if (config.timeout) {
        // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
        var timeout = parseInt(config.timeout, 10);

        if (isNaN(timeout)) {
          reject(new AxiosError_1(
            'error trying to parse `config.timeout` to int',
            AxiosError_1.ERR_BAD_OPTION_VALUE,
            config,
            req
          ));

          return;
        }

        // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
        // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
        // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
        // And then these socket which be hang up will devoring CPU little by little.
        // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
        req.setTimeout(timeout, function handleRequestTimeout() {
          req.abort();
          var transitional$1 = config.transitional || transitional;
          reject(new AxiosError_1(
            'timeout of ' + timeout + 'ms exceeded',
            transitional$1.clarifyTimeoutError ? AxiosError_1.ETIMEDOUT : AxiosError_1.ECONNABORTED,
            config,
            req
          ));
        });
      }

      if (config.cancelToken || config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = function(cancel) {
          if (req.aborted) return;

          req.abort();
          reject(!cancel || (cancel && cancel.type) ? new CanceledError_1() : cancel);
        };

        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
        }
      }


      // Send the request
      if (utils.isStream(data)) {
        data.on('error', function handleStreamError(err) {
          reject(AxiosError_1.from(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };

  var Stream$2 = stream__default["default"].Stream;


  var delayed_stream = DelayedStream;
  function DelayedStream() {
    this.source = null;
    this.dataSize = 0;
    this.maxDataSize = 1024 * 1024;
    this.pauseStream = true;

    this._maxDataSizeExceeded = false;
    this._released = false;
    this._bufferedEvents = [];
  }
  util__default["default"].inherits(DelayedStream, Stream$2);

  DelayedStream.create = function(source, options) {
    var delayedStream = new this();

    options = options || {};
    for (var option in options) {
      delayedStream[option] = options[option];
    }

    delayedStream.source = source;

    var realEmit = source.emit;
    source.emit = function() {
      delayedStream._handleEmit(arguments);
      return realEmit.apply(source, arguments);
    };

    source.on('error', function() {});
    if (delayedStream.pauseStream) {
      source.pause();
    }

    return delayedStream;
  };

  Object.defineProperty(DelayedStream.prototype, 'readable', {
    configurable: true,
    enumerable: true,
    get: function() {
      return this.source.readable;
    }
  });

  DelayedStream.prototype.setEncoding = function() {
    return this.source.setEncoding.apply(this.source, arguments);
  };

  DelayedStream.prototype.resume = function() {
    if (!this._released) {
      this.release();
    }

    this.source.resume();
  };

  DelayedStream.prototype.pause = function() {
    this.source.pause();
  };

  DelayedStream.prototype.release = function() {
    this._released = true;

    this._bufferedEvents.forEach(function(args) {
      this.emit.apply(this, args);
    }.bind(this));
    this._bufferedEvents = [];
  };

  DelayedStream.prototype.pipe = function() {
    var r = Stream$2.prototype.pipe.apply(this, arguments);
    this.resume();
    return r;
  };

  DelayedStream.prototype._handleEmit = function(args) {
    if (this._released) {
      this.emit.apply(this, args);
      return;
    }

    if (args[0] === 'data') {
      this.dataSize += args[1].length;
      this._checkIfMaxDataSizeExceeded();
    }

    this._bufferedEvents.push(args);
  };

  DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
    if (this._maxDataSizeExceeded) {
      return;
    }

    if (this.dataSize <= this.maxDataSize) {
      return;
    }

    this._maxDataSizeExceeded = true;
    var message =
      'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
    this.emit('error', new Error(message));
  };

  var Stream$1 = stream__default["default"].Stream;


  var combined_stream = CombinedStream;
  function CombinedStream() {
    this.writable = false;
    this.readable = true;
    this.dataSize = 0;
    this.maxDataSize = 2 * 1024 * 1024;
    this.pauseStreams = true;

    this._released = false;
    this._streams = [];
    this._currentStream = null;
    this._insideLoop = false;
    this._pendingNext = false;
  }
  util__default["default"].inherits(CombinedStream, Stream$1);

  CombinedStream.create = function(options) {
    var combinedStream = new this();

    options = options || {};
    for (var option in options) {
      combinedStream[option] = options[option];
    }

    return combinedStream;
  };

  CombinedStream.isStreamLike = function(stream) {
    return (typeof stream !== 'function')
      && (typeof stream !== 'string')
      && (typeof stream !== 'boolean')
      && (typeof stream !== 'number')
      && (!Buffer.isBuffer(stream));
  };

  CombinedStream.prototype.append = function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);

    if (isStreamLike) {
      if (!(stream instanceof delayed_stream)) {
        var newStream = delayed_stream.create(stream, {
          maxDataSize: Infinity,
          pauseStream: this.pauseStreams,
        });
        stream.on('data', this._checkDataSize.bind(this));
        stream = newStream;
      }

      this._handleErrors(stream);

      if (this.pauseStreams) {
        stream.pause();
      }
    }

    this._streams.push(stream);
    return this;
  };

  CombinedStream.prototype.pipe = function(dest, options) {
    Stream$1.prototype.pipe.call(this, dest, options);
    this.resume();
    return dest;
  };

  CombinedStream.prototype._getNext = function() {
    this._currentStream = null;

    if (this._insideLoop) {
      this._pendingNext = true;
      return; // defer call
    }

    this._insideLoop = true;
    try {
      do {
        this._pendingNext = false;
        this._realGetNext();
      } while (this._pendingNext);
    } finally {
      this._insideLoop = false;
    }
  };

  CombinedStream.prototype._realGetNext = function() {
    var stream = this._streams.shift();


    if (typeof stream == 'undefined') {
      this.end();
      return;
    }

    if (typeof stream !== 'function') {
      this._pipeNext(stream);
      return;
    }

    var getStream = stream;
    getStream(function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on('data', this._checkDataSize.bind(this));
        this._handleErrors(stream);
      }

      this._pipeNext(stream);
    }.bind(this));
  };

  CombinedStream.prototype._pipeNext = function(stream) {
    this._currentStream = stream;

    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('end', this._getNext.bind(this));
      stream.pipe(this, {end: false});
      return;
    }

    var value = stream;
    this.write(value);
    this._getNext();
  };

  CombinedStream.prototype._handleErrors = function(stream) {
    var self = this;
    stream.on('error', function(err) {
      self._emitError(err);
    });
  };

  CombinedStream.prototype.write = function(data) {
    this.emit('data', data);
  };

  CombinedStream.prototype.pause = function() {
    if (!this.pauseStreams) {
      return;
    }

    if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
    this.emit('pause');
  };

  CombinedStream.prototype.resume = function() {
    if (!this._released) {
      this._released = true;
      this.writable = true;
      this._getNext();
    }

    if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
    this.emit('resume');
  };

  CombinedStream.prototype.end = function() {
    this._reset();
    this.emit('end');
  };

  CombinedStream.prototype.destroy = function() {
    this._reset();
    this.emit('close');
  };

  CombinedStream.prototype._reset = function() {
    this.writable = false;
    this._streams = [];
    this._currentStream = null;
  };

  CombinedStream.prototype._checkDataSize = function() {
    this._updateDataSize();
    if (this.dataSize <= this.maxDataSize) {
      return;
    }

    var message =
      'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
    this._emitError(new Error(message));
  };

  CombinedStream.prototype._updateDataSize = function() {
    this.dataSize = 0;

    var self = this;
    this._streams.forEach(function(stream) {
      if (!stream.dataSize) {
        return;
      }

      self.dataSize += stream.dataSize;
    });

    if (this._currentStream && this._currentStream.dataSize) {
      this.dataSize += this._currentStream.dataSize;
    }
  };

  CombinedStream.prototype._emitError = function(err) {
    this._reset();
    this.emit('error', err);
  };

  var db = {
  	"application/1d-interleaved-parityfec": {
  	source: "iana"
  },
  	"application/3gpdash-qoe-report+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/3gpp-ims+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/3gpphal+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/3gpphalforms+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/a2l": {
  	source: "iana"
  },
  	"application/ace+cbor": {
  	source: "iana"
  },
  	"application/activemessage": {
  	source: "iana"
  },
  	"application/activity+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-costmap+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-costmapfilter+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-directory+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-endpointcost+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-endpointcostparams+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-endpointprop+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-endpointpropparams+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-error+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-networkmap+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-networkmapfilter+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-updatestreamcontrol+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/alto-updatestreamparams+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/aml": {
  	source: "iana"
  },
  	"application/andrew-inset": {
  	source: "iana",
  	extensions: [
  		"ez"
  	]
  },
  	"application/applefile": {
  	source: "iana"
  },
  	"application/applixware": {
  	source: "apache",
  	extensions: [
  		"aw"
  	]
  },
  	"application/at+jwt": {
  	source: "iana"
  },
  	"application/atf": {
  	source: "iana"
  },
  	"application/atfx": {
  	source: "iana"
  },
  	"application/atom+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"atom"
  	]
  },
  	"application/atomcat+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"atomcat"
  	]
  },
  	"application/atomdeleted+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"atomdeleted"
  	]
  },
  	"application/atomicmail": {
  	source: "iana"
  },
  	"application/atomsvc+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"atomsvc"
  	]
  },
  	"application/atsc-dwd+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"dwd"
  	]
  },
  	"application/atsc-dynamic-event-message": {
  	source: "iana"
  },
  	"application/atsc-held+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"held"
  	]
  },
  	"application/atsc-rdt+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/atsc-rsat+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rsat"
  	]
  },
  	"application/atxml": {
  	source: "iana"
  },
  	"application/auth-policy+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/bacnet-xdd+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/batch-smtp": {
  	source: "iana"
  },
  	"application/bdoc": {
  	compressible: false,
  	extensions: [
  		"bdoc"
  	]
  },
  	"application/beep+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/calendar+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/calendar+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xcs"
  	]
  },
  	"application/call-completion": {
  	source: "iana"
  },
  	"application/cals-1840": {
  	source: "iana"
  },
  	"application/captive+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/cbor": {
  	source: "iana"
  },
  	"application/cbor-seq": {
  	source: "iana"
  },
  	"application/cccex": {
  	source: "iana"
  },
  	"application/ccmp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/ccxml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ccxml"
  	]
  },
  	"application/cdfx+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"cdfx"
  	]
  },
  	"application/cdmi-capability": {
  	source: "iana",
  	extensions: [
  		"cdmia"
  	]
  },
  	"application/cdmi-container": {
  	source: "iana",
  	extensions: [
  		"cdmic"
  	]
  },
  	"application/cdmi-domain": {
  	source: "iana",
  	extensions: [
  		"cdmid"
  	]
  },
  	"application/cdmi-object": {
  	source: "iana",
  	extensions: [
  		"cdmio"
  	]
  },
  	"application/cdmi-queue": {
  	source: "iana",
  	extensions: [
  		"cdmiq"
  	]
  },
  	"application/cdni": {
  	source: "iana"
  },
  	"application/cea": {
  	source: "iana"
  },
  	"application/cea-2018+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/cellml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/cfw": {
  	source: "iana"
  },
  	"application/city+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/clr": {
  	source: "iana"
  },
  	"application/clue+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/clue_info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/cms": {
  	source: "iana"
  },
  	"application/cnrp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/coap-group+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/coap-payload": {
  	source: "iana"
  },
  	"application/commonground": {
  	source: "iana"
  },
  	"application/conference-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/cose": {
  	source: "iana"
  },
  	"application/cose-key": {
  	source: "iana"
  },
  	"application/cose-key-set": {
  	source: "iana"
  },
  	"application/cpl+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"cpl"
  	]
  },
  	"application/csrattrs": {
  	source: "iana"
  },
  	"application/csta+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/cstadata+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/csvm+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/cu-seeme": {
  	source: "apache",
  	extensions: [
  		"cu"
  	]
  },
  	"application/cwt": {
  	source: "iana"
  },
  	"application/cybercash": {
  	source: "iana"
  },
  	"application/dart": {
  	compressible: true
  },
  	"application/dash+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mpd"
  	]
  },
  	"application/dash-patch+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mpp"
  	]
  },
  	"application/dashdelta": {
  	source: "iana"
  },
  	"application/davmount+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"davmount"
  	]
  },
  	"application/dca-rft": {
  	source: "iana"
  },
  	"application/dcd": {
  	source: "iana"
  },
  	"application/dec-dx": {
  	source: "iana"
  },
  	"application/dialog-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/dicom": {
  	source: "iana"
  },
  	"application/dicom+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/dicom+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/dii": {
  	source: "iana"
  },
  	"application/dit": {
  	source: "iana"
  },
  	"application/dns": {
  	source: "iana"
  },
  	"application/dns+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/dns-message": {
  	source: "iana"
  },
  	"application/docbook+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"dbk"
  	]
  },
  	"application/dots+cbor": {
  	source: "iana"
  },
  	"application/dskpp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/dssc+der": {
  	source: "iana",
  	extensions: [
  		"dssc"
  	]
  },
  	"application/dssc+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xdssc"
  	]
  },
  	"application/dvcs": {
  	source: "iana"
  },
  	"application/ecmascript": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"es",
  		"ecma"
  	]
  },
  	"application/edi-consent": {
  	source: "iana"
  },
  	"application/edi-x12": {
  	source: "iana",
  	compressible: false
  },
  	"application/edifact": {
  	source: "iana",
  	compressible: false
  },
  	"application/efi": {
  	source: "iana"
  },
  	"application/elm+json": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/elm+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.cap+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/emergencycalldata.comment+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.control+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.deviceinfo+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.ecall.msd": {
  	source: "iana"
  },
  	"application/emergencycalldata.providerinfo+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.serviceinfo+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.subscriberinfo+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emergencycalldata.veds+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/emma+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"emma"
  	]
  },
  	"application/emotionml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"emotionml"
  	]
  },
  	"application/encaprtp": {
  	source: "iana"
  },
  	"application/epp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/epub+zip": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"epub"
  	]
  },
  	"application/eshop": {
  	source: "iana"
  },
  	"application/exi": {
  	source: "iana",
  	extensions: [
  		"exi"
  	]
  },
  	"application/expect-ct-report+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/express": {
  	source: "iana",
  	extensions: [
  		"exp"
  	]
  },
  	"application/fastinfoset": {
  	source: "iana"
  },
  	"application/fastsoap": {
  	source: "iana"
  },
  	"application/fdt+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"fdt"
  	]
  },
  	"application/fhir+json": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/fhir+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/fido.trusted-apps+json": {
  	compressible: true
  },
  	"application/fits": {
  	source: "iana"
  },
  	"application/flexfec": {
  	source: "iana"
  },
  	"application/font-sfnt": {
  	source: "iana"
  },
  	"application/font-tdpfr": {
  	source: "iana",
  	extensions: [
  		"pfr"
  	]
  },
  	"application/font-woff": {
  	source: "iana",
  	compressible: false
  },
  	"application/framework-attributes+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/geo+json": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"geojson"
  	]
  },
  	"application/geo+json-seq": {
  	source: "iana"
  },
  	"application/geopackage+sqlite3": {
  	source: "iana"
  },
  	"application/geoxacml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/gltf-buffer": {
  	source: "iana"
  },
  	"application/gml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"gml"
  	]
  },
  	"application/gpx+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"gpx"
  	]
  },
  	"application/gxf": {
  	source: "apache",
  	extensions: [
  		"gxf"
  	]
  },
  	"application/gzip": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"gz"
  	]
  },
  	"application/h224": {
  	source: "iana"
  },
  	"application/held+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/hjson": {
  	extensions: [
  		"hjson"
  	]
  },
  	"application/http": {
  	source: "iana"
  },
  	"application/hyperstudio": {
  	source: "iana",
  	extensions: [
  		"stk"
  	]
  },
  	"application/ibe-key-request+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/ibe-pkg-reply+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/ibe-pp-data": {
  	source: "iana"
  },
  	"application/iges": {
  	source: "iana"
  },
  	"application/im-iscomposing+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/index": {
  	source: "iana"
  },
  	"application/index.cmd": {
  	source: "iana"
  },
  	"application/index.obj": {
  	source: "iana"
  },
  	"application/index.response": {
  	source: "iana"
  },
  	"application/index.vnd": {
  	source: "iana"
  },
  	"application/inkml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ink",
  		"inkml"
  	]
  },
  	"application/iotp": {
  	source: "iana"
  },
  	"application/ipfix": {
  	source: "iana",
  	extensions: [
  		"ipfix"
  	]
  },
  	"application/ipp": {
  	source: "iana"
  },
  	"application/isup": {
  	source: "iana"
  },
  	"application/its+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"its"
  	]
  },
  	"application/java-archive": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"jar",
  		"war",
  		"ear"
  	]
  },
  	"application/java-serialized-object": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"ser"
  	]
  },
  	"application/java-vm": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"class"
  	]
  },
  	"application/javascript": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"js",
  		"mjs"
  	]
  },
  	"application/jf2feed+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/jose": {
  	source: "iana"
  },
  	"application/jose+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/jrd+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/jscalendar+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/json": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"json",
  		"map"
  	]
  },
  	"application/json-patch+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/json-seq": {
  	source: "iana"
  },
  	"application/json5": {
  	extensions: [
  		"json5"
  	]
  },
  	"application/jsonml+json": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"jsonml"
  	]
  },
  	"application/jwk+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/jwk-set+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/jwt": {
  	source: "iana"
  },
  	"application/kpml-request+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/kpml-response+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/ld+json": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"jsonld"
  	]
  },
  	"application/lgr+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"lgr"
  	]
  },
  	"application/link-format": {
  	source: "iana"
  },
  	"application/load-control+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/lost+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"lostxml"
  	]
  },
  	"application/lostsync+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/lpf+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/lxf": {
  	source: "iana"
  },
  	"application/mac-binhex40": {
  	source: "iana",
  	extensions: [
  		"hqx"
  	]
  },
  	"application/mac-compactpro": {
  	source: "apache",
  	extensions: [
  		"cpt"
  	]
  },
  	"application/macwriteii": {
  	source: "iana"
  },
  	"application/mads+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mads"
  	]
  },
  	"application/manifest+json": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"webmanifest"
  	]
  },
  	"application/marc": {
  	source: "iana",
  	extensions: [
  		"mrc"
  	]
  },
  	"application/marcxml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mrcx"
  	]
  },
  	"application/mathematica": {
  	source: "iana",
  	extensions: [
  		"ma",
  		"nb",
  		"mb"
  	]
  },
  	"application/mathml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mathml"
  	]
  },
  	"application/mathml-content+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mathml-presentation+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-associated-procedure-description+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-deregister+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-envelope+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-msk+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-msk-response+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-protection-description+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-reception-report+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-register+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-register-response+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-schedule+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbms-user-service-description+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mbox": {
  	source: "iana",
  	extensions: [
  		"mbox"
  	]
  },
  	"application/media-policy-dataset+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mpf"
  	]
  },
  	"application/media_control+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mediaservercontrol+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mscml"
  	]
  },
  	"application/merge-patch+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/metalink+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"metalink"
  	]
  },
  	"application/metalink4+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"meta4"
  	]
  },
  	"application/mets+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mets"
  	]
  },
  	"application/mf4": {
  	source: "iana"
  },
  	"application/mikey": {
  	source: "iana"
  },
  	"application/mipc": {
  	source: "iana"
  },
  	"application/missing-blocks+cbor-seq": {
  	source: "iana"
  },
  	"application/mmt-aei+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"maei"
  	]
  },
  	"application/mmt-usd+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"musd"
  	]
  },
  	"application/mods+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mods"
  	]
  },
  	"application/moss-keys": {
  	source: "iana"
  },
  	"application/moss-signature": {
  	source: "iana"
  },
  	"application/mosskey-data": {
  	source: "iana"
  },
  	"application/mosskey-request": {
  	source: "iana"
  },
  	"application/mp21": {
  	source: "iana",
  	extensions: [
  		"m21",
  		"mp21"
  	]
  },
  	"application/mp4": {
  	source: "iana",
  	extensions: [
  		"mp4s",
  		"m4p"
  	]
  },
  	"application/mpeg4-generic": {
  	source: "iana"
  },
  	"application/mpeg4-iod": {
  	source: "iana"
  },
  	"application/mpeg4-iod-xmt": {
  	source: "iana"
  },
  	"application/mrb-consumer+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/mrb-publish+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/msc-ivr+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/msc-mixer+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/msword": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"doc",
  		"dot"
  	]
  },
  	"application/mud+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/multipart-core": {
  	source: "iana"
  },
  	"application/mxf": {
  	source: "iana",
  	extensions: [
  		"mxf"
  	]
  },
  	"application/n-quads": {
  	source: "iana",
  	extensions: [
  		"nq"
  	]
  },
  	"application/n-triples": {
  	source: "iana",
  	extensions: [
  		"nt"
  	]
  },
  	"application/nasdata": {
  	source: "iana"
  },
  	"application/news-checkgroups": {
  	source: "iana",
  	charset: "US-ASCII"
  },
  	"application/news-groupinfo": {
  	source: "iana",
  	charset: "US-ASCII"
  },
  	"application/news-transmission": {
  	source: "iana"
  },
  	"application/nlsml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/node": {
  	source: "iana",
  	extensions: [
  		"cjs"
  	]
  },
  	"application/nss": {
  	source: "iana"
  },
  	"application/oauth-authz-req+jwt": {
  	source: "iana"
  },
  	"application/oblivious-dns-message": {
  	source: "iana"
  },
  	"application/ocsp-request": {
  	source: "iana"
  },
  	"application/ocsp-response": {
  	source: "iana"
  },
  	"application/octet-stream": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"bin",
  		"dms",
  		"lrf",
  		"mar",
  		"so",
  		"dist",
  		"distz",
  		"pkg",
  		"bpk",
  		"dump",
  		"elc",
  		"deploy",
  		"exe",
  		"dll",
  		"deb",
  		"dmg",
  		"iso",
  		"img",
  		"msi",
  		"msp",
  		"msm",
  		"buffer"
  	]
  },
  	"application/oda": {
  	source: "iana",
  	extensions: [
  		"oda"
  	]
  },
  	"application/odm+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/odx": {
  	source: "iana"
  },
  	"application/oebps-package+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"opf"
  	]
  },
  	"application/ogg": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"ogx"
  	]
  },
  	"application/omdoc+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"omdoc"
  	]
  },
  	"application/onenote": {
  	source: "apache",
  	extensions: [
  		"onetoc",
  		"onetoc2",
  		"onetmp",
  		"onepkg"
  	]
  },
  	"application/opc-nodeset+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/oscore": {
  	source: "iana"
  },
  	"application/oxps": {
  	source: "iana",
  	extensions: [
  		"oxps"
  	]
  },
  	"application/p21": {
  	source: "iana"
  },
  	"application/p21+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/p2p-overlay+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"relo"
  	]
  },
  	"application/parityfec": {
  	source: "iana"
  },
  	"application/passport": {
  	source: "iana"
  },
  	"application/patch-ops-error+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xer"
  	]
  },
  	"application/pdf": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"pdf"
  	]
  },
  	"application/pdx": {
  	source: "iana"
  },
  	"application/pem-certificate-chain": {
  	source: "iana"
  },
  	"application/pgp-encrypted": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"pgp"
  	]
  },
  	"application/pgp-keys": {
  	source: "iana",
  	extensions: [
  		"asc"
  	]
  },
  	"application/pgp-signature": {
  	source: "iana",
  	extensions: [
  		"asc",
  		"sig"
  	]
  },
  	"application/pics-rules": {
  	source: "apache",
  	extensions: [
  		"prf"
  	]
  },
  	"application/pidf+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/pidf-diff+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/pkcs10": {
  	source: "iana",
  	extensions: [
  		"p10"
  	]
  },
  	"application/pkcs12": {
  	source: "iana"
  },
  	"application/pkcs7-mime": {
  	source: "iana",
  	extensions: [
  		"p7m",
  		"p7c"
  	]
  },
  	"application/pkcs7-signature": {
  	source: "iana",
  	extensions: [
  		"p7s"
  	]
  },
  	"application/pkcs8": {
  	source: "iana",
  	extensions: [
  		"p8"
  	]
  },
  	"application/pkcs8-encrypted": {
  	source: "iana"
  },
  	"application/pkix-attr-cert": {
  	source: "iana",
  	extensions: [
  		"ac"
  	]
  },
  	"application/pkix-cert": {
  	source: "iana",
  	extensions: [
  		"cer"
  	]
  },
  	"application/pkix-crl": {
  	source: "iana",
  	extensions: [
  		"crl"
  	]
  },
  	"application/pkix-pkipath": {
  	source: "iana",
  	extensions: [
  		"pkipath"
  	]
  },
  	"application/pkixcmp": {
  	source: "iana",
  	extensions: [
  		"pki"
  	]
  },
  	"application/pls+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"pls"
  	]
  },
  	"application/poc-settings+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/postscript": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ai",
  		"eps",
  		"ps"
  	]
  },
  	"application/ppsp-tracker+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/problem+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/problem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/provenance+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"provx"
  	]
  },
  	"application/prs.alvestrand.titrax-sheet": {
  	source: "iana"
  },
  	"application/prs.cww": {
  	source: "iana",
  	extensions: [
  		"cww"
  	]
  },
  	"application/prs.cyn": {
  	source: "iana",
  	charset: "7-BIT"
  },
  	"application/prs.hpub+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/prs.nprend": {
  	source: "iana"
  },
  	"application/prs.plucker": {
  	source: "iana"
  },
  	"application/prs.rdf-xml-crypt": {
  	source: "iana"
  },
  	"application/prs.xsf+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/pskc+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"pskcxml"
  	]
  },
  	"application/pvd+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/qsig": {
  	source: "iana"
  },
  	"application/raml+yaml": {
  	compressible: true,
  	extensions: [
  		"raml"
  	]
  },
  	"application/raptorfec": {
  	source: "iana"
  },
  	"application/rdap+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/rdf+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rdf",
  		"owl"
  	]
  },
  	"application/reginfo+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rif"
  	]
  },
  	"application/relax-ng-compact-syntax": {
  	source: "iana",
  	extensions: [
  		"rnc"
  	]
  },
  	"application/remote-printing": {
  	source: "iana"
  },
  	"application/reputon+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/resource-lists+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rl"
  	]
  },
  	"application/resource-lists-diff+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rld"
  	]
  },
  	"application/rfc+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/riscos": {
  	source: "iana"
  },
  	"application/rlmi+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/rls-services+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rs"
  	]
  },
  	"application/route-apd+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rapd"
  	]
  },
  	"application/route-s-tsid+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"sls"
  	]
  },
  	"application/route-usd+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rusd"
  	]
  },
  	"application/rpki-ghostbusters": {
  	source: "iana",
  	extensions: [
  		"gbr"
  	]
  },
  	"application/rpki-manifest": {
  	source: "iana",
  	extensions: [
  		"mft"
  	]
  },
  	"application/rpki-publication": {
  	source: "iana"
  },
  	"application/rpki-roa": {
  	source: "iana",
  	extensions: [
  		"roa"
  	]
  },
  	"application/rpki-updown": {
  	source: "iana"
  },
  	"application/rsd+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"rsd"
  	]
  },
  	"application/rss+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"rss"
  	]
  },
  	"application/rtf": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rtf"
  	]
  },
  	"application/rtploopback": {
  	source: "iana"
  },
  	"application/rtx": {
  	source: "iana"
  },
  	"application/samlassertion+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/samlmetadata+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/sarif+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/sarif-external-properties+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/sbe": {
  	source: "iana"
  },
  	"application/sbml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"sbml"
  	]
  },
  	"application/scaip+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/scim+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/scvp-cv-request": {
  	source: "iana",
  	extensions: [
  		"scq"
  	]
  },
  	"application/scvp-cv-response": {
  	source: "iana",
  	extensions: [
  		"scs"
  	]
  },
  	"application/scvp-vp-request": {
  	source: "iana",
  	extensions: [
  		"spq"
  	]
  },
  	"application/scvp-vp-response": {
  	source: "iana",
  	extensions: [
  		"spp"
  	]
  },
  	"application/sdp": {
  	source: "iana",
  	extensions: [
  		"sdp"
  	]
  },
  	"application/secevent+jwt": {
  	source: "iana"
  },
  	"application/senml+cbor": {
  	source: "iana"
  },
  	"application/senml+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/senml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"senmlx"
  	]
  },
  	"application/senml-etch+cbor": {
  	source: "iana"
  },
  	"application/senml-etch+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/senml-exi": {
  	source: "iana"
  },
  	"application/sensml+cbor": {
  	source: "iana"
  },
  	"application/sensml+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/sensml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"sensmlx"
  	]
  },
  	"application/sensml-exi": {
  	source: "iana"
  },
  	"application/sep+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/sep-exi": {
  	source: "iana"
  },
  	"application/session-info": {
  	source: "iana"
  },
  	"application/set-payment": {
  	source: "iana"
  },
  	"application/set-payment-initiation": {
  	source: "iana",
  	extensions: [
  		"setpay"
  	]
  },
  	"application/set-registration": {
  	source: "iana"
  },
  	"application/set-registration-initiation": {
  	source: "iana",
  	extensions: [
  		"setreg"
  	]
  },
  	"application/sgml": {
  	source: "iana"
  },
  	"application/sgml-open-catalog": {
  	source: "iana"
  },
  	"application/shf+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"shf"
  	]
  },
  	"application/sieve": {
  	source: "iana",
  	extensions: [
  		"siv",
  		"sieve"
  	]
  },
  	"application/simple-filter+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/simple-message-summary": {
  	source: "iana"
  },
  	"application/simplesymbolcontainer": {
  	source: "iana"
  },
  	"application/sipc": {
  	source: "iana"
  },
  	"application/slate": {
  	source: "iana"
  },
  	"application/smil": {
  	source: "iana"
  },
  	"application/smil+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"smi",
  		"smil"
  	]
  },
  	"application/smpte336m": {
  	source: "iana"
  },
  	"application/soap+fastinfoset": {
  	source: "iana"
  },
  	"application/soap+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/sparql-query": {
  	source: "iana",
  	extensions: [
  		"rq"
  	]
  },
  	"application/sparql-results+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"srx"
  	]
  },
  	"application/spdx+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/spirits-event+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/sql": {
  	source: "iana"
  },
  	"application/srgs": {
  	source: "iana",
  	extensions: [
  		"gram"
  	]
  },
  	"application/srgs+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"grxml"
  	]
  },
  	"application/sru+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"sru"
  	]
  },
  	"application/ssdl+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"ssdl"
  	]
  },
  	"application/ssml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ssml"
  	]
  },
  	"application/stix+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/swid+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"swidtag"
  	]
  },
  	"application/tamp-apex-update": {
  	source: "iana"
  },
  	"application/tamp-apex-update-confirm": {
  	source: "iana"
  },
  	"application/tamp-community-update": {
  	source: "iana"
  },
  	"application/tamp-community-update-confirm": {
  	source: "iana"
  },
  	"application/tamp-error": {
  	source: "iana"
  },
  	"application/tamp-sequence-adjust": {
  	source: "iana"
  },
  	"application/tamp-sequence-adjust-confirm": {
  	source: "iana"
  },
  	"application/tamp-status-query": {
  	source: "iana"
  },
  	"application/tamp-status-response": {
  	source: "iana"
  },
  	"application/tamp-update": {
  	source: "iana"
  },
  	"application/tamp-update-confirm": {
  	source: "iana"
  },
  	"application/tar": {
  	compressible: true
  },
  	"application/taxii+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/td+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/tei+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"tei",
  		"teicorpus"
  	]
  },
  	"application/tetra_isi": {
  	source: "iana"
  },
  	"application/thraud+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"tfi"
  	]
  },
  	"application/timestamp-query": {
  	source: "iana"
  },
  	"application/timestamp-reply": {
  	source: "iana"
  },
  	"application/timestamped-data": {
  	source: "iana",
  	extensions: [
  		"tsd"
  	]
  },
  	"application/tlsrpt+gzip": {
  	source: "iana"
  },
  	"application/tlsrpt+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/tnauthlist": {
  	source: "iana"
  },
  	"application/token-introspection+jwt": {
  	source: "iana"
  },
  	"application/toml": {
  	compressible: true,
  	extensions: [
  		"toml"
  	]
  },
  	"application/trickle-ice-sdpfrag": {
  	source: "iana"
  },
  	"application/trig": {
  	source: "iana",
  	extensions: [
  		"trig"
  	]
  },
  	"application/ttml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ttml"
  	]
  },
  	"application/tve-trigger": {
  	source: "iana"
  },
  	"application/tzif": {
  	source: "iana"
  },
  	"application/tzif-leap": {
  	source: "iana"
  },
  	"application/ubjson": {
  	compressible: false,
  	extensions: [
  		"ubj"
  	]
  },
  	"application/ulpfec": {
  	source: "iana"
  },
  	"application/urc-grpsheet+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/urc-ressheet+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rsheet"
  	]
  },
  	"application/urc-targetdesc+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"td"
  	]
  },
  	"application/urc-uisocketdesc+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vcard+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vcard+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vemmi": {
  	source: "iana"
  },
  	"application/vividence.scriptfile": {
  	source: "apache"
  },
  	"application/vnd.1000minds.decision-model+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"1km"
  	]
  },
  	"application/vnd.3gpp-prose+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp-prose-pc3ch+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp-v2x-local-service-information": {
  	source: "iana"
  },
  	"application/vnd.3gpp.5gnas": {
  	source: "iana"
  },
  	"application/vnd.3gpp.access-transfer-events+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.bsf+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.gmop+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.gtpc": {
  	source: "iana"
  },
  	"application/vnd.3gpp.interworking-data": {
  	source: "iana"
  },
  	"application/vnd.3gpp.lpp": {
  	source: "iana"
  },
  	"application/vnd.3gpp.mc-signalling-ear": {
  	source: "iana"
  },
  	"application/vnd.3gpp.mcdata-affiliation-command+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcdata-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcdata-payload": {
  	source: "iana"
  },
  	"application/vnd.3gpp.mcdata-service-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcdata-signalling": {
  	source: "iana"
  },
  	"application/vnd.3gpp.mcdata-ue-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcdata-user-profile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-affiliation-command+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-floor-request+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-location-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-service-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-signed+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-ue-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-ue-init-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcptt-user-profile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-affiliation-command+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-affiliation-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-location-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-service-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-transmission-request+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-ue-config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mcvideo-user-profile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.mid-call+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.ngap": {
  	source: "iana"
  },
  	"application/vnd.3gpp.pfcp": {
  	source: "iana"
  },
  	"application/vnd.3gpp.pic-bw-large": {
  	source: "iana",
  	extensions: [
  		"plb"
  	]
  },
  	"application/vnd.3gpp.pic-bw-small": {
  	source: "iana",
  	extensions: [
  		"psb"
  	]
  },
  	"application/vnd.3gpp.pic-bw-var": {
  	source: "iana",
  	extensions: [
  		"pvb"
  	]
  },
  	"application/vnd.3gpp.s1ap": {
  	source: "iana"
  },
  	"application/vnd.3gpp.sms": {
  	source: "iana"
  },
  	"application/vnd.3gpp.sms+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.srvcc-ext+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.srvcc-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.state-and-event-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp.ussd+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp2.bcmcsinfo+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.3gpp2.sms": {
  	source: "iana"
  },
  	"application/vnd.3gpp2.tcap": {
  	source: "iana",
  	extensions: [
  		"tcap"
  	]
  },
  	"application/vnd.3lightssoftware.imagescal": {
  	source: "iana"
  },
  	"application/vnd.3m.post-it-notes": {
  	source: "iana",
  	extensions: [
  		"pwn"
  	]
  },
  	"application/vnd.accpac.simply.aso": {
  	source: "iana",
  	extensions: [
  		"aso"
  	]
  },
  	"application/vnd.accpac.simply.imp": {
  	source: "iana",
  	extensions: [
  		"imp"
  	]
  },
  	"application/vnd.acucobol": {
  	source: "iana",
  	extensions: [
  		"acu"
  	]
  },
  	"application/vnd.acucorp": {
  	source: "iana",
  	extensions: [
  		"atc",
  		"acutc"
  	]
  },
  	"application/vnd.adobe.air-application-installer-package+zip": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"air"
  	]
  },
  	"application/vnd.adobe.flash.movie": {
  	source: "iana"
  },
  	"application/vnd.adobe.formscentral.fcdt": {
  	source: "iana",
  	extensions: [
  		"fcdt"
  	]
  },
  	"application/vnd.adobe.fxp": {
  	source: "iana",
  	extensions: [
  		"fxp",
  		"fxpl"
  	]
  },
  	"application/vnd.adobe.partial-upload": {
  	source: "iana"
  },
  	"application/vnd.adobe.xdp+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xdp"
  	]
  },
  	"application/vnd.adobe.xfdf": {
  	source: "iana",
  	extensions: [
  		"xfdf"
  	]
  },
  	"application/vnd.aether.imp": {
  	source: "iana"
  },
  	"application/vnd.afpc.afplinedata": {
  	source: "iana"
  },
  	"application/vnd.afpc.afplinedata-pagedef": {
  	source: "iana"
  },
  	"application/vnd.afpc.cmoca-cmresource": {
  	source: "iana"
  },
  	"application/vnd.afpc.foca-charset": {
  	source: "iana"
  },
  	"application/vnd.afpc.foca-codedfont": {
  	source: "iana"
  },
  	"application/vnd.afpc.foca-codepage": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca-cmtable": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca-formdef": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca-mediummap": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca-objectcontainer": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca-overlay": {
  	source: "iana"
  },
  	"application/vnd.afpc.modca-pagesegment": {
  	source: "iana"
  },
  	"application/vnd.age": {
  	source: "iana",
  	extensions: [
  		"age"
  	]
  },
  	"application/vnd.ah-barcode": {
  	source: "iana"
  },
  	"application/vnd.ahead.space": {
  	source: "iana",
  	extensions: [
  		"ahead"
  	]
  },
  	"application/vnd.airzip.filesecure.azf": {
  	source: "iana",
  	extensions: [
  		"azf"
  	]
  },
  	"application/vnd.airzip.filesecure.azs": {
  	source: "iana",
  	extensions: [
  		"azs"
  	]
  },
  	"application/vnd.amadeus+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.amazon.ebook": {
  	source: "apache",
  	extensions: [
  		"azw"
  	]
  },
  	"application/vnd.amazon.mobi8-ebook": {
  	source: "iana"
  },
  	"application/vnd.americandynamics.acc": {
  	source: "iana",
  	extensions: [
  		"acc"
  	]
  },
  	"application/vnd.amiga.ami": {
  	source: "iana",
  	extensions: [
  		"ami"
  	]
  },
  	"application/vnd.amundsen.maze+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.android.ota": {
  	source: "iana"
  },
  	"application/vnd.android.package-archive": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"apk"
  	]
  },
  	"application/vnd.anki": {
  	source: "iana"
  },
  	"application/vnd.anser-web-certificate-issue-initiation": {
  	source: "iana",
  	extensions: [
  		"cii"
  	]
  },
  	"application/vnd.anser-web-funds-transfer-initiation": {
  	source: "apache",
  	extensions: [
  		"fti"
  	]
  },
  	"application/vnd.antix.game-component": {
  	source: "iana",
  	extensions: [
  		"atx"
  	]
  },
  	"application/vnd.apache.arrow.file": {
  	source: "iana"
  },
  	"application/vnd.apache.arrow.stream": {
  	source: "iana"
  },
  	"application/vnd.apache.thrift.binary": {
  	source: "iana"
  },
  	"application/vnd.apache.thrift.compact": {
  	source: "iana"
  },
  	"application/vnd.apache.thrift.json": {
  	source: "iana"
  },
  	"application/vnd.api+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.aplextor.warrp+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.apothekende.reservation+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.apple.installer+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mpkg"
  	]
  },
  	"application/vnd.apple.keynote": {
  	source: "iana",
  	extensions: [
  		"key"
  	]
  },
  	"application/vnd.apple.mpegurl": {
  	source: "iana",
  	extensions: [
  		"m3u8"
  	]
  },
  	"application/vnd.apple.numbers": {
  	source: "iana",
  	extensions: [
  		"numbers"
  	]
  },
  	"application/vnd.apple.pages": {
  	source: "iana",
  	extensions: [
  		"pages"
  	]
  },
  	"application/vnd.apple.pkpass": {
  	compressible: false,
  	extensions: [
  		"pkpass"
  	]
  },
  	"application/vnd.arastra.swi": {
  	source: "iana"
  },
  	"application/vnd.aristanetworks.swi": {
  	source: "iana",
  	extensions: [
  		"swi"
  	]
  },
  	"application/vnd.artisan+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.artsquare": {
  	source: "iana"
  },
  	"application/vnd.astraea-software.iota": {
  	source: "iana",
  	extensions: [
  		"iota"
  	]
  },
  	"application/vnd.audiograph": {
  	source: "iana",
  	extensions: [
  		"aep"
  	]
  },
  	"application/vnd.autopackage": {
  	source: "iana"
  },
  	"application/vnd.avalon+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.avistar+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.balsamiq.bmml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"bmml"
  	]
  },
  	"application/vnd.balsamiq.bmpr": {
  	source: "iana"
  },
  	"application/vnd.banana-accounting": {
  	source: "iana"
  },
  	"application/vnd.bbf.usp.error": {
  	source: "iana"
  },
  	"application/vnd.bbf.usp.msg": {
  	source: "iana"
  },
  	"application/vnd.bbf.usp.msg+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.bekitzur-stech+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.bint.med-content": {
  	source: "iana"
  },
  	"application/vnd.biopax.rdf+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.blink-idb-value-wrapper": {
  	source: "iana"
  },
  	"application/vnd.blueice.multipass": {
  	source: "iana",
  	extensions: [
  		"mpm"
  	]
  },
  	"application/vnd.bluetooth.ep.oob": {
  	source: "iana"
  },
  	"application/vnd.bluetooth.le.oob": {
  	source: "iana"
  },
  	"application/vnd.bmi": {
  	source: "iana",
  	extensions: [
  		"bmi"
  	]
  },
  	"application/vnd.bpf": {
  	source: "iana"
  },
  	"application/vnd.bpf3": {
  	source: "iana"
  },
  	"application/vnd.businessobjects": {
  	source: "iana",
  	extensions: [
  		"rep"
  	]
  },
  	"application/vnd.byu.uapi+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.cab-jscript": {
  	source: "iana"
  },
  	"application/vnd.canon-cpdl": {
  	source: "iana"
  },
  	"application/vnd.canon-lips": {
  	source: "iana"
  },
  	"application/vnd.capasystems-pg+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.cendio.thinlinc.clientconf": {
  	source: "iana"
  },
  	"application/vnd.century-systems.tcp_stream": {
  	source: "iana"
  },
  	"application/vnd.chemdraw+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"cdxml"
  	]
  },
  	"application/vnd.chess-pgn": {
  	source: "iana"
  },
  	"application/vnd.chipnuts.karaoke-mmd": {
  	source: "iana",
  	extensions: [
  		"mmd"
  	]
  },
  	"application/vnd.ciedi": {
  	source: "iana"
  },
  	"application/vnd.cinderella": {
  	source: "iana",
  	extensions: [
  		"cdy"
  	]
  },
  	"application/vnd.cirpack.isdn-ext": {
  	source: "iana"
  },
  	"application/vnd.citationstyles.style+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"csl"
  	]
  },
  	"application/vnd.claymore": {
  	source: "iana",
  	extensions: [
  		"cla"
  	]
  },
  	"application/vnd.cloanto.rp9": {
  	source: "iana",
  	extensions: [
  		"rp9"
  	]
  },
  	"application/vnd.clonk.c4group": {
  	source: "iana",
  	extensions: [
  		"c4g",
  		"c4d",
  		"c4f",
  		"c4p",
  		"c4u"
  	]
  },
  	"application/vnd.cluetrust.cartomobile-config": {
  	source: "iana",
  	extensions: [
  		"c11amc"
  	]
  },
  	"application/vnd.cluetrust.cartomobile-config-pkg": {
  	source: "iana",
  	extensions: [
  		"c11amz"
  	]
  },
  	"application/vnd.coffeescript": {
  	source: "iana"
  },
  	"application/vnd.collabio.xodocuments.document": {
  	source: "iana"
  },
  	"application/vnd.collabio.xodocuments.document-template": {
  	source: "iana"
  },
  	"application/vnd.collabio.xodocuments.presentation": {
  	source: "iana"
  },
  	"application/vnd.collabio.xodocuments.presentation-template": {
  	source: "iana"
  },
  	"application/vnd.collabio.xodocuments.spreadsheet": {
  	source: "iana"
  },
  	"application/vnd.collabio.xodocuments.spreadsheet-template": {
  	source: "iana"
  },
  	"application/vnd.collection+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.collection.doc+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.collection.next+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.comicbook+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.comicbook-rar": {
  	source: "iana"
  },
  	"application/vnd.commerce-battelle": {
  	source: "iana"
  },
  	"application/vnd.commonspace": {
  	source: "iana",
  	extensions: [
  		"csp"
  	]
  },
  	"application/vnd.contact.cmsg": {
  	source: "iana",
  	extensions: [
  		"cdbcmsg"
  	]
  },
  	"application/vnd.coreos.ignition+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.cosmocaller": {
  	source: "iana",
  	extensions: [
  		"cmc"
  	]
  },
  	"application/vnd.crick.clicker": {
  	source: "iana",
  	extensions: [
  		"clkx"
  	]
  },
  	"application/vnd.crick.clicker.keyboard": {
  	source: "iana",
  	extensions: [
  		"clkk"
  	]
  },
  	"application/vnd.crick.clicker.palette": {
  	source: "iana",
  	extensions: [
  		"clkp"
  	]
  },
  	"application/vnd.crick.clicker.template": {
  	source: "iana",
  	extensions: [
  		"clkt"
  	]
  },
  	"application/vnd.crick.clicker.wordbank": {
  	source: "iana",
  	extensions: [
  		"clkw"
  	]
  },
  	"application/vnd.criticaltools.wbs+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"wbs"
  	]
  },
  	"application/vnd.cryptii.pipe+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.crypto-shade-file": {
  	source: "iana"
  },
  	"application/vnd.cryptomator.encrypted": {
  	source: "iana"
  },
  	"application/vnd.cryptomator.vault": {
  	source: "iana"
  },
  	"application/vnd.ctc-posml": {
  	source: "iana",
  	extensions: [
  		"pml"
  	]
  },
  	"application/vnd.ctct.ws+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.cups-pdf": {
  	source: "iana"
  },
  	"application/vnd.cups-postscript": {
  	source: "iana"
  },
  	"application/vnd.cups-ppd": {
  	source: "iana",
  	extensions: [
  		"ppd"
  	]
  },
  	"application/vnd.cups-raster": {
  	source: "iana"
  },
  	"application/vnd.cups-raw": {
  	source: "iana"
  },
  	"application/vnd.curl": {
  	source: "iana"
  },
  	"application/vnd.curl.car": {
  	source: "apache",
  	extensions: [
  		"car"
  	]
  },
  	"application/vnd.curl.pcurl": {
  	source: "apache",
  	extensions: [
  		"pcurl"
  	]
  },
  	"application/vnd.cyan.dean.root+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.cybank": {
  	source: "iana"
  },
  	"application/vnd.cyclonedx+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.cyclonedx+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.d2l.coursepackage1p0+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.d3m-dataset": {
  	source: "iana"
  },
  	"application/vnd.d3m-problem": {
  	source: "iana"
  },
  	"application/vnd.dart": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"dart"
  	]
  },
  	"application/vnd.data-vision.rdz": {
  	source: "iana",
  	extensions: [
  		"rdz"
  	]
  },
  	"application/vnd.datapackage+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dataresource+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dbf": {
  	source: "iana",
  	extensions: [
  		"dbf"
  	]
  },
  	"application/vnd.debian.binary-package": {
  	source: "iana"
  },
  	"application/vnd.dece.data": {
  	source: "iana",
  	extensions: [
  		"uvf",
  		"uvvf",
  		"uvd",
  		"uvvd"
  	]
  },
  	"application/vnd.dece.ttml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"uvt",
  		"uvvt"
  	]
  },
  	"application/vnd.dece.unspecified": {
  	source: "iana",
  	extensions: [
  		"uvx",
  		"uvvx"
  	]
  },
  	"application/vnd.dece.zip": {
  	source: "iana",
  	extensions: [
  		"uvz",
  		"uvvz"
  	]
  },
  	"application/vnd.denovo.fcselayout-link": {
  	source: "iana",
  	extensions: [
  		"fe_launch"
  	]
  },
  	"application/vnd.desmume.movie": {
  	source: "iana"
  },
  	"application/vnd.dir-bi.plate-dl-nosuffix": {
  	source: "iana"
  },
  	"application/vnd.dm.delegation+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dna": {
  	source: "iana",
  	extensions: [
  		"dna"
  	]
  },
  	"application/vnd.document+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dolby.mlp": {
  	source: "apache",
  	extensions: [
  		"mlp"
  	]
  },
  	"application/vnd.dolby.mobile.1": {
  	source: "iana"
  },
  	"application/vnd.dolby.mobile.2": {
  	source: "iana"
  },
  	"application/vnd.doremir.scorecloud-binary-document": {
  	source: "iana"
  },
  	"application/vnd.dpgraph": {
  	source: "iana",
  	extensions: [
  		"dpg"
  	]
  },
  	"application/vnd.dreamfactory": {
  	source: "iana",
  	extensions: [
  		"dfac"
  	]
  },
  	"application/vnd.drive+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ds-keypoint": {
  	source: "apache",
  	extensions: [
  		"kpxx"
  	]
  },
  	"application/vnd.dtg.local": {
  	source: "iana"
  },
  	"application/vnd.dtg.local.flash": {
  	source: "iana"
  },
  	"application/vnd.dtg.local.html": {
  	source: "iana"
  },
  	"application/vnd.dvb.ait": {
  	source: "iana",
  	extensions: [
  		"ait"
  	]
  },
  	"application/vnd.dvb.dvbisl+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.dvbj": {
  	source: "iana"
  },
  	"application/vnd.dvb.esgcontainer": {
  	source: "iana"
  },
  	"application/vnd.dvb.ipdcdftnotifaccess": {
  	source: "iana"
  },
  	"application/vnd.dvb.ipdcesgaccess": {
  	source: "iana"
  },
  	"application/vnd.dvb.ipdcesgaccess2": {
  	source: "iana"
  },
  	"application/vnd.dvb.ipdcesgpdd": {
  	source: "iana"
  },
  	"application/vnd.dvb.ipdcroaming": {
  	source: "iana"
  },
  	"application/vnd.dvb.iptv.alfec-base": {
  	source: "iana"
  },
  	"application/vnd.dvb.iptv.alfec-enhancement": {
  	source: "iana"
  },
  	"application/vnd.dvb.notif-aggregate-root+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.notif-container+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.notif-generic+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.notif-ia-msglist+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.notif-ia-registration-request+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.notif-ia-registration-response+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.notif-init+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.dvb.pfr": {
  	source: "iana"
  },
  	"application/vnd.dvb.service": {
  	source: "iana",
  	extensions: [
  		"svc"
  	]
  },
  	"application/vnd.dxr": {
  	source: "iana"
  },
  	"application/vnd.dynageo": {
  	source: "iana",
  	extensions: [
  		"geo"
  	]
  },
  	"application/vnd.dzr": {
  	source: "iana"
  },
  	"application/vnd.easykaraoke.cdgdownload": {
  	source: "iana"
  },
  	"application/vnd.ecdis-update": {
  	source: "iana"
  },
  	"application/vnd.ecip.rlp": {
  	source: "iana"
  },
  	"application/vnd.eclipse.ditto+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ecowin.chart": {
  	source: "iana",
  	extensions: [
  		"mag"
  	]
  },
  	"application/vnd.ecowin.filerequest": {
  	source: "iana"
  },
  	"application/vnd.ecowin.fileupdate": {
  	source: "iana"
  },
  	"application/vnd.ecowin.series": {
  	source: "iana"
  },
  	"application/vnd.ecowin.seriesrequest": {
  	source: "iana"
  },
  	"application/vnd.ecowin.seriesupdate": {
  	source: "iana"
  },
  	"application/vnd.efi.img": {
  	source: "iana"
  },
  	"application/vnd.efi.iso": {
  	source: "iana"
  },
  	"application/vnd.emclient.accessrequest+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.enliven": {
  	source: "iana",
  	extensions: [
  		"nml"
  	]
  },
  	"application/vnd.enphase.envoy": {
  	source: "iana"
  },
  	"application/vnd.eprints.data+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.epson.esf": {
  	source: "iana",
  	extensions: [
  		"esf"
  	]
  },
  	"application/vnd.epson.msf": {
  	source: "iana",
  	extensions: [
  		"msf"
  	]
  },
  	"application/vnd.epson.quickanime": {
  	source: "iana",
  	extensions: [
  		"qam"
  	]
  },
  	"application/vnd.epson.salt": {
  	source: "iana",
  	extensions: [
  		"slt"
  	]
  },
  	"application/vnd.epson.ssf": {
  	source: "iana",
  	extensions: [
  		"ssf"
  	]
  },
  	"application/vnd.ericsson.quickcall": {
  	source: "iana"
  },
  	"application/vnd.espass-espass+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.eszigno3+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"es3",
  		"et3"
  	]
  },
  	"application/vnd.etsi.aoc+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.asic-e+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.etsi.asic-s+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.etsi.cug+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvcommand+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvdiscovery+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvprofile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvsad-bc+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvsad-cod+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvsad-npvr+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvservice+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvsync+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.iptvueprofile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.mcid+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.mheg5": {
  	source: "iana"
  },
  	"application/vnd.etsi.overload-control-policy-dataset+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.pstn+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.sci+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.simservs+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.timestamp-token": {
  	source: "iana"
  },
  	"application/vnd.etsi.tsl+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.etsi.tsl.der": {
  	source: "iana"
  },
  	"application/vnd.eu.kasparian.car+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.eudora.data": {
  	source: "iana"
  },
  	"application/vnd.evolv.ecig.profile": {
  	source: "iana"
  },
  	"application/vnd.evolv.ecig.settings": {
  	source: "iana"
  },
  	"application/vnd.evolv.ecig.theme": {
  	source: "iana"
  },
  	"application/vnd.exstream-empower+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.exstream-package": {
  	source: "iana"
  },
  	"application/vnd.ezpix-album": {
  	source: "iana",
  	extensions: [
  		"ez2"
  	]
  },
  	"application/vnd.ezpix-package": {
  	source: "iana",
  	extensions: [
  		"ez3"
  	]
  },
  	"application/vnd.f-secure.mobile": {
  	source: "iana"
  },
  	"application/vnd.familysearch.gedcom+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.fastcopy-disk-image": {
  	source: "iana"
  },
  	"application/vnd.fdf": {
  	source: "iana",
  	extensions: [
  		"fdf"
  	]
  },
  	"application/vnd.fdsn.mseed": {
  	source: "iana",
  	extensions: [
  		"mseed"
  	]
  },
  	"application/vnd.fdsn.seed": {
  	source: "iana",
  	extensions: [
  		"seed",
  		"dataless"
  	]
  },
  	"application/vnd.ffsns": {
  	source: "iana"
  },
  	"application/vnd.ficlab.flb+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.filmit.zfc": {
  	source: "iana"
  },
  	"application/vnd.fints": {
  	source: "iana"
  },
  	"application/vnd.firemonkeys.cloudcell": {
  	source: "iana"
  },
  	"application/vnd.flographit": {
  	source: "iana",
  	extensions: [
  		"gph"
  	]
  },
  	"application/vnd.fluxtime.clip": {
  	source: "iana",
  	extensions: [
  		"ftc"
  	]
  },
  	"application/vnd.font-fontforge-sfd": {
  	source: "iana"
  },
  	"application/vnd.framemaker": {
  	source: "iana",
  	extensions: [
  		"fm",
  		"frame",
  		"maker",
  		"book"
  	]
  },
  	"application/vnd.frogans.fnc": {
  	source: "iana",
  	extensions: [
  		"fnc"
  	]
  },
  	"application/vnd.frogans.ltf": {
  	source: "iana",
  	extensions: [
  		"ltf"
  	]
  },
  	"application/vnd.fsc.weblaunch": {
  	source: "iana",
  	extensions: [
  		"fsc"
  	]
  },
  	"application/vnd.fujifilm.fb.docuworks": {
  	source: "iana"
  },
  	"application/vnd.fujifilm.fb.docuworks.binder": {
  	source: "iana"
  },
  	"application/vnd.fujifilm.fb.docuworks.container": {
  	source: "iana"
  },
  	"application/vnd.fujifilm.fb.jfi+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.fujitsu.oasys": {
  	source: "iana",
  	extensions: [
  		"oas"
  	]
  },
  	"application/vnd.fujitsu.oasys2": {
  	source: "iana",
  	extensions: [
  		"oa2"
  	]
  },
  	"application/vnd.fujitsu.oasys3": {
  	source: "iana",
  	extensions: [
  		"oa3"
  	]
  },
  	"application/vnd.fujitsu.oasysgp": {
  	source: "iana",
  	extensions: [
  		"fg5"
  	]
  },
  	"application/vnd.fujitsu.oasysprs": {
  	source: "iana",
  	extensions: [
  		"bh2"
  	]
  },
  	"application/vnd.fujixerox.art-ex": {
  	source: "iana"
  },
  	"application/vnd.fujixerox.art4": {
  	source: "iana"
  },
  	"application/vnd.fujixerox.ddd": {
  	source: "iana",
  	extensions: [
  		"ddd"
  	]
  },
  	"application/vnd.fujixerox.docuworks": {
  	source: "iana",
  	extensions: [
  		"xdw"
  	]
  },
  	"application/vnd.fujixerox.docuworks.binder": {
  	source: "iana",
  	extensions: [
  		"xbd"
  	]
  },
  	"application/vnd.fujixerox.docuworks.container": {
  	source: "iana"
  },
  	"application/vnd.fujixerox.hbpl": {
  	source: "iana"
  },
  	"application/vnd.fut-misnet": {
  	source: "iana"
  },
  	"application/vnd.futoin+cbor": {
  	source: "iana"
  },
  	"application/vnd.futoin+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.fuzzysheet": {
  	source: "iana",
  	extensions: [
  		"fzs"
  	]
  },
  	"application/vnd.genomatix.tuxedo": {
  	source: "iana",
  	extensions: [
  		"txd"
  	]
  },
  	"application/vnd.gentics.grd+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.geo+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.geocube+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.geogebra.file": {
  	source: "iana",
  	extensions: [
  		"ggb"
  	]
  },
  	"application/vnd.geogebra.slides": {
  	source: "iana"
  },
  	"application/vnd.geogebra.tool": {
  	source: "iana",
  	extensions: [
  		"ggt"
  	]
  },
  	"application/vnd.geometry-explorer": {
  	source: "iana",
  	extensions: [
  		"gex",
  		"gre"
  	]
  },
  	"application/vnd.geonext": {
  	source: "iana",
  	extensions: [
  		"gxt"
  	]
  },
  	"application/vnd.geoplan": {
  	source: "iana",
  	extensions: [
  		"g2w"
  	]
  },
  	"application/vnd.geospace": {
  	source: "iana",
  	extensions: [
  		"g3w"
  	]
  },
  	"application/vnd.gerber": {
  	source: "iana"
  },
  	"application/vnd.globalplatform.card-content-mgt": {
  	source: "iana"
  },
  	"application/vnd.globalplatform.card-content-mgt-response": {
  	source: "iana"
  },
  	"application/vnd.gmx": {
  	source: "iana",
  	extensions: [
  		"gmx"
  	]
  },
  	"application/vnd.google-apps.document": {
  	compressible: false,
  	extensions: [
  		"gdoc"
  	]
  },
  	"application/vnd.google-apps.presentation": {
  	compressible: false,
  	extensions: [
  		"gslides"
  	]
  },
  	"application/vnd.google-apps.spreadsheet": {
  	compressible: false,
  	extensions: [
  		"gsheet"
  	]
  },
  	"application/vnd.google-earth.kml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"kml"
  	]
  },
  	"application/vnd.google-earth.kmz": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"kmz"
  	]
  },
  	"application/vnd.gov.sk.e-form+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.gov.sk.e-form+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.gov.sk.xmldatacontainer+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.grafeq": {
  	source: "iana",
  	extensions: [
  		"gqf",
  		"gqs"
  	]
  },
  	"application/vnd.gridmp": {
  	source: "iana"
  },
  	"application/vnd.groove-account": {
  	source: "iana",
  	extensions: [
  		"gac"
  	]
  },
  	"application/vnd.groove-help": {
  	source: "iana",
  	extensions: [
  		"ghf"
  	]
  },
  	"application/vnd.groove-identity-message": {
  	source: "iana",
  	extensions: [
  		"gim"
  	]
  },
  	"application/vnd.groove-injector": {
  	source: "iana",
  	extensions: [
  		"grv"
  	]
  },
  	"application/vnd.groove-tool-message": {
  	source: "iana",
  	extensions: [
  		"gtm"
  	]
  },
  	"application/vnd.groove-tool-template": {
  	source: "iana",
  	extensions: [
  		"tpl"
  	]
  },
  	"application/vnd.groove-vcard": {
  	source: "iana",
  	extensions: [
  		"vcg"
  	]
  },
  	"application/vnd.hal+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.hal+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"hal"
  	]
  },
  	"application/vnd.handheld-entertainment+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"zmm"
  	]
  },
  	"application/vnd.hbci": {
  	source: "iana",
  	extensions: [
  		"hbci"
  	]
  },
  	"application/vnd.hc+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.hcl-bireports": {
  	source: "iana"
  },
  	"application/vnd.hdt": {
  	source: "iana"
  },
  	"application/vnd.heroku+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.hhe.lesson-player": {
  	source: "iana",
  	extensions: [
  		"les"
  	]
  },
  	"application/vnd.hl7cda+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/vnd.hl7v2+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/vnd.hp-hpgl": {
  	source: "iana",
  	extensions: [
  		"hpgl"
  	]
  },
  	"application/vnd.hp-hpid": {
  	source: "iana",
  	extensions: [
  		"hpid"
  	]
  },
  	"application/vnd.hp-hps": {
  	source: "iana",
  	extensions: [
  		"hps"
  	]
  },
  	"application/vnd.hp-jlyt": {
  	source: "iana",
  	extensions: [
  		"jlt"
  	]
  },
  	"application/vnd.hp-pcl": {
  	source: "iana",
  	extensions: [
  		"pcl"
  	]
  },
  	"application/vnd.hp-pclxl": {
  	source: "iana",
  	extensions: [
  		"pclxl"
  	]
  },
  	"application/vnd.httphone": {
  	source: "iana"
  },
  	"application/vnd.hydrostatix.sof-data": {
  	source: "iana",
  	extensions: [
  		"sfd-hdstx"
  	]
  },
  	"application/vnd.hyper+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.hyper-item+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.hyperdrive+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.hzn-3d-crossword": {
  	source: "iana"
  },
  	"application/vnd.ibm.afplinedata": {
  	source: "iana"
  },
  	"application/vnd.ibm.electronic-media": {
  	source: "iana"
  },
  	"application/vnd.ibm.minipay": {
  	source: "iana",
  	extensions: [
  		"mpy"
  	]
  },
  	"application/vnd.ibm.modcap": {
  	source: "iana",
  	extensions: [
  		"afp",
  		"listafp",
  		"list3820"
  	]
  },
  	"application/vnd.ibm.rights-management": {
  	source: "iana",
  	extensions: [
  		"irm"
  	]
  },
  	"application/vnd.ibm.secure-container": {
  	source: "iana",
  	extensions: [
  		"sc"
  	]
  },
  	"application/vnd.iccprofile": {
  	source: "iana",
  	extensions: [
  		"icc",
  		"icm"
  	]
  },
  	"application/vnd.ieee.1905": {
  	source: "iana"
  },
  	"application/vnd.igloader": {
  	source: "iana",
  	extensions: [
  		"igl"
  	]
  },
  	"application/vnd.imagemeter.folder+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.imagemeter.image+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.immervision-ivp": {
  	source: "iana",
  	extensions: [
  		"ivp"
  	]
  },
  	"application/vnd.immervision-ivu": {
  	source: "iana",
  	extensions: [
  		"ivu"
  	]
  },
  	"application/vnd.ims.imsccv1p1": {
  	source: "iana"
  },
  	"application/vnd.ims.imsccv1p2": {
  	source: "iana"
  },
  	"application/vnd.ims.imsccv1p3": {
  	source: "iana"
  },
  	"application/vnd.ims.lis.v2.result+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ims.lti.v2.toolproxy+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ims.lti.v2.toolproxy.id+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ims.lti.v2.toolsettings+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ims.lti.v2.toolsettings.simple+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.informedcontrol.rms+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.informix-visionary": {
  	source: "iana"
  },
  	"application/vnd.infotech.project": {
  	source: "iana"
  },
  	"application/vnd.infotech.project+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.innopath.wamp.notification": {
  	source: "iana"
  },
  	"application/vnd.insors.igm": {
  	source: "iana",
  	extensions: [
  		"igm"
  	]
  },
  	"application/vnd.intercon.formnet": {
  	source: "iana",
  	extensions: [
  		"xpw",
  		"xpx"
  	]
  },
  	"application/vnd.intergeo": {
  	source: "iana",
  	extensions: [
  		"i2g"
  	]
  },
  	"application/vnd.intertrust.digibox": {
  	source: "iana"
  },
  	"application/vnd.intertrust.nncp": {
  	source: "iana"
  },
  	"application/vnd.intu.qbo": {
  	source: "iana",
  	extensions: [
  		"qbo"
  	]
  },
  	"application/vnd.intu.qfx": {
  	source: "iana",
  	extensions: [
  		"qfx"
  	]
  },
  	"application/vnd.iptc.g2.catalogitem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.iptc.g2.conceptitem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.iptc.g2.knowledgeitem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.iptc.g2.newsitem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.iptc.g2.newsmessage+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.iptc.g2.packageitem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.iptc.g2.planningitem+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ipunplugged.rcprofile": {
  	source: "iana",
  	extensions: [
  		"rcprofile"
  	]
  },
  	"application/vnd.irepository.package+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"irp"
  	]
  },
  	"application/vnd.is-xpr": {
  	source: "iana",
  	extensions: [
  		"xpr"
  	]
  },
  	"application/vnd.isac.fcs": {
  	source: "iana",
  	extensions: [
  		"fcs"
  	]
  },
  	"application/vnd.iso11783-10+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.jam": {
  	source: "iana",
  	extensions: [
  		"jam"
  	]
  },
  	"application/vnd.japannet-directory-service": {
  	source: "iana"
  },
  	"application/vnd.japannet-jpnstore-wakeup": {
  	source: "iana"
  },
  	"application/vnd.japannet-payment-wakeup": {
  	source: "iana"
  },
  	"application/vnd.japannet-registration": {
  	source: "iana"
  },
  	"application/vnd.japannet-registration-wakeup": {
  	source: "iana"
  },
  	"application/vnd.japannet-setstore-wakeup": {
  	source: "iana"
  },
  	"application/vnd.japannet-verification": {
  	source: "iana"
  },
  	"application/vnd.japannet-verification-wakeup": {
  	source: "iana"
  },
  	"application/vnd.jcp.javame.midlet-rms": {
  	source: "iana",
  	extensions: [
  		"rms"
  	]
  },
  	"application/vnd.jisp": {
  	source: "iana",
  	extensions: [
  		"jisp"
  	]
  },
  	"application/vnd.joost.joda-archive": {
  	source: "iana",
  	extensions: [
  		"joda"
  	]
  },
  	"application/vnd.jsk.isdn-ngn": {
  	source: "iana"
  },
  	"application/vnd.kahootz": {
  	source: "iana",
  	extensions: [
  		"ktz",
  		"ktr"
  	]
  },
  	"application/vnd.kde.karbon": {
  	source: "iana",
  	extensions: [
  		"karbon"
  	]
  },
  	"application/vnd.kde.kchart": {
  	source: "iana",
  	extensions: [
  		"chrt"
  	]
  },
  	"application/vnd.kde.kformula": {
  	source: "iana",
  	extensions: [
  		"kfo"
  	]
  },
  	"application/vnd.kde.kivio": {
  	source: "iana",
  	extensions: [
  		"flw"
  	]
  },
  	"application/vnd.kde.kontour": {
  	source: "iana",
  	extensions: [
  		"kon"
  	]
  },
  	"application/vnd.kde.kpresenter": {
  	source: "iana",
  	extensions: [
  		"kpr",
  		"kpt"
  	]
  },
  	"application/vnd.kde.kspread": {
  	source: "iana",
  	extensions: [
  		"ksp"
  	]
  },
  	"application/vnd.kde.kword": {
  	source: "iana",
  	extensions: [
  		"kwd",
  		"kwt"
  	]
  },
  	"application/vnd.kenameaapp": {
  	source: "iana",
  	extensions: [
  		"htke"
  	]
  },
  	"application/vnd.kidspiration": {
  	source: "iana",
  	extensions: [
  		"kia"
  	]
  },
  	"application/vnd.kinar": {
  	source: "iana",
  	extensions: [
  		"kne",
  		"knp"
  	]
  },
  	"application/vnd.koan": {
  	source: "iana",
  	extensions: [
  		"skp",
  		"skd",
  		"skt",
  		"skm"
  	]
  },
  	"application/vnd.kodak-descriptor": {
  	source: "iana",
  	extensions: [
  		"sse"
  	]
  },
  	"application/vnd.las": {
  	source: "iana"
  },
  	"application/vnd.las.las+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.las.las+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"lasxml"
  	]
  },
  	"application/vnd.laszip": {
  	source: "iana"
  },
  	"application/vnd.leap+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.liberty-request+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.llamagraphics.life-balance.desktop": {
  	source: "iana",
  	extensions: [
  		"lbd"
  	]
  },
  	"application/vnd.llamagraphics.life-balance.exchange+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"lbe"
  	]
  },
  	"application/vnd.logipipe.circuit+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.loom": {
  	source: "iana"
  },
  	"application/vnd.lotus-1-2-3": {
  	source: "iana",
  	extensions: [
  		"123"
  	]
  },
  	"application/vnd.lotus-approach": {
  	source: "iana",
  	extensions: [
  		"apr"
  	]
  },
  	"application/vnd.lotus-freelance": {
  	source: "iana",
  	extensions: [
  		"pre"
  	]
  },
  	"application/vnd.lotus-notes": {
  	source: "iana",
  	extensions: [
  		"nsf"
  	]
  },
  	"application/vnd.lotus-organizer": {
  	source: "iana",
  	extensions: [
  		"org"
  	]
  },
  	"application/vnd.lotus-screencam": {
  	source: "iana",
  	extensions: [
  		"scm"
  	]
  },
  	"application/vnd.lotus-wordpro": {
  	source: "iana",
  	extensions: [
  		"lwp"
  	]
  },
  	"application/vnd.macports.portpkg": {
  	source: "iana",
  	extensions: [
  		"portpkg"
  	]
  },
  	"application/vnd.mapbox-vector-tile": {
  	source: "iana",
  	extensions: [
  		"mvt"
  	]
  },
  	"application/vnd.marlin.drm.actiontoken+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.marlin.drm.conftoken+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.marlin.drm.license+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.marlin.drm.mdcf": {
  	source: "iana"
  },
  	"application/vnd.mason+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.maxar.archive.3tz+zip": {
  	source: "iana",
  	compressible: false
  },
  	"application/vnd.maxmind.maxmind-db": {
  	source: "iana"
  },
  	"application/vnd.mcd": {
  	source: "iana",
  	extensions: [
  		"mcd"
  	]
  },
  	"application/vnd.medcalcdata": {
  	source: "iana",
  	extensions: [
  		"mc1"
  	]
  },
  	"application/vnd.mediastation.cdkey": {
  	source: "iana",
  	extensions: [
  		"cdkey"
  	]
  },
  	"application/vnd.meridian-slingshot": {
  	source: "iana"
  },
  	"application/vnd.mfer": {
  	source: "iana",
  	extensions: [
  		"mwf"
  	]
  },
  	"application/vnd.mfmp": {
  	source: "iana",
  	extensions: [
  		"mfm"
  	]
  },
  	"application/vnd.micro+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.micrografx.flo": {
  	source: "iana",
  	extensions: [
  		"flo"
  	]
  },
  	"application/vnd.micrografx.igx": {
  	source: "iana",
  	extensions: [
  		"igx"
  	]
  },
  	"application/vnd.microsoft.portable-executable": {
  	source: "iana"
  },
  	"application/vnd.microsoft.windows.thumbnail-cache": {
  	source: "iana"
  },
  	"application/vnd.miele+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.mif": {
  	source: "iana",
  	extensions: [
  		"mif"
  	]
  },
  	"application/vnd.minisoft-hp3000-save": {
  	source: "iana"
  },
  	"application/vnd.mitsubishi.misty-guard.trustweb": {
  	source: "iana"
  },
  	"application/vnd.mobius.daf": {
  	source: "iana",
  	extensions: [
  		"daf"
  	]
  },
  	"application/vnd.mobius.dis": {
  	source: "iana",
  	extensions: [
  		"dis"
  	]
  },
  	"application/vnd.mobius.mbk": {
  	source: "iana",
  	extensions: [
  		"mbk"
  	]
  },
  	"application/vnd.mobius.mqy": {
  	source: "iana",
  	extensions: [
  		"mqy"
  	]
  },
  	"application/vnd.mobius.msl": {
  	source: "iana",
  	extensions: [
  		"msl"
  	]
  },
  	"application/vnd.mobius.plc": {
  	source: "iana",
  	extensions: [
  		"plc"
  	]
  },
  	"application/vnd.mobius.txf": {
  	source: "iana",
  	extensions: [
  		"txf"
  	]
  },
  	"application/vnd.mophun.application": {
  	source: "iana",
  	extensions: [
  		"mpn"
  	]
  },
  	"application/vnd.mophun.certificate": {
  	source: "iana",
  	extensions: [
  		"mpc"
  	]
  },
  	"application/vnd.motorola.flexsuite": {
  	source: "iana"
  },
  	"application/vnd.motorola.flexsuite.adsi": {
  	source: "iana"
  },
  	"application/vnd.motorola.flexsuite.fis": {
  	source: "iana"
  },
  	"application/vnd.motorola.flexsuite.gotap": {
  	source: "iana"
  },
  	"application/vnd.motorola.flexsuite.kmr": {
  	source: "iana"
  },
  	"application/vnd.motorola.flexsuite.ttc": {
  	source: "iana"
  },
  	"application/vnd.motorola.flexsuite.wem": {
  	source: "iana"
  },
  	"application/vnd.motorola.iprm": {
  	source: "iana"
  },
  	"application/vnd.mozilla.xul+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xul"
  	]
  },
  	"application/vnd.ms-3mfdocument": {
  	source: "iana"
  },
  	"application/vnd.ms-artgalry": {
  	source: "iana",
  	extensions: [
  		"cil"
  	]
  },
  	"application/vnd.ms-asf": {
  	source: "iana"
  },
  	"application/vnd.ms-cab-compressed": {
  	source: "iana",
  	extensions: [
  		"cab"
  	]
  },
  	"application/vnd.ms-color.iccprofile": {
  	source: "apache"
  },
  	"application/vnd.ms-excel": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"xls",
  		"xlm",
  		"xla",
  		"xlc",
  		"xlt",
  		"xlw"
  	]
  },
  	"application/vnd.ms-excel.addin.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"xlam"
  	]
  },
  	"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"xlsb"
  	]
  },
  	"application/vnd.ms-excel.sheet.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"xlsm"
  	]
  },
  	"application/vnd.ms-excel.template.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"xltm"
  	]
  },
  	"application/vnd.ms-fontobject": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"eot"
  	]
  },
  	"application/vnd.ms-htmlhelp": {
  	source: "iana",
  	extensions: [
  		"chm"
  	]
  },
  	"application/vnd.ms-ims": {
  	source: "iana",
  	extensions: [
  		"ims"
  	]
  },
  	"application/vnd.ms-lrm": {
  	source: "iana",
  	extensions: [
  		"lrm"
  	]
  },
  	"application/vnd.ms-office.activex+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ms-officetheme": {
  	source: "iana",
  	extensions: [
  		"thmx"
  	]
  },
  	"application/vnd.ms-opentype": {
  	source: "apache",
  	compressible: true
  },
  	"application/vnd.ms-outlook": {
  	compressible: false,
  	extensions: [
  		"msg"
  	]
  },
  	"application/vnd.ms-package.obfuscated-opentype": {
  	source: "apache"
  },
  	"application/vnd.ms-pki.seccat": {
  	source: "apache",
  	extensions: [
  		"cat"
  	]
  },
  	"application/vnd.ms-pki.stl": {
  	source: "apache",
  	extensions: [
  		"stl"
  	]
  },
  	"application/vnd.ms-playready.initiator+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ms-powerpoint": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"ppt",
  		"pps",
  		"pot"
  	]
  },
  	"application/vnd.ms-powerpoint.addin.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"ppam"
  	]
  },
  	"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"pptm"
  	]
  },
  	"application/vnd.ms-powerpoint.slide.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"sldm"
  	]
  },
  	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"ppsm"
  	]
  },
  	"application/vnd.ms-powerpoint.template.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"potm"
  	]
  },
  	"application/vnd.ms-printdevicecapabilities+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ms-printing.printticket+xml": {
  	source: "apache",
  	compressible: true
  },
  	"application/vnd.ms-printschematicket+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ms-project": {
  	source: "iana",
  	extensions: [
  		"mpp",
  		"mpt"
  	]
  },
  	"application/vnd.ms-tnef": {
  	source: "iana"
  },
  	"application/vnd.ms-windows.devicepairing": {
  	source: "iana"
  },
  	"application/vnd.ms-windows.nwprinting.oob": {
  	source: "iana"
  },
  	"application/vnd.ms-windows.printerpairing": {
  	source: "iana"
  },
  	"application/vnd.ms-windows.wsd.oob": {
  	source: "iana"
  },
  	"application/vnd.ms-wmdrm.lic-chlg-req": {
  	source: "iana"
  },
  	"application/vnd.ms-wmdrm.lic-resp": {
  	source: "iana"
  },
  	"application/vnd.ms-wmdrm.meter-chlg-req": {
  	source: "iana"
  },
  	"application/vnd.ms-wmdrm.meter-resp": {
  	source: "iana"
  },
  	"application/vnd.ms-word.document.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"docm"
  	]
  },
  	"application/vnd.ms-word.template.macroenabled.12": {
  	source: "iana",
  	extensions: [
  		"dotm"
  	]
  },
  	"application/vnd.ms-works": {
  	source: "iana",
  	extensions: [
  		"wps",
  		"wks",
  		"wcm",
  		"wdb"
  	]
  },
  	"application/vnd.ms-wpl": {
  	source: "iana",
  	extensions: [
  		"wpl"
  	]
  },
  	"application/vnd.ms-xpsdocument": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"xps"
  	]
  },
  	"application/vnd.msa-disk-image": {
  	source: "iana"
  },
  	"application/vnd.mseq": {
  	source: "iana",
  	extensions: [
  		"mseq"
  	]
  },
  	"application/vnd.msign": {
  	source: "iana"
  },
  	"application/vnd.multiad.creator": {
  	source: "iana"
  },
  	"application/vnd.multiad.creator.cif": {
  	source: "iana"
  },
  	"application/vnd.music-niff": {
  	source: "iana"
  },
  	"application/vnd.musician": {
  	source: "iana",
  	extensions: [
  		"mus"
  	]
  },
  	"application/vnd.muvee.style": {
  	source: "iana",
  	extensions: [
  		"msty"
  	]
  },
  	"application/vnd.mynfc": {
  	source: "iana",
  	extensions: [
  		"taglet"
  	]
  },
  	"application/vnd.nacamar.ybrid+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.ncd.control": {
  	source: "iana"
  },
  	"application/vnd.ncd.reference": {
  	source: "iana"
  },
  	"application/vnd.nearst.inv+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.nebumind.line": {
  	source: "iana"
  },
  	"application/vnd.nervana": {
  	source: "iana"
  },
  	"application/vnd.netfpx": {
  	source: "iana"
  },
  	"application/vnd.neurolanguage.nlu": {
  	source: "iana",
  	extensions: [
  		"nlu"
  	]
  },
  	"application/vnd.nimn": {
  	source: "iana"
  },
  	"application/vnd.nintendo.nitro.rom": {
  	source: "iana"
  },
  	"application/vnd.nintendo.snes.rom": {
  	source: "iana"
  },
  	"application/vnd.nitf": {
  	source: "iana",
  	extensions: [
  		"ntf",
  		"nitf"
  	]
  },
  	"application/vnd.noblenet-directory": {
  	source: "iana",
  	extensions: [
  		"nnd"
  	]
  },
  	"application/vnd.noblenet-sealer": {
  	source: "iana",
  	extensions: [
  		"nns"
  	]
  },
  	"application/vnd.noblenet-web": {
  	source: "iana",
  	extensions: [
  		"nnw"
  	]
  },
  	"application/vnd.nokia.catalogs": {
  	source: "iana"
  },
  	"application/vnd.nokia.conml+wbxml": {
  	source: "iana"
  },
  	"application/vnd.nokia.conml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.nokia.iptv.config+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.nokia.isds-radio-presets": {
  	source: "iana"
  },
  	"application/vnd.nokia.landmark+wbxml": {
  	source: "iana"
  },
  	"application/vnd.nokia.landmark+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.nokia.landmarkcollection+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.nokia.n-gage.ac+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ac"
  	]
  },
  	"application/vnd.nokia.n-gage.data": {
  	source: "iana",
  	extensions: [
  		"ngdat"
  	]
  },
  	"application/vnd.nokia.n-gage.symbian.install": {
  	source: "iana",
  	extensions: [
  		"n-gage"
  	]
  },
  	"application/vnd.nokia.ncd": {
  	source: "iana"
  },
  	"application/vnd.nokia.pcd+wbxml": {
  	source: "iana"
  },
  	"application/vnd.nokia.pcd+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.nokia.radio-preset": {
  	source: "iana",
  	extensions: [
  		"rpst"
  	]
  },
  	"application/vnd.nokia.radio-presets": {
  	source: "iana",
  	extensions: [
  		"rpss"
  	]
  },
  	"application/vnd.novadigm.edm": {
  	source: "iana",
  	extensions: [
  		"edm"
  	]
  },
  	"application/vnd.novadigm.edx": {
  	source: "iana",
  	extensions: [
  		"edx"
  	]
  },
  	"application/vnd.novadigm.ext": {
  	source: "iana",
  	extensions: [
  		"ext"
  	]
  },
  	"application/vnd.ntt-local.content-share": {
  	source: "iana"
  },
  	"application/vnd.ntt-local.file-transfer": {
  	source: "iana"
  },
  	"application/vnd.ntt-local.ogw_remote-access": {
  	source: "iana"
  },
  	"application/vnd.ntt-local.sip-ta_remote": {
  	source: "iana"
  },
  	"application/vnd.ntt-local.sip-ta_tcp_stream": {
  	source: "iana"
  },
  	"application/vnd.oasis.opendocument.chart": {
  	source: "iana",
  	extensions: [
  		"odc"
  	]
  },
  	"application/vnd.oasis.opendocument.chart-template": {
  	source: "iana",
  	extensions: [
  		"otc"
  	]
  },
  	"application/vnd.oasis.opendocument.database": {
  	source: "iana",
  	extensions: [
  		"odb"
  	]
  },
  	"application/vnd.oasis.opendocument.formula": {
  	source: "iana",
  	extensions: [
  		"odf"
  	]
  },
  	"application/vnd.oasis.opendocument.formula-template": {
  	source: "iana",
  	extensions: [
  		"odft"
  	]
  },
  	"application/vnd.oasis.opendocument.graphics": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"odg"
  	]
  },
  	"application/vnd.oasis.opendocument.graphics-template": {
  	source: "iana",
  	extensions: [
  		"otg"
  	]
  },
  	"application/vnd.oasis.opendocument.image": {
  	source: "iana",
  	extensions: [
  		"odi"
  	]
  },
  	"application/vnd.oasis.opendocument.image-template": {
  	source: "iana",
  	extensions: [
  		"oti"
  	]
  },
  	"application/vnd.oasis.opendocument.presentation": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"odp"
  	]
  },
  	"application/vnd.oasis.opendocument.presentation-template": {
  	source: "iana",
  	extensions: [
  		"otp"
  	]
  },
  	"application/vnd.oasis.opendocument.spreadsheet": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"ods"
  	]
  },
  	"application/vnd.oasis.opendocument.spreadsheet-template": {
  	source: "iana",
  	extensions: [
  		"ots"
  	]
  },
  	"application/vnd.oasis.opendocument.text": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"odt"
  	]
  },
  	"application/vnd.oasis.opendocument.text-master": {
  	source: "iana",
  	extensions: [
  		"odm"
  	]
  },
  	"application/vnd.oasis.opendocument.text-template": {
  	source: "iana",
  	extensions: [
  		"ott"
  	]
  },
  	"application/vnd.oasis.opendocument.text-web": {
  	source: "iana",
  	extensions: [
  		"oth"
  	]
  },
  	"application/vnd.obn": {
  	source: "iana"
  },
  	"application/vnd.ocf+cbor": {
  	source: "iana"
  },
  	"application/vnd.oci.image.manifest.v1+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oftn.l10n+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.contentaccessdownload+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.contentaccessstreaming+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.cspg-hexbinary": {
  	source: "iana"
  },
  	"application/vnd.oipf.dae.svg+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.dae.xhtml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.mippvcontrolmessage+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.pae.gem": {
  	source: "iana"
  },
  	"application/vnd.oipf.spdiscovery+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.spdlist+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.ueprofile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oipf.userprofile+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.olpc-sugar": {
  	source: "iana",
  	extensions: [
  		"xo"
  	]
  },
  	"application/vnd.oma-scws-config": {
  	source: "iana"
  },
  	"application/vnd.oma-scws-http-request": {
  	source: "iana"
  },
  	"application/vnd.oma-scws-http-response": {
  	source: "iana"
  },
  	"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.drm-trigger+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.imd+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.ltkm": {
  	source: "iana"
  },
  	"application/vnd.oma.bcast.notification+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.provisioningtrigger": {
  	source: "iana"
  },
  	"application/vnd.oma.bcast.sgboot": {
  	source: "iana"
  },
  	"application/vnd.oma.bcast.sgdd+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.sgdu": {
  	source: "iana"
  },
  	"application/vnd.oma.bcast.simple-symbol-container": {
  	source: "iana"
  },
  	"application/vnd.oma.bcast.smartcard-trigger+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.sprov+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.bcast.stkm": {
  	source: "iana"
  },
  	"application/vnd.oma.cab-address-book+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.cab-feature-handler+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.cab-pcc+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.cab-subs-invite+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.cab-user-prefs+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.dcd": {
  	source: "iana"
  },
  	"application/vnd.oma.dcdc": {
  	source: "iana"
  },
  	"application/vnd.oma.dd2+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"dd2"
  	]
  },
  	"application/vnd.oma.drm.risd+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.group-usage-list+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.lwm2m+cbor": {
  	source: "iana"
  },
  	"application/vnd.oma.lwm2m+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.lwm2m+tlv": {
  	source: "iana"
  },
  	"application/vnd.oma.pal+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.poc.detailed-progress-report+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.poc.final-report+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.poc.groups+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.poc.invocation-descriptor+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.poc.optimized-progress-report+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.push": {
  	source: "iana"
  },
  	"application/vnd.oma.scidm.messages+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oma.xcap-directory+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.omads-email+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/vnd.omads-file+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/vnd.omads-folder+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/vnd.omaloc-supl-init": {
  	source: "iana"
  },
  	"application/vnd.onepager": {
  	source: "iana"
  },
  	"application/vnd.onepagertamp": {
  	source: "iana"
  },
  	"application/vnd.onepagertamx": {
  	source: "iana"
  },
  	"application/vnd.onepagertat": {
  	source: "iana"
  },
  	"application/vnd.onepagertatp": {
  	source: "iana"
  },
  	"application/vnd.onepagertatx": {
  	source: "iana"
  },
  	"application/vnd.openblox.game+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"obgx"
  	]
  },
  	"application/vnd.openblox.game-binary": {
  	source: "iana"
  },
  	"application/vnd.openeye.oeb": {
  	source: "iana"
  },
  	"application/vnd.openofficeorg.extension": {
  	source: "apache",
  	extensions: [
  		"oxt"
  	]
  },
  	"application/vnd.openstreetmap.data+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"osm"
  	]
  },
  	"application/vnd.opentimestamps.ots": {
  	source: "iana"
  },
  	"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawing+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"pptx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slide": {
  	source: "iana",
  	extensions: [
  		"sldx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
  	source: "iana",
  	extensions: [
  		"ppsx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.template": {
  	source: "iana",
  	extensions: [
  		"potx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"xlsx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
  	source: "iana",
  	extensions: [
  		"xltx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.theme+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.vmldrawing": {
  	source: "iana"
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"docx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
  	source: "iana",
  	extensions: [
  		"dotx"
  	]
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-package.core-properties+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.openxmlformats-package.relationships+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oracle.resource+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.orange.indata": {
  	source: "iana"
  },
  	"application/vnd.osa.netdeploy": {
  	source: "iana"
  },
  	"application/vnd.osgeo.mapguide.package": {
  	source: "iana",
  	extensions: [
  		"mgp"
  	]
  },
  	"application/vnd.osgi.bundle": {
  	source: "iana"
  },
  	"application/vnd.osgi.dp": {
  	source: "iana",
  	extensions: [
  		"dp"
  	]
  },
  	"application/vnd.osgi.subsystem": {
  	source: "iana",
  	extensions: [
  		"esa"
  	]
  },
  	"application/vnd.otps.ct-kip+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.oxli.countgraph": {
  	source: "iana"
  },
  	"application/vnd.pagerduty+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.palm": {
  	source: "iana",
  	extensions: [
  		"pdb",
  		"pqa",
  		"oprc"
  	]
  },
  	"application/vnd.panoply": {
  	source: "iana"
  },
  	"application/vnd.paos.xml": {
  	source: "iana"
  },
  	"application/vnd.patentdive": {
  	source: "iana"
  },
  	"application/vnd.patientecommsdoc": {
  	source: "iana"
  },
  	"application/vnd.pawaafile": {
  	source: "iana",
  	extensions: [
  		"paw"
  	]
  },
  	"application/vnd.pcos": {
  	source: "iana"
  },
  	"application/vnd.pg.format": {
  	source: "iana",
  	extensions: [
  		"str"
  	]
  },
  	"application/vnd.pg.osasli": {
  	source: "iana",
  	extensions: [
  		"ei6"
  	]
  },
  	"application/vnd.piaccess.application-licence": {
  	source: "iana"
  },
  	"application/vnd.picsel": {
  	source: "iana",
  	extensions: [
  		"efif"
  	]
  },
  	"application/vnd.pmi.widget": {
  	source: "iana",
  	extensions: [
  		"wg"
  	]
  },
  	"application/vnd.poc.group-advertisement+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.pocketlearn": {
  	source: "iana",
  	extensions: [
  		"plf"
  	]
  },
  	"application/vnd.powerbuilder6": {
  	source: "iana",
  	extensions: [
  		"pbd"
  	]
  },
  	"application/vnd.powerbuilder6-s": {
  	source: "iana"
  },
  	"application/vnd.powerbuilder7": {
  	source: "iana"
  },
  	"application/vnd.powerbuilder7-s": {
  	source: "iana"
  },
  	"application/vnd.powerbuilder75": {
  	source: "iana"
  },
  	"application/vnd.powerbuilder75-s": {
  	source: "iana"
  },
  	"application/vnd.preminet": {
  	source: "iana"
  },
  	"application/vnd.previewsystems.box": {
  	source: "iana",
  	extensions: [
  		"box"
  	]
  },
  	"application/vnd.proteus.magazine": {
  	source: "iana",
  	extensions: [
  		"mgz"
  	]
  },
  	"application/vnd.psfs": {
  	source: "iana"
  },
  	"application/vnd.publishare-delta-tree": {
  	source: "iana",
  	extensions: [
  		"qps"
  	]
  },
  	"application/vnd.pvi.ptid1": {
  	source: "iana",
  	extensions: [
  		"ptid"
  	]
  },
  	"application/vnd.pwg-multiplexed": {
  	source: "iana"
  },
  	"application/vnd.pwg-xhtml-print+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.qualcomm.brew-app-res": {
  	source: "iana"
  },
  	"application/vnd.quarantainenet": {
  	source: "iana"
  },
  	"application/vnd.quark.quarkxpress": {
  	source: "iana",
  	extensions: [
  		"qxd",
  		"qxt",
  		"qwd",
  		"qwt",
  		"qxl",
  		"qxb"
  	]
  },
  	"application/vnd.quobject-quoxdocument": {
  	source: "iana"
  },
  	"application/vnd.radisys.moml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-audit+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-audit-conf+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-audit-conn+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-audit-dialog+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-audit-stream+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-conf+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog-base+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog-fax-detect+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog-group+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog-speech+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.radisys.msml-dialog-transform+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.rainstor.data": {
  	source: "iana"
  },
  	"application/vnd.rapid": {
  	source: "iana"
  },
  	"application/vnd.rar": {
  	source: "iana",
  	extensions: [
  		"rar"
  	]
  },
  	"application/vnd.realvnc.bed": {
  	source: "iana",
  	extensions: [
  		"bed"
  	]
  },
  	"application/vnd.recordare.musicxml": {
  	source: "iana",
  	extensions: [
  		"mxl"
  	]
  },
  	"application/vnd.recordare.musicxml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"musicxml"
  	]
  },
  	"application/vnd.renlearn.rlprint": {
  	source: "iana"
  },
  	"application/vnd.resilient.logic": {
  	source: "iana"
  },
  	"application/vnd.restful+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.rig.cryptonote": {
  	source: "iana",
  	extensions: [
  		"cryptonote"
  	]
  },
  	"application/vnd.rim.cod": {
  	source: "apache",
  	extensions: [
  		"cod"
  	]
  },
  	"application/vnd.rn-realmedia": {
  	source: "apache",
  	extensions: [
  		"rm"
  	]
  },
  	"application/vnd.rn-realmedia-vbr": {
  	source: "apache",
  	extensions: [
  		"rmvb"
  	]
  },
  	"application/vnd.route66.link66+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"link66"
  	]
  },
  	"application/vnd.rs-274x": {
  	source: "iana"
  },
  	"application/vnd.ruckus.download": {
  	source: "iana"
  },
  	"application/vnd.s3sms": {
  	source: "iana"
  },
  	"application/vnd.sailingtracker.track": {
  	source: "iana",
  	extensions: [
  		"st"
  	]
  },
  	"application/vnd.sar": {
  	source: "iana"
  },
  	"application/vnd.sbm.cid": {
  	source: "iana"
  },
  	"application/vnd.sbm.mid2": {
  	source: "iana"
  },
  	"application/vnd.scribus": {
  	source: "iana"
  },
  	"application/vnd.sealed.3df": {
  	source: "iana"
  },
  	"application/vnd.sealed.csf": {
  	source: "iana"
  },
  	"application/vnd.sealed.doc": {
  	source: "iana"
  },
  	"application/vnd.sealed.eml": {
  	source: "iana"
  },
  	"application/vnd.sealed.mht": {
  	source: "iana"
  },
  	"application/vnd.sealed.net": {
  	source: "iana"
  },
  	"application/vnd.sealed.ppt": {
  	source: "iana"
  },
  	"application/vnd.sealed.tiff": {
  	source: "iana"
  },
  	"application/vnd.sealed.xls": {
  	source: "iana"
  },
  	"application/vnd.sealedmedia.softseal.html": {
  	source: "iana"
  },
  	"application/vnd.sealedmedia.softseal.pdf": {
  	source: "iana"
  },
  	"application/vnd.seemail": {
  	source: "iana",
  	extensions: [
  		"see"
  	]
  },
  	"application/vnd.seis+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.sema": {
  	source: "iana",
  	extensions: [
  		"sema"
  	]
  },
  	"application/vnd.semd": {
  	source: "iana",
  	extensions: [
  		"semd"
  	]
  },
  	"application/vnd.semf": {
  	source: "iana",
  	extensions: [
  		"semf"
  	]
  },
  	"application/vnd.shade-save-file": {
  	source: "iana"
  },
  	"application/vnd.shana.informed.formdata": {
  	source: "iana",
  	extensions: [
  		"ifm"
  	]
  },
  	"application/vnd.shana.informed.formtemplate": {
  	source: "iana",
  	extensions: [
  		"itp"
  	]
  },
  	"application/vnd.shana.informed.interchange": {
  	source: "iana",
  	extensions: [
  		"iif"
  	]
  },
  	"application/vnd.shana.informed.package": {
  	source: "iana",
  	extensions: [
  		"ipk"
  	]
  },
  	"application/vnd.shootproof+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.shopkick+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.shp": {
  	source: "iana"
  },
  	"application/vnd.shx": {
  	source: "iana"
  },
  	"application/vnd.sigrok.session": {
  	source: "iana"
  },
  	"application/vnd.simtech-mindmapper": {
  	source: "iana",
  	extensions: [
  		"twd",
  		"twds"
  	]
  },
  	"application/vnd.siren+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.smaf": {
  	source: "iana",
  	extensions: [
  		"mmf"
  	]
  },
  	"application/vnd.smart.notebook": {
  	source: "iana"
  },
  	"application/vnd.smart.teacher": {
  	source: "iana",
  	extensions: [
  		"teacher"
  	]
  },
  	"application/vnd.snesdev-page-table": {
  	source: "iana"
  },
  	"application/vnd.software602.filler.form+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"fo"
  	]
  },
  	"application/vnd.software602.filler.form-xml-zip": {
  	source: "iana"
  },
  	"application/vnd.solent.sdkm+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"sdkm",
  		"sdkd"
  	]
  },
  	"application/vnd.spotfire.dxp": {
  	source: "iana",
  	extensions: [
  		"dxp"
  	]
  },
  	"application/vnd.spotfire.sfs": {
  	source: "iana",
  	extensions: [
  		"sfs"
  	]
  },
  	"application/vnd.sqlite3": {
  	source: "iana"
  },
  	"application/vnd.sss-cod": {
  	source: "iana"
  },
  	"application/vnd.sss-dtf": {
  	source: "iana"
  },
  	"application/vnd.sss-ntf": {
  	source: "iana"
  },
  	"application/vnd.stardivision.calc": {
  	source: "apache",
  	extensions: [
  		"sdc"
  	]
  },
  	"application/vnd.stardivision.draw": {
  	source: "apache",
  	extensions: [
  		"sda"
  	]
  },
  	"application/vnd.stardivision.impress": {
  	source: "apache",
  	extensions: [
  		"sdd"
  	]
  },
  	"application/vnd.stardivision.math": {
  	source: "apache",
  	extensions: [
  		"smf"
  	]
  },
  	"application/vnd.stardivision.writer": {
  	source: "apache",
  	extensions: [
  		"sdw",
  		"vor"
  	]
  },
  	"application/vnd.stardivision.writer-global": {
  	source: "apache",
  	extensions: [
  		"sgl"
  	]
  },
  	"application/vnd.stepmania.package": {
  	source: "iana",
  	extensions: [
  		"smzip"
  	]
  },
  	"application/vnd.stepmania.stepchart": {
  	source: "iana",
  	extensions: [
  		"sm"
  	]
  },
  	"application/vnd.street-stream": {
  	source: "iana"
  },
  	"application/vnd.sun.wadl+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"wadl"
  	]
  },
  	"application/vnd.sun.xml.calc": {
  	source: "apache",
  	extensions: [
  		"sxc"
  	]
  },
  	"application/vnd.sun.xml.calc.template": {
  	source: "apache",
  	extensions: [
  		"stc"
  	]
  },
  	"application/vnd.sun.xml.draw": {
  	source: "apache",
  	extensions: [
  		"sxd"
  	]
  },
  	"application/vnd.sun.xml.draw.template": {
  	source: "apache",
  	extensions: [
  		"std"
  	]
  },
  	"application/vnd.sun.xml.impress": {
  	source: "apache",
  	extensions: [
  		"sxi"
  	]
  },
  	"application/vnd.sun.xml.impress.template": {
  	source: "apache",
  	extensions: [
  		"sti"
  	]
  },
  	"application/vnd.sun.xml.math": {
  	source: "apache",
  	extensions: [
  		"sxm"
  	]
  },
  	"application/vnd.sun.xml.writer": {
  	source: "apache",
  	extensions: [
  		"sxw"
  	]
  },
  	"application/vnd.sun.xml.writer.global": {
  	source: "apache",
  	extensions: [
  		"sxg"
  	]
  },
  	"application/vnd.sun.xml.writer.template": {
  	source: "apache",
  	extensions: [
  		"stw"
  	]
  },
  	"application/vnd.sus-calendar": {
  	source: "iana",
  	extensions: [
  		"sus",
  		"susp"
  	]
  },
  	"application/vnd.svd": {
  	source: "iana",
  	extensions: [
  		"svd"
  	]
  },
  	"application/vnd.swiftview-ics": {
  	source: "iana"
  },
  	"application/vnd.sycle+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.syft+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.symbian.install": {
  	source: "apache",
  	extensions: [
  		"sis",
  		"sisx"
  	]
  },
  	"application/vnd.syncml+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"xsm"
  	]
  },
  	"application/vnd.syncml.dm+wbxml": {
  	source: "iana",
  	charset: "UTF-8",
  	extensions: [
  		"bdm"
  	]
  },
  	"application/vnd.syncml.dm+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"xdm"
  	]
  },
  	"application/vnd.syncml.dm.notification": {
  	source: "iana"
  },
  	"application/vnd.syncml.dmddf+wbxml": {
  	source: "iana"
  },
  	"application/vnd.syncml.dmddf+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"ddf"
  	]
  },
  	"application/vnd.syncml.dmtnds+wbxml": {
  	source: "iana"
  },
  	"application/vnd.syncml.dmtnds+xml": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true
  },
  	"application/vnd.syncml.ds.notification": {
  	source: "iana"
  },
  	"application/vnd.tableschema+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.tao.intent-module-archive": {
  	source: "iana",
  	extensions: [
  		"tao"
  	]
  },
  	"application/vnd.tcpdump.pcap": {
  	source: "iana",
  	extensions: [
  		"pcap",
  		"cap",
  		"dmp"
  	]
  },
  	"application/vnd.think-cell.ppttc+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.tmd.mediaflex.api+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.tml": {
  	source: "iana"
  },
  	"application/vnd.tmobile-livetv": {
  	source: "iana",
  	extensions: [
  		"tmo"
  	]
  },
  	"application/vnd.tri.onesource": {
  	source: "iana"
  },
  	"application/vnd.trid.tpt": {
  	source: "iana",
  	extensions: [
  		"tpt"
  	]
  },
  	"application/vnd.triscape.mxs": {
  	source: "iana",
  	extensions: [
  		"mxs"
  	]
  },
  	"application/vnd.trueapp": {
  	source: "iana",
  	extensions: [
  		"tra"
  	]
  },
  	"application/vnd.truedoc": {
  	source: "iana"
  },
  	"application/vnd.ubisoft.webplayer": {
  	source: "iana"
  },
  	"application/vnd.ufdl": {
  	source: "iana",
  	extensions: [
  		"ufd",
  		"ufdl"
  	]
  },
  	"application/vnd.uiq.theme": {
  	source: "iana",
  	extensions: [
  		"utz"
  	]
  },
  	"application/vnd.umajin": {
  	source: "iana",
  	extensions: [
  		"umj"
  	]
  },
  	"application/vnd.unity": {
  	source: "iana",
  	extensions: [
  		"unityweb"
  	]
  },
  	"application/vnd.uoml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"uoml"
  	]
  },
  	"application/vnd.uplanet.alert": {
  	source: "iana"
  },
  	"application/vnd.uplanet.alert-wbxml": {
  	source: "iana"
  },
  	"application/vnd.uplanet.bearer-choice": {
  	source: "iana"
  },
  	"application/vnd.uplanet.bearer-choice-wbxml": {
  	source: "iana"
  },
  	"application/vnd.uplanet.cacheop": {
  	source: "iana"
  },
  	"application/vnd.uplanet.cacheop-wbxml": {
  	source: "iana"
  },
  	"application/vnd.uplanet.channel": {
  	source: "iana"
  },
  	"application/vnd.uplanet.channel-wbxml": {
  	source: "iana"
  },
  	"application/vnd.uplanet.list": {
  	source: "iana"
  },
  	"application/vnd.uplanet.list-wbxml": {
  	source: "iana"
  },
  	"application/vnd.uplanet.listcmd": {
  	source: "iana"
  },
  	"application/vnd.uplanet.listcmd-wbxml": {
  	source: "iana"
  },
  	"application/vnd.uplanet.signal": {
  	source: "iana"
  },
  	"application/vnd.uri-map": {
  	source: "iana"
  },
  	"application/vnd.valve.source.material": {
  	source: "iana"
  },
  	"application/vnd.vcx": {
  	source: "iana",
  	extensions: [
  		"vcx"
  	]
  },
  	"application/vnd.vd-study": {
  	source: "iana"
  },
  	"application/vnd.vectorworks": {
  	source: "iana"
  },
  	"application/vnd.vel+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.verimatrix.vcas": {
  	source: "iana"
  },
  	"application/vnd.veritone.aion+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.veryant.thin": {
  	source: "iana"
  },
  	"application/vnd.ves.encrypted": {
  	source: "iana"
  },
  	"application/vnd.vidsoft.vidconference": {
  	source: "iana"
  },
  	"application/vnd.visio": {
  	source: "iana",
  	extensions: [
  		"vsd",
  		"vst",
  		"vss",
  		"vsw"
  	]
  },
  	"application/vnd.visionary": {
  	source: "iana",
  	extensions: [
  		"vis"
  	]
  },
  	"application/vnd.vividence.scriptfile": {
  	source: "iana"
  },
  	"application/vnd.vsf": {
  	source: "iana",
  	extensions: [
  		"vsf"
  	]
  },
  	"application/vnd.wap.sic": {
  	source: "iana"
  },
  	"application/vnd.wap.slc": {
  	source: "iana"
  },
  	"application/vnd.wap.wbxml": {
  	source: "iana",
  	charset: "UTF-8",
  	extensions: [
  		"wbxml"
  	]
  },
  	"application/vnd.wap.wmlc": {
  	source: "iana",
  	extensions: [
  		"wmlc"
  	]
  },
  	"application/vnd.wap.wmlscriptc": {
  	source: "iana",
  	extensions: [
  		"wmlsc"
  	]
  },
  	"application/vnd.webturbo": {
  	source: "iana",
  	extensions: [
  		"wtb"
  	]
  },
  	"application/vnd.wfa.dpp": {
  	source: "iana"
  },
  	"application/vnd.wfa.p2p": {
  	source: "iana"
  },
  	"application/vnd.wfa.wsc": {
  	source: "iana"
  },
  	"application/vnd.windows.devicepairing": {
  	source: "iana"
  },
  	"application/vnd.wmc": {
  	source: "iana"
  },
  	"application/vnd.wmf.bootstrap": {
  	source: "iana"
  },
  	"application/vnd.wolfram.mathematica": {
  	source: "iana"
  },
  	"application/vnd.wolfram.mathematica.package": {
  	source: "iana"
  },
  	"application/vnd.wolfram.player": {
  	source: "iana",
  	extensions: [
  		"nbp"
  	]
  },
  	"application/vnd.wordperfect": {
  	source: "iana",
  	extensions: [
  		"wpd"
  	]
  },
  	"application/vnd.wqd": {
  	source: "iana",
  	extensions: [
  		"wqd"
  	]
  },
  	"application/vnd.wrq-hp3000-labelled": {
  	source: "iana"
  },
  	"application/vnd.wt.stf": {
  	source: "iana",
  	extensions: [
  		"stf"
  	]
  },
  	"application/vnd.wv.csp+wbxml": {
  	source: "iana"
  },
  	"application/vnd.wv.csp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.wv.ssp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.xacml+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.xara": {
  	source: "iana",
  	extensions: [
  		"xar"
  	]
  },
  	"application/vnd.xfdl": {
  	source: "iana",
  	extensions: [
  		"xfdl"
  	]
  },
  	"application/vnd.xfdl.webform": {
  	source: "iana"
  },
  	"application/vnd.xmi+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/vnd.xmpie.cpkg": {
  	source: "iana"
  },
  	"application/vnd.xmpie.dpkg": {
  	source: "iana"
  },
  	"application/vnd.xmpie.plan": {
  	source: "iana"
  },
  	"application/vnd.xmpie.ppkg": {
  	source: "iana"
  },
  	"application/vnd.xmpie.xlim": {
  	source: "iana"
  },
  	"application/vnd.yamaha.hv-dic": {
  	source: "iana",
  	extensions: [
  		"hvd"
  	]
  },
  	"application/vnd.yamaha.hv-script": {
  	source: "iana",
  	extensions: [
  		"hvs"
  	]
  },
  	"application/vnd.yamaha.hv-voice": {
  	source: "iana",
  	extensions: [
  		"hvp"
  	]
  },
  	"application/vnd.yamaha.openscoreformat": {
  	source: "iana",
  	extensions: [
  		"osf"
  	]
  },
  	"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"osfpvg"
  	]
  },
  	"application/vnd.yamaha.remote-setup": {
  	source: "iana"
  },
  	"application/vnd.yamaha.smaf-audio": {
  	source: "iana",
  	extensions: [
  		"saf"
  	]
  },
  	"application/vnd.yamaha.smaf-phrase": {
  	source: "iana",
  	extensions: [
  		"spf"
  	]
  },
  	"application/vnd.yamaha.through-ngn": {
  	source: "iana"
  },
  	"application/vnd.yamaha.tunnel-udpencap": {
  	source: "iana"
  },
  	"application/vnd.yaoweme": {
  	source: "iana"
  },
  	"application/vnd.yellowriver-custom-menu": {
  	source: "iana",
  	extensions: [
  		"cmp"
  	]
  },
  	"application/vnd.youtube.yt": {
  	source: "iana"
  },
  	"application/vnd.zul": {
  	source: "iana",
  	extensions: [
  		"zir",
  		"zirz"
  	]
  },
  	"application/vnd.zzazz.deck+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"zaz"
  	]
  },
  	"application/voicexml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"vxml"
  	]
  },
  	"application/voucher-cms+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/vq-rtcpxr": {
  	source: "iana"
  },
  	"application/wasm": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"wasm"
  	]
  },
  	"application/watcherinfo+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"wif"
  	]
  },
  	"application/webpush-options+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/whoispp-query": {
  	source: "iana"
  },
  	"application/whoispp-response": {
  	source: "iana"
  },
  	"application/widget": {
  	source: "iana",
  	extensions: [
  		"wgt"
  	]
  },
  	"application/winhlp": {
  	source: "apache",
  	extensions: [
  		"hlp"
  	]
  },
  	"application/wita": {
  	source: "iana"
  },
  	"application/wordperfect5.1": {
  	source: "iana"
  },
  	"application/wsdl+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"wsdl"
  	]
  },
  	"application/wspolicy+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"wspolicy"
  	]
  },
  	"application/x-7z-compressed": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"7z"
  	]
  },
  	"application/x-abiword": {
  	source: "apache",
  	extensions: [
  		"abw"
  	]
  },
  	"application/x-ace-compressed": {
  	source: "apache",
  	extensions: [
  		"ace"
  	]
  },
  	"application/x-amf": {
  	source: "apache"
  },
  	"application/x-apple-diskimage": {
  	source: "apache",
  	extensions: [
  		"dmg"
  	]
  },
  	"application/x-arj": {
  	compressible: false,
  	extensions: [
  		"arj"
  	]
  },
  	"application/x-authorware-bin": {
  	source: "apache",
  	extensions: [
  		"aab",
  		"x32",
  		"u32",
  		"vox"
  	]
  },
  	"application/x-authorware-map": {
  	source: "apache",
  	extensions: [
  		"aam"
  	]
  },
  	"application/x-authorware-seg": {
  	source: "apache",
  	extensions: [
  		"aas"
  	]
  },
  	"application/x-bcpio": {
  	source: "apache",
  	extensions: [
  		"bcpio"
  	]
  },
  	"application/x-bdoc": {
  	compressible: false,
  	extensions: [
  		"bdoc"
  	]
  },
  	"application/x-bittorrent": {
  	source: "apache",
  	extensions: [
  		"torrent"
  	]
  },
  	"application/x-blorb": {
  	source: "apache",
  	extensions: [
  		"blb",
  		"blorb"
  	]
  },
  	"application/x-bzip": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"bz"
  	]
  },
  	"application/x-bzip2": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"bz2",
  		"boz"
  	]
  },
  	"application/x-cbr": {
  	source: "apache",
  	extensions: [
  		"cbr",
  		"cba",
  		"cbt",
  		"cbz",
  		"cb7"
  	]
  },
  	"application/x-cdlink": {
  	source: "apache",
  	extensions: [
  		"vcd"
  	]
  },
  	"application/x-cfs-compressed": {
  	source: "apache",
  	extensions: [
  		"cfs"
  	]
  },
  	"application/x-chat": {
  	source: "apache",
  	extensions: [
  		"chat"
  	]
  },
  	"application/x-chess-pgn": {
  	source: "apache",
  	extensions: [
  		"pgn"
  	]
  },
  	"application/x-chrome-extension": {
  	extensions: [
  		"crx"
  	]
  },
  	"application/x-cocoa": {
  	source: "nginx",
  	extensions: [
  		"cco"
  	]
  },
  	"application/x-compress": {
  	source: "apache"
  },
  	"application/x-conference": {
  	source: "apache",
  	extensions: [
  		"nsc"
  	]
  },
  	"application/x-cpio": {
  	source: "apache",
  	extensions: [
  		"cpio"
  	]
  },
  	"application/x-csh": {
  	source: "apache",
  	extensions: [
  		"csh"
  	]
  },
  	"application/x-deb": {
  	compressible: false
  },
  	"application/x-debian-package": {
  	source: "apache",
  	extensions: [
  		"deb",
  		"udeb"
  	]
  },
  	"application/x-dgc-compressed": {
  	source: "apache",
  	extensions: [
  		"dgc"
  	]
  },
  	"application/x-director": {
  	source: "apache",
  	extensions: [
  		"dir",
  		"dcr",
  		"dxr",
  		"cst",
  		"cct",
  		"cxt",
  		"w3d",
  		"fgd",
  		"swa"
  	]
  },
  	"application/x-doom": {
  	source: "apache",
  	extensions: [
  		"wad"
  	]
  },
  	"application/x-dtbncx+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"ncx"
  	]
  },
  	"application/x-dtbook+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"dtb"
  	]
  },
  	"application/x-dtbresource+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"res"
  	]
  },
  	"application/x-dvi": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"dvi"
  	]
  },
  	"application/x-envoy": {
  	source: "apache",
  	extensions: [
  		"evy"
  	]
  },
  	"application/x-eva": {
  	source: "apache",
  	extensions: [
  		"eva"
  	]
  },
  	"application/x-font-bdf": {
  	source: "apache",
  	extensions: [
  		"bdf"
  	]
  },
  	"application/x-font-dos": {
  	source: "apache"
  },
  	"application/x-font-framemaker": {
  	source: "apache"
  },
  	"application/x-font-ghostscript": {
  	source: "apache",
  	extensions: [
  		"gsf"
  	]
  },
  	"application/x-font-libgrx": {
  	source: "apache"
  },
  	"application/x-font-linux-psf": {
  	source: "apache",
  	extensions: [
  		"psf"
  	]
  },
  	"application/x-font-pcf": {
  	source: "apache",
  	extensions: [
  		"pcf"
  	]
  },
  	"application/x-font-snf": {
  	source: "apache",
  	extensions: [
  		"snf"
  	]
  },
  	"application/x-font-speedo": {
  	source: "apache"
  },
  	"application/x-font-sunos-news": {
  	source: "apache"
  },
  	"application/x-font-type1": {
  	source: "apache",
  	extensions: [
  		"pfa",
  		"pfb",
  		"pfm",
  		"afm"
  	]
  },
  	"application/x-font-vfont": {
  	source: "apache"
  },
  	"application/x-freearc": {
  	source: "apache",
  	extensions: [
  		"arc"
  	]
  },
  	"application/x-futuresplash": {
  	source: "apache",
  	extensions: [
  		"spl"
  	]
  },
  	"application/x-gca-compressed": {
  	source: "apache",
  	extensions: [
  		"gca"
  	]
  },
  	"application/x-glulx": {
  	source: "apache",
  	extensions: [
  		"ulx"
  	]
  },
  	"application/x-gnumeric": {
  	source: "apache",
  	extensions: [
  		"gnumeric"
  	]
  },
  	"application/x-gramps-xml": {
  	source: "apache",
  	extensions: [
  		"gramps"
  	]
  },
  	"application/x-gtar": {
  	source: "apache",
  	extensions: [
  		"gtar"
  	]
  },
  	"application/x-gzip": {
  	source: "apache"
  },
  	"application/x-hdf": {
  	source: "apache",
  	extensions: [
  		"hdf"
  	]
  },
  	"application/x-httpd-php": {
  	compressible: true,
  	extensions: [
  		"php"
  	]
  },
  	"application/x-install-instructions": {
  	source: "apache",
  	extensions: [
  		"install"
  	]
  },
  	"application/x-iso9660-image": {
  	source: "apache",
  	extensions: [
  		"iso"
  	]
  },
  	"application/x-iwork-keynote-sffkey": {
  	extensions: [
  		"key"
  	]
  },
  	"application/x-iwork-numbers-sffnumbers": {
  	extensions: [
  		"numbers"
  	]
  },
  	"application/x-iwork-pages-sffpages": {
  	extensions: [
  		"pages"
  	]
  },
  	"application/x-java-archive-diff": {
  	source: "nginx",
  	extensions: [
  		"jardiff"
  	]
  },
  	"application/x-java-jnlp-file": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"jnlp"
  	]
  },
  	"application/x-javascript": {
  	compressible: true
  },
  	"application/x-keepass2": {
  	extensions: [
  		"kdbx"
  	]
  },
  	"application/x-latex": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"latex"
  	]
  },
  	"application/x-lua-bytecode": {
  	extensions: [
  		"luac"
  	]
  },
  	"application/x-lzh-compressed": {
  	source: "apache",
  	extensions: [
  		"lzh",
  		"lha"
  	]
  },
  	"application/x-makeself": {
  	source: "nginx",
  	extensions: [
  		"run"
  	]
  },
  	"application/x-mie": {
  	source: "apache",
  	extensions: [
  		"mie"
  	]
  },
  	"application/x-mobipocket-ebook": {
  	source: "apache",
  	extensions: [
  		"prc",
  		"mobi"
  	]
  },
  	"application/x-mpegurl": {
  	compressible: false
  },
  	"application/x-ms-application": {
  	source: "apache",
  	extensions: [
  		"application"
  	]
  },
  	"application/x-ms-shortcut": {
  	source: "apache",
  	extensions: [
  		"lnk"
  	]
  },
  	"application/x-ms-wmd": {
  	source: "apache",
  	extensions: [
  		"wmd"
  	]
  },
  	"application/x-ms-wmz": {
  	source: "apache",
  	extensions: [
  		"wmz"
  	]
  },
  	"application/x-ms-xbap": {
  	source: "apache",
  	extensions: [
  		"xbap"
  	]
  },
  	"application/x-msaccess": {
  	source: "apache",
  	extensions: [
  		"mdb"
  	]
  },
  	"application/x-msbinder": {
  	source: "apache",
  	extensions: [
  		"obd"
  	]
  },
  	"application/x-mscardfile": {
  	source: "apache",
  	extensions: [
  		"crd"
  	]
  },
  	"application/x-msclip": {
  	source: "apache",
  	extensions: [
  		"clp"
  	]
  },
  	"application/x-msdos-program": {
  	extensions: [
  		"exe"
  	]
  },
  	"application/x-msdownload": {
  	source: "apache",
  	extensions: [
  		"exe",
  		"dll",
  		"com",
  		"bat",
  		"msi"
  	]
  },
  	"application/x-msmediaview": {
  	source: "apache",
  	extensions: [
  		"mvb",
  		"m13",
  		"m14"
  	]
  },
  	"application/x-msmetafile": {
  	source: "apache",
  	extensions: [
  		"wmf",
  		"wmz",
  		"emf",
  		"emz"
  	]
  },
  	"application/x-msmoney": {
  	source: "apache",
  	extensions: [
  		"mny"
  	]
  },
  	"application/x-mspublisher": {
  	source: "apache",
  	extensions: [
  		"pub"
  	]
  },
  	"application/x-msschedule": {
  	source: "apache",
  	extensions: [
  		"scd"
  	]
  },
  	"application/x-msterminal": {
  	source: "apache",
  	extensions: [
  		"trm"
  	]
  },
  	"application/x-mswrite": {
  	source: "apache",
  	extensions: [
  		"wri"
  	]
  },
  	"application/x-netcdf": {
  	source: "apache",
  	extensions: [
  		"nc",
  		"cdf"
  	]
  },
  	"application/x-ns-proxy-autoconfig": {
  	compressible: true,
  	extensions: [
  		"pac"
  	]
  },
  	"application/x-nzb": {
  	source: "apache",
  	extensions: [
  		"nzb"
  	]
  },
  	"application/x-perl": {
  	source: "nginx",
  	extensions: [
  		"pl",
  		"pm"
  	]
  },
  	"application/x-pilot": {
  	source: "nginx",
  	extensions: [
  		"prc",
  		"pdb"
  	]
  },
  	"application/x-pkcs12": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"p12",
  		"pfx"
  	]
  },
  	"application/x-pkcs7-certificates": {
  	source: "apache",
  	extensions: [
  		"p7b",
  		"spc"
  	]
  },
  	"application/x-pkcs7-certreqresp": {
  	source: "apache",
  	extensions: [
  		"p7r"
  	]
  },
  	"application/x-pki-message": {
  	source: "iana"
  },
  	"application/x-rar-compressed": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"rar"
  	]
  },
  	"application/x-redhat-package-manager": {
  	source: "nginx",
  	extensions: [
  		"rpm"
  	]
  },
  	"application/x-research-info-systems": {
  	source: "apache",
  	extensions: [
  		"ris"
  	]
  },
  	"application/x-sea": {
  	source: "nginx",
  	extensions: [
  		"sea"
  	]
  },
  	"application/x-sh": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"sh"
  	]
  },
  	"application/x-shar": {
  	source: "apache",
  	extensions: [
  		"shar"
  	]
  },
  	"application/x-shockwave-flash": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"swf"
  	]
  },
  	"application/x-silverlight-app": {
  	source: "apache",
  	extensions: [
  		"xap"
  	]
  },
  	"application/x-sql": {
  	source: "apache",
  	extensions: [
  		"sql"
  	]
  },
  	"application/x-stuffit": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"sit"
  	]
  },
  	"application/x-stuffitx": {
  	source: "apache",
  	extensions: [
  		"sitx"
  	]
  },
  	"application/x-subrip": {
  	source: "apache",
  	extensions: [
  		"srt"
  	]
  },
  	"application/x-sv4cpio": {
  	source: "apache",
  	extensions: [
  		"sv4cpio"
  	]
  },
  	"application/x-sv4crc": {
  	source: "apache",
  	extensions: [
  		"sv4crc"
  	]
  },
  	"application/x-t3vm-image": {
  	source: "apache",
  	extensions: [
  		"t3"
  	]
  },
  	"application/x-tads": {
  	source: "apache",
  	extensions: [
  		"gam"
  	]
  },
  	"application/x-tar": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"tar"
  	]
  },
  	"application/x-tcl": {
  	source: "apache",
  	extensions: [
  		"tcl",
  		"tk"
  	]
  },
  	"application/x-tex": {
  	source: "apache",
  	extensions: [
  		"tex"
  	]
  },
  	"application/x-tex-tfm": {
  	source: "apache",
  	extensions: [
  		"tfm"
  	]
  },
  	"application/x-texinfo": {
  	source: "apache",
  	extensions: [
  		"texinfo",
  		"texi"
  	]
  },
  	"application/x-tgif": {
  	source: "apache",
  	extensions: [
  		"obj"
  	]
  },
  	"application/x-ustar": {
  	source: "apache",
  	extensions: [
  		"ustar"
  	]
  },
  	"application/x-virtualbox-hdd": {
  	compressible: true,
  	extensions: [
  		"hdd"
  	]
  },
  	"application/x-virtualbox-ova": {
  	compressible: true,
  	extensions: [
  		"ova"
  	]
  },
  	"application/x-virtualbox-ovf": {
  	compressible: true,
  	extensions: [
  		"ovf"
  	]
  },
  	"application/x-virtualbox-vbox": {
  	compressible: true,
  	extensions: [
  		"vbox"
  	]
  },
  	"application/x-virtualbox-vbox-extpack": {
  	compressible: false,
  	extensions: [
  		"vbox-extpack"
  	]
  },
  	"application/x-virtualbox-vdi": {
  	compressible: true,
  	extensions: [
  		"vdi"
  	]
  },
  	"application/x-virtualbox-vhd": {
  	compressible: true,
  	extensions: [
  		"vhd"
  	]
  },
  	"application/x-virtualbox-vmdk": {
  	compressible: true,
  	extensions: [
  		"vmdk"
  	]
  },
  	"application/x-wais-source": {
  	source: "apache",
  	extensions: [
  		"src"
  	]
  },
  	"application/x-web-app-manifest+json": {
  	compressible: true,
  	extensions: [
  		"webapp"
  	]
  },
  	"application/x-www-form-urlencoded": {
  	source: "iana",
  	compressible: true
  },
  	"application/x-x509-ca-cert": {
  	source: "iana",
  	extensions: [
  		"der",
  		"crt",
  		"pem"
  	]
  },
  	"application/x-x509-ca-ra-cert": {
  	source: "iana"
  },
  	"application/x-x509-next-ca-cert": {
  	source: "iana"
  },
  	"application/x-xfig": {
  	source: "apache",
  	extensions: [
  		"fig"
  	]
  },
  	"application/x-xliff+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"xlf"
  	]
  },
  	"application/x-xpinstall": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"xpi"
  	]
  },
  	"application/x-xz": {
  	source: "apache",
  	extensions: [
  		"xz"
  	]
  },
  	"application/x-zmachine": {
  	source: "apache",
  	extensions: [
  		"z1",
  		"z2",
  		"z3",
  		"z4",
  		"z5",
  		"z6",
  		"z7",
  		"z8"
  	]
  },
  	"application/x400-bp": {
  	source: "iana"
  },
  	"application/xacml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/xaml+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"xaml"
  	]
  },
  	"application/xcap-att+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xav"
  	]
  },
  	"application/xcap-caps+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xca"
  	]
  },
  	"application/xcap-diff+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xdf"
  	]
  },
  	"application/xcap-el+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xel"
  	]
  },
  	"application/xcap-error+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/xcap-ns+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xns"
  	]
  },
  	"application/xcon-conference-info+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/xcon-conference-info-diff+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/xenc+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xenc"
  	]
  },
  	"application/xhtml+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xhtml",
  		"xht"
  	]
  },
  	"application/xhtml-voice+xml": {
  	source: "apache",
  	compressible: true
  },
  	"application/xliff+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xlf"
  	]
  },
  	"application/xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xml",
  		"xsl",
  		"xsd",
  		"rng"
  	]
  },
  	"application/xml-dtd": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"dtd"
  	]
  },
  	"application/xml-external-parsed-entity": {
  	source: "iana"
  },
  	"application/xml-patch+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/xmpp+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/xop+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xop"
  	]
  },
  	"application/xproc+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"xpl"
  	]
  },
  	"application/xslt+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xsl",
  		"xslt"
  	]
  },
  	"application/xspf+xml": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"xspf"
  	]
  },
  	"application/xv+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"mxml",
  		"xhvml",
  		"xvml",
  		"xvm"
  	]
  },
  	"application/yang": {
  	source: "iana",
  	extensions: [
  		"yang"
  	]
  },
  	"application/yang-data+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/yang-data+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/yang-patch+json": {
  	source: "iana",
  	compressible: true
  },
  	"application/yang-patch+xml": {
  	source: "iana",
  	compressible: true
  },
  	"application/yin+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"yin"
  	]
  },
  	"application/zip": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"zip"
  	]
  },
  	"application/zlib": {
  	source: "iana"
  },
  	"application/zstd": {
  	source: "iana"
  },
  	"audio/1d-interleaved-parityfec": {
  	source: "iana"
  },
  	"audio/32kadpcm": {
  	source: "iana"
  },
  	"audio/3gpp": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"3gpp"
  	]
  },
  	"audio/3gpp2": {
  	source: "iana"
  },
  	"audio/aac": {
  	source: "iana"
  },
  	"audio/ac3": {
  	source: "iana"
  },
  	"audio/adpcm": {
  	source: "apache",
  	extensions: [
  		"adp"
  	]
  },
  	"audio/amr": {
  	source: "iana",
  	extensions: [
  		"amr"
  	]
  },
  	"audio/amr-wb": {
  	source: "iana"
  },
  	"audio/amr-wb+": {
  	source: "iana"
  },
  	"audio/aptx": {
  	source: "iana"
  },
  	"audio/asc": {
  	source: "iana"
  },
  	"audio/atrac-advanced-lossless": {
  	source: "iana"
  },
  	"audio/atrac-x": {
  	source: "iana"
  },
  	"audio/atrac3": {
  	source: "iana"
  },
  	"audio/basic": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"au",
  		"snd"
  	]
  },
  	"audio/bv16": {
  	source: "iana"
  },
  	"audio/bv32": {
  	source: "iana"
  },
  	"audio/clearmode": {
  	source: "iana"
  },
  	"audio/cn": {
  	source: "iana"
  },
  	"audio/dat12": {
  	source: "iana"
  },
  	"audio/dls": {
  	source: "iana"
  },
  	"audio/dsr-es201108": {
  	source: "iana"
  },
  	"audio/dsr-es202050": {
  	source: "iana"
  },
  	"audio/dsr-es202211": {
  	source: "iana"
  },
  	"audio/dsr-es202212": {
  	source: "iana"
  },
  	"audio/dv": {
  	source: "iana"
  },
  	"audio/dvi4": {
  	source: "iana"
  },
  	"audio/eac3": {
  	source: "iana"
  },
  	"audio/encaprtp": {
  	source: "iana"
  },
  	"audio/evrc": {
  	source: "iana"
  },
  	"audio/evrc-qcp": {
  	source: "iana"
  },
  	"audio/evrc0": {
  	source: "iana"
  },
  	"audio/evrc1": {
  	source: "iana"
  },
  	"audio/evrcb": {
  	source: "iana"
  },
  	"audio/evrcb0": {
  	source: "iana"
  },
  	"audio/evrcb1": {
  	source: "iana"
  },
  	"audio/evrcnw": {
  	source: "iana"
  },
  	"audio/evrcnw0": {
  	source: "iana"
  },
  	"audio/evrcnw1": {
  	source: "iana"
  },
  	"audio/evrcwb": {
  	source: "iana"
  },
  	"audio/evrcwb0": {
  	source: "iana"
  },
  	"audio/evrcwb1": {
  	source: "iana"
  },
  	"audio/evs": {
  	source: "iana"
  },
  	"audio/flexfec": {
  	source: "iana"
  },
  	"audio/fwdred": {
  	source: "iana"
  },
  	"audio/g711-0": {
  	source: "iana"
  },
  	"audio/g719": {
  	source: "iana"
  },
  	"audio/g722": {
  	source: "iana"
  },
  	"audio/g7221": {
  	source: "iana"
  },
  	"audio/g723": {
  	source: "iana"
  },
  	"audio/g726-16": {
  	source: "iana"
  },
  	"audio/g726-24": {
  	source: "iana"
  },
  	"audio/g726-32": {
  	source: "iana"
  },
  	"audio/g726-40": {
  	source: "iana"
  },
  	"audio/g728": {
  	source: "iana"
  },
  	"audio/g729": {
  	source: "iana"
  },
  	"audio/g7291": {
  	source: "iana"
  },
  	"audio/g729d": {
  	source: "iana"
  },
  	"audio/g729e": {
  	source: "iana"
  },
  	"audio/gsm": {
  	source: "iana"
  },
  	"audio/gsm-efr": {
  	source: "iana"
  },
  	"audio/gsm-hr-08": {
  	source: "iana"
  },
  	"audio/ilbc": {
  	source: "iana"
  },
  	"audio/ip-mr_v2.5": {
  	source: "iana"
  },
  	"audio/isac": {
  	source: "apache"
  },
  	"audio/l16": {
  	source: "iana"
  },
  	"audio/l20": {
  	source: "iana"
  },
  	"audio/l24": {
  	source: "iana",
  	compressible: false
  },
  	"audio/l8": {
  	source: "iana"
  },
  	"audio/lpc": {
  	source: "iana"
  },
  	"audio/melp": {
  	source: "iana"
  },
  	"audio/melp1200": {
  	source: "iana"
  },
  	"audio/melp2400": {
  	source: "iana"
  },
  	"audio/melp600": {
  	source: "iana"
  },
  	"audio/mhas": {
  	source: "iana"
  },
  	"audio/midi": {
  	source: "apache",
  	extensions: [
  		"mid",
  		"midi",
  		"kar",
  		"rmi"
  	]
  },
  	"audio/mobile-xmf": {
  	source: "iana",
  	extensions: [
  		"mxmf"
  	]
  },
  	"audio/mp3": {
  	compressible: false,
  	extensions: [
  		"mp3"
  	]
  },
  	"audio/mp4": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"m4a",
  		"mp4a"
  	]
  },
  	"audio/mp4a-latm": {
  	source: "iana"
  },
  	"audio/mpa": {
  	source: "iana"
  },
  	"audio/mpa-robust": {
  	source: "iana"
  },
  	"audio/mpeg": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"mpga",
  		"mp2",
  		"mp2a",
  		"mp3",
  		"m2a",
  		"m3a"
  	]
  },
  	"audio/mpeg4-generic": {
  	source: "iana"
  },
  	"audio/musepack": {
  	source: "apache"
  },
  	"audio/ogg": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"oga",
  		"ogg",
  		"spx",
  		"opus"
  	]
  },
  	"audio/opus": {
  	source: "iana"
  },
  	"audio/parityfec": {
  	source: "iana"
  },
  	"audio/pcma": {
  	source: "iana"
  },
  	"audio/pcma-wb": {
  	source: "iana"
  },
  	"audio/pcmu": {
  	source: "iana"
  },
  	"audio/pcmu-wb": {
  	source: "iana"
  },
  	"audio/prs.sid": {
  	source: "iana"
  },
  	"audio/qcelp": {
  	source: "iana"
  },
  	"audio/raptorfec": {
  	source: "iana"
  },
  	"audio/red": {
  	source: "iana"
  },
  	"audio/rtp-enc-aescm128": {
  	source: "iana"
  },
  	"audio/rtp-midi": {
  	source: "iana"
  },
  	"audio/rtploopback": {
  	source: "iana"
  },
  	"audio/rtx": {
  	source: "iana"
  },
  	"audio/s3m": {
  	source: "apache",
  	extensions: [
  		"s3m"
  	]
  },
  	"audio/scip": {
  	source: "iana"
  },
  	"audio/silk": {
  	source: "apache",
  	extensions: [
  		"sil"
  	]
  },
  	"audio/smv": {
  	source: "iana"
  },
  	"audio/smv-qcp": {
  	source: "iana"
  },
  	"audio/smv0": {
  	source: "iana"
  },
  	"audio/sofa": {
  	source: "iana"
  },
  	"audio/sp-midi": {
  	source: "iana"
  },
  	"audio/speex": {
  	source: "iana"
  },
  	"audio/t140c": {
  	source: "iana"
  },
  	"audio/t38": {
  	source: "iana"
  },
  	"audio/telephone-event": {
  	source: "iana"
  },
  	"audio/tetra_acelp": {
  	source: "iana"
  },
  	"audio/tetra_acelp_bb": {
  	source: "iana"
  },
  	"audio/tone": {
  	source: "iana"
  },
  	"audio/tsvcis": {
  	source: "iana"
  },
  	"audio/uemclip": {
  	source: "iana"
  },
  	"audio/ulpfec": {
  	source: "iana"
  },
  	"audio/usac": {
  	source: "iana"
  },
  	"audio/vdvi": {
  	source: "iana"
  },
  	"audio/vmr-wb": {
  	source: "iana"
  },
  	"audio/vnd.3gpp.iufp": {
  	source: "iana"
  },
  	"audio/vnd.4sb": {
  	source: "iana"
  },
  	"audio/vnd.audiokoz": {
  	source: "iana"
  },
  	"audio/vnd.celp": {
  	source: "iana"
  },
  	"audio/vnd.cisco.nse": {
  	source: "iana"
  },
  	"audio/vnd.cmles.radio-events": {
  	source: "iana"
  },
  	"audio/vnd.cns.anp1": {
  	source: "iana"
  },
  	"audio/vnd.cns.inf1": {
  	source: "iana"
  },
  	"audio/vnd.dece.audio": {
  	source: "iana",
  	extensions: [
  		"uva",
  		"uvva"
  	]
  },
  	"audio/vnd.digital-winds": {
  	source: "iana",
  	extensions: [
  		"eol"
  	]
  },
  	"audio/vnd.dlna.adts": {
  	source: "iana"
  },
  	"audio/vnd.dolby.heaac.1": {
  	source: "iana"
  },
  	"audio/vnd.dolby.heaac.2": {
  	source: "iana"
  },
  	"audio/vnd.dolby.mlp": {
  	source: "iana"
  },
  	"audio/vnd.dolby.mps": {
  	source: "iana"
  },
  	"audio/vnd.dolby.pl2": {
  	source: "iana"
  },
  	"audio/vnd.dolby.pl2x": {
  	source: "iana"
  },
  	"audio/vnd.dolby.pl2z": {
  	source: "iana"
  },
  	"audio/vnd.dolby.pulse.1": {
  	source: "iana"
  },
  	"audio/vnd.dra": {
  	source: "iana",
  	extensions: [
  		"dra"
  	]
  },
  	"audio/vnd.dts": {
  	source: "iana",
  	extensions: [
  		"dts"
  	]
  },
  	"audio/vnd.dts.hd": {
  	source: "iana",
  	extensions: [
  		"dtshd"
  	]
  },
  	"audio/vnd.dts.uhd": {
  	source: "iana"
  },
  	"audio/vnd.dvb.file": {
  	source: "iana"
  },
  	"audio/vnd.everad.plj": {
  	source: "iana"
  },
  	"audio/vnd.hns.audio": {
  	source: "iana"
  },
  	"audio/vnd.lucent.voice": {
  	source: "iana",
  	extensions: [
  		"lvp"
  	]
  },
  	"audio/vnd.ms-playready.media.pya": {
  	source: "iana",
  	extensions: [
  		"pya"
  	]
  },
  	"audio/vnd.nokia.mobile-xmf": {
  	source: "iana"
  },
  	"audio/vnd.nortel.vbk": {
  	source: "iana"
  },
  	"audio/vnd.nuera.ecelp4800": {
  	source: "iana",
  	extensions: [
  		"ecelp4800"
  	]
  },
  	"audio/vnd.nuera.ecelp7470": {
  	source: "iana",
  	extensions: [
  		"ecelp7470"
  	]
  },
  	"audio/vnd.nuera.ecelp9600": {
  	source: "iana",
  	extensions: [
  		"ecelp9600"
  	]
  },
  	"audio/vnd.octel.sbc": {
  	source: "iana"
  },
  	"audio/vnd.presonus.multitrack": {
  	source: "iana"
  },
  	"audio/vnd.qcelp": {
  	source: "iana"
  },
  	"audio/vnd.rhetorex.32kadpcm": {
  	source: "iana"
  },
  	"audio/vnd.rip": {
  	source: "iana",
  	extensions: [
  		"rip"
  	]
  },
  	"audio/vnd.rn-realaudio": {
  	compressible: false
  },
  	"audio/vnd.sealedmedia.softseal.mpeg": {
  	source: "iana"
  },
  	"audio/vnd.vmx.cvsd": {
  	source: "iana"
  },
  	"audio/vnd.wave": {
  	compressible: false
  },
  	"audio/vorbis": {
  	source: "iana",
  	compressible: false
  },
  	"audio/vorbis-config": {
  	source: "iana"
  },
  	"audio/wav": {
  	compressible: false,
  	extensions: [
  		"wav"
  	]
  },
  	"audio/wave": {
  	compressible: false,
  	extensions: [
  		"wav"
  	]
  },
  	"audio/webm": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"weba"
  	]
  },
  	"audio/x-aac": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"aac"
  	]
  },
  	"audio/x-aiff": {
  	source: "apache",
  	extensions: [
  		"aif",
  		"aiff",
  		"aifc"
  	]
  },
  	"audio/x-caf": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"caf"
  	]
  },
  	"audio/x-flac": {
  	source: "apache",
  	extensions: [
  		"flac"
  	]
  },
  	"audio/x-m4a": {
  	source: "nginx",
  	extensions: [
  		"m4a"
  	]
  },
  	"audio/x-matroska": {
  	source: "apache",
  	extensions: [
  		"mka"
  	]
  },
  	"audio/x-mpegurl": {
  	source: "apache",
  	extensions: [
  		"m3u"
  	]
  },
  	"audio/x-ms-wax": {
  	source: "apache",
  	extensions: [
  		"wax"
  	]
  },
  	"audio/x-ms-wma": {
  	source: "apache",
  	extensions: [
  		"wma"
  	]
  },
  	"audio/x-pn-realaudio": {
  	source: "apache",
  	extensions: [
  		"ram",
  		"ra"
  	]
  },
  	"audio/x-pn-realaudio-plugin": {
  	source: "apache",
  	extensions: [
  		"rmp"
  	]
  },
  	"audio/x-realaudio": {
  	source: "nginx",
  	extensions: [
  		"ra"
  	]
  },
  	"audio/x-tta": {
  	source: "apache"
  },
  	"audio/x-wav": {
  	source: "apache",
  	extensions: [
  		"wav"
  	]
  },
  	"audio/xm": {
  	source: "apache",
  	extensions: [
  		"xm"
  	]
  },
  	"chemical/x-cdx": {
  	source: "apache",
  	extensions: [
  		"cdx"
  	]
  },
  	"chemical/x-cif": {
  	source: "apache",
  	extensions: [
  		"cif"
  	]
  },
  	"chemical/x-cmdf": {
  	source: "apache",
  	extensions: [
  		"cmdf"
  	]
  },
  	"chemical/x-cml": {
  	source: "apache",
  	extensions: [
  		"cml"
  	]
  },
  	"chemical/x-csml": {
  	source: "apache",
  	extensions: [
  		"csml"
  	]
  },
  	"chemical/x-pdb": {
  	source: "apache"
  },
  	"chemical/x-xyz": {
  	source: "apache",
  	extensions: [
  		"xyz"
  	]
  },
  	"font/collection": {
  	source: "iana",
  	extensions: [
  		"ttc"
  	]
  },
  	"font/otf": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"otf"
  	]
  },
  	"font/sfnt": {
  	source: "iana"
  },
  	"font/ttf": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ttf"
  	]
  },
  	"font/woff": {
  	source: "iana",
  	extensions: [
  		"woff"
  	]
  },
  	"font/woff2": {
  	source: "iana",
  	extensions: [
  		"woff2"
  	]
  },
  	"image/aces": {
  	source: "iana",
  	extensions: [
  		"exr"
  	]
  },
  	"image/apng": {
  	compressible: false,
  	extensions: [
  		"apng"
  	]
  },
  	"image/avci": {
  	source: "iana",
  	extensions: [
  		"avci"
  	]
  },
  	"image/avcs": {
  	source: "iana",
  	extensions: [
  		"avcs"
  	]
  },
  	"image/avif": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"avif"
  	]
  },
  	"image/bmp": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"bmp"
  	]
  },
  	"image/cgm": {
  	source: "iana",
  	extensions: [
  		"cgm"
  	]
  },
  	"image/dicom-rle": {
  	source: "iana",
  	extensions: [
  		"drle"
  	]
  },
  	"image/emf": {
  	source: "iana",
  	extensions: [
  		"emf"
  	]
  },
  	"image/fits": {
  	source: "iana",
  	extensions: [
  		"fits"
  	]
  },
  	"image/g3fax": {
  	source: "iana",
  	extensions: [
  		"g3"
  	]
  },
  	"image/gif": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"gif"
  	]
  },
  	"image/heic": {
  	source: "iana",
  	extensions: [
  		"heic"
  	]
  },
  	"image/heic-sequence": {
  	source: "iana",
  	extensions: [
  		"heics"
  	]
  },
  	"image/heif": {
  	source: "iana",
  	extensions: [
  		"heif"
  	]
  },
  	"image/heif-sequence": {
  	source: "iana",
  	extensions: [
  		"heifs"
  	]
  },
  	"image/hej2k": {
  	source: "iana",
  	extensions: [
  		"hej2"
  	]
  },
  	"image/hsj2": {
  	source: "iana",
  	extensions: [
  		"hsj2"
  	]
  },
  	"image/ief": {
  	source: "iana",
  	extensions: [
  		"ief"
  	]
  },
  	"image/jls": {
  	source: "iana",
  	extensions: [
  		"jls"
  	]
  },
  	"image/jp2": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"jp2",
  		"jpg2"
  	]
  },
  	"image/jpeg": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"jpeg",
  		"jpg",
  		"jpe"
  	]
  },
  	"image/jph": {
  	source: "iana",
  	extensions: [
  		"jph"
  	]
  },
  	"image/jphc": {
  	source: "iana",
  	extensions: [
  		"jhc"
  	]
  },
  	"image/jpm": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"jpm"
  	]
  },
  	"image/jpx": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"jpx",
  		"jpf"
  	]
  },
  	"image/jxr": {
  	source: "iana",
  	extensions: [
  		"jxr"
  	]
  },
  	"image/jxra": {
  	source: "iana",
  	extensions: [
  		"jxra"
  	]
  },
  	"image/jxrs": {
  	source: "iana",
  	extensions: [
  		"jxrs"
  	]
  },
  	"image/jxs": {
  	source: "iana",
  	extensions: [
  		"jxs"
  	]
  },
  	"image/jxsc": {
  	source: "iana",
  	extensions: [
  		"jxsc"
  	]
  },
  	"image/jxsi": {
  	source: "iana",
  	extensions: [
  		"jxsi"
  	]
  },
  	"image/jxss": {
  	source: "iana",
  	extensions: [
  		"jxss"
  	]
  },
  	"image/ktx": {
  	source: "iana",
  	extensions: [
  		"ktx"
  	]
  },
  	"image/ktx2": {
  	source: "iana",
  	extensions: [
  		"ktx2"
  	]
  },
  	"image/naplps": {
  	source: "iana"
  },
  	"image/pjpeg": {
  	compressible: false
  },
  	"image/png": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"png"
  	]
  },
  	"image/prs.btif": {
  	source: "iana",
  	extensions: [
  		"btif"
  	]
  },
  	"image/prs.pti": {
  	source: "iana",
  	extensions: [
  		"pti"
  	]
  },
  	"image/pwg-raster": {
  	source: "iana"
  },
  	"image/sgi": {
  	source: "apache",
  	extensions: [
  		"sgi"
  	]
  },
  	"image/svg+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"svg",
  		"svgz"
  	]
  },
  	"image/t38": {
  	source: "iana",
  	extensions: [
  		"t38"
  	]
  },
  	"image/tiff": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"tif",
  		"tiff"
  	]
  },
  	"image/tiff-fx": {
  	source: "iana",
  	extensions: [
  		"tfx"
  	]
  },
  	"image/vnd.adobe.photoshop": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"psd"
  	]
  },
  	"image/vnd.airzip.accelerator.azv": {
  	source: "iana",
  	extensions: [
  		"azv"
  	]
  },
  	"image/vnd.cns.inf2": {
  	source: "iana"
  },
  	"image/vnd.dece.graphic": {
  	source: "iana",
  	extensions: [
  		"uvi",
  		"uvvi",
  		"uvg",
  		"uvvg"
  	]
  },
  	"image/vnd.djvu": {
  	source: "iana",
  	extensions: [
  		"djvu",
  		"djv"
  	]
  },
  	"image/vnd.dvb.subtitle": {
  	source: "iana",
  	extensions: [
  		"sub"
  	]
  },
  	"image/vnd.dwg": {
  	source: "iana",
  	extensions: [
  		"dwg"
  	]
  },
  	"image/vnd.dxf": {
  	source: "iana",
  	extensions: [
  		"dxf"
  	]
  },
  	"image/vnd.fastbidsheet": {
  	source: "iana",
  	extensions: [
  		"fbs"
  	]
  },
  	"image/vnd.fpx": {
  	source: "iana",
  	extensions: [
  		"fpx"
  	]
  },
  	"image/vnd.fst": {
  	source: "iana",
  	extensions: [
  		"fst"
  	]
  },
  	"image/vnd.fujixerox.edmics-mmr": {
  	source: "iana",
  	extensions: [
  		"mmr"
  	]
  },
  	"image/vnd.fujixerox.edmics-rlc": {
  	source: "iana",
  	extensions: [
  		"rlc"
  	]
  },
  	"image/vnd.globalgraphics.pgb": {
  	source: "iana"
  },
  	"image/vnd.microsoft.icon": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"ico"
  	]
  },
  	"image/vnd.mix": {
  	source: "iana"
  },
  	"image/vnd.mozilla.apng": {
  	source: "iana"
  },
  	"image/vnd.ms-dds": {
  	compressible: true,
  	extensions: [
  		"dds"
  	]
  },
  	"image/vnd.ms-modi": {
  	source: "iana",
  	extensions: [
  		"mdi"
  	]
  },
  	"image/vnd.ms-photo": {
  	source: "apache",
  	extensions: [
  		"wdp"
  	]
  },
  	"image/vnd.net-fpx": {
  	source: "iana",
  	extensions: [
  		"npx"
  	]
  },
  	"image/vnd.pco.b16": {
  	source: "iana",
  	extensions: [
  		"b16"
  	]
  },
  	"image/vnd.radiance": {
  	source: "iana"
  },
  	"image/vnd.sealed.png": {
  	source: "iana"
  },
  	"image/vnd.sealedmedia.softseal.gif": {
  	source: "iana"
  },
  	"image/vnd.sealedmedia.softseal.jpg": {
  	source: "iana"
  },
  	"image/vnd.svf": {
  	source: "iana"
  },
  	"image/vnd.tencent.tap": {
  	source: "iana",
  	extensions: [
  		"tap"
  	]
  },
  	"image/vnd.valve.source.texture": {
  	source: "iana",
  	extensions: [
  		"vtf"
  	]
  },
  	"image/vnd.wap.wbmp": {
  	source: "iana",
  	extensions: [
  		"wbmp"
  	]
  },
  	"image/vnd.xiff": {
  	source: "iana",
  	extensions: [
  		"xif"
  	]
  },
  	"image/vnd.zbrush.pcx": {
  	source: "iana",
  	extensions: [
  		"pcx"
  	]
  },
  	"image/webp": {
  	source: "apache",
  	extensions: [
  		"webp"
  	]
  },
  	"image/wmf": {
  	source: "iana",
  	extensions: [
  		"wmf"
  	]
  },
  	"image/x-3ds": {
  	source: "apache",
  	extensions: [
  		"3ds"
  	]
  },
  	"image/x-cmu-raster": {
  	source: "apache",
  	extensions: [
  		"ras"
  	]
  },
  	"image/x-cmx": {
  	source: "apache",
  	extensions: [
  		"cmx"
  	]
  },
  	"image/x-freehand": {
  	source: "apache",
  	extensions: [
  		"fh",
  		"fhc",
  		"fh4",
  		"fh5",
  		"fh7"
  	]
  },
  	"image/x-icon": {
  	source: "apache",
  	compressible: true,
  	extensions: [
  		"ico"
  	]
  },
  	"image/x-jng": {
  	source: "nginx",
  	extensions: [
  		"jng"
  	]
  },
  	"image/x-mrsid-image": {
  	source: "apache",
  	extensions: [
  		"sid"
  	]
  },
  	"image/x-ms-bmp": {
  	source: "nginx",
  	compressible: true,
  	extensions: [
  		"bmp"
  	]
  },
  	"image/x-pcx": {
  	source: "apache",
  	extensions: [
  		"pcx"
  	]
  },
  	"image/x-pict": {
  	source: "apache",
  	extensions: [
  		"pic",
  		"pct"
  	]
  },
  	"image/x-portable-anymap": {
  	source: "apache",
  	extensions: [
  		"pnm"
  	]
  },
  	"image/x-portable-bitmap": {
  	source: "apache",
  	extensions: [
  		"pbm"
  	]
  },
  	"image/x-portable-graymap": {
  	source: "apache",
  	extensions: [
  		"pgm"
  	]
  },
  	"image/x-portable-pixmap": {
  	source: "apache",
  	extensions: [
  		"ppm"
  	]
  },
  	"image/x-rgb": {
  	source: "apache",
  	extensions: [
  		"rgb"
  	]
  },
  	"image/x-tga": {
  	source: "apache",
  	extensions: [
  		"tga"
  	]
  },
  	"image/x-xbitmap": {
  	source: "apache",
  	extensions: [
  		"xbm"
  	]
  },
  	"image/x-xcf": {
  	compressible: false
  },
  	"image/x-xpixmap": {
  	source: "apache",
  	extensions: [
  		"xpm"
  	]
  },
  	"image/x-xwindowdump": {
  	source: "apache",
  	extensions: [
  		"xwd"
  	]
  },
  	"message/cpim": {
  	source: "iana"
  },
  	"message/delivery-status": {
  	source: "iana"
  },
  	"message/disposition-notification": {
  	source: "iana",
  	extensions: [
  		"disposition-notification"
  	]
  },
  	"message/external-body": {
  	source: "iana"
  },
  	"message/feedback-report": {
  	source: "iana"
  },
  	"message/global": {
  	source: "iana",
  	extensions: [
  		"u8msg"
  	]
  },
  	"message/global-delivery-status": {
  	source: "iana",
  	extensions: [
  		"u8dsn"
  	]
  },
  	"message/global-disposition-notification": {
  	source: "iana",
  	extensions: [
  		"u8mdn"
  	]
  },
  	"message/global-headers": {
  	source: "iana",
  	extensions: [
  		"u8hdr"
  	]
  },
  	"message/http": {
  	source: "iana",
  	compressible: false
  },
  	"message/imdn+xml": {
  	source: "iana",
  	compressible: true
  },
  	"message/news": {
  	source: "iana"
  },
  	"message/partial": {
  	source: "iana",
  	compressible: false
  },
  	"message/rfc822": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"eml",
  		"mime"
  	]
  },
  	"message/s-http": {
  	source: "iana"
  },
  	"message/sip": {
  	source: "iana"
  },
  	"message/sipfrag": {
  	source: "iana"
  },
  	"message/tracking-status": {
  	source: "iana"
  },
  	"message/vnd.si.simp": {
  	source: "iana"
  },
  	"message/vnd.wfa.wsc": {
  	source: "iana",
  	extensions: [
  		"wsc"
  	]
  },
  	"model/3mf": {
  	source: "iana",
  	extensions: [
  		"3mf"
  	]
  },
  	"model/e57": {
  	source: "iana"
  },
  	"model/gltf+json": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"gltf"
  	]
  },
  	"model/gltf-binary": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"glb"
  	]
  },
  	"model/iges": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"igs",
  		"iges"
  	]
  },
  	"model/mesh": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"msh",
  		"mesh",
  		"silo"
  	]
  },
  	"model/mtl": {
  	source: "iana",
  	extensions: [
  		"mtl"
  	]
  },
  	"model/obj": {
  	source: "iana",
  	extensions: [
  		"obj"
  	]
  },
  	"model/step": {
  	source: "iana"
  },
  	"model/step+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"stpx"
  	]
  },
  	"model/step+zip": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"stpz"
  	]
  },
  	"model/step-xml+zip": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"stpxz"
  	]
  },
  	"model/stl": {
  	source: "iana",
  	extensions: [
  		"stl"
  	]
  },
  	"model/vnd.collada+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"dae"
  	]
  },
  	"model/vnd.dwf": {
  	source: "iana",
  	extensions: [
  		"dwf"
  	]
  },
  	"model/vnd.flatland.3dml": {
  	source: "iana"
  },
  	"model/vnd.gdl": {
  	source: "iana",
  	extensions: [
  		"gdl"
  	]
  },
  	"model/vnd.gs-gdl": {
  	source: "apache"
  },
  	"model/vnd.gs.gdl": {
  	source: "iana"
  },
  	"model/vnd.gtw": {
  	source: "iana",
  	extensions: [
  		"gtw"
  	]
  },
  	"model/vnd.moml+xml": {
  	source: "iana",
  	compressible: true
  },
  	"model/vnd.mts": {
  	source: "iana",
  	extensions: [
  		"mts"
  	]
  },
  	"model/vnd.opengex": {
  	source: "iana",
  	extensions: [
  		"ogex"
  	]
  },
  	"model/vnd.parasolid.transmit.binary": {
  	source: "iana",
  	extensions: [
  		"x_b"
  	]
  },
  	"model/vnd.parasolid.transmit.text": {
  	source: "iana",
  	extensions: [
  		"x_t"
  	]
  },
  	"model/vnd.pytha.pyox": {
  	source: "iana"
  },
  	"model/vnd.rosette.annotated-data-model": {
  	source: "iana"
  },
  	"model/vnd.sap.vds": {
  	source: "iana",
  	extensions: [
  		"vds"
  	]
  },
  	"model/vnd.usdz+zip": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"usdz"
  	]
  },
  	"model/vnd.valve.source.compiled-map": {
  	source: "iana",
  	extensions: [
  		"bsp"
  	]
  },
  	"model/vnd.vtu": {
  	source: "iana",
  	extensions: [
  		"vtu"
  	]
  },
  	"model/vrml": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"wrl",
  		"vrml"
  	]
  },
  	"model/x3d+binary": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"x3db",
  		"x3dbz"
  	]
  },
  	"model/x3d+fastinfoset": {
  	source: "iana",
  	extensions: [
  		"x3db"
  	]
  },
  	"model/x3d+vrml": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"x3dv",
  		"x3dvz"
  	]
  },
  	"model/x3d+xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"x3d",
  		"x3dz"
  	]
  },
  	"model/x3d-vrml": {
  	source: "iana",
  	extensions: [
  		"x3dv"
  	]
  },
  	"multipart/alternative": {
  	source: "iana",
  	compressible: false
  },
  	"multipart/appledouble": {
  	source: "iana"
  },
  	"multipart/byteranges": {
  	source: "iana"
  },
  	"multipart/digest": {
  	source: "iana"
  },
  	"multipart/encrypted": {
  	source: "iana",
  	compressible: false
  },
  	"multipart/form-data": {
  	source: "iana",
  	compressible: false
  },
  	"multipart/header-set": {
  	source: "iana"
  },
  	"multipart/mixed": {
  	source: "iana"
  },
  	"multipart/multilingual": {
  	source: "iana"
  },
  	"multipart/parallel": {
  	source: "iana"
  },
  	"multipart/related": {
  	source: "iana",
  	compressible: false
  },
  	"multipart/report": {
  	source: "iana"
  },
  	"multipart/signed": {
  	source: "iana",
  	compressible: false
  },
  	"multipart/vnd.bint.med-plus": {
  	source: "iana"
  },
  	"multipart/voice-message": {
  	source: "iana"
  },
  	"multipart/x-mixed-replace": {
  	source: "iana"
  },
  	"text/1d-interleaved-parityfec": {
  	source: "iana"
  },
  	"text/cache-manifest": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"appcache",
  		"manifest"
  	]
  },
  	"text/calendar": {
  	source: "iana",
  	extensions: [
  		"ics",
  		"ifb"
  	]
  },
  	"text/calender": {
  	compressible: true
  },
  	"text/cmd": {
  	compressible: true
  },
  	"text/coffeescript": {
  	extensions: [
  		"coffee",
  		"litcoffee"
  	]
  },
  	"text/cql": {
  	source: "iana"
  },
  	"text/cql-expression": {
  	source: "iana"
  },
  	"text/cql-identifier": {
  	source: "iana"
  },
  	"text/css": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"css"
  	]
  },
  	"text/csv": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"csv"
  	]
  },
  	"text/csv-schema": {
  	source: "iana"
  },
  	"text/directory": {
  	source: "iana"
  },
  	"text/dns": {
  	source: "iana"
  },
  	"text/ecmascript": {
  	source: "iana"
  },
  	"text/encaprtp": {
  	source: "iana"
  },
  	"text/enriched": {
  	source: "iana"
  },
  	"text/fhirpath": {
  	source: "iana"
  },
  	"text/flexfec": {
  	source: "iana"
  },
  	"text/fwdred": {
  	source: "iana"
  },
  	"text/gff3": {
  	source: "iana"
  },
  	"text/grammar-ref-list": {
  	source: "iana"
  },
  	"text/html": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"html",
  		"htm",
  		"shtml"
  	]
  },
  	"text/jade": {
  	extensions: [
  		"jade"
  	]
  },
  	"text/javascript": {
  	source: "iana",
  	compressible: true
  },
  	"text/jcr-cnd": {
  	source: "iana"
  },
  	"text/jsx": {
  	compressible: true,
  	extensions: [
  		"jsx"
  	]
  },
  	"text/less": {
  	compressible: true,
  	extensions: [
  		"less"
  	]
  },
  	"text/markdown": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"markdown",
  		"md"
  	]
  },
  	"text/mathml": {
  	source: "nginx",
  	extensions: [
  		"mml"
  	]
  },
  	"text/mdx": {
  	compressible: true,
  	extensions: [
  		"mdx"
  	]
  },
  	"text/mizar": {
  	source: "iana"
  },
  	"text/n3": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"n3"
  	]
  },
  	"text/parameters": {
  	source: "iana",
  	charset: "UTF-8"
  },
  	"text/parityfec": {
  	source: "iana"
  },
  	"text/plain": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"txt",
  		"text",
  		"conf",
  		"def",
  		"list",
  		"log",
  		"in",
  		"ini"
  	]
  },
  	"text/provenance-notation": {
  	source: "iana",
  	charset: "UTF-8"
  },
  	"text/prs.fallenstein.rst": {
  	source: "iana"
  },
  	"text/prs.lines.tag": {
  	source: "iana",
  	extensions: [
  		"dsc"
  	]
  },
  	"text/prs.prop.logic": {
  	source: "iana"
  },
  	"text/raptorfec": {
  	source: "iana"
  },
  	"text/red": {
  	source: "iana"
  },
  	"text/rfc822-headers": {
  	source: "iana"
  },
  	"text/richtext": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rtx"
  	]
  },
  	"text/rtf": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"rtf"
  	]
  },
  	"text/rtp-enc-aescm128": {
  	source: "iana"
  },
  	"text/rtploopback": {
  	source: "iana"
  },
  	"text/rtx": {
  	source: "iana"
  },
  	"text/sgml": {
  	source: "iana",
  	extensions: [
  		"sgml",
  		"sgm"
  	]
  },
  	"text/shaclc": {
  	source: "iana"
  },
  	"text/shex": {
  	source: "iana",
  	extensions: [
  		"shex"
  	]
  },
  	"text/slim": {
  	extensions: [
  		"slim",
  		"slm"
  	]
  },
  	"text/spdx": {
  	source: "iana",
  	extensions: [
  		"spdx"
  	]
  },
  	"text/strings": {
  	source: "iana"
  },
  	"text/stylus": {
  	extensions: [
  		"stylus",
  		"styl"
  	]
  },
  	"text/t140": {
  	source: "iana"
  },
  	"text/tab-separated-values": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"tsv"
  	]
  },
  	"text/troff": {
  	source: "iana",
  	extensions: [
  		"t",
  		"tr",
  		"roff",
  		"man",
  		"me",
  		"ms"
  	]
  },
  	"text/turtle": {
  	source: "iana",
  	charset: "UTF-8",
  	extensions: [
  		"ttl"
  	]
  },
  	"text/ulpfec": {
  	source: "iana"
  },
  	"text/uri-list": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"uri",
  		"uris",
  		"urls"
  	]
  },
  	"text/vcard": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"vcard"
  	]
  },
  	"text/vnd.a": {
  	source: "iana"
  },
  	"text/vnd.abc": {
  	source: "iana"
  },
  	"text/vnd.ascii-art": {
  	source: "iana"
  },
  	"text/vnd.curl": {
  	source: "iana",
  	extensions: [
  		"curl"
  	]
  },
  	"text/vnd.curl.dcurl": {
  	source: "apache",
  	extensions: [
  		"dcurl"
  	]
  },
  	"text/vnd.curl.mcurl": {
  	source: "apache",
  	extensions: [
  		"mcurl"
  	]
  },
  	"text/vnd.curl.scurl": {
  	source: "apache",
  	extensions: [
  		"scurl"
  	]
  },
  	"text/vnd.debian.copyright": {
  	source: "iana",
  	charset: "UTF-8"
  },
  	"text/vnd.dmclientscript": {
  	source: "iana"
  },
  	"text/vnd.dvb.subtitle": {
  	source: "iana",
  	extensions: [
  		"sub"
  	]
  },
  	"text/vnd.esmertec.theme-descriptor": {
  	source: "iana",
  	charset: "UTF-8"
  },
  	"text/vnd.familysearch.gedcom": {
  	source: "iana",
  	extensions: [
  		"ged"
  	]
  },
  	"text/vnd.ficlab.flt": {
  	source: "iana"
  },
  	"text/vnd.fly": {
  	source: "iana",
  	extensions: [
  		"fly"
  	]
  },
  	"text/vnd.fmi.flexstor": {
  	source: "iana",
  	extensions: [
  		"flx"
  	]
  },
  	"text/vnd.gml": {
  	source: "iana"
  },
  	"text/vnd.graphviz": {
  	source: "iana",
  	extensions: [
  		"gv"
  	]
  },
  	"text/vnd.hans": {
  	source: "iana"
  },
  	"text/vnd.hgl": {
  	source: "iana"
  },
  	"text/vnd.in3d.3dml": {
  	source: "iana",
  	extensions: [
  		"3dml"
  	]
  },
  	"text/vnd.in3d.spot": {
  	source: "iana",
  	extensions: [
  		"spot"
  	]
  },
  	"text/vnd.iptc.newsml": {
  	source: "iana"
  },
  	"text/vnd.iptc.nitf": {
  	source: "iana"
  },
  	"text/vnd.latex-z": {
  	source: "iana"
  },
  	"text/vnd.motorola.reflex": {
  	source: "iana"
  },
  	"text/vnd.ms-mediapackage": {
  	source: "iana"
  },
  	"text/vnd.net2phone.commcenter.command": {
  	source: "iana"
  },
  	"text/vnd.radisys.msml-basic-layout": {
  	source: "iana"
  },
  	"text/vnd.senx.warpscript": {
  	source: "iana"
  },
  	"text/vnd.si.uricatalogue": {
  	source: "iana"
  },
  	"text/vnd.sosi": {
  	source: "iana"
  },
  	"text/vnd.sun.j2me.app-descriptor": {
  	source: "iana",
  	charset: "UTF-8",
  	extensions: [
  		"jad"
  	]
  },
  	"text/vnd.trolltech.linguist": {
  	source: "iana",
  	charset: "UTF-8"
  },
  	"text/vnd.wap.si": {
  	source: "iana"
  },
  	"text/vnd.wap.sl": {
  	source: "iana"
  },
  	"text/vnd.wap.wml": {
  	source: "iana",
  	extensions: [
  		"wml"
  	]
  },
  	"text/vnd.wap.wmlscript": {
  	source: "iana",
  	extensions: [
  		"wmls"
  	]
  },
  	"text/vtt": {
  	source: "iana",
  	charset: "UTF-8",
  	compressible: true,
  	extensions: [
  		"vtt"
  	]
  },
  	"text/x-asm": {
  	source: "apache",
  	extensions: [
  		"s",
  		"asm"
  	]
  },
  	"text/x-c": {
  	source: "apache",
  	extensions: [
  		"c",
  		"cc",
  		"cxx",
  		"cpp",
  		"h",
  		"hh",
  		"dic"
  	]
  },
  	"text/x-component": {
  	source: "nginx",
  	extensions: [
  		"htc"
  	]
  },
  	"text/x-fortran": {
  	source: "apache",
  	extensions: [
  		"f",
  		"for",
  		"f77",
  		"f90"
  	]
  },
  	"text/x-gwt-rpc": {
  	compressible: true
  },
  	"text/x-handlebars-template": {
  	extensions: [
  		"hbs"
  	]
  },
  	"text/x-java-source": {
  	source: "apache",
  	extensions: [
  		"java"
  	]
  },
  	"text/x-jquery-tmpl": {
  	compressible: true
  },
  	"text/x-lua": {
  	extensions: [
  		"lua"
  	]
  },
  	"text/x-markdown": {
  	compressible: true,
  	extensions: [
  		"mkd"
  	]
  },
  	"text/x-nfo": {
  	source: "apache",
  	extensions: [
  		"nfo"
  	]
  },
  	"text/x-opml": {
  	source: "apache",
  	extensions: [
  		"opml"
  	]
  },
  	"text/x-org": {
  	compressible: true,
  	extensions: [
  		"org"
  	]
  },
  	"text/x-pascal": {
  	source: "apache",
  	extensions: [
  		"p",
  		"pas"
  	]
  },
  	"text/x-processing": {
  	compressible: true,
  	extensions: [
  		"pde"
  	]
  },
  	"text/x-sass": {
  	extensions: [
  		"sass"
  	]
  },
  	"text/x-scss": {
  	extensions: [
  		"scss"
  	]
  },
  	"text/x-setext": {
  	source: "apache",
  	extensions: [
  		"etx"
  	]
  },
  	"text/x-sfv": {
  	source: "apache",
  	extensions: [
  		"sfv"
  	]
  },
  	"text/x-suse-ymp": {
  	compressible: true,
  	extensions: [
  		"ymp"
  	]
  },
  	"text/x-uuencode": {
  	source: "apache",
  	extensions: [
  		"uu"
  	]
  },
  	"text/x-vcalendar": {
  	source: "apache",
  	extensions: [
  		"vcs"
  	]
  },
  	"text/x-vcard": {
  	source: "apache",
  	extensions: [
  		"vcf"
  	]
  },
  	"text/xml": {
  	source: "iana",
  	compressible: true,
  	extensions: [
  		"xml"
  	]
  },
  	"text/xml-external-parsed-entity": {
  	source: "iana"
  },
  	"text/yaml": {
  	compressible: true,
  	extensions: [
  		"yaml",
  		"yml"
  	]
  },
  	"video/1d-interleaved-parityfec": {
  	source: "iana"
  },
  	"video/3gpp": {
  	source: "iana",
  	extensions: [
  		"3gp",
  		"3gpp"
  	]
  },
  	"video/3gpp-tt": {
  	source: "iana"
  },
  	"video/3gpp2": {
  	source: "iana",
  	extensions: [
  		"3g2"
  	]
  },
  	"video/av1": {
  	source: "iana"
  },
  	"video/bmpeg": {
  	source: "iana"
  },
  	"video/bt656": {
  	source: "iana"
  },
  	"video/celb": {
  	source: "iana"
  },
  	"video/dv": {
  	source: "iana"
  },
  	"video/encaprtp": {
  	source: "iana"
  },
  	"video/ffv1": {
  	source: "iana"
  },
  	"video/flexfec": {
  	source: "iana"
  },
  	"video/h261": {
  	source: "iana",
  	extensions: [
  		"h261"
  	]
  },
  	"video/h263": {
  	source: "iana",
  	extensions: [
  		"h263"
  	]
  },
  	"video/h263-1998": {
  	source: "iana"
  },
  	"video/h263-2000": {
  	source: "iana"
  },
  	"video/h264": {
  	source: "iana",
  	extensions: [
  		"h264"
  	]
  },
  	"video/h264-rcdo": {
  	source: "iana"
  },
  	"video/h264-svc": {
  	source: "iana"
  },
  	"video/h265": {
  	source: "iana"
  },
  	"video/iso.segment": {
  	source: "iana",
  	extensions: [
  		"m4s"
  	]
  },
  	"video/jpeg": {
  	source: "iana",
  	extensions: [
  		"jpgv"
  	]
  },
  	"video/jpeg2000": {
  	source: "iana"
  },
  	"video/jpm": {
  	source: "apache",
  	extensions: [
  		"jpm",
  		"jpgm"
  	]
  },
  	"video/jxsv": {
  	source: "iana"
  },
  	"video/mj2": {
  	source: "iana",
  	extensions: [
  		"mj2",
  		"mjp2"
  	]
  },
  	"video/mp1s": {
  	source: "iana"
  },
  	"video/mp2p": {
  	source: "iana"
  },
  	"video/mp2t": {
  	source: "iana",
  	extensions: [
  		"ts"
  	]
  },
  	"video/mp4": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"mp4",
  		"mp4v",
  		"mpg4"
  	]
  },
  	"video/mp4v-es": {
  	source: "iana"
  },
  	"video/mpeg": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"mpeg",
  		"mpg",
  		"mpe",
  		"m1v",
  		"m2v"
  	]
  },
  	"video/mpeg4-generic": {
  	source: "iana"
  },
  	"video/mpv": {
  	source: "iana"
  },
  	"video/nv": {
  	source: "iana"
  },
  	"video/ogg": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"ogv"
  	]
  },
  	"video/parityfec": {
  	source: "iana"
  },
  	"video/pointer": {
  	source: "iana"
  },
  	"video/quicktime": {
  	source: "iana",
  	compressible: false,
  	extensions: [
  		"qt",
  		"mov"
  	]
  },
  	"video/raptorfec": {
  	source: "iana"
  },
  	"video/raw": {
  	source: "iana"
  },
  	"video/rtp-enc-aescm128": {
  	source: "iana"
  },
  	"video/rtploopback": {
  	source: "iana"
  },
  	"video/rtx": {
  	source: "iana"
  },
  	"video/scip": {
  	source: "iana"
  },
  	"video/smpte291": {
  	source: "iana"
  },
  	"video/smpte292m": {
  	source: "iana"
  },
  	"video/ulpfec": {
  	source: "iana"
  },
  	"video/vc1": {
  	source: "iana"
  },
  	"video/vc2": {
  	source: "iana"
  },
  	"video/vnd.cctv": {
  	source: "iana"
  },
  	"video/vnd.dece.hd": {
  	source: "iana",
  	extensions: [
  		"uvh",
  		"uvvh"
  	]
  },
  	"video/vnd.dece.mobile": {
  	source: "iana",
  	extensions: [
  		"uvm",
  		"uvvm"
  	]
  },
  	"video/vnd.dece.mp4": {
  	source: "iana"
  },
  	"video/vnd.dece.pd": {
  	source: "iana",
  	extensions: [
  		"uvp",
  		"uvvp"
  	]
  },
  	"video/vnd.dece.sd": {
  	source: "iana",
  	extensions: [
  		"uvs",
  		"uvvs"
  	]
  },
  	"video/vnd.dece.video": {
  	source: "iana",
  	extensions: [
  		"uvv",
  		"uvvv"
  	]
  },
  	"video/vnd.directv.mpeg": {
  	source: "iana"
  },
  	"video/vnd.directv.mpeg-tts": {
  	source: "iana"
  },
  	"video/vnd.dlna.mpeg-tts": {
  	source: "iana"
  },
  	"video/vnd.dvb.file": {
  	source: "iana",
  	extensions: [
  		"dvb"
  	]
  },
  	"video/vnd.fvt": {
  	source: "iana",
  	extensions: [
  		"fvt"
  	]
  },
  	"video/vnd.hns.video": {
  	source: "iana"
  },
  	"video/vnd.iptvforum.1dparityfec-1010": {
  	source: "iana"
  },
  	"video/vnd.iptvforum.1dparityfec-2005": {
  	source: "iana"
  },
  	"video/vnd.iptvforum.2dparityfec-1010": {
  	source: "iana"
  },
  	"video/vnd.iptvforum.2dparityfec-2005": {
  	source: "iana"
  },
  	"video/vnd.iptvforum.ttsavc": {
  	source: "iana"
  },
  	"video/vnd.iptvforum.ttsmpeg2": {
  	source: "iana"
  },
  	"video/vnd.motorola.video": {
  	source: "iana"
  },
  	"video/vnd.motorola.videop": {
  	source: "iana"
  },
  	"video/vnd.mpegurl": {
  	source: "iana",
  	extensions: [
  		"mxu",
  		"m4u"
  	]
  },
  	"video/vnd.ms-playready.media.pyv": {
  	source: "iana",
  	extensions: [
  		"pyv"
  	]
  },
  	"video/vnd.nokia.interleaved-multimedia": {
  	source: "iana"
  },
  	"video/vnd.nokia.mp4vr": {
  	source: "iana"
  },
  	"video/vnd.nokia.videovoip": {
  	source: "iana"
  },
  	"video/vnd.objectvideo": {
  	source: "iana"
  },
  	"video/vnd.radgamettools.bink": {
  	source: "iana"
  },
  	"video/vnd.radgamettools.smacker": {
  	source: "iana"
  },
  	"video/vnd.sealed.mpeg1": {
  	source: "iana"
  },
  	"video/vnd.sealed.mpeg4": {
  	source: "iana"
  },
  	"video/vnd.sealed.swf": {
  	source: "iana"
  },
  	"video/vnd.sealedmedia.softseal.mov": {
  	source: "iana"
  },
  	"video/vnd.uvvu.mp4": {
  	source: "iana",
  	extensions: [
  		"uvu",
  		"uvvu"
  	]
  },
  	"video/vnd.vivo": {
  	source: "iana",
  	extensions: [
  		"viv"
  	]
  },
  	"video/vnd.youtube.yt": {
  	source: "iana"
  },
  	"video/vp8": {
  	source: "iana"
  },
  	"video/vp9": {
  	source: "iana"
  },
  	"video/webm": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"webm"
  	]
  },
  	"video/x-f4v": {
  	source: "apache",
  	extensions: [
  		"f4v"
  	]
  },
  	"video/x-fli": {
  	source: "apache",
  	extensions: [
  		"fli"
  	]
  },
  	"video/x-flv": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"flv"
  	]
  },
  	"video/x-m4v": {
  	source: "apache",
  	extensions: [
  		"m4v"
  	]
  },
  	"video/x-matroska": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"mkv",
  		"mk3d",
  		"mks"
  	]
  },
  	"video/x-mng": {
  	source: "apache",
  	extensions: [
  		"mng"
  	]
  },
  	"video/x-ms-asf": {
  	source: "apache",
  	extensions: [
  		"asf",
  		"asx"
  	]
  },
  	"video/x-ms-vob": {
  	source: "apache",
  	extensions: [
  		"vob"
  	]
  },
  	"video/x-ms-wm": {
  	source: "apache",
  	extensions: [
  		"wm"
  	]
  },
  	"video/x-ms-wmv": {
  	source: "apache",
  	compressible: false,
  	extensions: [
  		"wmv"
  	]
  },
  	"video/x-ms-wmx": {
  	source: "apache",
  	extensions: [
  		"wmx"
  	]
  },
  	"video/x-ms-wvx": {
  	source: "apache",
  	extensions: [
  		"wvx"
  	]
  },
  	"video/x-msvideo": {
  	source: "apache",
  	extensions: [
  		"avi"
  	]
  },
  	"video/x-sgi-movie": {
  	source: "apache",
  	extensions: [
  		"movie"
  	]
  },
  	"video/x-smv": {
  	source: "apache",
  	extensions: [
  		"smv"
  	]
  },
  	"x-conference/x-cooltalk": {
  	source: "apache",
  	extensions: [
  		"ice"
  	]
  },
  	"x-shader/x-fragment": {
  	compressible: true
  },
  	"x-shader/x-vertex": {
  	compressible: true
  }
  };

  var db$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': db
  });

  var require$$0 = getCjsExportFromNamespace(db$1);

  /*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   */

  /**
   * Module exports.
   */

  var mimeDb = require$$0;

  var mimeTypes = createCommonjsModule(function (module, exports) {

  /**
   * Module dependencies.
   * @private
   */


  var extname = path__default["default"].extname;

  /**
   * Module variables.
   * @private
   */

  var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
  var TEXT_TYPE_REGEXP = /^text\//i;

  /**
   * Module exports.
   * @public
   */

  exports.charset = charset;
  exports.charsets = { lookup: charset };
  exports.contentType = contentType;
  exports.extension = extension;
  exports.extensions = Object.create(null);
  exports.lookup = lookup;
  exports.types = Object.create(null);

  // Populate the extensions/types maps
  populateMaps(exports.extensions, exports.types);

  /**
   * Get the default charset for a MIME type.
   *
   * @param {string} type
   * @return {boolean|string}
   */

  function charset (type) {
    if (!type || typeof type !== 'string') {
      return false
    }

    // TODO: use media-typer
    var match = EXTRACT_TYPE_REGEXP.exec(type);
    var mime = match && mimeDb[match[1].toLowerCase()];

    if (mime && mime.charset) {
      return mime.charset
    }

    // default text/* to utf-8
    if (match && TEXT_TYPE_REGEXP.test(match[1])) {
      return 'UTF-8'
    }

    return false
  }

  /**
   * Create a full Content-Type header given a MIME type or extension.
   *
   * @param {string} str
   * @return {boolean|string}
   */

  function contentType (str) {
    // TODO: should this even be in this module?
    if (!str || typeof str !== 'string') {
      return false
    }

    var mime = str.indexOf('/') === -1
      ? exports.lookup(str)
      : str;

    if (!mime) {
      return false
    }

    // TODO: use content-type or other module
    if (mime.indexOf('charset') === -1) {
      var charset = exports.charset(mime);
      if (charset) mime += '; charset=' + charset.toLowerCase();
    }

    return mime
  }

  /**
   * Get the default extension for a MIME type.
   *
   * @param {string} type
   * @return {boolean|string}
   */

  function extension (type) {
    if (!type || typeof type !== 'string') {
      return false
    }

    // TODO: use media-typer
    var match = EXTRACT_TYPE_REGEXP.exec(type);

    // get extensions
    var exts = match && exports.extensions[match[1].toLowerCase()];

    if (!exts || !exts.length) {
      return false
    }

    return exts[0]
  }

  /**
   * Lookup the MIME type for a file path/extension.
   *
   * @param {string} path
   * @return {boolean|string}
   */

  function lookup (path) {
    if (!path || typeof path !== 'string') {
      return false
    }

    // get the extension ("ext" or ".ext" or full path)
    var extension = extname('x.' + path)
      .toLowerCase()
      .substr(1);

    if (!extension) {
      return false
    }

    return exports.types[extension] || false
  }

  /**
   * Populate the extensions and types maps.
   * @private
   */

  function populateMaps (extensions, types) {
    // source preference (least -> most)
    var preference = ['nginx', 'apache', undefined, 'iana'];

    Object.keys(mimeDb).forEach(function forEachMimeType (type) {
      var mime = mimeDb[type];
      var exts = mime.extensions;

      if (!exts || !exts.length) {
        return
      }

      // mime -> extensions
      extensions[type] = exts;

      // extension -> mime
      for (var i = 0; i < exts.length; i++) {
        var extension = exts[i];

        if (types[extension]) {
          var from = preference.indexOf(mimeDb[types[extension]].source);
          var to = preference.indexOf(mime.source);

          if (types[extension] !== 'application/octet-stream' &&
            (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
            // skip the remapping
            continue
          }
        }

        // set the extension -> mime
        types[extension] = type;
      }
    });
  }
  });
  mimeTypes.charset;
  mimeTypes.charsets;
  mimeTypes.contentType;
  mimeTypes.extension;
  mimeTypes.extensions;
  mimeTypes.lookup;
  mimeTypes.types;

  var defer_1 = defer;

  /**
   * Runs provided function on next iteration of the event loop
   *
   * @param {function} fn - function to run
   */
  function defer(fn)
  {
    var nextTick = typeof setImmediate == 'function'
      ? setImmediate
      : (
        typeof process == 'object' && typeof process.nextTick == 'function'
        ? process.nextTick
        : null
      );

    if (nextTick)
    {
      nextTick(fn);
    }
    else
    {
      setTimeout(fn, 0);
    }
  }

  // API
  var async_1 = async;

  /**
   * Runs provided callback asynchronously
   * even if callback itself is not
   *
   * @param   {function} callback - callback to invoke
   * @returns {function} - augmented callback
   */
  function async(callback)
  {
    var isAsync = false;

    // check if async happened
    defer_1(function() { isAsync = true; });

    return function async_callback(err, result)
    {
      if (isAsync)
      {
        callback(err, result);
      }
      else
      {
        defer_1(function nextTick_callback()
        {
          callback(err, result);
        });
      }
    };
  }

  // API
  var abort_1 = abort;

  /**
   * Aborts leftover active jobs
   *
   * @param {object} state - current state object
   */
  function abort(state)
  {
    Object.keys(state.jobs).forEach(clean.bind(state));

    // reset leftover jobs
    state.jobs = {};
  }

  /**
   * Cleans up leftover job by invoking abort function for the provided job id
   *
   * @this  state
   * @param {string|number} key - job id to abort
   */
  function clean(key)
  {
    if (typeof this.jobs[key] == 'function')
    {
      this.jobs[key]();
    }
  }

  // API
  var iterate_1 = iterate;

  /**
   * Iterates over each job object
   *
   * @param {array|object} list - array or object (named list) to iterate over
   * @param {function} iterator - iterator to run
   * @param {object} state - current job status
   * @param {function} callback - invoked when all elements processed
   */
  function iterate(list, iterator, state, callback)
  {
    // store current index
    var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

    state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
    {
      // don't repeat yourself
      // skip secondary callbacks
      if (!(key in state.jobs))
      {
        return;
      }

      // clean up jobs
      delete state.jobs[key];

      if (error)
      {
        // don't process rest of the results
        // stop still active jobs
        // and reset the list
        abort_1(state);
      }
      else
      {
        state.results[key] = output;
      }

      // return salvaged results
      callback(error, state.results);
    });
  }

  /**
   * Runs iterator over provided job element
   *
   * @param   {function} iterator - iterator to invoke
   * @param   {string|number} key - key/index of the element in the list of jobs
   * @param   {mixed} item - job description
   * @param   {function} callback - invoked after iterator is done with the job
   * @returns {function|mixed} - job abort function or something else
   */
  function runJob(iterator, key, item, callback)
  {
    var aborter;

    // allow shortcut if iterator expects only two arguments
    if (iterator.length == 2)
    {
      aborter = iterator(item, async_1(callback));
    }
    // otherwise go with full three arguments
    else
    {
      aborter = iterator(item, key, async_1(callback));
    }

    return aborter;
  }

  // API
  var state_1 = state;

  /**
   * Creates initial state object
   * for iteration over list
   *
   * @param   {array|object} list - list to iterate over
   * @param   {function|null} sortMethod - function to use for keys sort,
   *                                     or `null` to keep them as is
   * @returns {object} - initial state object
   */
  function state(list, sortMethod)
  {
    var isNamedList = !Array.isArray(list)
      , initState =
      {
        index    : 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs     : {},
        results  : isNamedList ? {} : [],
        size     : isNamedList ? Object.keys(list).length : list.length
      }
      ;

    if (sortMethod)
    {
      // sort array keys based on it's values
      // sort object's keys just on own merit
      initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
      {
        return sortMethod(list[a], list[b]);
      });
    }

    return initState;
  }

  // API
  var terminator_1 = terminator;

  /**
   * Terminates jobs in the attached state context
   *
   * @this  AsyncKitState#
   * @param {function} callback - final callback to invoke after termination
   */
  function terminator(callback)
  {
    if (!Object.keys(this.jobs).length)
    {
      return;
    }

    // fast forward iteration index
    this.index = this.size;

    // abort jobs
    abort_1(this);

    // send back results we have so far
    async_1(callback)(null, this.results);
  }

  // Public API
  var parallel_1 = parallel;

  /**
   * Runs iterator over provided array elements in parallel
   *
   * @param   {array|object} list - array or object (named list) to iterate over
   * @param   {function} iterator - iterator to run
   * @param   {function} callback - invoked when all elements processed
   * @returns {function} - jobs terminator
   */
  function parallel(list, iterator, callback)
  {
    var state = state_1(list);

    while (state.index < (state['keyedList'] || list).length)
    {
      iterate_1(list, iterator, state, function(error, result)
      {
        if (error)
        {
          callback(error, result);
          return;
        }

        // looks like it's the last one
        if (Object.keys(state.jobs).length === 0)
        {
          callback(null, state.results);
          return;
        }
      });

      state.index++;
    }

    return terminator_1.bind(state, callback);
  }

  // Public API
  var serialOrdered_1 = serialOrdered;
  // sorting helpers
  var ascending_1  = ascending;
  var descending_1 = descending;

  /**
   * Runs iterator over provided sorted array elements in series
   *
   * @param   {array|object} list - array or object (named list) to iterate over
   * @param   {function} iterator - iterator to run
   * @param   {function} sortMethod - custom sort function
   * @param   {function} callback - invoked when all elements processed
   * @returns {function} - jobs terminator
   */
  function serialOrdered(list, iterator, sortMethod, callback)
  {
    var state = state_1(list, sortMethod);

    iterate_1(list, iterator, state, function iteratorHandler(error, result)
    {
      if (error)
      {
        callback(error, result);
        return;
      }

      state.index++;

      // are we there yet?
      if (state.index < (state['keyedList'] || list).length)
      {
        iterate_1(list, iterator, state, iteratorHandler);
        return;
      }

      // done here
      callback(null, state.results);
    });

    return terminator_1.bind(state, callback);
  }

  /*
   * -- Sort methods
   */

  /**
   * sort helper to sort array elements in ascending order
   *
   * @param   {mixed} a - an item to compare
   * @param   {mixed} b - an item to compare
   * @returns {number} - comparison result
   */
  function ascending(a, b)
  {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /**
   * sort helper to sort array elements in descending order
   *
   * @param   {mixed} a - an item to compare
   * @param   {mixed} b - an item to compare
   * @returns {number} - comparison result
   */
  function descending(a, b)
  {
    return -1 * ascending(a, b);
  }
  serialOrdered_1.ascending = ascending_1;
  serialOrdered_1.descending = descending_1;

  // Public API
  var serial_1 = serial;

  /**
   * Runs iterator over provided array elements in series
   *
   * @param   {array|object} list - array or object (named list) to iterate over
   * @param   {function} iterator - iterator to run
   * @param   {function} callback - invoked when all elements processed
   * @returns {function} - jobs terminator
   */
  function serial(list, iterator, callback)
  {
    return serialOrdered_1(list, iterator, null, callback);
  }

  var asynckit =
  {
    parallel      : parallel_1,
    serial        : serial_1,
    serialOrdered : serialOrdered_1
  };

  // populates missing values
  var populate = function(dst, src) {

    Object.keys(src).forEach(function(prop)
    {
      dst[prop] = dst[prop] || src[prop];
    });

    return dst;
  };

  var parseUrl = url__default["default"].parse;

  var Stream = stream__default["default"].Stream;




  // Public API
  var form_data = FormData$2;

  // make it a Stream
  util__default["default"].inherits(FormData$2, combined_stream);

  /**
   * Create readable "multipart/form-data" streams.
   * Can be used to submit forms
   * and file uploads to other web applications.
   *
   * @constructor
   * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
   */
  function FormData$2(options) {
    if (!(this instanceof FormData$2)) {
      return new FormData$2(options);
    }

    this._overheadLength = 0;
    this._valueLength = 0;
    this._valuesToMeasure = [];

    combined_stream.call(this);

    options = options || {};
    for (var option in options) {
      this[option] = options[option];
    }
  }

  FormData$2.LINE_BREAK = '\r\n';
  FormData$2.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

  FormData$2.prototype.append = function(field, value, options) {

    options = options || {};

    // allow filename as single option
    if (typeof options == 'string') {
      options = {filename: options};
    }

    var append = combined_stream.prototype.append.bind(this);

    // all that streamy business can't handle numbers
    if (typeof value == 'number') {
      value = '' + value;
    }

    // https://github.com/felixge/node-form-data/issues/38
    if (util__default["default"].isArray(value)) {
      // Please convert your array into string
      // the way web server expects it
      this._error(new Error('Arrays are not supported.'));
      return;
    }

    var header = this._multiPartHeader(field, value, options);
    var footer = this._multiPartFooter();

    append(header);
    append(value);
    append(footer);

    // pass along options.knownLength
    this._trackLength(header, value, options);
  };

  FormData$2.prototype._trackLength = function(header, value, options) {
    var valueLength = 0;

    // used w/ getLengthSync(), when length is known.
    // e.g. for streaming directly from a remote server,
    // w/ a known file a size, and not wanting to wait for
    // incoming file to finish to get its size.
    if (options.knownLength != null) {
      valueLength += +options.knownLength;
    } else if (Buffer.isBuffer(value)) {
      valueLength = value.length;
    } else if (typeof value === 'string') {
      valueLength = Buffer.byteLength(value);
    }

    this._valueLength += valueLength;

    // @check why add CRLF? does this account for custom/multiple CRLFs?
    this._overheadLength +=
      Buffer.byteLength(header) +
      FormData$2.LINE_BREAK.length;

    // empty or either doesn't have path or not an http response or not a stream
    if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) && !(value instanceof Stream))) {
      return;
    }

    // no need to bother with the length
    if (!options.knownLength) {
      this._valuesToMeasure.push(value);
    }
  };

  FormData$2.prototype._lengthRetriever = function(value, callback) {

    if (value.hasOwnProperty('fd')) {

      // take read range into a account
      // `end` = Infinity –> read file till the end
      //
      // TODO: Looks like there is bug in Node fs.createReadStream
      // it doesn't respect `end` options without `start` options
      // Fix it when node fixes it.
      // https://github.com/joyent/node/issues/7819
      if (value.end != undefined && value.end != Infinity && value.start != undefined) {

        // when end specified
        // no need to calculate range
        // inclusive, starts with 0
        callback(null, value.end + 1 - (value.start ? value.start : 0));

      // not that fast snoopy
      } else {
        // still need to fetch file size from fs
        fs__default["default"].stat(value.path, function(err, stat) {

          var fileSize;

          if (err) {
            callback(err);
            return;
          }

          // update final size based on the range options
          fileSize = stat.size - (value.start ? value.start : 0);
          callback(null, fileSize);
        });
      }

    // or http response
    } else if (value.hasOwnProperty('httpVersion')) {
      callback(null, +value.headers['content-length']);

    // or request stream http://github.com/mikeal/request
    } else if (value.hasOwnProperty('httpModule')) {
      // wait till response come back
      value.on('response', function(response) {
        value.pause();
        callback(null, +response.headers['content-length']);
      });
      value.resume();

    // something else
    } else {
      callback('Unknown stream');
    }
  };

  FormData$2.prototype._multiPartHeader = function(field, value, options) {
    // custom header specified (as string)?
    // it becomes responsible for boundary
    // (e.g. to handle extra CRLFs on .NET servers)
    if (typeof options.header == 'string') {
      return options.header;
    }

    var contentDisposition = this._getContentDisposition(value, options);
    var contentType = this._getContentType(value, options);

    var contents = '';
    var headers  = {
      // add custom disposition as third element or keep it two elements if not
      'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
      // if no content type. allow it to be empty array
      'Content-Type': [].concat(contentType || [])
    };

    // allow custom headers.
    if (typeof options.header == 'object') {
      populate(headers, options.header);
    }

    var header;
    for (var prop in headers) {
      if (!headers.hasOwnProperty(prop)) continue;
      header = headers[prop];

      // skip nullish headers.
      if (header == null) {
        continue;
      }

      // convert all headers to arrays.
      if (!Array.isArray(header)) {
        header = [header];
      }

      // add non-empty headers.
      if (header.length) {
        contents += prop + ': ' + header.join('; ') + FormData$2.LINE_BREAK;
      }
    }

    return '--' + this.getBoundary() + FormData$2.LINE_BREAK + contents + FormData$2.LINE_BREAK;
  };

  FormData$2.prototype._getContentDisposition = function(value, options) {

    var filename
      , contentDisposition
      ;

    if (typeof options.filepath === 'string') {
      // custom filepath for relative paths
      filename = path__default["default"].normalize(options.filepath).replace(/\\/g, '/');
    } else if (options.filename || value.name || value.path) {
      // custom filename take precedence
      // formidable and the browser add a name property
      // fs- and request- streams have path property
      filename = path__default["default"].basename(options.filename || value.name || value.path);
    } else if (value.readable && value.hasOwnProperty('httpVersion')) {
      // or try http response
      filename = path__default["default"].basename(value.client._httpMessage.path || '');
    }

    if (filename) {
      contentDisposition = 'filename="' + filename + '"';
    }

    return contentDisposition;
  };

  FormData$2.prototype._getContentType = function(value, options) {

    // use custom content-type above all
    var contentType = options.contentType;

    // or try `name` from formidable, browser
    if (!contentType && value.name) {
      contentType = mimeTypes.lookup(value.name);
    }

    // or try `path` from fs-, request- streams
    if (!contentType && value.path) {
      contentType = mimeTypes.lookup(value.path);
    }

    // or if it's http-reponse
    if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
      contentType = value.headers['content-type'];
    }

    // or guess it from the filepath or filename
    if (!contentType && (options.filepath || options.filename)) {
      contentType = mimeTypes.lookup(options.filepath || options.filename);
    }

    // fallback to the default content type if `value` is not simple value
    if (!contentType && typeof value == 'object') {
      contentType = FormData$2.DEFAULT_CONTENT_TYPE;
    }

    return contentType;
  };

  FormData$2.prototype._multiPartFooter = function() {
    return function(next) {
      var footer = FormData$2.LINE_BREAK;

      var lastPart = (this._streams.length === 0);
      if (lastPart) {
        footer += this._lastBoundary();
      }

      next(footer);
    }.bind(this);
  };

  FormData$2.prototype._lastBoundary = function() {
    return '--' + this.getBoundary() + '--' + FormData$2.LINE_BREAK;
  };

  FormData$2.prototype.getHeaders = function(userHeaders) {
    var header;
    var formHeaders = {
      'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
    };

    for (header in userHeaders) {
      if (userHeaders.hasOwnProperty(header)) {
        formHeaders[header.toLowerCase()] = userHeaders[header];
      }
    }

    return formHeaders;
  };

  FormData$2.prototype.setBoundary = function(boundary) {
    this._boundary = boundary;
  };

  FormData$2.prototype.getBoundary = function() {
    if (!this._boundary) {
      this._generateBoundary();
    }

    return this._boundary;
  };

  FormData$2.prototype.getBuffer = function() {
    var dataBuffer = new Buffer.alloc( 0 );
    var boundary = this.getBoundary();

    // Create the form content. Add Line breaks to the end of data.
    for (var i = 0, len = this._streams.length; i < len; i++) {
      if (typeof this._streams[i] !== 'function') {

        // Add content to the buffer.
        if(Buffer.isBuffer(this._streams[i])) {
          dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);
        }else {
          dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);
        }

        // Add break after content.
        if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {
          dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData$2.LINE_BREAK)] );
        }
      }
    }

    // Add the footer and return the Buffer object.
    return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );
  };

  FormData$2.prototype._generateBoundary = function() {
    // This generates a 50 character boundary similar to those used by Firefox.
    // They are optimized for boyer-moore parsing.
    var boundary = '--------------------------';
    for (var i = 0; i < 24; i++) {
      boundary += Math.floor(Math.random() * 10).toString(16);
    }

    this._boundary = boundary;
  };

  // Note: getLengthSync DOESN'T calculate streams length
  // As workaround one can calculate file size manually
  // and add it as knownLength option
  FormData$2.prototype.getLengthSync = function() {
    var knownLength = this._overheadLength + this._valueLength;

    // Don't get confused, there are 3 "internal" streams for each keyval pair
    // so it basically checks if there is any value added to the form
    if (this._streams.length) {
      knownLength += this._lastBoundary().length;
    }

    // https://github.com/form-data/form-data/issues/40
    if (!this.hasKnownLength()) {
      // Some async length retrievers are present
      // therefore synchronous length calculation is false.
      // Please use getLength(callback) to get proper length
      this._error(new Error('Cannot calculate proper length in synchronous way.'));
    }

    return knownLength;
  };

  // Public API to check if length of added values is known
  // https://github.com/form-data/form-data/issues/196
  // https://github.com/form-data/form-data/issues/262
  FormData$2.prototype.hasKnownLength = function() {
    var hasKnownLength = true;

    if (this._valuesToMeasure.length) {
      hasKnownLength = false;
    }

    return hasKnownLength;
  };

  FormData$2.prototype.getLength = function(cb) {
    var knownLength = this._overheadLength + this._valueLength;

    if (this._streams.length) {
      knownLength += this._lastBoundary().length;
    }

    if (!this._valuesToMeasure.length) {
      process.nextTick(cb.bind(this, null, knownLength));
      return;
    }

    asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
      if (err) {
        cb(err);
        return;
      }

      values.forEach(function(length) {
        knownLength += length;
      });

      cb(null, knownLength);
    });
  };

  FormData$2.prototype.submit = function(params, cb) {
    var request
      , options
      , defaults = {method: 'post'}
      ;

    // parse provided url if it's string
    // or treat it as options object
    if (typeof params == 'string') {

      params = parseUrl(params);
      options = populate({
        port: params.port,
        path: params.pathname,
        host: params.hostname,
        protocol: params.protocol
      }, defaults);

    // use custom params
    } else {

      options = populate(params, defaults);
      // if no port provided use default one
      if (!options.port) {
        options.port = options.protocol == 'https:' ? 443 : 80;
      }
    }

    // put that good code in getHeaders to some use
    options.headers = this.getHeaders(params.headers);

    // https if specified, fallback to http in any other case
    if (options.protocol == 'https:') {
      request = https__default["default"].request(options);
    } else {
      request = http__default["default"].request(options);
    }

    // get content length and fire away
    this.getLength(function(err, length) {
      if (err && err !== 'Unknown stream') {
        this._error(err);
        return;
      }

      // add content length
      if (length) {
        request.setHeader('Content-Length', length);
      }

      this.pipe(request);
      if (cb) {
        var onResponse;

        var callback = function (error, responce) {
          request.removeListener('error', callback);
          request.removeListener('response', onResponse);

          return cb.call(this, error, responce);
        };

        onResponse = callback.bind(this, null);

        request.on('error', callback);
        request.on('response', onResponse);
      }
    }.bind(this));

    return request;
  };

  FormData$2.prototype._error = function(err) {
    if (!this.error) {
      this.error = err;
      this.pause();
      this.emit('error', err);
    }
  };

  FormData$2.prototype.toString = function () {
    return '[object FormData]';
  };

  // eslint-disable-next-line strict
  var FormData$1 = form_data;

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = http_1;
    }
    return adapter;
  }

  function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }

    return (encoder || JSON.stringify)(rawValue);
  }

  var defaults = {

    transitional: transitional,

    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');

      if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }

      var isObjectPayload = utils.isObject(data);
      var contentType = headers && headers['Content-Type'];

      var isFileList;

      if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
        var _FormData = this.env && this.env.FormData;
        return toFormData_1(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
      } else if (isObjectPayload || contentType === 'application/json') {
        setContentTypeIfUnset(headers, 'application/json');
        return stringifySafely(data);
      }

      return data;
    }],

    transformResponse: [function transformResponse(data) {
      var transitional = this.transitional || defaults.transitional;
      var silentJSONParsing = transitional && transitional.silentJSONParsing;
      var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

      if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError_1.from(e, AxiosError_1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    env: {
      FormData: FormData$1
    },

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },

    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    }
  };

  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData = function transformData(data, headers, fns) {
    var context = this || defaults_1;
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn.call(context, data, headers);
    });

    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError_1();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData.call(
      config,
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers
    );

    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults_1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(
        config,
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};

    function getMergedValue(target, source) {
      if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
        return utils.merge(target, source);
      } else if (utils.isPlainObject(source)) {
        return utils.merge({}, source);
      } else if (utils.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(prop) {
      if (!utils.isUndefined(config2[prop])) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        return getMergedValue(undefined, config2[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        return getMergedValue(undefined, config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(prop) {
      if (prop in config2) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        return getMergedValue(undefined, config1[prop]);
      }
    }

    var mergeMap = {
      'url': valueFromConfig2,
      'method': valueFromConfig2,
      'data': valueFromConfig2,
      'baseURL': defaultToConfig2,
      'transformRequest': defaultToConfig2,
      'transformResponse': defaultToConfig2,
      'paramsSerializer': defaultToConfig2,
      'timeout': defaultToConfig2,
      'timeoutMessage': defaultToConfig2,
      'withCredentials': defaultToConfig2,
      'adapter': defaultToConfig2,
      'responseType': defaultToConfig2,
      'xsrfCookieName': defaultToConfig2,
      'xsrfHeaderName': defaultToConfig2,
      'onUploadProgress': defaultToConfig2,
      'onDownloadProgress': defaultToConfig2,
      'decompress': defaultToConfig2,
      'maxContentLength': defaultToConfig2,
      'maxBodyLength': defaultToConfig2,
      'beforeRedirect': defaultToConfig2,
      'transport': defaultToConfig2,
      'httpAgent': defaultToConfig2,
      'httpsAgent': defaultToConfig2,
      'cancelToken': defaultToConfig2,
      'socketPath': defaultToConfig2,
      'responseEncoding': defaultToConfig2,
      'validateStatus': mergeDirectKeys
    };

    utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
      var merge = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge(prop);
      (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  };

  var VERSION = data.version;


  var validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });

  var deprecatedWarnings = {};

  /**
   * Transitional option validator
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return function(value, opt, opts) {
      if (validator === false) {
        throw new AxiosError_1(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError_1.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
      }

      return validator ? validator(value, opt, opts) : true;
    };
  };

  /**
   * Assert object's properties type
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError_1('options must be an object', AxiosError_1.ERR_BAD_OPTION_VALUE);
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while (i-- > 0) {
      var opt = keys[i];
      var validator = schema[opt];
      if (validator) {
        var value = options[opt];
        var result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_1('option ' + opt + ' must be ' + result, AxiosError_1.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_1('Unknown option ' + opt, AxiosError_1.ERR_BAD_OPTION);
      }
    }
  }

  var validator = {
    assertOptions: assertOptions,
    validators: validators$1
  };

  var validators = validator.validators;
  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }

    var transitional = config.transitional;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    var promise;

    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest, undefined];

      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);

      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }


    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }

    try {
      promise = dispatchRequest(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }

    return promise;
  };

  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    var fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  };

  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        url: url,
        data: (config || {}).data
      }));
    };
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url: url,
          data: data
        }));
      };
    }

    Axios.prototype[method] = generateHTTPMethod();

    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  var Axios_1 = Axios;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;

    // eslint-disable-next-line func-names
    this.promise.then(function(cancel) {
      if (!token._listeners) return;

      var i;
      var l = token._listeners.length;

      for (i = 0; i < l; i++) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = function(onfulfilled) {
      var _resolve;
      // eslint-disable-next-line func-names
      var promise = new Promise(function(resolve) {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError_1(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Subscribe to the cancel signal
   */

  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };

  /**
   * Unsubscribe from the cancel signal
   */

  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  var isAxiosError = function isAxiosError(payload) {
    return utils.isObject(payload) && (payload.isAxiosError === true);
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios_1.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  var axios$1 = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios$1.Axios = Axios_1;

  // Expose Cancel & CancelToken
  axios$1.CanceledError = CanceledError_1;
  axios$1.CancelToken = CancelToken_1;
  axios$1.isCancel = isCancel;
  axios$1.VERSION = data.version;
  axios$1.toFormData = toFormData_1;

  // Expose AxiosError class
  axios$1.AxiosError = AxiosError_1;

  // alias for CanceledError for backward compatibility
  axios$1.Cancel = axios$1.CanceledError;

  // Expose all/spread
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = spread;

  // Expose isAxiosError
  axios$1.isAxiosError = isAxiosError;

  var axios_1 = axios$1;

  // Allow use of default import syntax in TypeScript
  var default_1 = axios$1;
  axios_1.default = default_1;

  var axios = axios_1;

  function NetworkRequest (HookHub, options) {
    HookHub.run(HOOK_NAME.START, options);
    axios(options).then(function (response) {
      HookHub.run(HOOK_NAME.STATUS_CODE, response.status);
      HookHub.run(HOOK_NAME.SUCCESS, response);
    }).catch(function (error) {
      if (axios.isCancel(error)) {
        HookHub.run(HOOK_NAME.CANCEL, error.message);
        return;
      }

      if (error.response) {
        HookHub.run(HOOK_NAME.STATUS_CODE, error.response.status);
        HookHub.run(HOOK_NAME.ERROR, error.response);
        return;
      }

      HookHub.run(HOOK_NAME.ERROR, error);
    }).then(function (_) {
      return HookHub.run(HOOK_NAME.FINISH, {});
    });
  }

  function _injectCancelSignal(options) {
    var cancelToken = _hasProperty(options, 'cancelToken') ? options.cancelToken : null;
    var signal = !cancelToken && _hasProperty(options, 'signal') ? options.signal : null;
    var abortControllerInstance = null;

    if (!cancelToken && !signal) {
      abortControllerInstance = new AbortController();
      options = Object.assign({}, options, {
        signal: abortControllerInstance.signal
      });
    }

    return {
      options: options,
      abortControllerInstance: abortControllerInstance
    };
  }
  function _composeConfig(HookHub, url) {
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Method.GET;
    var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var userOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var processed = processPayload(url, method, payload);
    var cancelToken = _hasProperty(userOptions, 'cancelToken') ? userOptions.cancelToken : null;
    var signal = !cancelToken && _hasProperty(userOptions, 'signal') ? userOptions.signal : new AbortController().signal;

    var defaultOptions = _objectSpread2(_objectSpread2({
      method: method,
      url: processed.url,
      data: method === Method.GET ? {} : processed.payload
    }, cancelToken ? {
      cancelToken: cancelToken
    } : {
      signal: signal
    }), {}, {
      headers: {
        Accept: '*/*',
        // Accept: "application/json",
        "Content-Type": payload instanceof FormData ? "multipart/form-data" : "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      onUploadProgress: function onUploadProgress(progress) {
        if (!(processed.payload instanceof FormData)) return;
        HookHub.run(HOOK_NAME.UPLOAD, progress);
      },
      onDownloadProgress: function onDownloadProgress(progress) {
        HookHub.run(HOOK_NAME.DOWNLOAD, progress);
      }
    });

    return merge$1(defaultOptions, userOptions);
  }

  function processPayload(url, method, payload, forceFormData) {
    if ((_hasFiles(payload) || forceFormData) && !(payload instanceof FormData)) {
      payload = _objectToFormData(payload);
    }

    if (!(payload instanceof FormData) && method === Method.GET && Object.keys(payload).length) {
      url = url.endsWith("/") ? url.slice(0, -1) : url;
      var params = new URLSearchParams(_objectSpread2({}, payload));
      url += "?" + params.toString();
    }

    return {
      url: url,
      payload: payload
    };
  }

  var AquaRequest = /*#__PURE__*/function () {
    function AquaRequest() {
      var requestURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://localhost';
      var userStates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var hooks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, AquaRequest);

      this.requestURL = requestURL;
      this.state = {};
      this._userStates = userStates; // [ [name, callback], ... ]

      this.requestConfig = options;
      this.hooks = _isObjEmpty(hooks) ? [] : [hooks];
      this._cancelToken = null;
      this.availableHooks = Array.from(Object.values(HOOK_NAME));
      this.availableEvents = Array.from(Object.values(PUBLIC_EVENTS)); // initial states assign & register user provided states

      this.resetStates(); // this is useful because the user may be expecting the state to be available before the request begins
    } // expect userStates = [ [name, callback], ... ]


    _createClass(AquaRequest, [{
      key: "_registerUserStates",
      value: function _registerUserStates() {
        if (this._userStates.length === 0) return;
        var mainContext = this;

        var validOnly = function validOnly(i) {
          return Array.isArray(i) || typeof i[0] !== 'undefined' || typeof i[1] === "function";
        };

        Array.from(this._userStates).filter(validOnly).forEach(function (i) {
          var stateName = i[0];
          var stateEvaluator = i[1];
          _hasProperty(mainContext.state, stateName) && delete mainContext.state[stateName];
          Object.defineProperty(mainContext.state, stateName, {
            get: function get() {
              return stateEvaluator(mainContext.state);
            },
            configurable: true
          });
        });
      }
    }, {
      key: "url",
      value: function url(fullUrl) {
        this.requestURL = fullUrl;
        return this;
      }
    }, {
      key: "registerStates",
      value: function registerStates(list) {
        this._userStates = this._userStates.length === 0 ? list : [].concat(_toConsumableArray(this._userStates), _toConsumableArray(list));
        return this;
      }
    }, {
      key: "mergeRequestOptions",
      value: function mergeRequestOptions() {
        var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.requestConfig = Object.assign({}, merge$1(this.requestConfig, userOptions));
        return this;
      } // always overwrite all hooks callbacks

    }, {
      key: "setRequestHooks",
      value: function setRequestHooks() {
        var userHooks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.hooks = [Object.assign({}, userHooks)];
        return this;
      }
    }, {
      key: "mergeRequestHooks",
      value: function mergeRequestHooks() {
        var userHooks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.hooks = [].concat(_toConsumableArray(this.hooks), [userHooks]);
        return this;
      }
    }, {
      key: "submit",
      value: function submit() {
        var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Method.GET;
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var _config$options = config.options,
            options = _config$options === void 0 ? {} : _config$options,
            _config$hooks = config.hooks,
            hooks = _config$hooks === void 0 ? {} : _config$hooks;
        /**PRE-HOOK SETUP STAGE */

        this.resetStates(); // cancel token inject if not provided

        var injected = _injectCancelSignal(options);

        this._cancelToken = injected.abortControllerInstance; // last moment config & hooks

        var finalRqstConfig = Object.assign({}, merge$1(this.requestConfig, injected.options));
        var finalHooks = _isObjEmpty(hooks) ? _toConsumableArray(this.hooks) : [].concat(_toConsumableArray(this.hooks), [hooks]);
        var HookHub$1 = new HookHub(this);

        var composedConfig = _composeConfig(HookHub$1, this.requestURL, method, payload, finalRqstConfig); // compose the final config


        HookHub$1.registerInternalHooks();
        HookHub$1.registerUserHooks(finalHooks);
        /**REALM OF HOOKS BEGIN */

        HookHub$1.run(HOOK_NAME.BEFORE, composedConfig); // XHR BEGIN

        NetworkRequest(HookHub$1, composedConfig);
      }
    }, {
      key: "get",
      value: function get() {
        var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          options: {},
          hooks: {}
        };
        return this.submit(Method.GET, payload, config);
      }
    }, {
      key: "post",
      value: function post() {
        var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          options: {},
          hooks: {}
        };
        return this.submit(Method.POST, payload, config);
      }
    }, {
      key: "cancel",
      value: function cancel() {
        if (this.state.busy && this._cancelToken) {
          this._cancelToken.abort();

          this._cancelToken = null;
        }
      }
    }, {
      key: "resetStates",
      value: function resetStates() {
        this.state = Object.assign({}, STATE);

        this._registerUserStates();
      }
    }]);

    return AquaRequest;
  }();

  exports.AquaRequest = AquaRequest;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
