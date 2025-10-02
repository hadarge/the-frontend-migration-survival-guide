import style from './component1.css?inline';

type NullableString = string | null;
const TagName = 'my-element';

export class MyElement extends HTMLElement {

    static get observedAttributes(): string[] {
        return ['name'];
    }

    root: ShadowRoot | HTMLElement = this;
    name: NullableString = null;
    clickCount = 0;
    _onClick?: ((times: number) => void);

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(attrName: string, oldVal: NullableString, newVal: NullableString): void {
        if (attrName === 'name' && oldVal !== newVal) {
            this.name = newVal;
            this.render();
        }
    }

    set customOnClick(fn: ((times: number) => void)) {
        this._onClick = fn;
        this.render();
    }

    render(): void {
        this.root.innerHTML = `
                      <style>${style}</style>
                      <p>Hello from &lt;${TagName}&gt;!</p>
                       ${this.name ? `<p>name : ${this.name}</p>` : ''}
                      <p id="clickTarget">onClick : ${this._onClick ? '🟢' : '🔴'}</p>
        `;

        this.root.querySelector('#clickTarget')!.addEventListener('click', () => {
            this.clickCount++;
            if (this._onClick) {
                this._onClick(this.clickCount)
            }
        });
    }
}

export const defineComponent1 = (): void => {
    if (!customElements.get(TagName)) {
        customElements.define(TagName, MyElement);
    }
};
