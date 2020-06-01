"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ComponentStateSynchronizer = /*#__PURE__*/function () {
  function ComponentStateSynchronizer(_ref) {
    var room = _ref.room,
        world = _ref.world;

    _classCallCheck(this, ComponentStateSynchronizer);

    this.room = room;
    this.world = world;
    this.listenEvents();
  }

  _createClass(ComponentStateSynchronizer, [{
    key: "listenEvents",
    value: function listenEvents() {
      var _this = this;

      this.room.state.components.onAdd = function (name) {
        _this.room.state[name].onAdd = function (component) {
          return _this.addComponent(name, component);
        };

        _this.room.state[name].onRemove = function (component) {
          return _this.removeComponent(name, component);
        };

        _this.room.state[name].onChange = function (component) {
          return _this.changeComponent(name, component);
        };
      };
    }
  }, {
    key: "addComponent",
    value: function addComponent(name, data) {
      if (typeof data._entityId !== 'undefined') {
        var entity = this.world.entities.get(data._entityId);

        if (typeof entity !== 'undefined') {
          if (!entity.hasComponent(_core["default"].ComponentManager.registered[name])) {
            // console.log('Add component', name, 'to entity', entity.id)
            entity.addComponent(_core["default"].ComponentManager.registered[name], _lodash["default"].pick(data, Object.keys(_core["default"].ComponentManager.registered[name].multiplayerSchema || {})));
          }
        }
      }
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(name, data) {
      if (typeof data._entityId !== 'undefined') {
        var entity = this.world.entities.get(data._entityId);

        if (typeof entity !== 'undefined') {
          if (entity.hasComponent(_core["default"].ComponentManager.registered[name])) {
            // console.log('Remove component', name, 'from entity', entity.id)
            entity.removeComponent(_core["default"].ComponentManager.registered[name]);
          }
        }
      }
    }
  }, {
    key: "changeComponent",
    value: function changeComponent(name, data) {
      if (typeof data._entityId !== 'undefined') {
        var entity = this.world.entities.get(data._entityId);

        if (typeof entity !== 'undefined') {
          var component = entity.getComponent(_core["default"].ComponentManager.registered[name]);

          var attributes = _lodash["default"].pick(data, Object.keys(component.constructor.multiplayerSchema || {}));

          this._updateComponentAttributes(component, attributes);
        }
      }
    }
  }, {
    key: "_updateComponentAttributes",
    value: function _updateComponentAttributes(component, attributes) {
      if ('onMultiplayerServerUpdate' in component) {
        attributes = component.onMultiplayerServerUpdate(attributes);
      }

      for (var name in attributes) {
        component[name] = attributes[name];
      }
    }
  }]);

  return ComponentStateSynchronizer;
}();

exports["default"] = ComponentStateSynchronizer;