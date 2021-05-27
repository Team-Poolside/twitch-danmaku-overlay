import { html, render, Component } from 'https://unpkg.com/htm/preact/index.mjs?module'
import './vendor/tmi.js'

const params = new URLSearchParams(window.location.search)

class Plugin extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.client = new tmi.Client({
      channels: [this.props.channel]
    })
    this.client.connect()
    this.client.on('message', (channel, tags, message, self) => {
      // console.log(tags.emotes, message)
      const { messages } = this.state

      !message.startsWith('!') && messages.push({
        color: tags.color || '#ffffff',
        position: Math.random() * (this.props.bottom - this.props.top) + this.props.top,
        duration: Math.random() * (this.props.maxDuration -this.props.minDuration) + this.props.minDuration,
        message,
        emotes: tags.emotes,
      })
      this.setState({ messages })
    })
  }

  render() {
    const messages = this.state.messages.map(
      msg => {
        const { message } = msg;
        const replacements = [];
        for (const id in msg.emotes) {
          for (const index of msg.emotes[id]) {
            const [first, last] = index.split('-')
            replacements.push({
              substring: message.substring(parseInt(first, 10), parseInt(last, 10) + 1),
              replacement: `<img src="http://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0" />`
            })
          }
        }
        const fullMessage = replacements.reduce(
          (acc, { substring, replacement }) => acc.split(substring).join(replacement),
          message
        )
        return html`<div
                      class="bullet"
                      style="color: ${msg.color};animation: bullet ${msg.duration}s linear;position: absolute;top: ${msg.position}%;"
                      dangerouslySetInnerHTML=${{ __html: fullMessage}} />`
      }
    )

    return html`
        <div class="bullet-container">
          ${messages}
        </div>
      `
  }
}

render(
  html`
    <${Plugin}
      channel=${params.get('channel')}
      minDuration=${parseInt(params.get('minDuration')) || 5}
      maxDuration=${parseInt(params.get('maxDuration')) || 10}
      top=${parseInt(params.get('top')) || 0}
      bottom=${parseInt(params.get('bottom')) || 95} />
  `,
  document.querySelector("#root")
);