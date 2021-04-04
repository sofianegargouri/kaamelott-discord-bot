import Discord from 'discord.js'
import dotenv from 'dotenv'
import { get, includes } from 'lodash'
import { aknowledgeInteraction, findSoundFromInput } from './helpers'

const client = new Discord.Client()
client.commands = new Discord.Collection()

let watching = true

dotenv.config()

client.once('ready', () => {
  client.commands.set('kaamelott')
  client.commands.set('kmlt')
  setInterval(() => {
    if (watching) {
      client.user.setActivity('Kaamelott', {type: 'WATCHING'})
    } else {
      client.user.setActivity('/kmlt help', {type: 'PLAYING'})
    }
    watching = !watching
  }, 5000)
})

client.ws.on('INTERACTION_CREATE', (interaction) => {
  try {
    const command = get(interaction, 'data.name')

    const guild = client.guilds.cache.get(get(interaction, 'guild_id'))
    if (!guild) { return }

    const member = guild.members.cache.get(get(interaction, 'member.user.id'))
    if (!member) { return }

    if (includes(['kaamelott', 'kmlt'], command)) {
      const sound = findSoundFromInput(get(interaction, 'data.options[0].value', undefined))
      if (!sound) {
        return aknowledgeInteraction(interaction, 'Aucun son trouvé')
      }

      const { voice: {channel} } = member
      if (!channel) {
        return aknowledgeInteraction(interaction, 'Veuillez rejoindre un canal vocal d\'abord')
      }
      channel.join()
        .then(connection => {
          const dispatcher = connection.play(`src/sounds/sounds/${sound.file}`)
          dispatcher.on('finish', () => channel.leave())
        })
      aknowledgeInteraction(interaction, `Son trouvé: **${sound.title}**`)
    }
  } catch(err) {
    // console.error(err)
  }
})

client.login(process.env.DISCORD_TOKEN)
