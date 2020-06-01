import ComponentStateSynchronizer from './Room/StateSynchronizers/ComponentStateSynchronizer'
import EntityStateSynchronizer from './Room/StateSynchronizers/EntityStateSynchronizer'
import * as Colyseus from 'colyseus.js'
import Plugin from './Plugin'

export default {
  Plugin,
  connect(uri) {
    return new Colyseus.Client(uri)
  },
  inject: (world, room) => {
    // Add the current room to the plugin
    world.plugins.get(Plugin).setJoined(room)

    // Configure the state of the room
    const components = new ComponentStateSynchronizer({ room, world })
    const entities = new EntityStateSynchronizer({ room, world })
  }
}