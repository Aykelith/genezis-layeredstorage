"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.map");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayeredStorage2 = exports.UseFailSafeLayerError = exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

var _deleteOnProduction = _interopRequireDefault(require("@genezis/genezis/utils/deleteOnProduction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConstructorGenezisCheckerConfig = (0, _deleteOnProduction["default"])({
  layers: _Checker["default"].array({
    of: _Checker["default"]["function"]()
  }).required(),
  settings: _Checker["default"].object({
    shape: {
      returnNullIfNotFound: _Checker["default"]["boolean"](),
      populateMethods: _Checker["default"].array({
        of: _Checker["default"]["function"]()
      })
    }
  })
});

var LayeredStorage =
/*#__PURE__*/
function () {
  function LayeredStorage(data) {
    _classCallCheck(this, LayeredStorage);

    (0, _Checker["default"])(data, ConstructorGenezisCheckerConfig);
    this.layers = data.layers;
    this.settings = data.settings || {};
    this.get = this.get.bind(this);
    this.populateLayers = this.populateLayers.bind(this);
  }

  _createClass(LayeredStorage, [{
    key: "get",
    value: function get(key) {
      var i,
          length,
          _this$layers,
          v,
          _args = arguments;

      return regeneratorRuntime.async(function get$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(key == null)) {
                _context.next = 2;
                break;
              }

              throw new Error();

            case 2:
              i = 0;
              length = this.layers.length;

            case 4:
              if (!(i < length)) {
                _context.next = 13;
                break;
              }

              _context.next = 7;
              return regeneratorRuntime.awrap((_this$layers = this.layers)[i].apply(_this$layers, _args));

            case 7:
              v = _context.sent;

              if (!(v !== undefined)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", v);

            case 10:
              ++i;
              _context.next = 4;
              break;

            case 13:
              if (this.settings.returnNullIfNotFound) {
                Promise.resolve(null);
              } else {
                Promise.reject("Not found the value in any layer");
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "populateLayers",
    value: function populateLayers() {
      var j,
          _this$settings$popula,
          _args2 = arguments;

      return regeneratorRuntime.async(function populateLayers$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (i != 0 && this.settings.populateIfNotFound) {
                for (j = 0; j < i; ++j) {
                  (_this$settings$popula = this.settings.populateMethods)[j].apply(_this$settings$popula, _args2);
                }
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return LayeredStorage;
}(); //= V2 =================================================================================================================


exports["default"] = LayeredStorage;

var UseFailSafeLayerError =
/*#__PURE__*/
function (_Error) {
  _inherits(UseFailSafeLayerError, _Error);

  function UseFailSafeLayerError() {
    var _this;

    _classCallCheck(this, UseFailSafeLayerError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UseFailSafeLayerError).call(this, ""));
    _this.name = _this.constructor.name;
    Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    return _this;
  }

  return UseFailSafeLayerError;
}(_wrapNativeSuper(Error));

exports.UseFailSafeLayerError = UseFailSafeLayerError;
var ConstructorGenezisCheckerConfig2 = (0, _deleteOnProduction["default"])({
  main_layer: _Checker["default"]["function"]().required(),
  fail_safe_layer: _Checker["default"]["function"]().required()
});

var LayeredStorage2 =
/*#__PURE__*/
function () {
  function LayeredStorage2(data) {
    _classCallCheck(this, LayeredStorage2);

    (0, _Checker["default"])(data, ConstructorGenezisCheckerConfig2);
    this.data = data;
    this.get = this.get.bind(this);
  }

  _createClass(LayeredStorage2, [{
    key: "get",
    value: function get() {
      var _this$data,
          _this$data2,
          _args3 = arguments;

      return regeneratorRuntime.async(function get$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap((_this$data = this.data).main_layer.apply(_this$data, _args3));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);

              if (!(_context3.t0 instanceof UseFailSafeLayerError)) {
                _context3.next = 12;
                break;
              }

              _context3.next = 11;
              return regeneratorRuntime.awrap((_this$data2 = this.data).fail_safe_layer.apply(_this$data2, _args3));

            case 11:
              return _context3.abrupt("return", _context3.sent);

            case 12:
              throw _context3.t0;

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 6]]);
    }
  }]);

  return LayeredStorage2;
}();

exports.LayeredStorage2 = LayeredStorage2;