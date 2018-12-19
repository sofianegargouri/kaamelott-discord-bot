import Discord from 'discord.js'
import dotenv from 'dotenv'
import KaamelottHandler from './handlers/kaamelott-handler'

const client = new Discord.Client()

let watching = true

dotenv.config()

client.on('ready', () => {
  setInterval(() => {
    if (watching) {
      client.user.setActivity('Kaamelott', {type: 'WATCHING'})
    } else {
      client.user.setActivity('!kmlt help', {type: 'PLAYING'})
    }
    watching = !watching
  }, 5000)
})

client.on('message', message =>
  (message.content.startsWith('!kaamelott')
  || message.content.startsWith('!kmlt'))
  && new KaamelottHandler({ message }))

client.login(process.env.DISCORD_TOKEN)
