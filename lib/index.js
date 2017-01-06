'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _psd = require('psd');

var _psd2 = _interopRequireDefault(_psd);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _pngjs = require('pngjs');

var _pngjs2 = _interopRequireDefault(_pngjs);

var _checkin2 = require('checkin');

var _checkin3 = _interopRequireDefault(_checkin2);

var _lint = require('./lint');

var _lint2 = _interopRequireDefault(_lint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function process(option) {
  var _checkin = (0, _checkin3.default)(option, _lint2.default),
      psd = _checkin.psd;

  var src = option.src.splice ? option.src : [option.src];
  var file = _psd2.default.fromFile(psd);

  file.parse();

  var tree = file.tree();
  var nodes = collect(tree, src);

  var data = nodes.map(function (node) {
    var buffer = read(node);
    var name = node.name;

    return (0, _extends3.default)({}, node.layer, {
      name: name,
      buffer: buffer
    });
  });

  return {
    psd: {
      size: {
        width: tree.layer.right,
        height: tree.layer.bottom
      }
    },
    data: data
  };
}

function collect(tree, src) {
  return src.reduce(function (ret, pattern) {
    var descendants = tree.descendants();
    var mm = new _minimatch2.default.Minimatch(pattern);
    var childrens = descendants.filter(function (node) {
      return mm.match(node.name);
    });

    return ret.concat(childrens.filter(function (node) {
      return !node.isGroup() && !node.hidden();
    }));
  }, []);
}

function read(node) {
  var png = node.toPng();
  return _pngjs2.default.PNG.sync.write(png);
}

exports.default = process;