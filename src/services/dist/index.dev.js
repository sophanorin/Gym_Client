"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = exports.upload = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _ponyfill = require("web-streams-polyfill/ponyfill");

var _streamsaver = _interopRequireDefault(require("streamsaver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var authHeader = function authHeader(_ref) {
  var token = _ref.token,
      appKey = _ref.appKey;
  return {
    headers: {
      Authorization: "Bearer " + token,
      "X-APP-KEY": appKey
    }
  };
};

var URL = "http://localhost:3000/api/v1";

var upload = function upload(files, options) {
  var onUploadProgressCallback,
      path,
      headers,
      body,
      _args = arguments;
  return regeneratorRuntime.async(function upload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          onUploadProgressCallback = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          _context.prev = 1;
          path = "/file/upload";
          headers = authHeader({
            token: process.env.REACT_APP_ACCESS_TOKEN,
            appKey: process.env.REACT_APP_APP_KEY
          });
          body = new FormData();
          Array.from(files).forEach(function (file) {
            body.append("files", file);
          });

          if (options) {
            body.append("keyPrefix", options.keyPrefix);
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(_axios["default"].post(URL + path, body, {
            headers: _objectSpread({}, headers, {
              "Content-Type": "multipart/form-data"
            }),
            onUploadProgress: onUploadProgressCallback
          }));

        case 9:
          return _context.abrupt("return", _context.sent);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            resolve(_context.t0);
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

exports.upload = upload;

var download = function download(url, fileName) {
  return regeneratorRuntime.async(function download$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          fetch(url).then(function (response) {
            if (!window.WritableStream) {
              _streamsaver["default"].WritableStream = _ponyfill.WritableStream;
              window.WritableStream = _ponyfill.WritableStream;
            }

            var fileStream = _streamsaver["default"].createWriteStream(fileName);

            var readableStream = response.body;

            if (readableStream.pipeTo) {
              return readableStream.pipeTo(fileStream);
            }

            window.writer = fileStream.getWriter();
            var reader = response.body.getReader();

            var pump = function pump() {
              return reader.read().then(function (res) {
                return res.done ? writer.close() : writer.write(res.value).then(pump);
              });
            };

            pump();
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.download = download;