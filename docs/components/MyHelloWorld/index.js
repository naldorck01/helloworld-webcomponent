class MyHelloWorld extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log('##constructor');
    }

    static get observedAttributes() {
        console.log('##observedAttributes');
        return ['begin-date', 'end-date', 'keywords'];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal;
    }

    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <article>            
                <h5><slot name="title"></slot></h5>
                <slot name="description"></slot>
                <article>
                    <p>Begin date: ${this['begin-date'] ? this['begin-date'] : ''}</p>
                    <p>End date: ${this['end-date'] ? this['end-date'] : ''}</p>
                    <p>Keyword: ${this['keywords'] ? this['keywords'] : ''}</p>
                </article>
            </article>
            ${this.getStyles()}
        `;
        console.log('##getTemplate');
        return template;
    }

    getStyles() {
        console.log('##getStyles');
        return `
            <style>
                h5 {
                    color: white;
                    font-size: 16px;
                    margin: 0;
                }
                :host {
                    ---primary-color: #fb8c00;
                    --secondary-color: #039be5;
                    background-color: #b71c1c;
                    display: block;
                    outline: 1px dotted #004d40;
                }
                :host(.blue) {
                    background-color: var(--secondary-color);
                }
                :host([end-date]) {
                    outline: 1px solid #4a148c;
                }
                :host-context(section.box__container) {
                    background-color: #4a148c;
                }
                :host-context(section.box__container) p{
                    color: #fafafa;
                }
                ::slotted(*) {
                    margin: 0;
                    padding: 0;
                }
                ::slotted(span){
                    font-size: 30px;
                }
                ::slotted(.text--gray){
                    color: #e0e0e0;
                }
            </style>
        `;
    }

    render() {
        console.log('##render');
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
        console.log('##connectedCallback');
    }

    disconnectedCallback() {
        console.log('##disconnectedCallback');
    }
}

customElements.define('my-hello-world', MyHelloWorld);