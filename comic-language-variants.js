/* English scene adaptations; all original Japanese data stays unchanged. */
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
  },
  "j2-01-ongoing-work-study": {
    "en": {
      "language": "en",
      "title": "工作與學習，英文怎麼說？",
      "grammar": "現在簡單式",
      "caption": "現在簡單式可以表達工作、習慣與事實；日文的持續表現不一定要譯成英文進行式。",
      "image": "assets/japanese-comics/j2-01-ongoing-work-study-en.webp",
      "width": 1024,
      "height": 1536,
      "provenance": "英文情境改編；沿用原漫畫的場景與人物，改以自然英文練習，並非日文教材原句或原筆記英文例句。",
      "readingNote": "文化大學在此為情境中的 Bunka University。依序朗讀四格英文；中文解說不朗讀。",
      "panels": [
        {
          "title": "介紹工作",
          "crop": "10 134 1004 311",
          "alt": "英文第1格：I’m a teacher. I teach Japanese at Bunka University. 我是老師。我在文化大學教日文。",
          "first": 0,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "詢問公司",
          "crop": "10 451 1004 313",
          "alt": "英文第2格：What does Toyota make? 豐田製造什麼？",
          "first": 1,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "說明事實",
          "crop": "10 770 1004 310",
          "alt": "英文第3格：Toyota makes cars. 豐田製造汽車。",
          "first": 2,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "平常的學習",
          "crop": "10 1086 1004 305",
          "alt": "英文第4格：I study Japanese at Bunka University. 我在文化大學學日文。",
          "first": 3,
          "label": "英文情境改編",
          "skipAudio": false
        }
      ],
      "cues": [
        {
          "text": "I’m a teacher. I teach Japanese at Bunka University.",
          "subtitle": "I’m a teacher. I teach Japanese at Bunka University.",
          "translation": "我是老師。我在文化大學教日文。",
          "speaker": "老師",
          "panel": 0,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "What does Toyota make?",
          "subtitle": "What does Toyota make?",
          "translation": "豐田製造什麼？",
          "speaker": "同學",
          "panel": 1,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "Toyota makes cars.",
          "subtitle": "Toyota makes cars.",
          "translation": "豐田製造汽車。",
          "speaker": "老師",
          "panel": 2,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "I study Japanese at Bunka University.",
          "subtitle": "I study Japanese at Bunka University.",
          "translation": "我在文化大學學日文。",
          "speaker": "同學",
          "panel": 3,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        }
      ]
    }
  },
  "j2-02-knowing": {
    "en": {
      "language": "en",
      "title": "你知道嗎？我不知道",
      "grammar": "Do you know...?",
      "caption": "know 表示「知道」，通常不用進行式；用 Do you know...? 問，再用 do / don’t 簡答。",
      "image": "assets/japanese-comics/j2-02-knowing-en.webp",
      "width": 1024,
      "height": 1536,
      "provenance": "英文情境改編；沿用原漫畫的場景與人物，改以自然英文練習，並非日文教材原句或原筆記英文例句。",
      "readingNote": "第1格是情境說明，不朗讀。第3、4格分別示範知道與不知道的回答。",
      "panels": [
        {
          "title": "想寄信給老師",
          "crop": "8 140 1009 316",
          "alt": "英文第1格：想寄信給老師，先問同學。",
          "first": 0,
          "label": "解說",
          "skipAudio": true
        },
        {
          "title": "詢問地址",
          "crop": "8 465 1009 316",
          "alt": "英文第2格：Do you know our teacher’s address? 你知道老師的地址嗎？",
          "first": 1,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "知道的回答",
          "crop": "8 789 1009 304",
          "alt": "英文第3格：Yes, I do. 知道。",
          "first": 2,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "不知道的回答",
          "crop": "8 1101 1009 325",
          "alt": "英文第4格：No, I don’t. 不，我不知道。",
          "first": 3,
          "label": "英文情境改編",
          "skipAudio": false
        }
      ],
      "cues": [
        {
          "text": "",
          "subtitle": "想寄信給老師，先問同學。",
          "translation": "本格為情境／解說，僅供閱讀，不朗讀。",
          "speaker": "情境解說",
          "panel": 0,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": true
        },
        {
          "text": "Do you know our teacher’s address?",
          "subtitle": "Do you know our teacher’s address?",
          "translation": "你知道老師的地址嗎？",
          "speaker": "同學",
          "panel": 1,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "Yes, I do.",
          "subtitle": "Yes, I do.",
          "translation": "知道。",
          "speaker": "女同學 · 回答 A",
          "panel": 2,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "No, I don’t.",
          "subtitle": "No, I don’t.",
          "translation": "不，我不知道。",
          "speaker": "男同學 · 回答 B",
          "panel": 3,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        }
      ]
    }
  },
  "j2-03-tie-and-simultaneous": {
    "en": {
      "language": "en",
      "title": "戴著領帶／一邊打領帶",
      "grammar": "wear / tie / while",
      "caption": "wear a tie 是戴著領帶；tie a tie 是打領帶。while 可連結同時進行的動作。",
      "image": "assets/japanese-comics/j2-03-tie-and-simultaneous-en.webp",
      "width": 1024,
      "height": 1536,
      "provenance": "英文情境改編；沿用原漫畫的場景與人物，改以自然英文練習，並非日文教材原句或原筆記英文例句。",
      "readingNote": "第2、4格為解說，不朗讀。while tying my tie 省略了和主句相同的主詞。",
      "panels": [
        {
          "title": "戴領帶去上班",
          "crop": "10 147 1004 323",
          "alt": "英文第1格：I wear a tie to work every day. 我每天戴著領帶去上班。",
          "first": 0,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "穿戴狀態",
          "crop": "10 478 1004 257",
          "alt": "英文第2格：wear a tie＝戴著領帶的狀態",
          "first": 1,
          "label": "解說",
          "skipAudio": true
        },
        {
          "title": "一邊打領帶",
          "crop": "10 744 1004 308",
          "alt": "英文第3格：I’m looking in the mirror while tying my tie. 我一邊打領帶，一邊看鏡子。",
          "first": 2,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "同時進行的動作",
          "crop": "10 1060 1004 330",
          "alt": "英文第4格：tie a tie＝打領帶的動作；while 連結同時進行的動作。",
          "first": 3,
          "label": "解說",
          "skipAudio": true
        }
      ],
      "cues": [
        {
          "text": "I wear a tie to work every day.",
          "subtitle": "I wear a tie to work every day.",
          "translation": "我每天戴著領帶去上班。",
          "speaker": "上班族",
          "panel": 0,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "",
          "subtitle": "wear a tie＝戴著領帶的狀態",
          "translation": "本格為情境／解說，僅供閱讀，不朗讀。",
          "speaker": "解說",
          "panel": 1,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": true
        },
        {
          "text": "I’m looking in the mirror while tying my tie.",
          "subtitle": "I’m looking in the mirror while tying my tie.",
          "translation": "我一邊打領帶，一邊看鏡子。",
          "speaker": "上班族",
          "panel": 2,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "",
          "subtitle": "tie a tie＝打領帶的動作；while 連結同時進行的動作。",
          "translation": "本格為情境／解說，僅供閱讀，不朗讀。",
          "speaker": "解說",
          "panel": 3,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": true
        }
      ]
    }
  },
  "j2-04-te-ta-forms": {
    "en": {
      "language": "en",
      "title": "英文動詞：原形與過去式",
      "grammar": "go → went / write → wrote",
      "caption": "go、write、eat、do 的過去式分別是 went、wrote、ate、did；它們是不規則變化，不能一律加 -ed。",
      "image": "assets/japanese-comics/j2-04-te-ta-forms-en.webp",
      "width": 1024,
      "height": 1536,
      "provenance": "英文情境改編；沿用原漫畫的場景與人物，改以自然英文練習，並非日文教材原句或原筆記英文例句。",
      "readingNote": "依序朗讀四格完整英文例句。英文過去式與日文て形／た形不能逐一對應。",
      "panels": [
        {
          "title": "去：go → went",
          "crop": "11 157 1002 296",
          "alt": "英文第1格：I went to the station. 我去了車站。",
          "first": 0,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "寫：write → wrote",
          "crop": "11 463 1002 311",
          "alt": "英文第2格：I wrote a letter. 我寫了一封信。",
          "first": 1,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "吃：eat → ate",
          "crop": "11 785 1002 312",
          "alt": "英文第3格：I ate lunch. 我吃了午餐。",
          "first": 2,
          "label": "英文情境改編",
          "skipAudio": false
        },
        {
          "title": "做：do → did",
          "crop": "11 1107 1002 331",
          "alt": "英文第4格：I did the cleaning. 我做了清潔。",
          "first": 3,
          "label": "英文情境改編",
          "skipAudio": false
        }
      ],
      "cues": [
        {
          "text": "I went to the station.",
          "subtitle": "I went to the station.",
          "translation": "我去了車站。",
          "speaker": "情境例句",
          "panel": 0,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "I wrote a letter.",
          "subtitle": "I wrote a letter.",
          "translation": "我寫了一封信。",
          "speaker": "情境例句",
          "panel": 1,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "I ate lunch.",
          "subtitle": "I ate lunch.",
          "translation": "我吃了午餐。",
          "speaker": "情境例句",
          "panel": 2,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        },
        {
          "text": "I did the cleaning.",
          "subtitle": "I did the cleaning.",
          "translation": "我做了清潔。",
          "speaker": "情境例句",
          "panel": 3,
          "sourceKind": "adapted",
          "sourceLabel": "英文情境改編",
          "skipAudio": false
        }
      ]
    }
  }
};
if(typeof module!=="undefined" && module.exports) module.exports = variants;
else root.COMIC_LANGUAGE_VARIANTS = variants;
})(globalThis);
