import SociComponent from './soci-component.js'

export default class SociUser extends SociComponent {
  constructor() {
    super()
  }

  css(){
    return `
      :host {
        display: inline-flex;
        color: var(--n4);
        cursor: pointer;
        --font-size: 12px;
        --font-weight: 300;
        --avatar-size: 16px;
        --line-height: 16px;
      }

      #avatar {
        width: var(--avatar-size);
        height: var(--avatar-size);
        border-radius: 50%;
        background: var(--n2);
        object-fit: cover;
      }

      username {
        font-size: var(--font-size);
        font-weight: var(--font-weight);
        line-height: var(--line-height);
        letter-spacing: -0.16px;
        margin-left: 4px;
        user-select: none;
        color: inherit;
        display: block;
      }

      :host([op]) {
        color: var(--b1);
        font-weight: 700;
      }

      :host([admin]) {
        color: var(--r1);
        font-weight: 900;
      }

      :host([size="small"]) {
        --avatar-size: 20px;
        --font-size: 12px;
        --font-weight: normal;
        --line-height: 18px;
      }

      :host([size="small"]) username {
        margin-left: 6px;
      }

      :host([size="large"]) {
        --avatar-size: 24px;
        --font-size: 16px;
        --font-weight: bold;
        --line-height: 24px;
      }
      :host([size="large"]) #avatar {
        margin-right: 8px;
      }
      :host([size="x-large"]) #avatar {
        --avatar-size: 120px;
        margin-right: 18px;
      }
      :host([size="x-large"]) {
        --font-size: 48px;
        --font-weight: 600;
        --line-height: 84px;
      }

      :host([avatar-only]) username {
        display: none;
      }
    `
  }

  html(){ return `
    <img id="avatar"></img>
    <username></username>
  `}

  connectedCallback(){
    document.addEventListener('username-updated', this._updateUser.bind(this))
  }

  static get observedAttributes() {
    return ['name', 'op', 'self']
  }

  attributeChangedCallback(name, oldValue, newValue){
    switch(name) {
      case 'name':
        this.select('username').innerHTML = newValue
        this.select('#avatar').src = '/example-data/profile.jpg'
        break
      case 'self':
        this._updateUser()
        break
    }
  }

  _updateUser(){
    let username = soci.username
    this.setAttribute('name', username)
  }
}
