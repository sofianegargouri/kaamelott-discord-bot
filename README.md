# Kaamelott Discord Bot

![https://github.com/sofianegargouri/kaamelott-discord-bot/actions?query=workflow%3AEslint](https://github.com/sofianegargouri/kaamelott-discord-bot/workflows/Eslint/badge.svg)

Inspired by: https://kaamelott-soundboard.2ec0b4.fr/ / https://github.com/2ec0b4/kaamelott-soundboard

Invite the bot on your server: https://discordapp.com/api/oauth2/authorize?client_id=414216961799487488&permissions=3164160&scope=bot

List of sounds: https://github.com/sofianegargouri/kaamelott-discord-bot/tree/master/src/sounds

## Usage

This bot is triggered by either `!kaamelott` or `!kmlt`

### Asking for help

`!kaamelott help`

### Play a sound

`!kaamelott <sound>`
`!kaamelott random`

## Cloning repo

Be sure to use the --recursive option when cloning to ensure to clone sub modules

git clone --recursive git@github.com:sofianegargouri/kaamelott-discord-bot.git

## Contributing

```
git clone --recursive git@github.com:sofianegargouri/kaamelott-discord-bot.git
cd kaamelott-discord-bot
yarn
echo "DISCORD_TOKEN=<YOUR DISCORD API BOT TOKEN>" > .env
yarn start
```
