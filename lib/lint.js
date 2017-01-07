'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  psd: {
    typeOf: 'string',
    satisfy: function satisfy(val) {
      return _fs2.default.existsSync(val);
    }
  },
  src: {
    coerce: function coerce(val) {
      return [].concat(val);
    }
  }
};