import {createRoot, type Root} from 'react-dom/client';
import indexCss from '../index.css?inline';
import {ShowCard} from "../components/ShowCard.tsx";

export const defineShowCard = () => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['title', 'date', 'rating', 'country', 'imageurl', 'viewlink'];
        }

        private shadow: ShadowRoot;
        private root: Root | null = null;
        private props: Record<string, any> = {};

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }

        set onView(fn: (() => void) | null) {
            this.props.onView = fn;
            this.render();
        }

        connectedCallback(): void {
            const style = document.createElement('style');
            style.textContent = indexCss;
            this.shadow.appendChild(style);

            MyElement.observedAttributes.forEach(attr => {
                const val = this.getAttribute(attr);
                if (val !== null)
                    this.props[attr] = val;
            });

            this.render();
        }

        disconnectedCallback() {
            if (this.root){
                // React 18+
                this.root.unmount();
                // React <18
                // ReactDOM.unmountComponentAtNode(this._mountPoint);
                this.root = null;
            }
        }

        attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void {
            if (oldVal !== newVal) {
                this.props[attrName] = newVal;
                this.render();
            }
        }

        private render(): void {
            if (!this.root) {
                this.root = createRoot(this.shadow);
            }

            this.root.render(<ShowCard
                onView={this.props.onView}
                {...this.props}/>);
        }
    }

    if (!customElements.get('show-card')) {
        customElements.define('show-card', MyElement);
    }
};
