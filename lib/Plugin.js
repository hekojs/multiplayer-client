"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Multiplayer = /*#__PURE__*/function () {
  function Multiplayer() {
    _classCallCheck(this, Multiplayer);

    this.events = new _events["default"]();
  }

  _createClass(Multiplayer, [{
    key: "getRoom",
    value: function getRoom() {
      return this.room;
    }
  }, {
    key: "isClient",
    value: function isClient() {
      return true;
    }
  }, {
    key: "isServer",
    value: function isServer() {
      return false;
    }
  }, {
    key: "setJoined",
    value: function setJoined(room) {
      this.room = room;
      this.events.emit('joined', room);
    }
  }, {
    key: "onJoin",
    value: function onJoin(callback) {
      this.events.on('joined', callback);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(name, message) {
      this.getRoom().send(name, message);
    }
  }, {
    key: "onMessage",
    value: function onMessage(name, callback) {
      this.getRoom().onMessage(name, callback);
    }
  }]);

  return Multiplayer;
}();

exports["default"] = Multiplayer;