import Heko from '@hekojs/core'
import _ from 'lodash'

export default class ComponentStateSynchronizer {
  constructor ({room, world}) {
    this.room = room
    this.world = world

    this.listenEvents()
  }

  listenEvents() {
    this.room.state.components.onAdd = name => {
      this.room.state[name].onAdd = component => this.addComponent(name, component)
      this.room.state[name].onRemove = component => this.removeComponent(name, component)
      this.room.state[name].onChange = component => this.changeComponent(name, component)
    }
  }

  addComponent(name, data) {
    if(typeof data._entityId !== 'undefined') {
      const entity = this.world.entities.get(data._entityId)
      if (typeof entity !== 'undefined') {
        if (!entity.hasComponent(Heko.ComponentManager.registered[name])) {
          // console.log('Add component', name, 'to entity', entity.id)
          entity.addComponent(
            Heko.ComponentManager.registered[name],
            _.pick(data, Object.keys(Heko.ComponentManager.registered[name].multiplayerSchema || {}))
          )
        }
      }
    }
  }

  removeComponent(name, data) {
    if(typeof data._entityId !== 'undefined') {
      const entity = this.world.entities.get(data._entityId)
      if(typeof entity !== 'undefined') {
        if(entity.hasComponent(Heko.ComponentManager.registered[name])) {
          // console.log('Remove component', name, 'from entity', entity.id)
          entity.removeComponent(Heko.ComponentManager.registered[name])
        }
      }
    }
  }

  changeComponent(name, data) {
    if(typeof data._entityId !== 'undefined') {
      const entity = this.world.entities.get(data._entityId)
      if (typeof entity !== 'undefined') {
        const component = entity.getComponent(Heko.ComponentManager.registered[name])
        const attributes = _.pick(data, Object.keys(component.constructor.multiplayerSchema || {}))
        this._updateComponentAttributes(component, attributes)
      }
    }
  }

  _updateComponentAttributes(component, attributes) {
    if('onMultiplayerServerUpdate' in component) {
      attributes = component.onMultiplayerServerUpdate(attributes)
    }

    for (let name in attributes) {
      component[name] = attributes[name]
    }
  }
}