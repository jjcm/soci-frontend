import SociComponent from './soci-component.js'

export default class SociUrlInput extends SociComponent {
  constructor() {
    super()
  }

  css() { return `
    :host {
      display: flex;
      align-items: center;
      position: relative;
      height: 32px;
      min-width: 540px;
      line-height: 28px;
      border: 2px solid var(--n2);
      box-sizing: border-box;
      width: 100%;
      font-size: 14px;
      padding: 0 8px;
      border-radius: 16px;
      transition: none;
    }
    :host([available="true"]) {
      background: var(--g1);
      border: 2px solid var(--g1);
      color: #fff;
      cursor: pointer;
      transition: all 0.1s ease-in-out, color 0s ease-in-out;
    }
    input {
      cursor: pointer;
      text-decoration: inherit;
      font-weight: bold;
      border: none;
      outline: none;
      padding: 0;
      font-size: 14px;
      width: 100%;
      background: transparent;
      color: inherit;
    }
    input::placeholder {
      font-weight: normal;
      text-transform: none;
      opacity: 0.5;
      font-size: 14px;
    }
    :host([available="false"]) {
      border: 2px solid var(--r3);
    }
    soci-icon {
      pointer-events: none;
      position: absolute;
      right: 2px;
    }
    :host([available="false"]) soci-icon {
      color: var(--r3);
    }
    error {
      position: absolute;
      left: 2px;
      bottom: -20px;
      color: var(--r3);
      height: 20px;
      font-size: 12px;
    }
    label {
      cursor: inherit;
    }
  `}

  html() { return `
    <label for="path">http://non.io/</label>
    <input id="path" type="text" placeholder="post-url" spellcheck="false"/>
    <soci-icon></soci-icon>
    <error></error>
  `}

  connectedCallback() {
    this._input = this.select('input')
    this._statusIcon = this.select('soci-icon')
    this._input.addEventListener('keydown', this.onKeyDown.bind(this))
    this._keyDownTimer = null
    this._error = null
  }

  onKeyDown() {
    this.removeAttribute('available')
    this._statusIcon.glyph = ''
    clearTimeout(this._keyDownTimer)
    setTimeout(()=>{
      if(!this._input.value.match(/^[a-zA-Z0-9\-\._]*$/)){
        this._error = true
        this.setURLError('URL can only contain alphanumerics, periods, dashes, and underscores')
      }
      else if(this._input.value == '') {
        this._error = true
        this.setURLError("URL can't be empty")
      }
      else {
        this._error = false
        this.select('error').innerHTML = ''
        this._keyDownTimer = setTimeout(()=>{
          this._keyDownTimer = null
          this.checkURL()
        }, 500)
      }
    },1)
  }

  setURLError(message) {
    this._statusIcon.glyph = 'error'
    this.setAttribute('available', false)
    this.select('error').innerHTML = message
  }

  async checkURL(){
    this._statusIcon.glyph = 'spinner'

    let url = this._input.value
    let available = await soci.getData(`posts/url-is-available/${url}`)
    if(this._keyDownTimer || this._error) return 0
    if(available === true){
      this._statusIcon.glyph = 'success'
      this.setAttribute('available', true)
    }
    else {
      let message = ''
      if(available.error){
        message = available.error
      }
      else {
        message = 'URL is not available. Please choose a better one for your dumb meme.'
      }
      this.setURLError(message)
    }

  }
}