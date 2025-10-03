import {defineComponent1} from "./webcomponents/component1.ts";

defineComponent1();

// import type {MyElement} from "./webcomponents/component1.ts";

// const el = document.getElementById('myElement')! as MyElement;
// el.customOnClick = (times) => {
//     console.log('customOnClick ', times);
// }

import {defineLikeButton} from "./webcomponents/defineLikeButton.tsx";
import {defineVideoPlayer} from "./webcomponents/defineVideoPlayer.tsx";
import {defineShowCard} from "./webcomponents/defineShowCard.tsx";

defineLikeButton();
defineVideoPlayer();
defineShowCard();
//
// import type {LikeButton} from "./webcomponents/defineLikeButton.tsx";
// import type {VideoPlayer} from "./webcomponents/defineVideoPlayer.tsx";
//
// const likeButton = document.getElementById('likeButton')! as LikeButton;
// likeButton.onLikeChange = (liked, newCount) => {
//     console.log(
//         `%c❤️ (js)%c Liked changed to %c${liked}%c, Like count is now %c${newCount}`,
//         'color: red; font-weight: bold;',
//         'color: gray;',
//         'color: orange; font-weight: bold;',
//         'color: gray;',
//         'color: blue; font-weight: bold;'
//     );
// };
//
// const player1 = document.getElementById('player1')! as VideoPlayer;
// player1.onPlay = () => {
//     console.log(
//         `%c▶️ player1%c.onPlay`,
//         'color: green; font-weight: bold;',
//         'color: gray;'
//     );
// };
// player1.onPause = () => {
//     console.log(
//         `%c⏸️ player1%c.onPause`,
//         'color: orange; font-weight: bold;',
//         'color: gray;'
//     );
// };
//
// const player2 = document.getElementById('player2')! as VideoPlayer;
// player2.onPlay = () => {
//     console.log(
//         `%c▶️ player2%c.onPlay`,
//         'color: green; font-weight: bold;',
//         'color: gray;'
//     );
// };
// player2.onPause = () => {
//     console.log(
//         `%c⏸️ player2%c.onPause`,
//         'color: orange; font-weight: bold;',
//         'color: gray;'
//     );
// };
