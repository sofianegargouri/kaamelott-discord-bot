export default class RootHandler {
  constructor(props) {
    this.message = props.message
    this.message.splitContent = this.message.content.trim().replace(/  +/g, ' ').split(' ')
    this.message.authorTag = `${this.message.author.username}#${this.message.author.discriminator}`
  }
}
