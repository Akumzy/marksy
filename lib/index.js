"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marksy = marksy;
exports["default"] = _default;

var _marked = _interopRequireDefault(require("marked"));

var _createRenderer = _interopRequireWildcard(require("./createRenderer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function marksy() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    renderer: {},
    tokenizer: {}
  };

  _marked["default"].use({
    tokenizer: options.tokenizer
  });

  var tracker = {
    tree: null,
    elements: null,
    nextElementId: null,
    toc: null,
    currentIdLevel: 0,
    currentId: []
  };
  var renderer = (0, _createRenderer["default"])(tracker, options, _objectSpread({
    code: function code(_code, language) {
      if (language === 'marksy') {
        try {
          // eslint-disable-next-line no-plusplus
          var elementId = tracker.nextElementId++;
          var components = Object.keys(options.components).map(function (key) {
            return options.components[key];
          });

          var mockedReact = function mockedReact(tag) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var componentProps = components.indexOf(tag) >= 0 ? Object.assign(props || {}, {
              // eslint-disable-next-line no-plusplus
              key: tracker.nextElementId++,
              context: tracker.context
            }) : props;

            for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              children[_key - 2] = arguments[_key];
            }

            return options.createElement(tag, componentProps, children);
          };

          tracker.elements[elementId] = // eslint-disable-next-line no-new-func
          _construct(Function, ['h'].concat(_toConsumableArray(Object.keys(options.components)), ["return ".concat(_code)])).apply(void 0, [mockedReact].concat(_toConsumableArray(components))) || null;
          tracker.tree.push(tracker.elements[elementId]);
          return "{{".concat(elementId, "}}");
        } catch (e) {//
        }

        return null;
      }

      return (0, _createRenderer.codeRenderer)(tracker, options)(_code, language);
    }
  }, options.renderer));
  return function compile(content) {
    var markedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    tracker.tree = [];
    tracker.elements = {};
    tracker.toc = [];
    tracker.nextElementId = 0;
    tracker.context = context;
    tracker.currentId = [];
    (0, _marked["default"])(content, _objectSpread({
      renderer: renderer,
      smartypants: true
    }, markedOptions));
    return {
      tree: tracker.tree,
      toc: tracker.toc
    };
  };
}

function _default(options) {
  return marksy(options);
}
//# sourceMappingURL=index.js.map