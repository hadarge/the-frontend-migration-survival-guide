import {createRoot, type Root} from 'react-dom/client';
import indexCss from '../index.css?inline';
import {LikeButton as LikeButtonComponent} from "../components/LikeButton.tsx";

export interface LikeButton extends HTMLElement {
    onLikeChange: (liked: boolean, newCount: number) => void;
}

type NullableString = string | null;

export const defineLikeButton = () => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['initialLiked', 'likeCount'];
        }

        shadow: ShadowRoot;
        root?: Root;
        props: Record<string, any> = {};

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }

        set onLikeChange(fn: LikeButton['onLikeChange']) {
            this.props.onLikeChange = fn;
            this.render();
        }

        connectedCallback(): void {
            const style = document.createElement('style');
            style.textContent = indexCss;
            this.shadow.appendChild(style);

            MyElement.observedAttributes.forEach(attr => {
                this.props[attr] = this.getAttribute(attr);
                if (attr === 'likeCount') {
                    this.props[attr] = Number.parseInt(this.props[attr]);
                }
            });

            this.render();
        }

        attributeChangedCallback(attrName: string, _: NullableString, newVal: NullableString): void {
            this.props[attrName] = newVal;
            this.render();
        }

        render(): void {
            if (!this.root) {
                this.root = createRoot(this.shadow);
            }

            this.root.render(<LikeButtonComponent {...this.props}/>);
        }
    }

    if (!customElements.get('like-button')) {
        customElements.define('like-button', MyElement);
    }
};
