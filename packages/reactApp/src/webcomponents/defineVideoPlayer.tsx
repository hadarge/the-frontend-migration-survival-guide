import {createRoot, type Root} from 'react-dom/client';
import indexCss from '../index.css?inline';
import {VideoPlayer} from "../components/VideoPlayer.tsx";
//import ReactDOMServer from "react-dom/server";

export interface VideoPlayer extends HTMLElement {
    src: string;
    width?: number;
    height?: number;

    onPlay?: () => void;
    onPause?: () => void;
}

export const defineVideoPlayer = () => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['src', 'width', 'height'];
        }

        private shadow: ShadowRoot;
        private root: Root | null = null;
        private props: Record<string, any> = {};

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }

        set onPlay(fn: (() => void) | null) {
            this.props.onPlay = fn;
            this.render();
        }

        set onPause(fn: (() => void) | null) {
            this.props.onPause = fn;
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

                if (attr === 'width' || attr === 'height') {
                    this.props[attr] = Number.parseInt(this.props[attr]);
                }
            });

            this.render();
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
                //
                // debugger;
                // const dataProps = this.getAttribute('data-props');
                // if(dataProps){
                //     const props = JSON.parse(dataProps)
                //     hydrateRoot(this, <VideoPlayer {...props} />)
                //     return;
                // }
            }

            this.root.render(<VideoPlayer src={this.props.src} {...this.props}/>);
        }
    }

    if (!customElements.get('video-player')) {
        customElements.define('video-player', MyElement);
    }
};

// export const renderVideoPlayerHTML = (props: any) => {
//     return ReactDOMServer.renderToString(<VideoPlayer {...props} />)
// }
