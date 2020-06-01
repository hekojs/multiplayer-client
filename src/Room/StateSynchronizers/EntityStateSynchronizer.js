import Heko from '@hekojs/core'

export default class EntityStateSynchronizer {
  constructor ({ room, world }) {
    this.room = room
    this.world = world

    this.listenEvents()
  }

  listenEvents () {
    this.room.onMessage('add.entity', ({ builder, params, id }) => {
      if (!this.world.entities.exists(id)) {
        // console.log('add entity', id)
        this.world.entities.add({ name: builder }, params, id)
      }
    })
    this.room.onMessage('add.entities', ({ entities }) => {
      entities.forEach(({ builder, params, id }) => {
        if (!this.world.entities.exists(id)) {
          // console.log('add entities', id)
          this.world.entities.add({ name: builder }, params, id)
        }
      })
    })
    this.room.onMessage('remove.entity', ({ id }) => {
      if (this.world.entities.exists(id)) {
        // console.log('remove entity', id)
        this.world.entities.remove(id)
      }
    })
  }
}