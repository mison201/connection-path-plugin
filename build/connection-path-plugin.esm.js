/*!
* rete-connection-path-plugin v0.3.1 
* (c) 2021 Vitaliy Stoliarov 
* Released under the MIT license.
*/
import * as d3 from 'd3-shape';
import { curveBasis, line } from 'd3-shape';

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var PathFactory =
/*#__PURE__*/
function () {
  function PathFactory(points, curve) {
    _classCallCheck(this, PathFactory);

    this.points = points;
    this.curve = curve;
  }

  _createClass(PathFactory, [{
    key: "line",
    value: function line$$1(transformer) {
      var points = transformer(this.points);
      return line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }).curve(this.curve)(points);
    }
  }, {
    key: "getData",
    value: function getData(transformer, options, data) {
      return this.line(transformer(options, data));
    }
  }]);

  return PathFactory;
}();

var Transformer = {
  LINEAR: function LINEAR() {
    return function (_ref) {
      var _ref2 = _slicedToArray(_ref, 4),
          x1 = _ref2[0],
          y1 = _ref2[1],
          x2 = _ref2[2],
          y2 = _ref2[3];

      return [[x1, y1], [x2, y2]];
    };
  },
  DEFAULT: function DEFAULT(_ref3) {
    var _ref3$vertical = _ref3.vertical,
        vertical = _ref3$vertical === void 0 ? false : _ref3$vertical,
        _ref3$curvature = _ref3.curvature,
        curvature = _ref3$curvature === void 0 ? 0.4 : _ref3$curvature;
    return function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 4),
          x1 = _ref5[0],
          y1 = _ref5[1],
          x2 = _ref5[2],
          y2 = _ref5[3];

      var p1 = [x1, y1];
      var p4 = [x2, y2];

      if (vertical) {
        var _ref6 = [y1, x1];
        x1 = _ref6[0];
        y1 = _ref6[1];
        var _ref7 = [y2, x2];
        x2 = _ref7[0];
        y2 = _ref7[1];
      }

      var c1 = x1 + Math.abs(x2 - x1) * curvature;
      var c2 = x2 - Math.abs(x2 - x1) * curvature;
      var p2 = vertical ? [y1, c1] : [c1, y1];
      var p3 = vertical ? [y2, c2] : [c2, y2];
      return [p1, p2, p3, p4];
    };
  },
  VERTICAL_COMBO: function VERTICAL_COMBO(_ref8, data) {
    var _ref8$curvature = _ref8.curvature,
        curvature = _ref8$curvature === void 0 ? 0.4 : _ref8$curvature;
    return function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 4),
          x1 = _ref10[0],
          y1 = _ref10[1],
          x2 = _ref10[2],
          y2 = _ref10[3];

      var p1 = [x1, y1];
      var p4 = [x2, y2];
      var vertical_l = false;
      var vertical_r = false;

      if (data.connection) {
        console.log("data.connection.input :>> ", data.connection.input);
        console.log("data.connection.output :>> ", data.connection.output);

        if (data.connection.input.vertical) {
          vertical_r = true;
        }

        if (data.connection.output.vertical) {
          vertical_l = true;
        }
      }

      if (vertical_l) {
        var _ref11 = [y1, x1];
        x1 = _ref11[0];
        y1 = _ref11[1];
      }

      if (vertical_r) {
        var _ref12 = [y2, x2];
        x2 = _ref12[0];
        y2 = _ref12[1];
      }

      var c1 = x1 + Math.abs(x2 - x1) * curvature;
      var c2 = x2 - Math.abs(x2 - x1) * curvature;
      var p2 = vertical_l ? [y1, c1] : [c1, y1];
      var p3 = vertical_r ? [y2, c2] : [c2, y2];
      return [p1, p2, p3, p4];
    };
  }
};

var Type = {
  DEFAULT: 'DEFAULT',
  LINEAR: 'LINEAR'
};

function getAngle(_ref, _ref2) {
  var x1 = _ref.x,
      y1 = _ref.y;
  var x2 = _ref2.x,
      y2 = _ref2.y;
  var dx = x1 - x2;
  var dy = y1 - y2;
  return 180 * Math.atan2(dy, dx) / Math.PI;
}
function getTransformAlong(path, offset) {
  var delta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var needRotate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var length = path.getTotalLength() * delta;
  var p1 = path.getPointAtLength(length + offset);
  var p2 = path.getPointAtLength(length);
  var angle = 180 + (needRotate ? getAngle(p1, p2) : 0);
  return "translate(".concat(p1.x, ", ").concat(p1.y, ") rotate(").concat(angle, ")");
}

function install(editor, _ref) {
  var type = _ref.type,
      transformer = _ref.transformer,
      arrow = _ref.arrow,
      curve = _ref.curve,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  type = type || Type.DEFAULT;
  curve = curve || curveBasis;
  if (transformer && typeof transformer !== 'function') throw new Error('transformer property must be a function');
  if (!Transformer[type]) throw new Error("transformer with type ".concat(type, " doesn't exist"));
  editor.on('connectionpath', function (data) {
    var factory = new PathFactory(data.points, curve);
    data.d = factory.getData(transformer || Transformer[type], options, data);
  });

  if (arrow) {
    editor.on('renderconnection', function (_ref2) {
      var el = _ref2.el;
      var path = el.querySelector('path');
      var marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      el.querySelector('svg').appendChild(marker);
      marker.classList.add('marker');
      marker.setAttribute('fill', arrow.color || 'steelblue');
      marker.setAttribute('d', arrow.marker || 'M-5,-10 L-5,10 L20,0 z');
      marker.setAttribute('transform', getTransformAlong(path, -25));
    });
    editor.on('updateconnection', function (_ref3) {
      var el = _ref3.el;
      var path = el.querySelector('path');
      var marker = el.querySelector('.marker');
      marker.setAttribute('transform', getTransformAlong(path, -25));
    });
  }
}
var index = _objectSpread({
  install: install
}, d3, Type);

export default index;
export { getTransformAlong };
//# sourceMappingURL=connection-path-plugin.esm.js.map
