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
      case undefined:
        return this.randomHandler()
      default:
        return this.soundHandler()
    }
  }

  helpHandler() {
    this.message.channel.send(`
Liste des sons: https://github.com/sofianegargouri/kaamelott-discord-bot/tree/master/src/sounds

\`!kaamelott <son>\`: Jouer un son (ne pas mettre le .mp3)
\`!kaamelott random\`: Jouer un son aléatoire
    `)
  }

  randomHandler() {
    const sound = kaamelottSounds[Math.floor(Math.random()*kaamelottSounds.length)].file
    this.playSound(sound)
    this.message.channel.send(`Joue **${sound}**`)
  }

  soundHandler() {
    if (isNaN(this.message.splitContent[1])) {
      if (kaamelottSounds.some(sound => sound.file === `${this.message.splitContent[1]}.mp3`)) {
        this.playSound(`${this.message.splitContent[1]}.mp3`);
      } else {
        this.searchSound();
      }
    } else {
      const sound = kaamelottSounds[parseInt(this.message.splitContent[1])]
      if (sound) {
        this.playSound(sound.file)
      } else {
        this.message.channel.send('Not an existing sound')
      }
    }
  }

  normalize(string) {
    return string.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
  }

  searchSound() {
    const [command, ...searchWords] = this.message.splitContent;
    const found = kaamelottSounds.some(sound => {
      if (this.normalize(sound.title).indexOf(this.normalize(searchWords.join(' '))) !== -1) {
        this.playSound(sound.file)
        return true;
      }
    })

    if (!found) {
      this.message.channel.send('Not an existing sound')
    }
  }

  playSound(sound) {
    const { voice: {channel} } = this.message.member
    if (channel) {
      channel.join()
        .then(connection => {
          const dispatcher = connection.play(`src/sounds/${sound}`)
          dispatcher.on('finish', () => channel.leave())
        })
    } else {
      this.message.channel.send('You must be in a vocal channel first')
    }
  }
}
