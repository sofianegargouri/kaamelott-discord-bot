import Discord from 'discord.js'
import dotenv from 'dotenv'
import KaamelottHandler from './handlers/kaamelott-handler'

const client = new Discord.Client()

dotenv.config()

client.on('ready', () =>
  client.user.setActivity('Kaamelott', {type: 'WATCHING'}))

client.on('message', message => 
  message.content.startsWith('!kaamelott') && new KaamelottHandler({ message }))

client.login(process.env.DISCORD_TOKEN)
