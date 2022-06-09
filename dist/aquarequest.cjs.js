'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var merge = require('lodash/fp/merge');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

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
      _defineProperty(target, key, source[key]);
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

function _defineProperty(obj, key, value) {
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

function NetworkRequest (HookHub, options) {
  HookHub.run(HOOK_NAME.START, options);
  axios__default["default"](options).then(function (response) {
    HookHub.run(HOOK_NAME.STATUS_CODE, response.status);
    HookHub.run(HOOK_NAME.SUCCESS, response);
  }).catch(function (error) {
    if (axios__default["default"].isCancel(error)) {
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

  return merge__default["default"](defaultOptions, userOptions);
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
      this.requestConfig = Object.assign({}, merge__default["default"](this.requestConfig, userOptions));
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

      var finalRqstConfig = Object.assign({}, merge__default["default"](this.requestConfig, injected.options));
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
