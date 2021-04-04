import axios from 'axios'
import { find, head, sample } from 'lodash'
import smartSearch from 'smart-search'
import kaamelottSounds from '../sounds/sounds/sounds.json'

export const aknowledgeInteraction = ({id, token}, content) =>
  axios.post(`https://discord.com/api/v8/interactions/${id}/${token}/callback`, {
    type: 4,
    data: {
      content
    }
  })

export const normalizeInput = (input) =>
  input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const searchSoundFromInput = (input) =>
  head(smartSearch(kaamelottSounds, [input], {file: true, title: true})).entry

export const findSoundFromInput = (input) => {
  if (!input) {
    return sample(kaamelottSounds)
  }

  const fileFromInput = find(kaamelottSounds, sound => sound.file === `${input}.mp3`)
  if (fileFromInput) {
    return fileFromInput
  }

  return searchSoundFromInput(input)
}
