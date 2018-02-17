import path from 'path'
import RootHandler from './root-handler'

import kaamelottSounds from '../sounds/sounds.json'

export default class KaamelottHandler extends RootHandler {
  constructor(props) {
    super(props)

    this.dispatcher()
  }

  dispatcher() {
    switch(this.message.splitContent[1]) {
      case 'help':
        return this.helpHandler()
      case 'random':
        return this.randomHandler()
      default:
        return this.soundHandler()
    }
  }

  helpHandler() {
    this.message.channel.send(`
Liste des sons: https://github.com/sofianegargouri/kaamelott-discord-bot/tree/master/src/sounds

\`!kaamelott <son>\`: Jouer un son (ne pas mettre le .mp3)
    `)
  }

  randomHandler() {
    this.playSound(kaamelottSounds[Math.floor(Math.random()*kaamelottSounds.length)].file)
  }

  soundHandler() {
    this.playSound(`${this.message.splitContent[1]}.mp3`)
    
  }

  playSound(sound) {
    const { voiceChannel } = this.message.member
    voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile(path.resolve(`src/sounds/${sound}`))
        dispatcher.on('end', () => voiceChannel.leave())
      })
  }
}
