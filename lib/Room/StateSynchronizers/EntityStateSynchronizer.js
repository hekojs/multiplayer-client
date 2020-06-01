"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntityStateSynchronizer = /*#__PURE__*/function () {
  function EntityStateSynchronizer(_ref) {
    var room = _ref.room,
        world = _ref.world;

    _classCallCheck(this, EntityStateSynchronizer);

    this.room = room;
    this.world = world;
    this.listenEvents();
  }

  _createClass(EntityStateSynchronizer, [{
    key: "listenEvents",
    value: function listenEvents() {
      var _this = this;

      this.room.onMessage('add.entity', function (_ref2) {
        var builder = _ref2.builder,
            params = _ref2.params,
            id = _ref2.id;

        if (!_this.world.entities.exists(id)) {
          // console.log('add entity', id)
          _this.world.entities.add({
            name: builder
          }, params, id);
        }
      });
      this.room.onMessage('add.entities', function (_ref3) {
        var entities = _ref3.entities;
        entities.forEach(function (_ref4) {
          var builder = _ref4.builder,
              params = _ref4.params,
              id = _ref4.id;

          if (!_this.world.entities.exists(id)) {
            // console.log('add entities', id)
            _this.world.entities.add({
              name: builder
            }, params, id);
          }
        });
      });
      this.room.onMessage('remove.entity', function (_ref5) {
        var id = _ref5.id;

        if (_this.world.entities.exists(id)) {
          // console.log('remove entity', id)
          _this.world.entities.remove(id);
        }
      });
    }
  }]);

  return EntityStateSynchronizer;
}();

exports["default"] = EntityStateSynchronizer;