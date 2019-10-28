import {SociComponent, html} from './soci-component.js'

export default class SociTagGroup extends SociComponent {
  constructor() {
    super()
  }
  css(){
    return `
      :host {
        --height: 20px;
        --tag-font-size: 10px;
        display: flex;
        line-height: var(--height);
        align-items: center;
        position: relative;
      }
      :host #tags {
        overflow: hidden;
        overflow-x: auto;
        height: var(--height);
        line-height: 16px;
        border-radius: calc(var(--height) / 2);
        scrollbar-width: none;
      }
      :host::-webkit-scrollbar {
        display: none;
      }
      :host #score {
        white-space: nowrap;
        display: block;
      }
      :host #score span {
        margin-left: 4px;
      }
      :host #add-tag {
        background: var(--n1);
        height: var(--height);
        width: 32px;
        min-width: 32px;
        border-radius: calc(var(--height) / 2);
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--n4);
        margin-left: 4px;
        cursor: pointer;
      }
      :host #add-tag:hover {
        background: var(--n2);
      }
      :host #arrow {
        color: var(--n2);
        padding: 0 8px;
      }

      :host([size="large"]) {
        --height: 24px;
        --tag-font-size: 14px;
      }

      :host([size="large"]) #score {
        font-size: 24px;
      }

      :host soci-user {
        --font-weight: 500;
      }

      ::slotted(soci-tag) {
        height: var(--height);
        line-height: var(--height);
        font-size: var(--tag-font-size);
      }

    `
  }

  static get observedAttributes() {
    return ['score']
  }

  attributeChangedCallback(name, oldValue, newValue){
    if(name == 'score')
      this.select('#score').innerHTML = `▲ ${newValue}`
  }

  _tagVote(e){
    let tag = e.target.closest('soci-tag')
    if(!tag) return 0
    if(tag.hasAttribute('upvoted')){
      if(this.querySelectorAll('soci-tag[upvoted]').length == 1){
        this.score++
      }
    }
    else {
      if(this.querySelectorAll('soci-tag[upvoted]').length == 0){
        this.score--
      }
    }
  }

  render(){
    return html`
      ${this.getCss()}
      <div id="score"></div>
      <svg id="arrow" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.632 13.384L6.288 11.872L10.464 8.056H0.936V5.848H10.464L6.288 2.032L7.632 0.519999L14.232 6.904V7L7.632 13.384Z" fill="currentColor"/>
      </svg>
      <div id="tags" @click=${this._tagVote}><slot></slot></div>
      <div id="add-tag">
        <svg width="16px" height="17px" viewBox="0 0 24 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="icon/tags" transform="translate(-4.000000, -5.000000)">
                <g>
                    <path d="M11.557416,6.29956503 C11.1595912,6.29956503 10.7780604,6.45760029 10.4967558,6.73890486 L6.49675579,10.7389049 C5.91096935,11.3246913 5.91096935,12.2744388 6.49675579,12.8602252 L10.4967558,16.8602252 C10.7780604,17.1415298 11.1595912,17.299565 11.557416,17.299565 L21.2959045,17.299565 C22.1243317,17.299565 22.7959045,16.6279922 22.7959045,15.799565 L22.7959045,7.79956503 C22.7959045,6.9711379 22.1243317,6.29956503 21.2959045,6.29956503 L11.557416,6.29956503 Z" id="Rectangle" stroke="#7B9089" transform="translate(14.012447, 11.799565) rotate(135.000000) translate(-14.012447, -11.799565) "></path>
                    <path d="M15.9239992,8.86037916 L17.5218753,11.416981 C17.6682305,11.6511493 17.5970439,11.9596245 17.3628756,12.1059797 C17.2834098,12.1556458 17.191586,12.1819805 17.0978762,12.1819805 L13.9021238,12.1819805 C13.6259814,12.1819805 13.4021238,11.9581229 13.4021238,11.6819805 C13.4021238,11.5882707 13.4284585,11.4964468 13.4781247,11.416981 L15.0760008,8.86037916 C15.222356,8.62621089 15.5308312,8.55502431 15.7649995,8.70137948 C15.829384,8.74161983 15.8837588,8.79599459 15.9239992,8.86037916 Z" id="Triangle" stroke="#7B9089" transform="translate(15.500000, 10.181981) rotate(45.000000) translate(-15.500000, -10.181981) "></path>
                    <rect id="Rectangle" fill="#7B9089" x="23" y="13" width="5" height="1" rx="0.5"></rect>
                    <rect id="Rectangle" fill="#7B9089" transform="translate(25.500000, 13.500000) rotate(-270.000000) translate(-25.500000, -13.500000) " x="23" y="13" width="5" height="1" rx="0.5"></rect>
                </g>
            </g>
        </g>
        </svg>
      </div>
    `
  }
}