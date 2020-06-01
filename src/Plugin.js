import Events from 'events'

export default class Multiplayer {
  constructor () {
    this.events = new Events
  }

  getRoom () {
    return this.room
  }

  isClient () {
    return true
  }

  isServer () {
    return false
  }

  setJoined(room) {
    this.room = room
    this.events.emit('joined', room)
  }

  onJoin(callback) {
    this.events.on('joined', callback)
  }

  sendMessage (name, message) {
    this.getRoom().send(name, message)
  }

  onMessage (name, callback) {
    this.getRoom().onMessage(name, callback)
  }
}