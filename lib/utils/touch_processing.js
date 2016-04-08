"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require("lodash/core");

function checkMove(st, end, sen) {
  if (Math.abs(st - end) < sen) return false;

  return st > end ? 1 : 2;
}

function getXY(touch) {
  return [touch.pageX, touch.pageY];
}

function getDir(dir1, dir2) {

  return function (result) {
    if (result === 1) return dir1;
    if (result === 2) return dir2;
    return "";
  };
}

module.exports = function (touches) {
  var sensitivity = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

  var start = _.first(touches);

  var _getXY = getXY(start);

  var _getXY2 = _slicedToArray(_getXY, 2);

  var startX = _getXY2[0];
  var startY = _getXY2[1];


  var upDown = getDir("up", "down");
  var leftRight = getDir("right", "left");
  var move = void 0;
  return {
    addMove: function addMove(touches) {
      move = _.first(touches);
    },
    getDirection: function getDirection() {
      var _getXY3 = getXY(move);

      var _getXY4 = _slicedToArray(_getXY3, 2);

      var endX = _getXY4[0];
      var endY = _getXY4[1];

      var moveX = leftRight(checkMove(startX, endX, sensitivity));
      var moveY = upDown(checkMove(startY, endY, sensitivity));

      return {
        moveX: moveX,
        moveY: moveY
      };
    }
  };
};
//# sourceMappingURL=touch_processing.js.map