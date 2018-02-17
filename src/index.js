import Discord from 'discord.js'
import dotenv from 'dotenv'
import KaamelotHandler from './handlers/kaamelot-handler'

const client = new Discord.Client()

dotenv.config()

client.on('ready', () =>
  client.user.setActivity('Kaamelot', {type: 'WATCHING'}))

client.on('message', message => 
  message.content.startsWith('!kaamelot') && new KaamelotHandler({ message }))

client.login(process.env.DISCORD_TOKEN)
