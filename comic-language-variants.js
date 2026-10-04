/* One approved English adaptation; base Japanese data remains unchanged. */
(function(root){
"use strict";
const variants = {
  "l1-01-polite-request": {
    "en": {
      "language": "en",
      "title": "請對方幫個忙",
      "grammar": "Could you + 原形動詞…?",
      "caption": "Could you + 原形動詞，表示客氣地請對方幫忙。這裡的 could 不是在說過去。",
      "image": "assets/japanese-comics/l1-01-polite-request-en.webp",
      "width": 1024,
      "height": 1536,
      "provenance": "英文情境改編；以相同情境練習英文禮貌請求，並非日文教材原句。",
      "readingNote": "第3格依對話順序先聽「Sure. Here you go.」，再聽「Thanks!」。兩版都有中文解說；切換語言會停止朗讀，從第一格重新準備。",
      "panels": [
        {
          "title": "筆記抄不完",
          "crop": "8 102 1010 287",
          "alt": "英文第1格：同學來不及抄筆記，說 Oh no, I can’t keep up!",
          "first": 0,
          "label": "情境"
        },
        {
          "title": "委婉地請求",
          "crop": "8 399 1010 319",
          "alt": "英文第2格：同學用 Could you show me your notes? 客氣地借看筆記。",
          "first": 1,
          "label": "請求"
        },
        {
          "title": "答應與道謝",
          "crop": "8 726 1010 302",
          "alt": "英文第3格：同學借出筆記說 Sure. Here you go.，另一位說 Thanks!",
          "first": 2,
          "label": "對話"
        },
        {
          "title": "換個情境試試",
          "crop": "8 1038 1010 399",
          "alt": "英文第4格：旅行時，請別人幫忙拍照。",
          "first": 4,
          "label": "活用"
        }
      ],
      "cues": [
        {
          "text": "Oh no, I can’t keep up!",
          "subtitle": "Oh no, I can’t keep up!",
          "translation": "糟了，我抄不及！",
          "speaker": "同學 · 心裡想",
          "panel": 0
        },
        {
          "text": "Could you show me your notes?",
          "subtitle": "Could you show me your notes?",
          "translation": "可以讓我看一下你的筆記嗎？",
          "speaker": "同學 · 禮貌請求",
          "panel": 1
        },
        {
          "text": "Sure. Here you go.",
          "subtitle": "Sure. Here you go.",
          "translation": "當然，給你看。",
          "speaker": "同學 · 答應",
          "panel": 2
        },
        {
          "text": "Thanks!",
          "subtitle": "Thanks!",
          "translation": "謝謝！",
          "speaker": "同學 · 道謝",
          "panel": 2
        },
        {
          "text": "Excuse me. Could you take a photo of us?",
          "subtitle": "Excuse me. Could you take a photo of us?",
          "translation": "不好意思，可以幫我們拍張照嗎？",
          "speaker": "旅行時 · 活用請求",
          "panel": 3
        }
      ]
    }
  }
};
if(typeof module!=="undefined" && module.exports) module.exports = variants;
else root.COMIC_LANGUAGE_VARIANTS = variants;
})(globalThis);
