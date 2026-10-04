/* Image-checked Japanese utterances, panel crops and original gallery metadata. */
(function(root){
'use strict';
const comics = [
  {
    "id": "l1-01-polite-request",
    "lesson": "l1",
    "title": "委婉地拜託別人",
    "label": "第1課 · 01",
    "grammar": "〜てもらえませんか",
    "caption": "把直接的要求，換成更有禮貌的請求。",
    "image": "assets/japanese-comics/l1-01-polite-request.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "筆記抄不完",
        "crop": "8 102 1010 287",
        "alt": "第1格：同學在教室裡來不及抄完筆記。",
        "first": 0,
        "label": "情境"
      },
      {
        "title": "委婉地請求",
        "crop": "8 399 1010 319",
        "alt": "第2格：同學請林同學讓她看筆記。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "答應與道謝",
        "crop": "8 726 1010 302",
        "alt": "第3格：林同學借出筆記，另一位同學道謝。",
        "first": 2,
        "label": "補充對話"
      },
      {
        "title": "換個情境試試",
        "crop": "8 1038 1010 399",
        "alt": "第4格：旅行時，請別人幫忙拍照的補充例句。",
        "first": 4,
        "label": "補充例句"
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "糟了，筆記抄不完……",
        "translation": "先看看兩位同學，再按播放，聽她怎麼開口。",
        "speaker": "情境開場 · 無日文台詞",
        "panel": 0
      },
      {
        "text": "りんさん、ノートを見せてもらえませんか。",
        "subtitle": "林さん、ノートを見せてもらえませんか。",
        "translation": "林同學，可以讓我看一下筆記嗎？",
        "speaker": "同學 · 禮貌請求",
        "panel": 1
      },
      {
        "text": "どうぞ。",
        "subtitle": "どうぞ。",
        "translation": "請用。",
        "speaker": "林同學 · 答應",
        "panel": 2
      },
      {
        "text": "ありがとうございます。",
        "subtitle": "ありがとうございます。",
        "translation": "謝謝你。",
        "speaker": "同學 · 道謝",
        "panel": 2
      },
      {
        "text": "写真を撮ってもらえませんか。",
        "subtitle": "写真を撮ってもらえませんか。",
        "translation": "可以幫我拍照嗎？",
        "speaker": "活用例句 · 補充",
        "panel": 3
      }
    ],
    "readingNote": "中文姓氏「林」讀作 りん；字幕保留原圖的「林さん」。"
  },
  {
    "id": "l1-02-simile",
    "lesson": "l1",
    "title": "像夏天一樣",
    "label": "第1課 · 02",
    "grammar": "ようだ・ような・ように",
    "caption": "句尾、修飾名詞、修飾動作，各有不同接法。",
    "image": "assets/japanese-comics/l1-02-simile.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "明明才三月",
        "crop": "12 89 1002 335",
        "alt": "第1格：兩人在三月的街道上熱得冒汗。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "簡直像夏天",
        "crop": "11 434 1002 335",
        "alt": "第2格：男子用「夏のようです」形容天氣像夏天。",
        "label": "原句",
        "first": 1
      },
      {
        "title": "像夏天的暑氣",
        "crop": "12 779 1002 312",
        "alt": "第3格：男子用「夏のような暑さ」形容暑氣。",
        "label": "補充例句",
        "first": 2
      },
      {
        "title": "像夏天一樣熱",
        "crop": "13 1100 1001 319",
        "alt": "第4格：兩人在樹蔭下休息，男子說今天像夏天一樣熱。",
        "label": "補充例句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "まださんがつなのに…",
        "subtitle": "まだ3月なのに…",
        "translation": "明明才三月……",
        "speaker": "旅伴 · 感到炎熱",
        "panel": 0
      },
      {
        "text": "まださんがつなのに、暑くてまるで夏のようですね。",
        "subtitle": "まだ3月なのに、暑くてまるで夏のようですね。",
        "translation": "明明才三月，卻熱得簡直像夏天呢。",
        "speaker": "旅伴 · 比喻天氣",
        "panel": 1
      },
      {
        "text": "夏のような暑さですね。",
        "subtitle": "夏のような暑さですね。",
        "translation": "真是像夏天一樣的暑氣呢。",
        "speaker": "旅伴 · 修飾名詞",
        "panel": 2
      },
      {
        "text": "今日は夏のように暑いです。",
        "subtitle": "今日は夏のように暑いです。",
        "translation": "今天像夏天一樣熱。",
        "speaker": "旅伴 · 修飾形容詞",
        "panel": 3
      }
    ]
  },
  {
    "id": "l1-03-nominalization",
    "lesson": "l1",
    "title": "把動作裝成一件事",
    "label": "第1課 · 03",
    "grammar": "こと・の：名詞化",
    "caption": "把一個動作當成「一件事」，再接後面的句子。",
    "image": "assets/japanese-comics/l1-03-nominalization.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "把運動裝成一件事",
        "crop": "10 90 1005 302",
        "alt": "第1格：兩人慢跑，盒子中的卡片寫著「毎日運動する」。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "每天運動有益健康",
        "crop": "10 399 1005 275",
        "alt": "第2格：男子說每天運動這件事對健康有益。",
        "label": "原句",
        "first": 1
      },
      {
        "title": "喜歡游泳這件事",
        "crop": "10 681 1005 325",
        "alt": "第3格：女子在游泳池裡說自己喜歡游泳。",
        "label": "補充例句",
        "first": 2
      },
      {
        "title": "會游泳與看見游泳",
        "crop": "10 1011 1005 337",
        "alt": "第4格：以會游泳和看見孩子游泳，示範「こと」與「の」。",
        "label": "補充例句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "毎日運動する",
        "subtitle": "毎日運動する",
        "translation": "每天運動",
        "speaker": "動作例子",
        "panel": 0
      },
      {
        "text": "毎日運動することは健康にいいです。",
        "subtitle": "毎日運動することは健康にいいです。",
        "translation": "每天運動這件事，對健康有益。",
        "speaker": "慢跑的男子",
        "panel": 1
      },
      {
        "text": "私は泳ぐのが好きです。",
        "subtitle": "私は泳ぐのが好きです。",
        "translation": "我喜歡游泳。",
        "speaker": "游泳的女子",
        "panel": 2
      },
      {
        "text": "泳ぐことができます。",
        "subtitle": "泳ぐことができます。",
        "translation": "會游泳。",
        "speaker": "補充例句 · 能力",
        "panel": 3
      },
      {
        "text": "子どもが泳ぐのを見ました。",
        "subtitle": "子どもが泳ぐのを見ました。",
        "translation": "看到了孩子游泳。",
        "speaker": "補充例句 · 看見動作",
        "panel": 3
      }
    ]
  },
  {
    "id": "l1-04-naming",
    "lesson": "l1",
    "title": "這個日文叫什麼？",
    "label": "第1課 · 04",
    "grammar": "AをBと言う・AというB",
    "caption": "區分「把 A 叫作 B」和「叫作 A 的 B」。",
    "image": "assets/japanese-comics/l1-04-naming.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "這種行為叫什麼",
        "crop": "8 91 1008 269",
        "alt": "第1格：女子指向邊走路邊使用手機的人，詢問這種行為的日文。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "把行為叫作步行滑手機",
        "crop": "8 367 1008 395",
        "alt": "第2格：男子說明邊走路邊操作手機叫作「歩きスマホ」。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "叫作波奇的狗",
        "crop": "8 768 1008 300",
        "alt": "第3格：男子介紹一隻叫作波奇的狗。",
        "label": "補充例句",
        "first": 2
      },
      {
        "title": "兩種說法順序不同",
        "crop": "8 1075 1008 396",
        "alt": "第4格：兩人展示筆記，比較把 A 叫作 B 與叫作 A 的 B。",
        "label": "文法整理",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "這種行為，日文叫什麼？",
        "translation": "先看行為，再說名稱。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "歩きながら携帯を操作することを歩きスマホと言います。",
        "subtitle": "歩きながら携帯を操作することを歩きスマホと言います。",
        "translation": "把一邊走路一邊操作手機這件事，叫作「邊走邊滑手機」。",
        "speaker": "男子 · 說明名稱",
        "panel": 1
      },
      {
        "text": "ポチという犬です。",
        "subtitle": "ポチという犬です。",
        "translation": "這是叫作波奇的狗。",
        "speaker": "男子 · 介紹名字",
        "panel": 2
      },
      {
        "text": "",
        "subtitle": "兩種說法，順序不同！",
        "translation": "比較「把 A 叫作 B」與「叫作 A 的 B」。",
        "speaker": "情境",
        "panel": 3
      }
    ]
  },
  {
    "id": "l1-05-concessive",
    "lesson": "l1",
    "title": "無論誰反對",
    "label": "第1課 · 05",
    "grammar": "疑問詞＋ても／でも",
    "caption": "無論誰、哪裡或什麼情況，後面的結果都不變。",
    "image": "assets/japanese-comics/l1-05-concessive.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "家人的反對與擔心",
        "crop": "8 96 1008 289",
        "alt": "第1格：家人表達不贊成與擔心，女子思考自己的決定。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "無論誰反對",
        "crop": "8 392 1008 370",
        "alt": "第2格：女子表示不論誰反對，她都要和男友結婚。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "條件改變決定不變",
        "crop": "8 769 1008 264",
        "alt": "第3格：家人的反對對照兩人的決心，旁邊解釋文法。",
        "label": "文法整理",
        "first": 2
      },
      {
        "title": "什麼都吃",
        "crop": "8 1040 1008 407",
        "alt": "第4格：女子面對多種食物，說自己什麼都吃。",
        "label": "補充活用例句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "我不太贊成。我有些擔心。",
        "translation": "家人表達反對與擔心。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "誰に反対されても、彼と結婚します。",
        "subtitle": "誰に反対されても、彼と結婚します。",
        "translation": "不論誰反對，我都要和他結婚。",
        "speaker": "女子 · 表達決心",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "反對的人改變 → 決定不變",
        "translation": "反對的人可以不同，結婚的決定不變。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "何でも食べます。",
        "subtitle": "何でも食べます。",
        "translation": "什麼都吃。",
        "speaker": "女子 · 舉一反三",
        "panel": 3
      }
    ]
  },
  {
    "id": "l2-01-tara",
    "lesson": "l2",
    "title": "做了，才發現",
    "label": "第2課 · 01",
    "grammar": "〜たら：變化／發現",
    "caption": "做了 A，結果出現 B，或才發現 B。",
    "image": "assets/japanese-comics/l2-01-tara.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "先走到圖書館",
        "crop": "10 154 499 588",
        "alt": "第1格，左上：女子抱著書走到圖書館。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "到了才發現沒開",
        "crop": "517 154 497 588",
        "alt": "第2格，右上：女子看見圖書館門上的休館日告示。",
        "label": "情境改編",
        "first": 1
      },
      {
        "title": "去了才發現休息",
        "crop": "10 753 499 655",
        "alt": "第3格，左下：女子說到了圖書館才發現沒開。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "吃藥後頭痛好了",
        "crop": "517 753 497 655",
        "alt": "第4格，右下：女子喝水服藥，接著感覺頭痛好轉。",
        "label": "OneNote 原句 · 文法例句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "我走到圖書館。",
        "translation": "先做 A：走到圖書館。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "",
        "subtitle": "到了，才發現今天沒開！",
        "translation": "才發現 B：今天是休館日。",
        "speaker": "情境",
        "panel": 1
      },
      {
        "text": "図書館に行ったら、休みだった。",
        "subtitle": "図書館に行ったら、休みだった。",
        "translation": "到了圖書館，才發現沒開。",
        "speaker": "女子 · 描述發現",
        "panel": 2
      },
      {
        "text": "薬を飲んだら、頭痛が治りました。",
        "subtitle": "薬を飲んだら、頭痛が治りました。",
        "translation": "吃了藥之後，頭痛好了。",
        "speaker": "例句 · 描述結果",
        "panel": 3
      }
    ]
  },
  {
    "id": "l2-02-definition",
    "lesson": "l2",
    "title": "這是什麼意思？",
    "label": "第2課 · 02",
    "grammar": "〜というのは：定義",
    "caption": "詢問詞語的意思，再用解釋回答。",
    "image": "assets/japanese-comics/l2-02-definition.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "雞排是什麼",
        "crop": "14 142 507 582",
        "alt": "第1格，左上：男子在夜市雞排攤詢問「ジーパイ」是什麼。",
        "label": "原句 · 詢問事物",
        "first": 0
      },
      {
        "title": "解釋台式炸雞",
        "crop": "528 142 484 582",
        "alt": "第2格，右上：攤販拿著雞排，解釋這是使用雞肉的台式炸雞。",
        "label": "原句 · 解釋事物",
        "first": 1
      },
      {
        "title": "這個口語詞是什麼意思",
        "crop": "14 736 492 644",
        "alt": "第3格，左下：男子拿著玩具，詢問「キモイ」的意思。",
        "label": "原句 · 詢問意思",
        "first": 2
      },
      {
        "title": "解釋噁心的意思",
        "crop": "513 736 499 644",
        "alt": "第4格，右下：女子解釋「キモイ」是覺得噁心或不舒服的意思。",
        "label": "原句 · 解釋意思",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "ジーパイというのは、何のことですか。",
        "subtitle": "ジーパイというのは、何のことですか。",
        "translation": "雞排指的是什麼？",
        "speaker": "男子 · 詢問事物",
        "panel": 0
      },
      {
        "text": "鶏肉を使った台湾風の唐揚げのことです。",
        "subtitle": "鶏肉を使った台湾風の唐揚げのことです。",
        "translation": "就是用雞肉做的台式炸雞。",
        "speaker": "雞排攤販",
        "panel": 1
      },
      {
        "text": "キモイというのは、どういう意味ですか。",
        "subtitle": "キモイというのは、どういう意味ですか。",
        "translation": "「キモイ」是什麼意思？",
        "speaker": "男子 · 詢問詞義",
        "panel": 2
      },
      {
        "text": "気持ちが悪いということです。",
        "subtitle": "気持ちが悪いということです。",
        "translation": "就是覺得噁心、不舒服的意思。",
        "speaker": "女子 · 解釋詞義",
        "panel": 3
      }
    ]
  },
  {
    "id": "l2-03-content",
    "lesson": "l2",
    "title": "新聞說了什麼？",
    "label": "第2課 · 03",
    "grammar": "常體句＋という＋名詞",
    "caption": "前面放具體內容，後面接新聞、消息或規則。",
    "image": "assets/japanese-comics/l2-03-content.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "看見新聞內容",
        "crop": "12 179 530 584",
        "alt": "第1格，左上：女子看電視，畫面上寫著詐騙電話正在增加。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "把內容接到名詞",
        "crop": "550 179 463 584",
        "alt": "第2格，右上：將同一段新聞內容透過「という」接到「ニュース」。",
        "label": "文法示意",
        "first": 1
      },
      {
        "title": "今天早上看到的新聞",
        "crop": "12 770 503 659",
        "alt": "第3格，左下：女子向男子轉述今早看見的新聞內容。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "聽說明天放假",
        "crop": "523 770 490 659",
        "alt": "第4格，右下：男子說自己聽到了明天放假的消息。",
        "label": "補充例句 · 虛構情境",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "詐欺電話が増えている",
        "subtitle": "詐欺電話が増えている",
        "translation": "詐騙電話正在增加。",
        "speaker": "電視新聞 · 內容例子",
        "panel": 0
      },
      {
        "text": "",
        "subtitle": "內容裝進名詞",
        "translation": "把具體內容透過「という」接到名詞「ニュース」。",
        "speaker": "情境",
        "panel": 1
      },
      {
        "text": "けさ、詐欺電話が増えているというニュースを見ました。",
        "subtitle": "けさ、詐欺電話が増えているというニュースを見ました。",
        "translation": "今天早上，我看到詐騙電話增加的新聞。",
        "speaker": "女子 · 轉述新聞內容",
        "panel": 2
      },
      {
        "text": "明日は休みだという話を聞きました。",
        "subtitle": "明日は休みだという話を聞きました。",
        "translation": "我聽說明天放假。",
        "speaker": "男子 · 轉述消息",
        "panel": 3
      }
    ]
  },
  {
    "id": "l2-04-mitai",
    "lesson": "l2",
    "title": "口語的「像……一樣」",
    "label": "第2課 · 04",
    "grammar": "みたいだ・みたいな・みたいに",
    "caption": "用日常對話記住比喻與舉例的三種接法。",
    "image": "assets/japanese-comics/l2-04-mitai.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "這片風景真漂亮",
        "crop": "9 146 503 508",
        "alt": "第1格，左上：兩位旅伴欣賞湖畔風景。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "簡直像一幅畫",
        "crop": "519 145 497 509",
        "alt": "第2格，右上：男子把風景比喻成一幅畫。",
        "label": "原句 · 比喻",
        "first": 1
      },
      {
        "title": "喜歡這類甜點",
        "crop": "9 660 503 555",
        "alt": "第3格，左下：女子在咖啡店說自己喜歡鬆餅和布丁這類甜點。",
        "label": "原句 · 舉例",
        "first": 3
      },
      {
        "title": "房間熱得像三溫暖",
        "crop": "519 660 497 555",
        "alt": "第4格，右下：房間很熱，男子把它比喻成三溫暖。",
        "label": "補充例句",
        "first": 4
      }
    ],
    "cues": [
      {
        "text": "この景色はすごくきれいですね。",
        "subtitle": "この景色はすごくきれいですね。",
        "translation": "這片景色真漂亮呢。",
        "speaker": "旅伴 · 讚嘆風景",
        "panel": 0
      },
      {
        "text": "そうですね。",
        "subtitle": "そうですね。",
        "translation": "是啊。",
        "speaker": "男子 · 回應",
        "panel": 1
      },
      {
        "text": "まるで絵みたいですね。",
        "subtitle": "まるで絵みたいですね。",
        "translation": "簡直像畫一樣呢。",
        "speaker": "男子 · 比喻風景",
        "panel": 1
      },
      {
        "text": "パンケーキやプリンみたいなスイーツが好き。",
        "subtitle": "パンケーキやプリンみたいなスイーツが好き。",
        "translation": "我喜歡鬆餅、布丁這類甜點。",
        "speaker": "女子 · 舉例",
        "panel": 2
      },
      {
        "text": "この部屋、サウナみたいに暑い！",
        "subtitle": "この部屋、サウナみたいに暑い！",
        "translation": "這房間熱得像三溫暖！",
        "speaker": "男子 · 形容炎熱",
        "panel": 3
      }
    ]
  },
  {
    "id": "l3-01-permission",
    "lesson": "l3",
    "title": "可以讓我用嗎？",
    "label": "第3課 · 01",
    "grammar": "使役て形＋もらえませんか",
    "caption": "借用手機的情境，記住「做動作的是我，對方准許我做」。",
    "image": "assets/japanese-comics/l3-01-permission.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已核對 OneNote，回應另標為補充對話。",
    "panels": [
      {
        "title": "手機沒電",
        "crop": "11 210 497 557",
        "alt": "第1格：短髮女生看著電量耗盡的手機，坐在辦公桌前。",
        "label": "情境",
        "first": 0
      },
      {
        "title": "請求允許",
        "crop": "519 210 494 557",
        "alt": "第2格：短髮女生向拿著手機的同事請求允許使用手機。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "對方同意",
        "crop": "11 779 497 549",
        "alt": "第3格：同事笑著答應，把手機交給短髮女生。",
        "label": "補充對話",
        "first": 2
      },
      {
        "title": "我來使用",
        "crop": "519 779 494 549",
        "alt": "第4格：短髮女生得到同事允許，使用借來的手機打電話。",
        "label": "情境",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "我的手機沒電了。",
        "translation": "先看借手機的原因，再聽下一格的請求。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "ケータイを使わせてもらえませんか。",
        "subtitle": "ケータイを使わせてもらえませんか。",
        "translation": "可以讓我用一下手機嗎？",
        "speaker": "短髮女生 · 請求允許",
        "panel": 1
      },
      {
        "text": "いいですよ。",
        "subtitle": "いいですよ。",
        "translation": "可以呀！",
        "speaker": "同事 · 同意",
        "panel": 2
      },
      {
        "text": "",
        "subtitle": "我得到允許，使用同事的手機。",
        "translation": "做動作的是我；對方允許我做。",
        "speaker": "情境",
        "panel": 3
      }
    ]
  },
  {
    "id": "l3-02-decision",
    "lesson": "l3",
    "title": "我的決定與習慣",
    "label": "第3課 · 02",
    "grammar": "ことにする・ことにしている",
    "caption": "從決定早上 7 點起床，到每天持續遵守自訂規矩。",
    "image": "assets/japanese-comics/l3-02-decision.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；兩句 OneNote 原句保留。",
    "panels": [
      {
        "title": "今晚，我自己決定",
        "crop": "11 153 496 592",
        "alt": "第1格：女生在晚上決定從明天開始七點起床。",
        "label": "OneNote 原句",
        "first": 0
      },
      {
        "title": "把決定變成行動",
        "crop": "518 153 496 592",
        "alt": "第2格：女生把床邊鬧鐘設定為早上七點。",
        "label": "情境",
        "first": 1
      },
      {
        "title": "幾週後，仍照著做",
        "crop": "11 755 496 647",
        "alt": "第3格：幾週後，女生持續每天早上七點起床，月曆畫上勾記。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "一眼記住差別",
        "crop": "518 755 496 647",
        "alt": "第4格：女生拿著自己訂的規矩，對照做一次決定與持續遵守習慣。",
        "label": "重點整理",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "明日から、しちじに起きることにします。",
        "subtitle": "明日から、7時に起きることにします。",
        "translation": "我決定從明天起，7 點起床。",
        "speaker": "女生 · 自己做決定",
        "panel": 0
      },
      {
        "text": "",
        "subtitle": "好，鬧鐘設為 7 點！",
        "translation": "把自己做的決定付諸行動。",
        "speaker": "情境",
        "panel": 1
      },
      {
        "text": "毎朝しちじに起きることにしています。",
        "subtitle": "毎朝7時に起きることにしています。",
        "translation": "我訂下規矩，每天早上 7 點起床。",
        "speaker": "女生 · 持續遵守習慣",
        "panel": 2
      },
      {
        "text": "",
        "subtitle": "決定一次 → 照著規矩持續做",
        "translation": "前者是自己做決定；後者是自訂規矩並持續遵守。",
        "speaker": "情境",
        "panel": 3
      }
    ]
  },
  {
    "id": "l3-03-arrangements",
    "lesson": "l3",
    "title": "安排好了與既定規則",
    "label": "第3課 · 03",
    "grammar": "ことになる・ことになっている",
    "caption": "東京出差的新安排、已排定行程，以及教室禁用手機的既定規則。",
    "image": "assets/japanese-comics/l3-03-arrangements.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；三句 OneNote 原句保留。",
    "panels": [
      {
        "title": "新安排定案",
        "crop": "8 155 499 588",
        "alt": "第1格：男同事拿著東京的資料，說明下週起出差的新安排。",
        "label": "OneNote 原句",
        "first": 0
      },
      {
        "title": "行程已排定",
        "crop": "518 155 497 588",
        "alt": "第2格：女生拿著東京行程資料，旁邊有行李箱和標記好的月曆。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "班級既定規則",
        "crop": "8 753 499 642",
        "alt": "第3格：老師在禁用手機標誌旁說明班上教室內不得用手機的規定。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "一眼記住",
        "crop": "518 753 497 642",
        "alt": "第4格：女生對照東京出差的新安排，以及已排定行程和教室禁用手機的規則。",
        "label": "重點整理",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "来週から、東京へ出張することになった。",
        "subtitle": "来週から、東京へ出張することになった。",
        "translation": "下週起，要去東京出差。",
        "speaker": "男同事 · 新安排",
        "panel": 0
      },
      {
        "text": "東京へ出張することになっています。",
        "subtitle": "東京へ出張することになっています。",
        "translation": "已經安排好要去東京出差。",
        "speaker": "女生 · 已排定行程",
        "panel": 1
      },
      {
        "text": "私のクラスは、教室でケータイを使ってはいけないことになっています。",
        "subtitle": "私のクラスは、教室でケータイを使ってはいけないことになっています。",
        "translation": "我們班規定教室內不能用手機。",
        "speaker": "老師 · 既定規則",
        "panel": 2
      },
      {
        "text": "",
        "subtitle": "新安排／已排定・規則",
        "translation": "分辨事情剛定案，以及已經確定的安排或規則。",
        "speaker": "情境",
        "panel": 3
      }
    ]
  },
  {
    "id": "l3-04-wishes",
    "lesson": "l3",
    "title": "希望你做・不要做",
    "label": "第3課 · 04",
    "grammar": "てほしい・ないでほしい",
    "caption": "希望朋友來派對，也希望對方不要一直看手機。",
    "image": "assets/japanese-comics/l3-04-wishes.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；兩句 OneNote 原句保留，首句以想法泡泡呈現。",
    "panels": [
      {
        "title": "希望他來",
        "crop": "15 159 493 548",
        "alt": "第1格：女生準備派對，在想法泡泡中希望一名男生明天來。",
        "label": "OneNote 原句",
        "first": 0
      },
      {
        "title": "隔天赴約",
        "crop": "518 159 491 548",
        "alt": "第2格：隔天男生提著禮物抵達門口，女生開心迎接。",
        "label": "情境",
        "first": 1
      },
      {
        "title": "希望別做",
        "crop": "15 716 493 551",
        "alt": "第3格：派對中男生一直看手機，女生表達希望他別再這麼做。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "放下手機",
        "crop": "518 716 491 551",
        "alt": "第4格：男生把手機放在桌上，與女生面對面聊天。",
        "label": "情境",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "明日のパーティー、彼に来てほしいな。",
        "subtitle": "明日のパーティー、彼に来てほしいな。",
        "translation": "希望他來明天的派對。",
        "speaker": "女生 · 心裡的希望",
        "panel": 0
      },
      {
        "text": "",
        "subtitle": "隔天，他真的來了！",
        "translation": "上一格的希望成真。這格沒有日文台詞。",
        "speaker": "情境",
        "panel": 1
      },
      {
        "text": "ずっとスマホを見ないでほしいんだけど。",
        "subtitle": "ずっとスマホを見ないでほしいんだけど。",
        "translation": "希望你不要一直看手機。",
        "speaker": "女生 · 希望對方別做",
        "panel": 2
      },
      {
        "text": "",
        "subtitle": "把手機放下，好好聊天。",
        "translation": "希望對方停止看手機後，兩人專心聊天。",
        "speaker": "情境",
        "panel": 3
      }
    ]
  },
  {
    "id": "l3-05-appearance",
    "lesson": "l3",
    "title": "看起來…的そう",
    "label": "第3課 · 05",
    "grammar": "様態そう・そうな・そうに",
    "caption": "看天空、看拉麵、看笑容，分辨句尾、接名詞與接動詞的そう。",
    "image": "assets/japanese-comics/l3-05-appearance.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；四句 OneNote 原句保留。",
    "panels": [
      {
        "title": "快要下雨",
        "crop": "11 154 497 588",
        "alt": "第1格：女生在拉麵店外看著陰暗的天空，判斷快要下雨。",
        "label": "OneNote 原句",
        "first": 0
      },
      {
        "title": "看起來很辣",
        "crop": "518 154 496 588",
        "alt": "第2格：兩位女生望著一大碗放滿辣椒的拉麵。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "修飾名詞",
        "crop": "11 753 497 556",
        "alt": "第3格：店員端上拉麵，短髮女生指著這碗看起來很辣的拉麵。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "修飾動作",
        "crop": "518 753 496 556",
        "alt": "第4格：短髮女生露出幸福的笑容，長髮朋友描述她的樣子。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "雨が降りそうです。",
        "subtitle": "雨が降りそうです。",
        "translation": "看起來快要下雨了。",
        "speaker": "短髮女生 · 看天空",
        "panel": 0
      },
      {
        "text": "このラーメンはからそうです。",
        "subtitle": "このラーメンは辛そうです。",
        "translation": "這碗拉麵看起來很辣。",
        "speaker": "短髮女生 · 看拉麵",
        "panel": 1
      },
      {
        "text": "からそうなラーメンです。",
        "subtitle": "辛そうなラーメンです。",
        "translation": "這是一碗看起來很辣的拉麵。",
        "speaker": "短髮女生 · 描述拉麵",
        "panel": 2
      },
      {
        "text": "彼女は幸せそうに笑っている。",
        "subtitle": "彼女は幸せそうに笑っている。",
        "translation": "她看起來很幸福地笑著。",
        "speaker": "長髮朋友 · 描述笑容",
        "panel": 3
      }
    ]
  },
  {
    "id": "l3-06-negative",
    "lesson": "l3",
    "title": "看起來不會？そう的否定",
    "label": "第3課 · 06",
    "grammar": "なさそう・そうもない",
    "caption": "四個小情境，分辨形容詞的なさそう與動詞的そうもない。",
    "image": "assets/japanese-comics/l3-06-negative.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句與補充例句分開標示。天氣原句僅補上句末句號。",
    "panels": [
      {
        "title": "看起來不辣",
        "crop": "14 210 493 576",
        "alt": "第1格：女生觀察還沒吃的咖哩，覺得外觀看起來不辣。",
        "label": "補充例句",
        "first": 0
      },
      {
        "title": "看起來不喜歡",
        "crop": "519 210 492 576",
        "alt": "第2格：卡拉 OK 包廂裡，一名男生抱胸坐著，旁邊女生觀察他的反應。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "看起來不會下雨",
        "crop": "14 797 493 609",
        "alt": "第3格：女生指著晴朗無雲的藍天，男生抬頭看天空。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "看來無法參加",
        "crop": "519 797 492 609",
        "alt": "第4格：女生坐在堆滿工作的桌前，拿著明天同學會的通知。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "このカレーはからくなさそうです。",
        "subtitle": "このカレーは辛くなさそうです。",
        "translation": "這道咖哩看起來不辣。",
        "speaker": "女生 · 觀察咖哩",
        "panel": 0
      },
      {
        "text": "ええ、カラオケが好きじゃなさそうですね。",
        "subtitle": "ええ、カラオケが好きじゃなさそうですね。",
        "translation": "是啊，他好像不喜歡唱卡拉 OK 呢。",
        "speaker": "女生 · 觀察男生反應",
        "panel": 1
      },
      {
        "text": "空に全然雲がないし、雨が降りそうもないね。",
        "subtitle": "空に全然雲がないし、雨が降りそうもないね。",
        "translation": "天空完全沒雲，看起來也不會下雨呢。",
        "speaker": "女生 · 看天空",
        "panel": 2
      },
      {
        "text": "仕事がたくさんあって、明日の同窓会に参加できそうもない。",
        "subtitle": "仕事がたくさんあって、明日の同窓会に参加できそうもない。",
        "translation": "工作很多，看來沒辦法參加明天的同學會。",
        "speaker": "女生 · 工作繁忙",
        "panel": 3
      }
    ]
  },
  {
    "id": "l4-01-reporting",
    "lesson": "l4",
    "title": "傳聞與確認",
    "label": "第4課 · 01",
    "grammar": "ということです・ということですね",
    "caption": "從天氣預報的轉述到店員重述換貨要求，分辨傳聞與確認。",
    "image": "assets/japanese-comics/l4-01-reporting.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已核對 OneNote，新增對話另有標示。",
    "panels": [
      {
        "title": "收到消息",
        "crop": "10 209 499 559",
        "alt": "第1格：短髮女子坐在窗邊，查看手機上的下雨預報。",
        "label": "情境開場",
        "first": 0
      },
      {
        "title": "轉達傳聞",
        "crop": "517 209 498 559",
        "alt": "第2格：短髮女子向朋友轉述天氣預報，窗外正在下雨。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "提出換貨",
        "crop": "10 778 499 582",
        "alt": "第3格：短髮顧客拿著 M 號褲子，向店員提出換成 L 號的要求。",
        "label": "補充對話",
        "first": 2
      },
      {
        "title": "重述確認",
        "crop": "517 778 498 582",
        "alt": "第4格：店員拿著 L 號褲子，重述顧客的換貨要求。",
        "label": "補充對話",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "從天氣預報得知消息。",
        "translation": "先看預報，再聽她怎麼轉述。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "天気予報によると、今日は雨が降るということです。",
        "subtitle": "天気予報によると、今日は雨が降るということです。",
        "translation": "根據天氣預報，據說今天會下雨。",
        "speaker": "短髮女子 · 轉述消息",
        "panel": 1
      },
      {
        "text": "Lサイズに換えたいんです。",
        "subtitle": "Lサイズに換えたいんです。",
        "translation": "我想換成 L 號。",
        "speaker": "顧客 · 換貨要求",
        "panel": 2
      },
      {
        "text": "Lサイズに変更するということですね。",
        "subtitle": "Lサイズに変更するということですね。",
        "translation": "也就是要換成 L 號，對嗎？",
        "speaker": "店員 · 重述確認",
        "panel": 3
      }
    ]
  },
  {
    "id": "l4-02-explanation",
    "lesson": "l4",
    "title": "為什麼呢？",
    "label": "第4課 · 02",
    "grammar": "の・なの",
    "caption": "以唱歌與禁菸的對話，學習追問原因與說明理由。",
    "image": "assets/japanese-comics/l4-02-explanation.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已核對 OneNote，新增對話另有標示。",
    "panels": [
      {
        "title": "追問原因",
        "crop": "10 209 499 537",
        "alt": "第1格：紅色外套女子拿著麥克風，問短髮朋友為什麼不唱歌。",
        "label": "OneNote 原句",
        "first": 0
      },
      {
        "title": "說明理由",
        "crop": "517 209 498 537",
        "alt": "第2格：短髮女子不好意思地解釋自己不擅長唱歌。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "詢問許可",
        "crop": "10 754 499 529",
        "alt": "第3格：短髮女子在禁菸標誌旁，詢問可否抽菸。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "提醒規定",
        "crop": "517 754 498 529",
        "alt": "第4格：紅衣女子指向禁菸標誌，提醒朋友這裡禁止抽菸。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "どうして歌わないの？",
        "subtitle": "どうして歌わないの？",
        "translation": "為什麼不唱呢？",
        "speaker": "紅衣女子 · 追問原因",
        "panel": 0
      },
      {
        "text": "歌が下手なの。",
        "subtitle": "歌が下手なの。",
        "translation": "因為我不擅長唱歌。",
        "speaker": "短髮女子 · 說明理由",
        "panel": 1
      },
      {
        "text": "ここでたばこ吸ってもいい？",
        "subtitle": "ここでたばこ吸ってもいい？",
        "translation": "這裡可以抽菸嗎？",
        "speaker": "短髮女子 · 詢問許可",
        "panel": 2
      },
      {
        "text": "だめ！ここは禁煙なの。",
        "subtitle": "だめ！ここは禁煙なの。",
        "translation": "不行！這裡禁菸。",
        "speaker": "紅衣女子 · 提醒規定",
        "panel": 3
      }
    ]
  },
  {
    "id": "l4-03-contractions",
    "lesson": "l4",
    "title": "聊天時會縮短！",
    "label": "第4課 · 03",
    "grammar": "ちゃう・じゃう・とく・どく・てる",
    "caption": "吃完甜點、喝掉果汁、課前預習與保留電腦狀態，記住常見口語縮約。",
    "image": "assets/japanese-comics/l4-03-contractions.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已核對 OneNote，新增對話另有標示。",
    "panels": [
      {
        "title": "不小心吃掉了",
        "crop": "15 216 491 491",
        "alt": "第1格：短髮女子看著吃空的甜點杯，驚覺自己吃掉了甜點。",
        "label": "OneNote 原句",
        "first": 0
      },
      {
        "title": "抱歉喝掉了",
        "crop": "518 216 491 491",
        "alt": "第2格：紅衣女子拿著空飲料杯，向短髮朋友道歉。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "先預習日文",
        "crop": "15 717 491 542",
        "alt": "第3格：短髮女子翻開日文課本，在上課前先預習。",
        "label": "OneNote 原句",
        "first": 2
      },
      {
        "title": "電腦還在用",
        "crop": "518 717 491 542",
        "alt": "第4格：紅衣女子伸手碰電腦，短髮女子抬手表示自己還在使用。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "あっ！食べちゃった。",
        "subtitle": "あっ！食べちゃった。",
        "translation": "啊！已經吃掉了。",
        "speaker": "短髮女子 · 驚覺吃光",
        "panel": 0
      },
      {
        "text": "ごめん。飲んじゃった。",
        "subtitle": "ごめん。飲んじゃった。",
        "translation": "抱歉，我喝掉了。",
        "speaker": "紅衣女子 · 道歉",
        "panel": 1
      },
      {
        "text": "あとで日本語の授業があるから、予習しとこう。",
        "subtitle": "あとで日本語の授業があるから、予習しとこう。",
        "translation": "等一下有日文課，先預習吧。",
        "speaker": "短髮女子 · 課前預習",
        "panel": 2
      },
      {
        "text": "ううん、そのままにしといて！まだ使ってるの。",
        "subtitle": "ううん、そのままにしといて！まだ使ってるの。",
        "translation": "不用，先維持原樣！我還在用。",
        "speaker": "短髮女子 · 請保留原狀",
        "panel": 3
      }
    ]
  },
  {
    "id": "l4-04-causative-passive",
    "lesson": "l4",
    "title": "被迫開口唱歌",
    "label": "第4課 · 04",
    "grammar": "使役受身",
    "caption": "被朋友要求唱日文歌，理解被迫做某事的使役受身。",
    "image": "assets/japanese-comics/l4-04-causative-passive.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已核對 OneNote，新增對話另有標示。",
    "panels": [
      {
        "title": "一起去唱歌",
        "crop": "12 180 494 537",
        "alt": "第1格：三位朋友一起走進卡拉 OK 店。",
        "label": "情境開場",
        "first": 0
      },
      {
        "title": "朋友提出要求",
        "crop": "518 180 494 537",
        "alt": "第2格：紅衣朋友遞出麥克風，要求短髮女子用日文唱歌。",
        "label": "補充對話",
        "first": 1
      },
      {
        "title": "不情願地唱歌",
        "crop": "12 725 494 528",
        "alt": "第3格：短髮女子拿起麥克風唱歌，兩位朋友在旁鼓掌。",
        "label": "無日文台詞",
        "first": 2
      },
      {
        "title": "描述被迫的經驗",
        "crop": "518 725 494 528",
        "alt": "第4格：短髮女子拿著麥克風，說明自己總被要求唱日文歌。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "一起去唱卡拉 OK。",
        "translation": "看朋友們一起到店裡的情境。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "日本語で歌って！",
        "subtitle": "日本語で歌って！",
        "translation": "用日文唱吧！",
        "speaker": "紅衣朋友 · 提出要求",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "不太情願，也只好唱了。",
        "translation": "她做出唱歌的動作，但起因是朋友的要求。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "カラオケに行くと、いつも日本語の歌を歌わされる。",
        "subtitle": "カラオケに行くと、いつも日本語の歌を歌わされる。",
        "translation": "去唱卡拉 OK 時，總被要求唱日文歌。",
        "speaker": "短髮女子 · 描述被迫經驗",
        "panel": 3
      }
    ]
  },
  {
    "id": "l4-05-writing",
    "lesson": "l4",
    "title": "把日常寫成文章",
    "label": "第4課 · 05",
    "grammar": "である・中止形",
    "caption": "把參訪與生活寫成文章，辨認書面語尾與連接句子的中止形。",
    "image": "assets/japanese-comics/l4-05-writing.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已逐句核對 OneNote 原始圖片。補充對話分別標示。",
    "panels": [
      {
        "title": "走訪老建築",
        "crop": "10 209 499 525",
        "alt": "第1格：兩位女子參訪老建築，短髮女子拿著導覽資料介紹。",
        "label": "情境開場",
        "first": 0
      },
      {
        "title": "換成書面語尾",
        "crop": "517 209 498 525",
        "alt": "第2格：短髮女子坐在咖啡店寫筆記，以書面語描述建築過去的身分。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "介紹自己的生活",
        "crop": "10 744 499 519",
        "alt": "第3格：住在台灣的短髮女子透過視訊，和住在東京的家人通話。",
        "label": "無日文台詞",
        "first": 2
      },
      {
        "title": "把兩句連起來",
        "crop": "517 744 498 519",
        "alt": "第4格：短髮女子把家人的居住地和自己的工作地，連成完整句子。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "這裡以前是一座博物館。",
        "translation": "先觀察參訪情境，再看她如何寫成文章。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "ここは昔、博物館であった。",
        "subtitle": "ここは昔、博物館であった。",
        "translation": "這裡以前是一座博物館。",
        "speaker": "短髮女子 · 書面例句",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "家人住東京；我在台灣工作。",
        "translation": "兩個生活資訊，接下來合併成一句。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "家族は東京に住んでおり、私は台湾で働いています。",
        "subtitle": "家族は東京に住んでおり、私は台湾で働いています。",
        "translation": "家人住在東京，而我在台灣工作。",
        "speaker": "短髮女子 · 連接兩件事",
        "panel": 3
      }
    ]
  },
  {
    "id": "l4-06-feelings",
    "lesson": "l4",
    "title": "看出別人的心情",
    "label": "第4課 · 06",
    "grammar": "がる・たがる",
    "caption": "根據他人表露的情緒與行動，描述寂寞與想準時回家的意願。",
    "image": "assets/japanese-comics/l4-06-feelings.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已逐句核對 OneNote 原始圖片。補充對話分別標示。",
    "panels": [
      {
        "title": "說自己的感受",
        "crop": "10 209 499 535",
        "alt": "第1格：男子在咖啡店獨坐，看起來很失落，說自己感到寂寞。",
        "label": "補充對話",
        "first": 0
      },
      {
        "title": "描述他人表現",
        "crop": "517 209 498 535",
        "alt": "第2格：短髮女子和紅衣朋友談到後方獨坐的王先生，描述他分手後的寂寞表現。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "留意行動與意願",
        "crop": "10 753 499 548",
        "alt": "第3格：辦公室裡同事收拾離開，短髮女子詢問大家是否想準時回家。",
        "label": "補充對話",
        "first": 2
      },
      {
        "title": "說出觀察到的意願",
        "crop": "517 753 498 548",
        "alt": "第4格：紅衣女子回答朋友，大家都表現出想準時回家的意願。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "寂しいな。",
        "subtitle": "寂しいな。",
        "translation": "好寂寞啊。",
        "speaker": "男子 · 說自己的感受",
        "panel": 0
      },
      {
        "text": "おうさんは彼女と別れて、とても寂しがっています。",
        "subtitle": "王さんは彼女と別れて、とても寂しがっています。",
        "translation": "王先生和女朋友分手後，顯得很寂寞。",
        "speaker": "短髮女子 · 描述他人表現",
        "panel": 1
      },
      {
        "text": "みんな定時で帰りたいのかな？",
        "subtitle": "みんな定時で帰りたいのかな？",
        "translation": "大家是不是想準時回家呢？",
        "speaker": "短髮女子 · 詢問意願",
        "panel": 2
      },
      {
        "text": "そうだよ。みんな定時で帰りたがってるから。",
        "subtitle": "そうだよ。みんな定時で帰りたがってるから。",
        "translation": "對呀，因為大家都想準時回家。",
        "speaker": "紅衣女子 · 描述觀察",
        "panel": 3
      }
    ],
    "readingNote": "中文姓氏「王」讀作 おう；字幕保留原圖的「王さん」。"
  },
  {
    "id": "l4-07-nominalization",
    "lesson": "l4",
    "title": "把整件事放進句子",
    "label": "第4課 · 07",
    "grammar": "こと・ということ",
    "caption": "從家事與生活費的體驗，把整段內容轉成名詞性成分。",
    "image": "assets/japanese-comics/l4-07-nominalization.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；原句已逐句核對 OneNote 原始圖片。補充對話分別標示。",
    "panels": [
      {
        "title": "開始留學生活",
        "crop": "10 209 499 543",
        "alt": "第1格：短髮女子帶著行李搬進住處，準備開始獨自留學生活。",
        "label": "情境開場",
        "first": 0
      },
      {
        "title": "理解一件事",
        "crop": "517 209 501 543",
        "alt": "第2格：短髮女子拿著滿滿的洗衣籃，在廚房前體會到家事的辛苦。",
        "label": "OneNote 原句",
        "first": 1
      },
      {
        "title": "看著一張張帳單",
        "crop": "10 761 499 526",
        "alt": "第3格：短髮女子對著帳單、收據和錢包，思考日常生活的各種花費。",
        "label": "無日文台詞",
        "first": 2
      },
      {
        "title": "把整段內容名詞化",
        "crop": "517 761 505 526",
        "alt": "第4格：短髮女子回想獨自生活的經驗，理解各種事情都要花錢。",
        "label": "OneNote 原句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "第一次一個人住，要自己打理生活。",
        "translation": "從開始獨自生活的情境，理解接下來的體會。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "留学生活を始めて、家事が大変なことがわかった。",
        "subtitle": "留学生活を始めて、家事が大変なことがわかった。",
        "translation": "開始留學生活後，才知道做家事很辛苦。",
        "speaker": "短髮女子 · 心中體會",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "買菜、水電、生活用品，都需要錢。",
        "translation": "先看到一筆筆支出，再整理成完整的體會。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "一人で生活してから、何でもお金がかかるということを知った。",
        "subtitle": "一人で生活してから、何でもお金がかかるということを知った。",
        "translation": "獨自生活後，才知道什麼都要花錢。",
        "speaker": "短髮女子 · 心中體會",
        "panel": 3
      }
    ]
  },
  {
    "id": "l5-01-demonstratives",
    "lesson": "l5",
    "title": "你也知道那個嗎？",
    "label": "第5課 · 01",
    "grammar": "あ・そ：話題中的指示詞",
    "caption": "用共同話題和新話題，分清あ與そ。",
    "image": "assets/japanese-comics/l5-01-demonstratives.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "提起共同話題",
        "crop": "17 191 491 569",
        "alt": "第1格：青綠外套的女子在咖啡館問佐藤小姐是否知道鬍鬚張。",
        "label": "提問",
        "first": 0
      },
      {
        "title": "兩人都知道：あ",
        "crop": "519 191 490 569",
        "alt": "第2格：橘紅外套的佐藤小姐表示知道，並稱讚那裡的滷肉飯。",
        "label": "共同話題",
        "first": 1
      },
      {
        "title": "換個新話題",
        "crop": "17 773 491 545",
        "alt": "第3格：青綠外套的女子拿出手機，說 Ado 的歌很棒。",
        "label": "新話題",
        "first": 2
      },
      {
        "title": "對方還不知道：そ",
        "crop": "519 773 490 545",
        "alt": "第4格：橘紅外套的女子疑惑地問阿斗是否是臺灣人。",
        "label": "接住話題",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "佐藤さん、ひげちょうを知っていますか。",
        "subtitle": "佐藤さん、鬍鬚張を知っていますか。",
        "translation": "佐藤小姐，妳知道鬍鬚張嗎？",
        "speaker": "青綠外套女子 · 提問",
        "panel": 0
      },
      {
        "text": "ええ、あそこのルーローハンはおいしいですね。",
        "subtitle": "ええ、あそこの滷肉飯はおいしいですね。",
        "translation": "知道，那裡的滷肉飯很好吃呢。",
        "speaker": "佐藤小姐 · 共同話題",
        "panel": 1
      },
      {
        "text": "アドの歌は本当に素晴らしいです。",
        "subtitle": "Adoの歌は本当に素晴らしいです。",
        "translation": "Ado 的歌真的很棒。",
        "speaker": "青綠外套女子 · 新話題",
        "panel": 2
      },
      {
        "text": "あど？その人は台湾人ですか。",
        "subtitle": "阿斗？その人は台湾人ですか。",
        "translation": "阿斗？那個人是臺灣人嗎？",
        "speaker": "佐藤小姐 · 接住新話題",
        "panel": 3
      }
    ],
    "readingNote": "鬍鬚張依日文官網讀作 ひげちょう；滷肉飯讀作 ルーローハン。Ado／阿斗同讀「あど」，保留對話中誤聽人名的情境。"
  },
  {
    "id": "l5-02-tentative",
    "lesson": "l5",
    "title": "是不是在包包裡？",
    "label": "第5課 · 02",
    "grammar": "んじゃない？：委婉推測與建議",
    "caption": "從找錢包與休息建議，理解んじゃない的推測語氣。",
    "image": "assets/japanese-comics/l5-02-tentative.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "找不到錢包",
        "crop": "15 213 490 555",
        "alt": "第1格：青綠外套的女子摸著口袋，以為把錢包忘在家裡。",
        "label": "慌張",
        "first": 0
      },
      {
        "title": "委婉推測",
        "crop": "519 213 490 555",
        "alt": "第2格：橘紅外套的女子指著包包，委婉推測錢包可能在裡面。",
        "label": "推測",
        "first": 1
      },
      {
        "title": "打開看看",
        "crop": "15 778 490 566",
        "alt": "第3格：青綠外套的女子打開包包，開心地找到錢包。",
        "label": "找到",
        "first": 2
      },
      {
        "title": "也能提出建議",
        "crop": "519 778 490 566",
        "alt": "第4格：橘紅外套的女子對看來疲倦的朋友建議稍微休息。",
        "label": "建議",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "財布、うちに忘れた！",
        "subtitle": "財布、うちに忘れた！",
        "translation": "錢包忘在家裡了！",
        "speaker": "青綠外套女子 · 找錢包",
        "panel": 0
      },
      {
        "text": "鞄の中にあるんじゃない？",
        "subtitle": "鞄の中にあるんじゃない？",
        "translation": "會不會在包包裡？",
        "speaker": "橘紅外套女子 · 委婉推測",
        "panel": 1
      },
      {
        "text": "あった！",
        "subtitle": "あった！",
        "translation": "找到了！",
        "speaker": "青綠外套女子 · 補充對話",
        "panel": 2
      },
      {
        "text": "元気なさそうね。ちょっと休んだほうがいいんじゃない？",
        "subtitle": "元気なさそうね。ちょっと休んだほうがいいんじゃない？",
        "translation": "妳看起來沒精神，稍微休息一下比較好吧？",
        "speaker": "橘紅外套女子 · 委婉建議",
        "panel": 3
      }
    ]
  },
  {
    "id": "l5-03-location",
    "lesson": "l5",
    "title": "轉過去，就在那裡",
    "label": "第5課 · 03",
    "grammar": "たところ：移動後的地點",
    "caption": "用左轉和出站場景，分清ところに與ところで。",
    "image": "assets/japanese-comics/l5-03-location.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "在紅綠燈左轉",
        "crop": "17 145 489 596",
        "alt": "第1格：青綠外套的女子來到紅綠燈路口，箭頭提示向左轉。",
        "label": "情境",
        "first": 0
      },
      {
        "title": "地點存在：に",
        "crop": "518 145 489 596",
        "alt": "第2格：女子在郵局前說明，郵局位於紅綠燈左轉後的地方。",
        "label": "所在位置",
        "first": 1
      },
      {
        "title": "走出車站出口",
        "crop": "17 752 489 609",
        "alt": "第3格：橘紅外套的女子剛走出車站出口，準備停下等人。",
        "label": "情境",
        "first": 2
      },
      {
        "title": "在那裡做事：で",
        "crop": "518 752 489 609",
        "alt": "第4格：橘紅外套的女子在車站出口外打電話，告訴對方自己正在等。",
        "label": "動作地點",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "先走到紅綠燈，再向左轉。",
        "translation": "先看移動路線，下一格說明左轉後的地點。",
        "speaker": "情境",
        "panel": 0
      },
      {
        "text": "郵便局は信号を左に曲がったところにあります。",
        "subtitle": "郵便局は信号を左に曲がったところにあります。",
        "translation": "郵局就在紅綠燈左轉後的地方。",
        "speaker": "青綠外套女子 · 地點說明",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "先走出出口，再停下來等。",
        "translation": "移動完成後，在出口外做等待的動作。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "今、駅の出口を出たところで待っていますよ。",
        "subtitle": "今、駅の出口を出たところで待っていますよ。",
        "translation": "我現在在車站出口外面等喔。",
        "speaker": "橘紅外套女子 · 等候地點",
        "panel": 3
      }
    ]
  },
  {
    "id": "l5-04-attempt",
    "lesson": "l5",
    "title": "正要、試著、不肯",
    "label": "第5課 · 04",
    "grammar": "ようとする・ようとしない：正要與嘗試",
    "caption": "分清正要開始、試著做與不肯嘗試。",
    "image": "assets/japanese-comics/l5-04-attempt.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "正要出門",
        "crop": "11 182 498 574",
        "alt": "第1格：青綠外套的女子在家門口翻找包包，正要出門時才發現沒有鑰匙。",
        "label": "正要",
        "first": 0
      },
      {
        "title": "有試著做",
        "crop": "519 182 497 574",
        "alt": "第2格：青綠外套的女子拿著臭豆腐，說自己試著吃了但還是沒辦法。",
        "label": "嘗試",
        "first": 1
      },
      {
        "title": "完全不肯做",
        "crop": "11 765 498 578",
        "alt": "第3格：青綠外套的女子向貓招手，但貓背對著她，不肯過來。",
        "label": "不肯",
        "first": 2
      },
      {
        "title": "看情境分意思",
        "crop": "519 765 497 578",
        "alt": "第4格：女子看著門和鑰匙、臭豆腐與貓的三張圖卡，對照正要開始、努力嘗試和沒有意願。",
        "label": "整理情境",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "出かけようとしたら、鍵がないことに気がついた。",
        "subtitle": "出かけようとしたら、鍵がないことに気がついた。",
        "translation": "正要出門時，才發現沒有鑰匙。",
        "speaker": "青綠外套女子 · 心中想法",
        "panel": 0
      },
      {
        "text": "そうですね。食べようとしましたが、やっぱり無理でした。",
        "subtitle": "そうですね。食べようとしましたが、やっぱり無理でした。",
        "translation": "是啊。有試著吃，但果然還是沒辦法。",
        "speaker": "青綠外套女子 · 嘗試的結果",
        "panel": 1
      },
      {
        "text": "何度呼んでも、猫はこっちへ来ようとしない。",
        "subtitle": "何度呼んでも、猫はこっちへ来ようとしない。",
        "translation": "不管叫多少次，貓就是不肯過來。",
        "speaker": "青綠外套女子 · 沒有意願",
        "panel": 2
      },
      {
        "text": "",
        "subtitle": "正要開始、努力嘗試、沒有意願。",
        "translation": "依情境判斷是正要做、試著做，還是不肯做。",
        "speaker": "情境",
        "panel": 3
      }
    ]
  },
  {
    "id": "l5-05-inference",
    "lesson": "l5",
    "title": "是推測，還是自問？",
    "label": "第5課 · 05",
    "grammar": "だろう・のだろうか：推測與疑問",
    "caption": "辨別推測、個人看法與心中的疑問。",
    "image": "assets/japanese-comics/l5-05-inference.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "對事情做推測",
        "crop": "11 205 493 582",
        "alt": "第1格：青綠外套的女子看著手機和明天的天氣預報，推測明天會是陰天。",
        "label": "推測",
        "first": 0
      },
      {
        "title": "說出個人看法",
        "crop": "512 205 502 582",
        "alt": "第2格：青綠外套的女子和朋友談到一名打呵欠的上班族，認為他工作太忙而不能好好休息。",
        "label": "個人看法",
        "first": 1
      },
      {
        "title": "看到情況，心裡起疑",
        "crop": "11 793 493 594",
        "alt": "第3格：青綠外套的女子看著一直沒有回覆的訊息，心裡問為什麼。",
        "label": "情境",
        "first": 2
      },
      {
        "title": "のだろうか：自問",
        "crop": "512 793 502 594",
        "alt": "第4格：青綠外套的女子望著手機，心裡懷疑對方是不是已經討厭自己。",
        "label": "自問",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "天気予報によると、明日は曇りだろう。",
        "subtitle": "天気予報によると、明日は曇りだろう。",
        "translation": "依天氣預報，明天大概是陰天吧。",
        "speaker": "青綠外套女子 · 天氣推測",
        "panel": 0
      },
      {
        "text": "仕事が忙しすぎて、ゆっくり休めないだろうと思う。",
        "subtitle": "仕事が忙しすぎて、ゆっくり休めないだろうと思う。",
        "translation": "我想他大概工作太忙，沒辦法好好休息。",
        "speaker": "青綠外套女子 · 個人看法",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "訊息一直沒有回覆……",
        "translation": "看到沒有回覆的訊息，心中產生疑問。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "彼、全然返信してくれない。もう私のことが嫌いになったのだろうか。",
        "subtitle": "彼、全然返信してくれない。もう私のことが嫌いになったのだろうか。",
        "translation": "他都沒回覆，難道已經討厭我了嗎？",
        "speaker": "青綠外套女子 · 心中的疑問",
        "panel": 3
      }
    ]
  },
  {
    "id": "l5-06-particles",
    "lesson": "l5",
    "title": "把關係接到名詞前",
    "label": "第5課 · 06",
    "grammar": "助詞＋の：修飾名詞",
    "caption": "把一起、方法、對象與範圍接到名詞前。",
    "image": "assets/japanese-comics/l5-06-particles.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "和誰一起：との",
        "crop": "11 183 503 586",
        "alt": "第1格：青綠外套的女子和家人在旅行景點開心合影，回想家族旅行。",
        "label": "一起",
        "first": 0
      },
      {
        "title": "用什麼方法：での",
        "crop": "519 183 494 585",
        "alt": "第2格：青綠外套的女子用筆電在網路上預約，旁邊有完成預約的圖示。",
        "label": "方法",
        "first": 1
      },
      {
        "title": "給誰：への",
        "crop": "11 775 503 597",
        "alt": "第3格：男子手拿包好的禮物，心中想著橘紅外套的女子。",
        "label": "對象",
        "first": 2
      },
      {
        "title": "從哪裡到哪裡",
        "crop": "519 774 494 598",
        "alt": "第4格：青綠外套的女子站在車站旁，望向通往家的昏暗小路。",
        "label": "範圍",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "家族との旅行は楽しかったです。",
        "subtitle": "家族との旅行は楽しかったです。",
        "translation": "和家人一起的旅行很開心。",
        "speaker": "青綠外套女子 · 家族旅行",
        "panel": 0
      },
      {
        "text": "ネットでの予約は便利です。",
        "subtitle": "ネットでの予約は便利です。",
        "translation": "在網路上預約很方便。",
        "speaker": "青綠外套女子 · 網路預約",
        "panel": 1
      },
      {
        "text": "彼女へのプレゼントを買った。",
        "subtitle": "彼女へのプレゼントを買った。",
        "translation": "買了要送給她的禮物。",
        "speaker": "男子 · 禮物的對象",
        "panel": 2
      },
      {
        "text": "駅から家までの道は暗くて危ないです。",
        "subtitle": "駅から家までの道は暗くて危ないです。",
        "translation": "從車站到家的路很暗，有危險。",
        "speaker": "青綠外套女子 · 路線範圍",
        "panel": 3
      }
    ]
  },
  {
    "id": "supplement-indirect-request",
    "lesson": "supplement",
    "title": "轉述別人的叮嚀",
    "label": "跨課補充 · 第2課課綱",
    "grammar": "ように言う・ように言われる",
    "caption": "原例句來自第3課（2026/6/10），獨立收錄為跨課補充。",
    "image": "assets/japanese-comics/supplement-indirect-request.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "情境改編；台詞與補充例句沿用原漫畫標示。",
    "panels": [
      {
        "title": "醫生直接叮嚀",
        "crop": "17 171 991 270",
        "alt": "第1格：醫生叮嚀病人不要再喝更多酒。",
        "label": "情境改編",
        "first": 0
      },
      {
        "title": "轉述醫生的話",
        "crop": "17 451 991 300",
        "alt": "第2格：男子向朋友轉述醫生對自己的叮嚀。",
        "label": "轉述原例句",
        "first": 1
      },
      {
        "title": "把要求轉述出來",
        "crop": "17 759 991 243",
        "alt": "第3格：兩張卡片對照直接請求與被叮嚀的說法。",
        "label": "文法整理",
        "first": 2
      },
      {
        "title": "轉述老師的叮嚀",
        "crop": "17 1010 991 263",
        "alt": "第4格：學生轉述老師要求交作業的叮嚀。",
        "label": "補充例句",
        "first": 3
      }
    ],
    "cues": [
      {
        "text": "もうこれ以上お酒を飲まないでください。",
        "subtitle": "もうこれ以上お酒を飲まないでください。",
        "translation": "請不要再喝更多酒了。",
        "speaker": "醫生 · 直接叮嚀",
        "panel": 0
      },
      {
        "text": "医者にもうこれ以上お酒を飲まないように言われました。",
        "subtitle": "医者にもうこれ以上お酒を飲まないように言われました。",
        "translation": "醫生叮嚀我不要再喝更多酒了。",
        "speaker": "男子 · 轉述醫生叮嚀",
        "panel": 1
      },
      {
        "text": "",
        "subtitle": "別人要求我做／不要做某件事",
        "translation": "把直接要求改為「ように言われました」的轉述。",
        "speaker": "情境",
        "panel": 2
      },
      {
        "text": "先生に、宿題を出すように言われました。",
        "subtitle": "先生に、宿題を出すように言われました。",
        "translation": "老師叮嚀我交作業。",
        "speaker": "學生 · 轉述老師叮嚀",
        "panel": 3
      }
    ]
  },
  {
    "id": "j1-01-existence",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "東西在哪裡？誰在教室？",
    "label": "初級複習 J1 · 01",
    "grammar": "あります・います",
    "caption": "問東西在哪裡用あります，問誰在場用います。",
    "image": "assets/japanese-comics/j1-01-existence.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "詢問書的位置",
        "crop": "12 134 1002 307",
        "alt": "第1格：書在哪裡？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "書在桌上",
        "crop": "12 450 1002 301",
        "alt": "第2格：在桌上。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "詢問教室裡的人",
        "crop": "12 762 1002 290",
        "alt": "第3格：教室裡有誰？",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "老師在裡面",
        "crop": "12 1063 1002 356",
        "alt": "第4格：老師在裡面。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "ほんはどこにありますか。",
        "subtitle": "本はどこにありますか。",
        "translation": "書在哪裡？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "つくえのうえにあります。",
        "subtitle": "机の上にあります。",
        "translation": "在桌上。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "きょうしつにだれがいますか。",
        "subtitle": "教室に誰がいますか。",
        "translation": "教室裡有誰？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "せんせいがいます。",
        "subtitle": "先生がいます。",
        "translation": "老師在裡面。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "台詞與原筆記例句標示依原圖保留；字幕保留漢字，朗讀使用已核對的日文讀音。"
  },
  {
    "id": "j1-02-time-date",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "約好日期，也要聽對時間",
    "label": "初級複習 J1 · 02",
    "grammar": "時間・日期讀法",
    "caption": "在約時間的情境裡，練習四月四日、四時與九時的讀音。",
    "image": "assets/japanese-comics/j1-02-time-date.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：依時間與日期讀法延伸的4句情境補充，並非原筆記逐字例句。",
    "panels": [
      {
        "title": "確認日期",
        "crop": "7 122 1011 305",
        "alt": "第1格：是四月四日嗎？",
        "first": 0,
        "label": "情境補充"
      },
      {
        "title": "確認下午四點",
        "crop": "7 437 1011 303",
        "alt": "第2格：對，下午四點。",
        "first": 1,
        "label": "情境補充"
      },
      {
        "title": "不是九點",
        "crop": "7 749 1011 318",
        "alt": "第3格：不是九點，對吧。",
        "first": 2,
        "label": "情境補充"
      },
      {
        "title": "約好四點見",
        "crop": "7 1076 1011 401",
        "alt": "第4格：對，四點見吧。",
        "first": 3,
        "label": "情境補充"
      }
    ],
    "cues": [
      {
        "text": "しがつよっかですか。",
        "subtitle": "四月四日ですか。",
        "translation": "是四月四日嗎？",
        "speaker": "第1格 · 情境補充例句",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "情境補充例句"
      },
      {
        "text": "はい。ごごよじです。",
        "subtitle": "はい。午後四時です。",
        "translation": "對，下午四點。",
        "speaker": "第2格 · 情境補充例句",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "情境補充例句"
      },
      {
        "text": "くじじゃありませんね。",
        "subtitle": "九時じゃありませんね。",
        "translation": "不是九點，對吧。",
        "speaker": "第3格 · 情境補充例句",
        "panel": 2,
        "sourceKind": "added",
        "sourceLabel": "情境補充例句"
      },
      {
        "text": "はい、よじにあいましょう。",
        "subtitle": "はい、四時に会いましょう。",
        "translation": "對，四點見吧。",
        "speaker": "第4格 · 情境補充例句",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "情境補充例句"
      }
    ],
    "readingNote": "日期「四月四日」讀しがつよっか；「四時」讀よじ，「九時」讀くじ。本張四句均為情境補充例句。"
  },
  {
    "id": "j1-03-counters",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "有幾個？吃了幾個？",
    "label": "初級複習 J1 · 03",
    "grammar": "量詞＋あります・動作",
    "caption": "用いくつ詢問數量，量詞直接接存在或動作。",
    "image": "assets/japanese-comics/j1-03-counters.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "詢問紅筆數量",
        "crop": "6 144 1012 291",
        "alt": "第1格：紅筆有幾枝？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "有兩枝",
        "crop": "6 440 1012 299",
        "alt": "第2格：有兩枝。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "早餐吃了什麼",
        "crop": "6 745 1012 302",
        "alt": "第3格：今天早上吃了什麼？",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "吃了兩個麵包",
        "crop": "6 1052 1012 360",
        "alt": "第4格：吃了兩個麵包。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "あかいペンはいくつありますか。",
        "subtitle": "赤いペンはいくつありますか。",
        "translation": "紅筆有幾枝？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "ふたつあります。",
        "subtitle": "2つあります。",
        "translation": "有兩枝。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "けさ、なにをたべましたか。",
        "subtitle": "けさ、何を食べましたか。",
        "translation": "今天早上吃了什麼？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "パンをふたつたべました。",
        "subtitle": "パンを2つ食べました。",
        "translation": "吃了兩個麵包。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "「2つ」讀ふたつ。字幕保留原圖數字。"
  },
  {
    "id": "j1-04-duration-frequency",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "多久一次？要花多久？",
    "label": "初級複習 J1 · 04",
    "grammar": "時間長度・頻率",
    "caption": "分清花費的時間長度，以及一段時間內的次數。",
    "image": "assets/japanese-comics/j1-04-duration-frequency.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "詢問花費多久",
        "crop": "9 134 1006 320",
        "alt": "第1格：從台灣到日本要花多久？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "三個小時",
        "crop": "9 464 1006 257",
        "alt": "第2格：搭飛機要三個小時。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "一小時五次",
        "crop": "9 730 1006 331",
        "alt": "第3格：一小時傳五次LINE給他。",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "一個月兩次",
        "crop": "9 1071 1006 373",
        "alt": "第4格：一個月看兩次電影。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "たいわんからにほんまで、どのくらいかかりますか。",
        "subtitle": "台湾から日本まで、どのくらいかかりますか。",
        "translation": "從台灣到日本要花多久？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "ひこうきでさんじかんかかります。",
        "subtitle": "飛行機で3時間かかります。",
        "translation": "搭飛機要三個小時。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "いちじかんにごかい、かれにラインをします。",
        "subtitle": "1時間に5回、彼にラインをします。",
        "translation": "一小時傳五次LINE給他。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "いっかげつににかい、えいがをみます。",
        "subtitle": "1か月に2回、映画を見ます。",
        "translation": "一個月看兩次電影。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "「1か月」讀いっかげつ；此處飛行時間沿用教材情境，不代表實際航班時間。"
  },
  {
    "id": "j1-05-quantity-limits",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "大約、只有、少得可惜",
    "label": "初級複習 J1 · 05",
    "grammar": "ぐらい・だけ・しか",
    "caption": "ぐらい表示大約，だけ限定數量，しか搭配否定。",
    "image": "assets/japanese-comics/j1-05-quantity-limits.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：5句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "每天睡多久",
        "crop": "0 122 1024 311",
        "alt": "第1格：每天睡幾個小時？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "大約八小時",
        "crop": "0 442 1024 310",
        "alt": "第2格：大約睡八小時。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "午休休息多久",
        "crop": "0 763 1024 289",
        "alt": "第3格：午休休息了多久？",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "只有三十分與五分鐘",
        "crop": "0 1063 1024 391",
        "alt": "第4格：只休息了三十分鐘。 只休息了五分鐘。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "まいにち、なんじかんねますか。",
        "subtitle": "毎日、何時間寝ますか。",
        "translation": "每天睡幾個小時？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "はちじかんぐらいねます。",
        "subtitle": "8時間ぐらい寝ます。",
        "translation": "大約睡八小時。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "ひるやすみ、どのくらいやすみましたか。",
        "subtitle": "昼休み、どのくらい休みましたか。",
        "translation": "午休休息了多久？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "さんじゅっぷんだけやすみました。",
        "subtitle": "30分だけ休みました。",
        "translation": "只休息了三十分鐘。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "ごふんしかやすみませんでした。",
        "subtitle": "5分しか休みませんでした。",
        "translation": "只休息了五分鐘。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "「30分」讀さんじゅっぷん，「5分」讀ごふん。第4格有兩句，依左、右順序分開朗讀。"
  },
  {
    "id": "j1-06-quantity-emphasis",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "竟然五個，至少這麼多",
    "label": "初級複習 J1 · 06",
    "grammar": "數量＋も・は",
    "caption": "數量加も表示超過預期，加は表示最低限度。",
    "image": "assets/japanese-comics/j1-06-quantity-emphasis.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "吃了五個蛋糕",
        "crop": "0 131 1024 335",
        "alt": "第1格：我吃了五個蛋糕喔。",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "竟然五個",
        "crop": "0 479 1024 283",
        "alt": "第2格：哇，竟然吃了五個！",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "詢問新車費用",
        "crop": "0 774 1024 330",
        "alt": "第3格：新車要花多少錢？",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "至少九十萬日圓",
        "crop": "0 1116 1024 336",
        "alt": "第4格：至少要九十萬日圓。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "ケーキをいつつたべましたよ。",
        "subtitle": "ケーキを5つ食べましたよ。",
        "translation": "我吃了五個蛋糕喔。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "へえ、いつつもたべましたか！",
        "subtitle": "へ～5つも食べましたか！",
        "translation": "哇，竟然吃了五個！",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "あたらしいくるまはいくらかかりますか。",
        "subtitle": "新しい車はいくらかかりますか。",
        "translation": "新車要花多少錢？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "きゅうじゅうまんえんはかかります。",
        "subtitle": "90万円はかかります。",
        "translation": "至少要九十萬日圓。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "「5つ」讀いつつ，「90万円」讀きゅうじゅうまんえん。價格是教材例句。"
  },
  {
    "id": "j1-07-adjective-negative",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "不熱，也不是很有名",
    "label": "初級複習 J1 · 07",
    "grammar": "い・な形容詞否定",
    "caption": "從天氣與歌手的對話，練習い・な形容詞否定。",
    "image": "assets/japanese-comics/j1-07-adjective-negative.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "九月的天氣",
        "crop": "0 162 1024 330",
        "alt": "第1格：九月的日本熱嗎？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "不太熱",
        "crop": "0 501 1024 251",
        "alt": "第2格：不，不太熱。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "詢問歌手知名度",
        "crop": "0 760 1024 330",
        "alt": "第3格：那位歌手有名嗎？",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "一點也不出名",
        "crop": "0 1097 1024 325",
        "alt": "第4格：不，一點也不出名。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "くがつのにほんはあついですか。",
        "subtitle": "9月の日本は暑いですか。",
        "translation": "九月的日本熱嗎？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "いえ、あまりあつくないです。",
        "subtitle": "いえ、あまり暑くないです。",
        "translation": "不，不太熱。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "あのかしゅはゆうめいですか。",
        "subtitle": "あの歌手は有名ですか。",
        "translation": "那位歌手有名嗎？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "いえ、ぜんぜんゆうめいじゃありません。",
        "subtitle": "いえ、全然有名じゃありません。",
        "translation": "不，一點也不出名。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "「9月」讀くがつ；天氣敘述為教材對話情境。"
  },
  {
    "id": "j1-08-adjective-past",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "昨天忙嗎？祭典熱鬧嗎？",
    "label": "初級複習 J1 · 08",
    "grammar": "形容詞過去式",
    "caption": "用昨天與祭典的情境，練習形容詞過去肯定與否定。",
    "image": "assets/japanese-comics/j1-08-adjective-past.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "昨天很忙",
        "crop": "13 158 999 284",
        "alt": "第1格：昨天很忙。",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "昨天不忙",
        "crop": "13 451 999 305",
        "alt": "第2格：昨天不忙。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "祭典很熱鬧",
        "crop": "13 765 999 321",
        "alt": "第3格：祭典很熱鬧。",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "祭典不熱鬧",
        "crop": "13 1094 999 354",
        "alt": "第4格：祭典不熱鬧。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "きのう、いそがしかったです。",
        "subtitle": "昨日、忙しかったです。",
        "translation": "昨天很忙。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "きのう、いそがしくなかったです。",
        "subtitle": "昨日、忙しくなかったです。",
        "translation": "昨天不忙。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "まつりはにぎやかでした。",
        "subtitle": "祭りはにぎやかでした。",
        "translation": "祭典很熱鬧。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "まつりはにぎやかじゃありませんでした。",
        "subtitle": "祭りはにぎやかじゃありませんでした。",
        "translation": "祭典不熱鬧。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "台詞與原筆記例句標示依原圖保留；字幕保留漢字，朗讀使用已核對的日文讀音。"
  },
  {
    "id": "j1-09-adjective-link",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "又冷又有風，還能怎麼說？",
    "label": "初級複習 J1 · 09",
    "grammar": "くて・で 連接",
    "caption": "い形容詞用くて，な形容詞與名詞用で連接。",
    "image": "assets/japanese-comics/j1-09-adjective-link.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "北海道的旅行",
        "crop": "1 140 1022 306",
        "alt": "第1格：北海道怎麼樣？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "風強又冷",
        "crop": "1 454 1022 305",
        "alt": "第2格：風很強，也很冷。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "台北101的特色",
        "crop": "1 768 1022 346",
        "alt": "第3格：台北101很高、很有名，交通也便利。",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "四十歲與單身",
        "crop": "1 1122 1022 303",
        "alt": "第4格：那個人四十歲，目前單身。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "ほっかいどうはどうでしたか。",
        "subtitle": "北海道はどうでしたか。",
        "translation": "北海道怎麼樣？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "かぜがつよくて、さむかったです。",
        "subtitle": "風が強くて、寒かったです。",
        "translation": "風很強，也很冷。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "たいぺいいちまるいちはたかくて、ゆうめいで、こうつうもべんりです。",
        "subtitle": "台北101は高くて、有名で、交通も便利です。",
        "translation": "台北101很高、很有名，交通也便利。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "あのひとはよんじゅっさいで、どくしんです。",
        "subtitle": "あの人は40歳で、独身です。",
        "translation": "那個人四十歲，目前單身。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "「台北101」讀たいぺいいちまるいち；「40歳」讀よんじゅっさい。"
  },
  {
    "id": "j1-10-topic-part",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "大象的鼻子，她的眼睛",
    "label": "初級複習 J1 · 10",
    "grammar": "全體は＋部分が",
    "caption": "先用は提出整體，再用が描述某個部分的特徵。",
    "image": "assets/japanese-comics/j1-10-topic-part.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：2句原筆記例句、2句情境補充。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "這是什麼動物",
        "crop": "13 127 999 319",
        "alt": "第1格：這是什麼動物？",
        "first": 0,
        "label": "情境補充"
      },
      {
        "title": "大象的鼻子",
        "crop": "13 455 999 326",
        "alt": "第2格：大象的鼻子很長。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "她是什麼樣的人",
        "crop": "13 788 999 318",
        "alt": "第3格：她是什麼樣的人？",
        "first": 2,
        "label": "情境補充"
      },
      {
        "title": "她的眼睛",
        "crop": "13 1113 999 327",
        "alt": "第4格：她的眼睛很大。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "このどうぶつはなんですか。",
        "subtitle": "この動物は何ですか。",
        "translation": "這是什麼動物？",
        "speaker": "第1格 · 情境補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "情境補充"
      },
      {
        "text": "ぞうははながながいです。",
        "subtitle": "象は鼻が長いです。",
        "translation": "大象的鼻子很長。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "かのじょはどんなひとですか。",
        "subtitle": "彼女はどんな人ですか。",
        "translation": "她是什麼樣的人？",
        "speaker": "第3格 · 情境補充",
        "panel": 2,
        "sourceKind": "added",
        "sourceLabel": "情境補充"
      },
      {
        "text": "かのじょはめがおおきいです。",
        "subtitle": "彼女は目が大きいです。",
        "translation": "她的眼睛很大。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "台詞與原筆記例句標示依原圖保留；字幕保留漢字，朗讀使用已核對的日文讀音。"
  },
  {
    "id": "j1-11-become-make",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "變成這樣，還是把它變好？",
    "label": "初級複習 J1 · 11",
    "grammar": "なる・する",
    "caption": "なる說狀態轉變，する說自己動手改變。",
    "image": "assets/japanese-comics/j1-11-become-make.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：3句原筆記例句、1句情境補充。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "頭髮變長了",
        "crop": "8 133 1009 307",
        "alt": "第1格：頭髮變長了。",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "想把頭髮剪短",
        "crop": "8 448 1009 325",
        "alt": "第2格：頭髮變長了，所以想剪短。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "房間變乾淨了",
        "crop": "8 781 1009 333",
        "alt": "第3格：房間變乾淨了。",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "自己動手整理",
        "crop": "8 1122 1009 352",
        "alt": "第4格：我要把房間整理乾淨。",
        "first": 3,
        "label": "情境補充"
      }
    ],
    "cues": [
      {
        "text": "かみがながくなりました。",
        "subtitle": "髪が長くなりました。",
        "translation": "頭髮變長了。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "かみがながくなりましたから、みじかくしたいです。",
        "subtitle": "髪が長くなりましたから、短くしたいです。",
        "translation": "頭髮變長了，所以想剪短。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "へやがきれいになりました。",
        "subtitle": "部屋がきれいになりました。",
        "translation": "房間變乾淨了。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "へやをきれいにします。",
        "subtitle": "部屋をきれいにします。",
        "translation": "我要把房間整理乾淨。",
        "speaker": "第4格 · 情境補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "情境補充"
      }
    ],
    "readingNote": "第4格是另一天的情境補充，用する表示主動改變。"
  },
  {
    "id": "j1-12-comparison",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "哪個比較難？兩個都難！",
    "label": "初級複習 J1 · 12",
    "grammar": "より・のほうが・どちらも",
    "caption": "用どちら提問，再用のほうが、より比較兩者。",
    "image": "assets/japanese-comics/j1-12-comparison.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "哪個比較難",
        "crop": "11 157 1003 301",
        "alt": "第1格：日文和英文，哪個比較難？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "日文比較難",
        "crop": "11 468 1003 294",
        "alt": "第2格：日文比較難。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "兩個都難",
        "crop": "11 772 1003 283",
        "alt": "第3格：兩個都難。",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "用より再說一次",
        "crop": "11 1065 1003 326",
        "alt": "第4格：比起英文，日文更難。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "にほんごとえいごとどちらがむずかしいですか。",
        "subtitle": "日本語と英語とどちらが難しいですか。",
        "translation": "日文和英文，哪個比較難？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "にほんごのほうがむずかしいです。",
        "subtitle": "日本語のほうが難しいです。",
        "translation": "日文比較難。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "どちらもむずかしいです。",
        "subtitle": "どちらも難しいです。",
        "translation": "兩個都難。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "えいごよりにほんごのほうがむずかしいです。",
        "subtitle": "英語より日本語のほうが難しいです。",
        "translation": "比起英文，日文更難。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "第3格是另一位角色的意見；第4格重述第2格的比較。"
  },
  {
    "id": "j1-13-superlative",
    "lesson": "j1",
    "series": "beginner-review",
    "title": "最喜歡哪個？哪裡最熱鬧？",
    "label": "初級複習 J1 · 13",
    "grammar": "範圍で＋いちばん",
    "caption": "用で圈出比較範圍，再用いちばん說最喜歡或最突出。",
    "image": "assets/japanese-comics/j1-13-superlative.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J1：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "最喜歡的水果",
        "crop": "11 111 1003 308",
        "alt": "第1格：水果中最喜歡什麼？",
        "first": 0,
        "label": "原句"
      },
      {
        "title": "最喜歡蘋果",
        "crop": "11 428 1003 297",
        "alt": "第2格：最喜歡蘋果。",
        "first": 1,
        "label": "原句"
      },
      {
        "title": "哪裡最熱鬧",
        "crop": "11 735 1003 369",
        "alt": "第3格：日本哪裡最熱鬧？",
        "first": 2,
        "label": "原句"
      },
      {
        "title": "教材裡的回答",
        "crop": "11 1114 1003 345",
        "alt": "第4格：東京最熱鬧。",
        "first": 3,
        "label": "原句"
      }
    ],
    "cues": [
      {
        "text": "くだものでなにがいちばんすきですか。",
        "subtitle": "果物で何がいちばん好きですか。",
        "translation": "水果中最喜歡什麼？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "りんごがいちばんすきです。",
        "subtitle": "リンゴがいちばん好きです。",
        "translation": "最喜歡蘋果。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "にほんでどこがいちばんにぎやかですか。",
        "subtitle": "日本でどこがいちばんにぎやかですか。",
        "translation": "日本哪裡最熱鬧？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      },
      {
        "text": "とうきょうがいちばんにぎやかです。",
        "subtitle": "東京がいちばんにぎやかです。",
        "translation": "東京最熱鬧。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句"
      }
    ],
    "readingNote": "本張保留教材問答；「東京最熱鬧」是教材示例，不是現況排名。"
  },
  {
    "id": "j2-01-ongoing-work-study",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "工作與學習，也用ています",
    "label": "初級複習 J2 · 01",
    "grammar": "ています：持續中的活動",
    "caption": "這裡的「ています」也可說明持續中的工作、事業或學習。",
    "image": "assets/japanese-comics/j2-01-ongoing-work-study.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "持續的工作",
        "crop": "10 134 1004 312",
        "alt": "第1格：我是老師。我在文化大學教日文。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "詢問公司業務",
        "crop": "10 451 1004 313",
        "alt": "第2格：豐田是做什麼的公司？",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "公司正在經營的事業",
        "crop": "10 770 1004 310",
        "alt": "第3格：豐田是汽車公司，製造汽車。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "持續的學習",
        "crop": "10 1086 1004 307",
        "alt": "第4格：我在文化大學學日文。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "わたしはきょうしです。ぶんかだいがくでにほんごをおしえています。",
        "subtitle": "私は教師です。文化大学で日本語を教えています。",
        "translation": "我是老師。我在文化大學教日文。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "トヨタはなんのかいしゃですか。",
        "subtitle": "トヨタは何の会社ですか。",
        "translation": "豐田是做什麼的公司？",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "トヨタはくるまのかいしゃで、くるまをつくっています。",
        "subtitle": "トヨタは車の会社で、車を造っています。",
        "translation": "豐田是汽車公司，製造汽車。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "わたしはぶんかだいがくでにほんごをべんきょうしています。",
        "subtitle": "私は文化大学で日本語を勉強しています。",
        "translation": "我在文化大學學日文。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "字幕保留原圖漢字，朗讀依核對過的日文讀音。原句與補充標示依原圖保留。"
  },
  {
    "id": "j2-02-knowing",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "你知道嗎？我不知道",
    "label": "初級複習 J2 · 02",
    "grammar": "知っています・知りません",
    "caption": "一般問答：知道用「知っています」，不知道用「知りません」。",
    "image": "assets/japanese-comics/j2-02-knowing.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：3句原筆記例句。1格情境／解說不朗讀。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "先向同學詢問",
        "crop": "7 140 1011 316",
        "alt": "第1格：想寄信給老師，先問同學。",
        "first": 0,
        "label": "情境說明",
        "skipAudio": true
      },
      {
        "title": "知道地址嗎",
        "crop": "7 465 1011 317",
        "alt": "第2格：你知道老師的地址嗎？",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "知道的回答",
        "crop": "7 789 1011 304",
        "alt": "第3格：知道。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "不知道的回答",
        "crop": "7 1101 1011 326",
        "alt": "第4格：不，我不知道。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "",
        "subtitle": "想寄信給老師，先問同學。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第1格 · 情境說明",
        "panel": 0,
        "sourceKind": "editorial",
        "sourceLabel": "情境說明",
        "skipAudio": true
      },
      {
        "text": "せんせいのじゅうしょをしっていますか。",
        "subtitle": "先生の住所を知っていますか。",
        "translation": "你知道老師的地址嗎？",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "はい、しっています。",
        "subtitle": "はい、知っています。",
        "translation": "知道。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "いえ、しりません。",
        "subtitle": "いえ、知りません。",
        "translation": "不，我不知道。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "第1格是情境說明，沒有日文台詞；第3、4格是不同同學的兩種回答，並非同一人先後改口。"
  },
  {
    "id": "j2-03-tie-and-simultaneous",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "打著領帶／一邊打領帶",
    "label": "初級複習 J2 · 03",
    "grammar": "て：狀態・ながら：同時動作",
    "caption": "先看情境：維持的狀態，還是同時進行的動作？",
    "image": "assets/japanese-comics/j2-03-tie-and-simultaneous.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：2句原筆記例句。2格情境／解說不朗讀。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "打著領帶去公司",
        "crop": "9 149 1006 321",
        "alt": "第1格：我每天打著領帶去公司。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "穿戴的狀態",
        "crop": "9 480 1006 255",
        "alt": "第2格：「打著領帶」是去公司時維持的穿戴狀態。",
        "first": 1,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "一邊打領帶一邊看鏡子",
        "crop": "9 744 1006 309",
        "alt": "第3格：我一邊打領帶，一邊看鏡子。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "同時做兩件事",
        "crop": "9 1063 1006 327",
        "alt": "第4格：「ながら」把同一個人同時做的兩件事連起來。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "まいにちネクタイをしてかいしゃにいきます。",
        "subtitle": "毎日ネクタイをして会社に行きます。",
        "translation": "我每天打著領帶去公司。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "「打著領帶」是去公司時維持的穿戴狀態。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第2格 · 解說",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "ネクタイをしながらかがみをみています。",
        "subtitle": "ネクタイをしながら鏡を見ています。",
        "translation": "我一邊打領帶，一邊看鏡子。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "「ながら」把同一個人同時做的兩件事連起來。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第4格 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第1格是已打好領帶的狀態；第3格回到出門前，呈現邊打領帶邊看鏡子的動作。第2、4格只供閱讀，不朗讀。"
  },
  {
    "id": "j2-04-te-ta-forms",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "先變て形，再換成た形",
    "label": "初級複習 J2 · 04",
    "grammar": "動詞變化",
    "caption": "た形變化大致同て形：て↔た、で↔だ",
    "image": "assets/japanese-comics/j2-04-te-ta-forms.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：依原筆記規則延伸的4組補充，並非原筆記逐字例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "行きます的例外",
        "crop": "11 158 1003 295",
        "alt": "第1格：去：行きます是例外",
        "first": 0,
        "label": "依原筆記規則補充",
        "skipAudio": false
      },
      {
        "title": "書きます的音便",
        "crop": "11 463 1003 312",
        "alt": "第2格：寫：き→いて／いた",
        "first": 1,
        "label": "依原筆記規則補充",
        "skipAudio": false
      },
      {
        "title": "食べます的變化",
        "crop": "11 784 1003 314",
        "alt": "第3格：吃：去ます，加て／た",
        "first": 2,
        "label": "依原筆記規則補充",
        "skipAudio": false
      },
      {
        "title": "します的變化",
        "crop": "11 1106 1003 332",
        "alt": "第4格：做：して／した",
        "first": 3,
        "label": "依原筆記規則補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "いきます、いって、いった。",
        "subtitle": "行きます → 行って → 行った",
        "translation": "去：行きます是例外",
        "speaker": "第1格 · 依原筆記規則補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "依原筆記規則補充",
        "skipAudio": false
      },
      {
        "text": "かきます、かいて、かいた。",
        "subtitle": "書きます → 書いて → 書いた",
        "translation": "寫：き→いて／いた",
        "speaker": "第2格 · 依原筆記規則補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "依原筆記規則補充",
        "skipAudio": false
      },
      {
        "text": "たべます、たべて、たべた。",
        "subtitle": "食べます → 食べて → 食べた",
        "translation": "吃：去ます，加て／た",
        "speaker": "第3格 · 依原筆記規則補充",
        "panel": 2,
        "sourceKind": "added",
        "sourceLabel": "依原筆記規則補充",
        "skipAudio": false
      },
      {
        "text": "します、して、した。",
        "subtitle": "します → して → した",
        "translation": "做：して／した",
        "speaker": "第4格 · 依原筆記規則補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "依原筆記規則補充",
        "skipAudio": false
      }
    ],
    "readingNote": "四組變化是依原筆記規則補充，均保留補充標示；箭頭以停頓朗讀。行きます的て形是行って。"
  },
  {
    "id": "j2-05-try-and-return",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "試穿看看，再去打個電話",
    "label": "初級複習 J2 · 05",
    "grammar": "てみます・て来ます",
    "caption": "てみる：試做｜て来る：做完再回來",
    "image": "assets/japanese-comics/j2-05-try-and-return.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：2句原筆記例句、2句補充例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "可以試穿嗎",
        "crop": "14 128 997 321",
        "alt": "第1格：這件大衣可以試穿看看嗎？",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "店員答應",
        "crop": "14 457 997 322",
        "alt": "第2格：可以，請試穿。",
        "first": 1,
        "label": "情境補充",
        "skipAudio": false
      },
      {
        "title": "去打電話再回來",
        "crop": "14 786 997 332",
        "alt": "第3格：不好意思，我去打個電話就回來。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "在這裡等你",
        "crop": "14 1124 997 315",
        "alt": "第4格：好，我等你。",
        "first": 3,
        "label": "情境補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "このコート、きてみてもいいですか。",
        "subtitle": "このコート、着てみてもいいですか。",
        "translation": "這件大衣可以試穿看看嗎？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "はい、どうぞ。",
        "subtitle": "はい、どうぞ。",
        "translation": "可以，請試穿。",
        "speaker": "第2格 · 情境補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      },
      {
        "text": "すみません、ちょっとでんわしてきます。",
        "subtitle": "すみません、ちょっと電話して来ます。",
        "translation": "不好意思，我去打個電話就回來。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "はい、まっています。",
        "subtitle": "はい、待っています。",
        "translation": "好，我等你。",
        "speaker": "第4格 · 情境補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      }
    ],
    "readingNote": "字幕保留原圖漢字，朗讀依核對過的日文讀音。原句與補充標示依原圖保留。"
  },
  {
    "id": "j2-06-after-and-first",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "做完之後，先做好再做",
    "label": "初級複習 J2 · 06",
    "grammar": "あとで・てから",
    "caption": "あとで：A之後B｜てから：先完成A，再B",
    "image": "assets/japanese-comics/j2-06-after-and-first.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：3句原筆記例句、1句補充例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "詢問晚餐時間",
        "crop": "7 119 1009 331",
        "alt": "第1格：平常幾點吃晚餐？",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "打工之後吃",
        "crop": "7 455 1009 321",
        "alt": "第2格：打工結束後吃。",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "先洗手再吃飯",
        "crop": "7 781 1009 331",
        "alt": "第3格：請先洗手再吃飯。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "先把手洗好",
        "crop": "7 1118 1009 332",
        "alt": "第4格：好，我先洗手。",
        "first": 3,
        "label": "情境補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "いつもなんじにばんごはんをたべる？",
        "subtitle": "いつも何時に晩ごはんを食べる？",
        "translation": "平常幾點吃晚餐？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "アルバイトのあとでたべる。",
        "subtitle": "アルバイトのあとで食べる。",
        "translation": "打工結束後吃。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "てをあらってからごはんをたべてください。",
        "subtitle": "手を洗ってからご飯を食べてください。",
        "translation": "請先洗手再吃飯。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "はい、さきにてをあらいます。",
        "subtitle": "はい、先に手を洗います。",
        "translation": "好，我先洗手。",
        "speaker": "第4格 · 情境補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      }
    ],
    "readingNote": "字幕保留原圖漢字，朗讀依核對過的日文讀音。原句與補充標示依原圖保留。"
  },
  {
    "id": "j2-07-experience",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "做過嗎？一次也沒有！",
    "label": "初級複習 J2 · 07",
    "grammar": "たことがあります",
    "caption": "經驗：たことがある｜一次也沒有：一度もない",
    "image": "assets/japanese-comics/j2-07-experience.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：2句原筆記例句、2句補充例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "爬過富士山嗎",
        "crop": "10 132 1005 290",
        "alt": "第1格：爬過富士山嗎？",
        "first": 0,
        "label": "依原句型補充",
        "skipAudio": false
      },
      {
        "title": "有過一次",
        "crop": "10 425 1005 299",
        "alt": "第2格：有，爬過一次。",
        "first": 1,
        "label": "依原句型補充",
        "skipAudio": false
      },
      {
        "title": "吃過臭豆腐嗎",
        "crop": "10 729 1005 327",
        "alt": "第3格：佐藤先生，你吃過臭豆腐嗎？",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "一次也沒有",
        "crop": "10 1060 1005 368",
        "alt": "第4格：沒有，一次也沒有。很想嚐嚐看。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "ふじさんにのぼったことがありますか。",
        "subtitle": "富士山に登ったことがありますか。",
        "translation": "爬過富士山嗎？",
        "speaker": "第1格 · 依原句型補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "依原句型補充",
        "skipAudio": false
      },
      {
        "text": "ええ、いちどあります。",
        "subtitle": "ええ、一度あります。",
        "translation": "有，爬過一次。",
        "speaker": "第2格 · 依原句型補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "依原句型補充",
        "skipAudio": false
      },
      {
        "text": "さとうさん、しゅうとうふをたべたことがありますか。",
        "subtitle": "佐藤さん、臭豆腐を食べたことがありますか。",
        "translation": "佐藤先生，你吃過臭豆腐嗎？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "いえ、いちどもありません。ぜひたべたいです。",
        "subtitle": "いえ、一度もありません。ぜひ食べたいです。",
        "translation": "沒有，一次也沒有。很想嚐嚐看。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "「臭豆腐」讀しゅうとうふ；富士山問答是依原句型補充，臭豆腐問答保留原筆記例句。"
  },
  {
    "id": "j2-08-representative-actions",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "看電視、做菜，還做了別的",
    "label": "初級複習 J2 · 08",
    "grammar": "たり～たりします",
    "caption": "たり：列舉例子｜時態放最後的します",
    "image": "assets/japanese-comics/j2-08-representative-actions.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：1句原筆記例句、2句補充例句。1格情境／解說不朗讀。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "昨天做了什麼",
        "crop": "8 132 1010 293",
        "alt": "第1格：昨天做了什麼？",
        "first": 0,
        "label": "情境補充",
        "skipAudio": false
      },
      {
        "title": "舉出看電視與做菜",
        "crop": "8 434 1010 334",
        "alt": "第2格：昨天看看電視、做做菜等等。",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "列舉代表例子",
        "crop": "8 778 1010 315",
        "alt": "第3格：たり只舉代表例，不必把全部活動列完。",
        "first": 2,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "今天的代表活動",
        "crop": "8 1103 1010 319",
        "alt": "第4格：今天會看看書、聽聽音樂等等。",
        "first": 3,
        "label": "情境補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "きのうはなにをしましたか。",
        "subtitle": "昨日は何をしましたか。",
        "translation": "昨天做了什麼？",
        "speaker": "第1格 · 情境補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      },
      {
        "text": "きのうテレビをみたりりょうりをしたりしました。",
        "subtitle": "昨日テレビを見たり料理をしたりしました。",
        "translation": "昨天看看電視、做做菜等等。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "たり只舉代表例，不必把全部活動列完。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第3格 · 解說",
        "panel": 2,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "きょうはほんをよんだり、おんがくをきいたりします。",
        "subtitle": "今日は本を読んだり、音楽を聞いたりします。",
        "translation": "今天會看看書、聽聽音樂等等。",
        "speaker": "第4格 · 情境補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      }
    ],
    "readingNote": "第3格為解說，只供閱讀；たり列出代表活動，不表示只有圖中的兩件事。"
  },
  {
    "id": "j2-09-giving-objects",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "我送出、他送來、我收到",
    "label": "初級複習 J2 · 09",
    "grammar": "あげます・くれます・もらいます",
    "caption": "あげる：我→他｜くれる：他→我｜もらう：我收到",
    "image": "assets/japanese-comics/j2-09-giving-objects.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "送禮給老師",
        "crop": "1 143 1022 311",
        "alt": "第1格：這是伴手禮。明天要送給老師。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "別人送我卡片",
        "crop": "1 460 1022 318",
        "alt": "第2格：ファン送了我一張卡片。",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "詢問卡片的來源",
        "crop": "1 783 1022 304",
        "alt": "第3格：那張卡片是誰送你的？",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "從誰那裡收到",
        "crop": "1 1093 1022 328",
        "alt": "第4格：我從ファン那裡收到的。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "おみやげです。あした、せんせいにあげます。",
        "subtitle": "お土産です。明日、先生にあげます。",
        "translation": "這是伴手禮。明天要送給老師。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ファンはわたしにカードをくれました。",
        "subtitle": "ファンは私にカードをくれました。",
        "translation": "ファン送了我一張卡片。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "そのカード、だれにもらいましたか。",
        "subtitle": "そのカード、誰にもらいましたか。",
        "translation": "那張卡片是誰送你的？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ファンにもらいました。",
        "subtitle": "ファンにもらいました。",
        "translation": "我從ファン那裡收到的。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "「ファン」是教材中的人名。授受方向隨說話者而定，配合圖中人物閱讀。"
  },
  {
    "id": "j2-10-giving-actions",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "誰幫誰買了咖啡？",
    "label": "初級複習 J2 · 10",
    "grammar": "てあげる・てくれる・てもらう",
    "caption": "あげる：我幫他｜くれる：他幫我｜もらう：我得到幫助",
    "image": "assets/japanese-comics/j2-10-giving-actions.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "我要幫同事買",
        "crop": "7 116 1011 317",
        "alt": "第1格：我要幫同事買咖啡。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "誰幫你買",
        "crop": "7 440 1011 323",
        "alt": "第2格：誰幫你買了咖啡？",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "同事幫我買",
        "crop": "7 771 1011 308",
        "alt": "第3格：同事幫我買的。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "換成もらう說法",
        "crop": "7 1086 1011 330",
        "alt": "第4格：我請同事幫我買了咖啡。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "どうりょうにコーヒーをかってあげます。",
        "subtitle": "同僚にコーヒーを買ってあげます。",
        "translation": "我要幫同事買咖啡。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "だれがコーヒーをかってくれましたか。",
        "subtitle": "誰がコーヒーを買ってくれましたか。",
        "translation": "誰幫你買了咖啡？",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "どうりょうがかってくれました。",
        "subtitle": "同僚が買ってくれました。",
        "translation": "同事幫我買的。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "どうりょうにコーヒーをかってもらいました。",
        "subtitle": "同僚にコーヒーを買ってもらいました。",
        "translation": "我請同事幫我買了咖啡。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "第1格是買咖啡之前；第2、3格是收到之後；第4格改用もらう描述同一份幫助。"
  },
  {
    "id": "j2-11-offering-help",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "要借你傘嗎？要我幫忙嗎？",
    "label": "初級複習 J2 · 11",
    "grammar": "主動幫忙的～ましょうか",
    "caption": "主動提議：～ましょうか｜自然表達幫忙的心意",
    "image": "assets/japanese-comics/j2-11-offering-help.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：2句原筆記例句、2句補充例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "要借你雨傘嗎",
        "crop": "6 139 1013 314",
        "alt": "第1格：要借你雨傘嗎？",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "向對方道謝",
        "crop": "6 463 1013 319",
        "alt": "第2格：謝謝你。",
        "first": 1,
        "label": "情境補充",
        "skipAudio": false
      },
      {
        "title": "要幫你搬嗎",
        "crop": "6 791 1013 305",
        "alt": "第3格：要我幫忙嗎？",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "接受幫助",
        "crop": "6 1105 1013 334",
        "alt": "第4格：好，麻煩你了。",
        "first": 3,
        "label": "情境補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "かさをかしましょうか。",
        "subtitle": "傘を貸しましょうか。",
        "translation": "要借你雨傘嗎？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ありがとうございます。",
        "subtitle": "ありがとうございます。",
        "translation": "謝謝你。",
        "speaker": "第2格 · 情境補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      },
      {
        "text": "てつだいましょうか。",
        "subtitle": "手伝いましょうか。",
        "translation": "要我幫忙嗎？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "はい、おねがいします。",
        "subtitle": "はい、お願いします。",
        "translation": "好，麻煩你了。",
        "speaker": "第4格 · 情境補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      }
    ],
    "readingNote": "字幕保留原圖漢字，朗讀依核對過的日文讀音。原句與補充標示依原圖保留。"
  },
  {
    "id": "j2-12-polite-giving-receiving",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "您給我的幫助，怎麼說更有禮？",
    "label": "初級複習 J2 · 12",
    "grammar": "いただく・くださる",
    "caption": "いただく：我承受恩惠｜くださる：對方給予幫助",
    "image": "assets/japanese-comics/j2-12-polite-giving-receiving.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "部長給我咖啡",
        "crop": "7 146 1010 293",
        "alt": "第1格：部長給了我咖啡。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "部長幫我買咖啡",
        "crop": "7 446 1010 303",
        "alt": "第2格：部長幫我買了咖啡。",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "承蒙老師教我",
        "crop": "7 756 1010 299",
        "alt": "第3格：承蒙老師教我日本歌曲。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "老師教了我",
        "crop": "7 1061 1010 318",
        "alt": "第4格：老師教了我日本歌曲。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "ぶちょうがコーヒーをくださいました。",
        "subtitle": "部長がコーヒーをくださいました。",
        "translation": "部長給了我咖啡。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ぶちょうがコーヒーをかってくださいました。",
        "subtitle": "部長がコーヒーを買ってくださいました。",
        "translation": "部長幫我買了咖啡。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "せんせいににほんのうたをおしえていただきました。",
        "subtitle": "先生に日本の歌を教えていただきました。",
        "translation": "承蒙老師教我日本歌曲。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "せんせいがにほんのうたをおしえてくださいました。",
        "subtitle": "先生が日本の歌を教えてくださいました。",
        "translation": "老師教了我日本歌曲。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "いただく側重自己承受恩惠；くださる側重對方給予。兩者皆配合圖中人物關係使用。"
  },
  {
    "id": "j2-13-yaru-register",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "やる怎麼用？也要留意語氣",
    "label": "初級複習 J2 · 13",
    "grammar": "やります・てやります",
    "caption": "看對象與關係，別只背『給』。",
    "image": "assets/japanese-comics/j2-13-yaru-register.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：2句原筆記例句。2格情境／解說不朗讀。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "給狗飼料",
        "crop": "7 144 1010 326",
        "alt": "第1格：餵狗吃飼料。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "對動植物的用法",
        "crop": "7 478 1010 266",
        "alt": "第2格：やる常見於給動植物東西。",
        "first": 1,
        "label": "補充說明",
        "skipAudio": true
      },
      {
        "title": "買手錶給弟弟",
        "crop": "7 751 1010 320",
        "alt": "第3格：我買了手錶送給弟弟。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "對人使用的語氣",
        "crop": "7 1078 1010 318",
        "alt": "第4格：對人使用，可能有上對下的語感；一般送禮也常用あげる。",
        "first": 3,
        "label": "補充說明",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "いぬにえさをやります。",
        "subtitle": "犬に餌をやります。",
        "translation": "餵狗吃飼料。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "やる常見於給動植物東西。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第2格 · 補充說明",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "補充說明",
        "skipAudio": true
      },
      {
        "text": "おとうとにとけいをかってやりました。",
        "subtitle": "弟に時計を買ってやりました。",
        "translation": "我買了手錶送給弟弟。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "對人使用，可能有上對下的語感；一般送禮也常用あげる。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第4格 · 補充說明",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "補充說明",
        "skipAudio": true
      }
    ],
    "readingNote": "第2、4格為補充說明，不朗讀。對人使用やる可能帶有上對下的語感，請留意對象與關係。"
  },
  {
    "id": "j2-14-possessions-no",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "幫她放行李：是「她的」東西",
    "label": "初級複習 J2 · 14",
    "grammar": "所屬物的の",
    "caption": "人の物品を＋てあげる／てくれる",
    "image": "assets/japanese-comics/j2-14-possessions-no.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：2句原筆記例句。2格情境／解說不朗讀。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "幫老奶奶放好行李",
        "crop": "7 137 1010 375",
        "alt": "第1格：我幫那位老奶奶把行李放好了。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "用の連結物品和主人",
        "crop": "7 517 1010 228",
        "alt": "第2格：「她的行李」用の，把物品與主人連起來。",
        "first": 1,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "洗全家人的衣服",
        "crop": "7 750 1010 322",
        "alt": "第3格：太太會幫全家洗衣服。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "全家人的衣服",
        "crop": "7 1077 1010 326",
        "alt": "第4格：家族みんなの服＝全家人的衣服",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "おばあさんのにもつをおいてあげました。",
        "subtitle": "おばあさんの荷物を置いてあげました。",
        "translation": "我幫那位老奶奶把行李放好了。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "「她的行李」用の，把物品與主人連起來。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第2格 · 解說",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "つまはかぞくみんなのふくをせんたくしてくれます。",
        "subtitle": "妻は家族みんなの服を洗濯してくれます。",
        "translation": "太太會幫全家洗衣服。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "家族みんなの服＝全家人的衣服",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第4格 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第2、4格為解說，不朗讀。の連結物品與主人；「荷物」讀にもつ。"
  },
  {
    "id": "j2-15-person-object",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "誰送爸爸回家？人物也會接を",
    "label": "初級複習 J2 · 15",
    "grammar": "送る・連れて来る的對象",
    "caption": "先看動詞，再看人物接哪個助詞。",
    "image": "assets/japanese-comics/j2-15-person-object.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：3句原筆記例句。1格情境／解說不朗讀。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "誰送爸爸回家",
        "crop": "7 144 1010 297",
        "alt": "第1格：誰送爸爸回家的？",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "同事送他回家",
        "crop": "7 447 1010 302",
        "alt": "第2格：同事送他回來的。",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "帶女兒來公司",
        "crop": "7 754 1010 320",
        "alt": "第3格：我會帶女兒來公司。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "動詞的人物對象",
        "crop": "7 1081 1010 320",
        "alt": "第4格：送る、迎える、連れて行く／来る等，對象人物用を。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "だれがちちをうちまでおくってくれた？",
        "subtitle": "誰が父をうちまで送ってくれた？",
        "translation": "誰送爸爸回家的？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "どうりょうがおくってくれた。",
        "subtitle": "同僚が送ってくれた。",
        "translation": "同事送他回來的。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "むすめをかいしゃへつれてきてやります。",
        "subtitle": "娘を会社へ連れて来てやります。",
        "translation": "我會帶女兒來公司。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "送る、迎える、連れて行く／来る等，對象人物用を。",
        "translation": "本格是情境／解說，僅供閱讀，不送出語音。",
        "speaker": "第4格 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第3格在公司內說明之後要把女兒帶來；第4格為解說，不朗讀。"
  },
  {
    "id": "j2-16-without-doing",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "不看課本答題，不出門看動畫",
    "label": "初級複習 J2 · 16",
    "grammar": "ないで：不做A而做B",
    "caption": "ないで：沒有做A的狀態／不選A而做B",
    "image": "assets/japanese-comics/j2-16-without-doing.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：4句原筆記例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "不看課本回答",
        "crop": "10 126 1004 302",
        "alt": "第1格：請不要看課本，直接回答。",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "不開冷氣睡覺",
        "crop": "10 432 1004 351",
        "alt": "第2格：即使夏天，我也不開冷氣睡覺。",
        "first": 1,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "星期天去哪裡",
        "crop": "10 788 1004 309",
        "alt": "第3格：星期天有出去嗎？",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "沒出門在家看動畫",
        "crop": "10 1101 1004 338",
        "alt": "第4格：沒有，哪裡都沒去，一直在家看動畫。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "きょうかしょをみないでこたえてください。",
        "subtitle": "教科書を見ないで答えてください。",
        "translation": "請不要看課本，直接回答。",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "なつでも、エアコンをつけないでねます。",
        "subtitle": "夏でも、エアコンをつけないで寝ます。",
        "translation": "即使夏天，我也不開冷氣睡覺。",
        "speaker": "第2格 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "にちようびどこかいきましたか。",
        "subtitle": "日曜日どこか行きましたか。",
        "translation": "星期天有出去嗎？",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "いえ、どこもいかないで、ずっとうちでアニメをみていました。",
        "subtitle": "いえ、どこも行かないで、ずっとうちでアニメを見ていました。",
        "translation": "沒有，哪裡都沒去，一直在家看動畫。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "字幕保留原圖漢字，朗讀依核對過的日文讀音。原句與補充標示依原圖保留。"
  },
  {
    "id": "j2-17-person-ni",
    "lesson": "j2",
    "series": "beginner-review",
    "title": "向誰請教？信寫給誰？",
    "label": "初級複習 J2 · 17",
    "grammar": "對象的に",
    "caption": "向誰／給誰：人に｜先看原動詞的接法",
    "image": "assets/japanese-comics/j2-17-person-ni.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J2：3句原筆記例句、1句補充例句。中文翻譯與重點整理為學習輔助。",
    "panels": [
      {
        "title": "信寫給誰",
        "crop": "8 125 1009 309",
        "alt": "第1格：信要寫給誰？",
        "first": 0,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "寫信給老師",
        "crop": "8 446 1009 321",
        "alt": "第2格：寫給老師。",
        "first": 1,
        "label": "情境補充",
        "skipAudio": false
      },
      {
        "title": "向老師請教",
        "crop": "8 776 1009 308",
        "alt": "第3格：向老師請教。",
        "first": 2,
        "label": "原句",
        "skipAudio": false
      },
      {
        "title": "向老師學日文",
        "crop": "8 1095 1009 321",
        "alt": "第4格：我向老師學了日文。",
        "first": 3,
        "label": "原句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "だれにてがみをかきますか。",
        "subtitle": "誰に手紙を書きますか。",
        "translation": "信要寫給誰？",
        "speaker": "第1格 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "せんせいにかきます。",
        "subtitle": "先生に書きます。",
        "translation": "寫給老師。",
        "speaker": "第2格 · 情境補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      },
      {
        "text": "せんせいにききます。",
        "subtitle": "先生に聞きます。",
        "translation": "向老師請教。",
        "speaker": "第3格 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "わたしはせんせいににほんごをならいました。",
        "subtitle": "私は先生に日本語を習いました。",
        "translation": "我向老師學了日文。",
        "speaker": "第4格 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "第2格為情境補充。人物接に或を須看原動詞的接法，不能只用「人物」一概判斷。"
  },
  {
    "id": "j3-01-plain-verb-forms",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "動詞換成常體：做、不做、沒做",
    "label": "初級複習 J3 · 01",
    "grammar": "動詞原形・ない形・なかった形",
    "caption": "先認動詞類別，再對照做、不做與沒做。",
    "image": "assets/japanese-comics/j3-01-plain-verb-forms.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "買う的變化",
        "crop": "8 144 1007 310",
        "alt": "第1格：第1類：買／不買／沒有買",
        "first": 0,
        "label": "依原規則補充",
        "skipAudio": false
      },
      {
        "title": "食べる的變化",
        "crop": "9 463 1006 312",
        "alt": "第2格：第2類：吃／不吃／沒有吃",
        "first": 1,
        "label": "依原規則補充",
        "skipAudio": false
      },
      {
        "title": "来る的變化",
        "crop": "9 784 1007 314",
        "alt": "第3格：第3類：きます・くる・こない",
        "first": 2,
        "label": "依原規則補充",
        "skipAudio": false
      },
      {
        "title": "する的變化",
        "crop": "9 1107 1006 317",
        "alt": "第4格：第3類：做／不做／沒有做",
        "first": 3,
        "label": "依原規則補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "かいます、かう、かわない、かわなかった。",
        "subtitle": "買います → 買う → 買わない → 買わなかった",
        "translation": "第1類：買／不買／沒有買",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      },
      {
        "text": "たべます、たべる、たべない、たべなかった。",
        "subtitle": "食べます → 食べる → 食べない → 食べなかった",
        "translation": "第2類：吃／不吃／沒有吃",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      },
      {
        "text": "きます、くる、こない、こなかった。",
        "subtitle": "来ます → 来る → 来ない → 来なかった",
        "translation": "第3類：きます・くる・こない",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 2,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      },
      {
        "text": "します、する、しない、しなかった。",
        "subtitle": "します → する → しない → しなかった",
        "translation": "第3類：做／不做／沒有做",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      }
    ],
    "readingNote": "變化卡按四個形式朗讀；来ます／来る／来ない／来なかった讀きます／くる／こない／こなかった。"
  },
  {
    "id": "j3-02-koto-ability",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "把動作變成一件事，也能說會做",
    "label": "初級複習 J3 · 02",
    "grammar": "こと・ことができます",
    "caption": "把動作當成一件事，也能說明可以做什麼。",
    "image": "assets/japanese-comics/j3-02-koto-ability.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "詢問興趣",
        "crop": "11 136 1003 338",
        "alt": "第1格：興趣是什麼？",
        "first": 0,
        "label": "情境補充",
        "skipAudio": false
      },
      {
        "title": "閱讀這件事",
        "crop": "11 481 1003 321",
        "alt": "第2格：我的興趣是看書。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "可以借書",
        "crop": "11 811 1003 385",
        "alt": "第3格：可以在圖書館借書。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "名詞化與能力",
        "crop": "11 1204 1003 320",
        "alt": "第4格：読むこと＝閱讀這件事；借りることができる＝可以借書。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "しゅみはなんですか。",
        "subtitle": "趣味は何ですか。",
        "translation": "興趣是什麼？",
        "speaker": "詢問興趣 · 情境補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "情境補充",
        "skipAudio": false
      },
      {
        "text": "わたしのしゅみはほんをよむことです。",
        "subtitle": "私の趣味は本を読むことです。",
        "translation": "我的興趣是看書。",
        "speaker": "閱讀這件事 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "としょかんでほんをかりることができます。",
        "subtitle": "図書館で本を借りることができます。",
        "translation": "可以在圖書館借書。",
        "speaker": "可以借書 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "読むこと＝閱讀這件事；借りることができる＝可以借書。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第4格為解說，僅供閱讀，不朗讀。"
  },
  {
    "id": "j3-03-before",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "先做哪件事？まえに看接法",
    "label": "初級複習 J3 · 03",
    "grammar": "まえに",
    "caption": "動詞、名詞與時間長度，接法各有不同。",
    "image": "assets/japanese-comics/j3-03-before.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "看電視之前",
        "crop": "10 143 1004 297",
        "alt": "第1格：看電視之前，請先做功課。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "出門之前",
        "crop": "11 451 1003 316",
        "alt": "第2格：每天早上出門前看新聞。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "一個月以前",
        "crop": "11 775 1003 354",
        "alt": "第3格：一個月前來到台灣。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "三種接法",
        "crop": "12 1138 1003 386",
        "alt": "第4格：動詞原形＋前に／名詞の前に／時間長度＋前に。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "テレビをみるまえにしゅくだいをしてください。",
        "subtitle": "テレビを見るまえに宿題をしてください。",
        "translation": "看電視之前，請先做功課。",
        "speaker": "看電視之前 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "まいあさでかけるまえにニュースをみます。",
        "subtitle": "毎朝出かけるまえにニュースを見ます。",
        "translation": "每天早上出門前看新聞。",
        "speaker": "出門之前 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "いっかげつまえにたいわんへきました。",
        "subtitle": "一か月まえに台湾へ来ました。",
        "translation": "一個月前來到台灣。",
        "speaker": "一個月以前 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "動詞原形＋前に／名詞の前に／時間長度＋前に。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第4格為解說，僅供閱讀。例句中的まえ保留原圖寫法。"
  },
  {
    "id": "j3-04-must-or-not-needed",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "一定要、該做了，也可以不用做",
    "label": "初級複習 J3 · 04",
    "grammar": "なければならない・ないと・なくてもいい",
    "caption": "區分必須做、口語提醒與不必做。",
    "image": "assets/japanese-comics/j3-04-must-or-not-needed.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "必須交作業",
        "crop": "2 135 1021 309",
        "alt": "第1格：最晚明天必須交作業。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "差不多該回去",
        "crop": "2 450 1021 328",
        "alt": "第2格：已經很晚了，差不多該回去了。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "今天不必交",
        "crop": "2 784 1020 326",
        "alt": "第3格：報告下週才截止，今天不用交。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "不必不是禁止",
        "crop": "1 1116 1022 419",
        "alt": "第4格：なくてもいい＝不做也可以；不是「不能做」。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "あしたまでにしゅくだいをださなければなりません。",
        "subtitle": "明日までに宿題を出さなければなりません。",
        "translation": "最晚明天必須交作業。",
        "speaker": "必須交作業 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "もうおそいですね。そろそろかえらないと。",
        "subtitle": "もう遅いですね。そろそろ帰らないと。",
        "translation": "已經很晚了，差不多該回去了。",
        "speaker": "差不多該回去 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "レポートのしめきりはらいしゅうですから、きょうださなくてもいいです。",
        "subtitle": "レポートの締め切りは来週ですから、今日出さなくてもいいです。",
        "translation": "報告下週才截止，今天不用交。",
        "speaker": "今天不必交 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "なくてもいい＝不做也可以；不是「不能做」。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第4格僅供閱讀。今日不用交和明天必須交分屬不同情境。"
  },
  {
    "id": "j3-05-advice",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "做比較好，還是不要做比較好？",
    "label": "初級複習 J3 · 05",
    "grammar": "たほうがいい・ないほうがいい",
    "caption": "用た形和ない形分別表達做或不做的建議。",
    "image": "assets/japanese-comics/j3-05-advice.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "搭電車較好",
        "crop": "10 142 1004 350",
        "alt": "第1格：動物園附近沒有停車場，搭電車去比較好。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "肯定建議的接法",
        "crop": "10 500 1004 270",
        "alt": "第2格：肯定建議：動詞た形＋ほうがいい。",
        "first": 1,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "最好不要抽菸",
        "crop": "10 777 1004 337",
        "alt": "第3格：最好不要抽菸。",
        "first": 2,
        "label": "原句節選",
        "skipAudio": false
      },
      {
        "title": "否定建議的接法",
        "crop": "10 1121 1004 306",
        "alt": "第4格：否定建議：動詞ない形＋ほうがいい。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "どうぶつえんのちかくにちゅうしゃじょうがないから、でんしゃでいったほうがいいよ。",
        "subtitle": "動物園の近くに駐車場がないから、電車で行ったほうがいいよ。",
        "translation": "動物園附近沒有停車場，搭電車去比較好。",
        "speaker": "搭電車較好 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "肯定建議：動詞た形＋ほうがいい。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "すわないほうがいいです。",
        "subtitle": "吸わないほうがいいです。",
        "translation": "最好不要抽菸。",
        "speaker": "最好不要抽菸 · 原句節選",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原句節選",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "否定建議：動詞ない形＋ほうがいい。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第2、4格為解說，不朗讀。文法示例不代替實際交通或醫療建議。"
  },
  {
    "id": "j3-06-when",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "什麼時候？とき前面怎麼接",
    "label": "初級複習 J3 · 06",
    "grammar": "とき",
    "caption": "動詞、名詞、い形與な形，各有不同接法。",
    "image": "assets/japanese-comics/j3-06-when.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "有時間時",
        "crop": "10 140 1004 289",
        "alt": "第1格：有時間時看電影。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "地震發生時",
        "crop": "10 436 1004 305",
        "alt": "第2格：地震發生時，我在院子裡。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "小時候",
        "crop": "10 749 1004 325",
        "alt": "第3格：小時候住在日本。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "忙碌與有空",
        "crop": "10 1080 1004 354",
        "alt": "第4格：忙的時候不吃飯。\n有空時看韓劇。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "じかんがあるとき、えいがをみます。",
        "subtitle": "時間があるとき、映画を見ます。",
        "translation": "有時間時看電影。",
        "speaker": "有時間時 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "じしんがあったとき、わたしはにわにいました。",
        "subtitle": "地震があったとき、私は庭にいました。",
        "translation": "地震發生時，我在院子裡。",
        "speaker": "地震發生時 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "こどものとき、にほんにすんでいました。",
        "subtitle": "子供のとき、日本に住んでいました。",
        "translation": "小時候住在日本。",
        "speaker": "小時候 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "いそがしいとき、ごはんをたべません。",
        "subtitle": "忙しいとき、ごはんを食べません。",
        "translation": "忙的時候不吃飯。",
        "speaker": "忙碌與有空 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ひまなとき、かんこくドラマをみます。",
        "subtitle": "暇なとき、韓国ドラマを見ます。",
        "translation": "有空時看韓劇。",
        "speaker": "忙碌與有空 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "第4格左右兩句依序分開朗讀。忙碌不吃飯是原句情境，不是生活建議。"
  },
  {
    "id": "j3-07-plain-adjective-noun",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "元気です換常體，要看現在與過去",
    "label": "初級複習 J3 · 07",
    "grammar": "な形容詞・名詞の常体",
    "caption": "用元気對照現在、過去的肯定與否定。",
    "image": "assets/japanese-comics/j3-07-plain-adjective-noun.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "現在肯定",
        "crop": "8 156 1008 302",
        "alt": "第1格：現在肯定：有精神",
        "first": 0,
        "label": "原筆記變化例",
        "skipAudio": false
      },
      {
        "title": "現在否定",
        "crop": "8 463 1008 337",
        "alt": "第2格：現在否定：沒有精神",
        "first": 1,
        "label": "原筆記變化例",
        "skipAudio": false
      },
      {
        "title": "過去肯定",
        "crop": "8 805 1008 304",
        "alt": "第3格：過去肯定：之前有精神",
        "first": 2,
        "label": "原筆記變化例",
        "skipAudio": false
      },
      {
        "title": "過去否定",
        "crop": "8 1114 1008 315",
        "alt": "第4格：過去否定：之前沒有精神",
        "first": 3,
        "label": "原筆記變化例",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "げんきです、げんきだ。",
        "subtitle": "元気です → 元気だ",
        "translation": "現在肯定：有精神",
        "speaker": "變化卡 · 原筆記變化例",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記變化例",
        "skipAudio": false
      },
      {
        "text": "げんきではありません、げんきじゃない。",
        "subtitle": "元気ではありません → 元気じゃない",
        "translation": "現在否定：沒有精神",
        "speaker": "變化卡 · 原筆記變化例",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記變化例",
        "skipAudio": false
      },
      {
        "text": "げんきでした、げんきだった。",
        "subtitle": "元気でした → 元気だった",
        "translation": "過去肯定：之前有精神",
        "speaker": "變化卡 · 原筆記變化例",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記變化例",
        "skipAudio": false
      },
      {
        "text": "げんきではありませんでした、げんきじゃなかった。",
        "subtitle": "元気ではありませんでした → 元気じゃなかった",
        "translation": "過去否定：之前沒有精神",
        "speaker": "變化卡 · 原筆記變化例",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記變化例",
        "skipAudio": false
      }
    ],
    "readingNote": "變化卡成對朗讀，不讀箭頭。實際會話是否使用だ要看語境。"
  },
  {
    "id": "j3-08-plain-connections",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "雖然好吃但很貴，因為不擅長就不唱",
    "label": "初級複習 J3 · 08",
    "grammar": "けど・から",
    "caption": "用けど說轉折，用だから說原因。",
    "image": "assets/japanese-comics/j3-08-plain-connections.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "敬體的轉折",
        "crop": "10 152 1004 298",
        "alt": "第1格：很好吃，但是很貴。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "常體的轉折",
        "crop": "10 454 1004 308",
        "alt": "第2格：好吃，但很貴。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "敬體的原因",
        "crop": "10 767 1004 323",
        "alt": "第3格：因為不擅長唱歌，所以不唱。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "常體的原因",
        "crop": "10 1094 1004 330",
        "alt": "第4格：因為唱得不好，所以不唱。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "おいしいですが、たかいです。",
        "subtitle": "おいしいですが、高いです。",
        "translation": "很好吃，但是很貴。",
        "speaker": "敬體的轉折 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "おいしいけど、たかい。",
        "subtitle": "おいしいけど、高い。",
        "translation": "好吃，但很貴。",
        "speaker": "常體的轉折 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "うたがへたですから、うたいません。",
        "subtitle": "歌が下手ですから、歌いません。",
        "translation": "因為不擅長唱歌，所以不唱。",
        "speaker": "敬體的原因 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "うたがへただから、うたわない。",
        "subtitle": "歌が下手だから、歌わない。",
        "translation": "因為唱得不好，所以不唱。",
        "speaker": "常體的原因 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "每兩格是同一意思的敬體與常體對照。"
  },
  {
    "id": "j3-09-casual-questions",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "咖啡怎麼樣？咖哩和壽司想吃哪個？",
    "label": "初級複習 J3 · 09",
    "grammar": "どう？・どっち？",
    "caption": "在親近的會話裡詢問感想與選擇。",
    "image": "assets/japanese-comics/j3-09-casual-questions.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "咖啡怎麼樣",
        "crop": "17 180 990 297",
        "alt": "第1格：便利商店的咖啡怎麼樣？",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "回答咖啡感想",
        "crop": "17 487 990 260",
        "alt": "第2格：便宜，但我覺得不好喝。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "想吃哪一個",
        "crop": "17 755 990 316",
        "alt": "第3格：咖哩和壽司想吃哪個？",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "兩個都想吃",
        "crop": "17 1080 990 340",
        "alt": "第4格：兩個都想吃。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "コンビニのコーヒーはどう？",
        "subtitle": "コンビニのコーヒーはどう？",
        "translation": "便利商店的咖啡怎麼樣？",
        "speaker": "咖啡怎麼樣 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "やすいけどおいしくないとおもう。",
        "subtitle": "安いけどおいしくないと思う。",
        "translation": "便宜，但我覺得不好喝。",
        "speaker": "回答咖啡感想 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "カレーとすし、どっちがたべたい？",
        "subtitle": "カレーと寿司、どっちが食べたい？",
        "translation": "咖哩和壽司想吃哪個？",
        "speaker": "想吃哪一個 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "どっちもたべたい。",
        "subtitle": "どっちも食べたい。",
        "translation": "兩個都想吃。",
        "speaker": "兩個都想吃 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "親近的問答要看場合與對象；疑問語氣依原句朗讀。"
  },
  {
    "id": "j3-10-modifiers-time",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "明天要吃的麵包，昨天吃過的麵包",
    "label": "初級複習 J3 · 10",
    "grammar": "動詞常体＋名詞",
    "caption": "食べる與食べた，分別描述將做和已做的動作。",
    "image": "assets/japanese-comics/j3-10-modifiers-time.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "明天要吃的麵包",
        "crop": "12 212 999 282",
        "alt": "第1格：這是明天要吃的麵包。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "修飾語放前面",
        "crop": "12 504 999 257",
        "alt": "第2格：食べる放在パン前面，說明是哪個麵包。",
        "first": 1,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "昨天吃的麵包",
        "crop": "12 772 999 298",
        "alt": "第3格：昨天吃的麵包就是這個。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "時間的對照",
        "crop": "13 1081 998 321",
        "alt": "第4格：食べた表示那次動作已發生；修飾語在名詞前。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "これはあしたたべるパンです。",
        "subtitle": "これは明日食べるパンです。",
        "translation": "這是明天要吃的麵包。",
        "speaker": "明天要吃的麵包 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "食べる放在パン前面，說明是哪個麵包。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "きのうたべたパンはこれです。",
        "subtitle": "昨日食べたパンはこれです。",
        "translation": "昨天吃的麵包就是這個。",
        "speaker": "昨天吃的麵包 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "食べた表示那次動作已發生；修飾語在名詞前。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第2、4格為解說，不朗讀。"
  },
  {
    "id": "j3-11-modifiers-in-life",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "買過的錶、常去的館、穿紅衣的人",
    "label": "初級複習 J3 · 11",
    "grammar": "名詞修飾",
    "caption": "先說明是哪一個，再接錶、圖書館、人或約定。",
    "image": "assets/japanese-comics/j3-11-modifiers-in-life.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "去年買的錶",
        "crop": "15 139 995 299",
        "alt": "第1格：這是去年在百貨公司買的手錶。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "常去的圖書館",
        "crop": "15 448 995 316",
        "alt": "第2格：常去的圖書館人少又安靜。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "穿紅衣的人",
        "crop": "15 774 995 318",
        "alt": "第3格：你認識穿紅衣服的人嗎？",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "明天購物的約定",
        "crop": "16 1102 993 334",
        "alt": "第4格：約好明天和她去逛街。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "これはきょねん、デパートでかったとけいです。",
        "subtitle": "これは去年、デパートで買った時計です。",
        "translation": "這是去年在百貨公司買的手錶。",
        "speaker": "去年買的錶 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "よくいくとしょかんはひとがすくなくてしずかです。",
        "subtitle": "よく行く図書館は人が少なくて静かです。",
        "translation": "常去的圖書館人少又安靜。",
        "speaker": "常去的圖書館 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "あかいふくをきているひとをしっていますか。",
        "subtitle": "赤い服を着ている人を知っていますか。",
        "translation": "你認識穿紅衣服的人嗎？",
        "speaker": "穿紅衣的人 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "あした、かのじょとかいものにいくやくそくがあります。",
        "subtitle": "明日、彼女と買い物に行く約束があります。",
        "translation": "約好明天和她去逛街。",
        "speaker": "明天購物的約定 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "依四格順序朗讀；人物與場景是教材例句的虛構示意。"
  },
  {
    "id": "j3-12-modifier-subject",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "媽媽做的麵包，老師畫的畫",
    "label": "初級複習 J3 · 12",
    "grammar": "修飾句中的が",
    "caption": "先組好誰做的加名詞，再放進完整句子。",
    "image": "assets/japanese-comics/j3-12-modifier-subject.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "媽媽做的麵包",
        "crop": "12 149 1000 312",
        "alt": "第1格：這是媽媽做的麵包。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "修飾句的主語",
        "crop": "13 469 999 282",
        "alt": "第2格：【母が作った】修飾パン，が指出這個動作的主語。",
        "first": 1,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "老師畫的畫",
        "crop": "14 756 998 346",
        "alt": "第3格：老師畫的畫是那一幅。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "先組好再造句",
        "crop": "14 1110 997 295",
        "alt": "第4格：先組好「誰做的＋名詞」，再放進整個句子。",
        "first": 3,
        "label": "解說",
        "skipAudio": true
      }
    ],
    "cues": [
      {
        "text": "これはははがつくったパンです。",
        "subtitle": "これは母が作ったパンです。",
        "translation": "這是媽媽做的麵包。",
        "speaker": "媽媽做的麵包 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "【母が作った】修飾パン，が指出這個動作的主語。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "せんせいがかいたえはあれです。",
        "subtitle": "先生が描いた絵はあれです。",
        "translation": "老師畫的畫是那一幅。",
        "speaker": "老師畫的畫 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "先組好「誰做的＋名詞」，再放進整個句子。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 3,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      }
    ],
    "readingNote": "第2、4格不朗讀。描いた在這裡讀かいた，字幕保留原圖漢字。"
  },
  {
    "id": "j3-13-quoting",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "我說過什麼？他剛才怎麼說？",
    "label": "初級複習 J3 · 13",
    "grammar": "と言いました・と言っていました",
    "caption": "引用的內容放在と前面，也能轉述當時的話。",
    "image": "assets/japanese-comics/j3-13-quoting.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "說過自己的想法",
        "crop": "9 129 1007 304",
        "alt": "第1格：上課時，我說日文很有用。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "引用內容放前面",
        "crop": "9 443 1007 291",
        "alt": "第2格：引用的內容放在と前面，這裡用常體。",
        "first": 1,
        "label": "解說",
        "skipAudio": true
      },
      {
        "title": "詢問他說什麼",
        "crop": "10 744 1005 298",
        "alt": "第3格：他怎麼說的？",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "轉述開會時間",
        "crop": "10 1050 1005 357",
        "alt": "第4格：他說六點開會。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "じゅぎょうちゅう、わたしはにほんごはやくにたつといいました。",
        "subtitle": "授業中、私は日本語は役に立つと言いました。",
        "translation": "上課時，我說日文很有用。",
        "speaker": "說過自己的想法 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "",
        "subtitle": "引用的內容放在と前面，這裡用常體。",
        "translation": "本格為解說，僅供閱讀，不朗讀。",
        "speaker": "解說 · 解說",
        "panel": 1,
        "sourceKind": "editorial",
        "sourceLabel": "解說",
        "skipAudio": true
      },
      {
        "text": "なんといっていましたか。",
        "subtitle": "何と言っていましたか。",
        "translation": "他怎麼說的？",
        "speaker": "詢問他說什麼 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ろくじにかいぎするといっていました。",
        "subtitle": "6時に会議すると言っていました。",
        "translation": "他說六點開會。",
        "speaker": "轉述開會時間 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "第2格為解說，不朗讀。6時讀ろくじ。"
  },
  {
    "id": "j3-14-thoughts",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "我想他回去了，也覺得你人很好",
    "label": "初級複習 J3 · 14",
    "grammar": "と思います",
    "caption": "用常體表達推測、意見與對人的看法。",
    "image": "assets/japanese-comics/j3-14-thoughts.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "推測已經回去",
        "crop": "11 125 1004 312",
        "alt": "第1格：我想王先生已經回去了。",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "表達日文的用途",
        "crop": "11 447 1004 323",
        "alt": "第2格：我覺得日文很有用。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "詢問對方看法",
        "crop": "11 780 1004 326",
        "alt": "第3格：你覺得我是怎樣的人？",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "回答人物印象",
        "crop": "11 1115 1004 340",
        "alt": "第4格：我覺得你有趣、親切，是個好人。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "おうさんはもうかえったとおもいます。",
        "subtitle": "王さんはもう帰ったと思います。",
        "translation": "我想王先生已經回去了。",
        "speaker": "推測已經回去 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "にほんごはやくにたつとおもいます。",
        "subtitle": "日本語は役に立つと思います。",
        "translation": "我覺得日文很有用。",
        "speaker": "表達日文的用途 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ぼくのこと、どうおもいますか。",
        "subtitle": "僕のこと、どう思いますか。",
        "translation": "你覺得我是怎樣的人？",
        "speaker": "詢問對方看法 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "おもしろくてしんせつで、いいひとだとおもいますよ。",
        "subtitle": "面白くて親切で、いい人だと思いますよ。",
        "translation": "我覺得你有趣、親切，是個好人。",
        "speaker": "回答人物印象 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "王さん讀おうさん；最後一句保留よ，字幕和朗讀一致。"
  },
  {
    "id": "j3-15-volitional-forms",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "行こう、食べよう：意向形怎麼變",
    "label": "初級複習 J3 · 15",
    "grammar": "意向形",
    "caption": "依動詞類別練習行こう、食べよう、来よう與しよう。",
    "image": "assets/japanese-comics/j3-15-volitional-forms.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "第1類的意向形",
        "crop": "1 140 1022 316",
        "alt": "第1格：第1類：去吧／我來去",
        "first": 0,
        "label": "依原規則補充",
        "skipAudio": false
      },
      {
        "title": "第2類的意向形",
        "crop": "1 466 1022 302",
        "alt": "第2格：第2類：吃吧／來吃",
        "first": 1,
        "label": "依原規則補充",
        "skipAudio": false
      },
      {
        "title": "来よう",
        "crop": "1 778 1022 314",
        "alt": "第3格：第3類：来よう讀こよう",
        "first": 2,
        "label": "依原規則補充",
        "skipAudio": false
      },
      {
        "title": "しよう",
        "crop": "1 1103 1022 334",
        "alt": "第4格：第3類：做吧／來做",
        "first": 3,
        "label": "依原規則補充",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "いきます、いこう。",
        "subtitle": "行きます → 行こう",
        "translation": "第1類：去吧／我來去",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 0,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      },
      {
        "text": "たべます、たべよう。",
        "subtitle": "食べます → 食べよう",
        "translation": "第2類：吃吧／來吃",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 1,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      },
      {
        "text": "きます、こよう。",
        "subtitle": "来ます → 来よう",
        "translation": "第3類：来よう讀こよう",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 2,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      },
      {
        "text": "します、しよう。",
        "subtitle": "します → しよう",
        "translation": "第3類：做吧／來做",
        "speaker": "變化卡 · 依原規則補充",
        "panel": 3,
        "sourceKind": "added",
        "sourceLabel": "依原規則補充",
        "skipAudio": false
      }
    ],
    "readingNote": "四格都是依原規則補充的變化卡。来よう讀こよう；意向形不等於命令形。"
  },
  {
    "id": "j3-16-intentions-plans-schedule",
    "lesson": "j3",
    "series": "beginner-review",
    "title": "明天做什麼？想法、打算、已排定",
    "label": "初級複習 J3 · 16",
    "grammar": "ようと思う・つもり・予定",
    "caption": "以同一看電影情境對照想法、打算與排定的安排。",
    "image": "assets/japanese-comics/j3-16-intentions-plans-schedule.webp",
    "width": 1024,
    "height": 1536,
    "provenance": "初級文法複習 J3；原筆記例句、原句節選、依原規則補充與情境補充沿用圖上標示；解說格僅供閱讀。",
    "panels": [
      {
        "title": "明天做什麼",
        "crop": "6 142 1012 270",
        "alt": "第1格：明天要做什麼？",
        "first": 0,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "正在想去看電影",
        "crop": "6 422 1012 304",
        "alt": "第2格：嗯……我在想去看電影。",
        "first": 1,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "打算看電影",
        "crop": "6 735 1012 279",
        "alt": "第3格：我打算看電影。",
        "first": 2,
        "label": "原筆記例句",
        "skipAudio": false
      },
      {
        "title": "預定四點看電影",
        "crop": "6 1025 1012 336",
        "alt": "第4格：預定下午四點看電影。",
        "first": 3,
        "label": "原筆記例句",
        "skipAudio": false
      }
    ],
    "cues": [
      {
        "text": "あしたなにする？",
        "subtitle": "明日何する？",
        "translation": "明天要做什麼？",
        "speaker": "明天做什麼 · 原筆記例句",
        "panel": 0,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "うん、えいがをみようとおもってる。",
        "subtitle": "うん…映画を見ようと思ってる。",
        "translation": "嗯……我在想去看電影。",
        "speaker": "正在想去看電影 · 原筆記例句",
        "panel": 1,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "えいがをみるつもりだ。",
        "subtitle": "映画を見るつもりだ。",
        "translation": "我打算看電影。",
        "speaker": "打算看電影 · 原筆記例句",
        "panel": 2,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      },
      {
        "text": "ごごよじにえいがをみるよていだ。",
        "subtitle": "午後4時に映画を見る予定だ。",
        "translation": "預定下午四點看電影。",
        "speaker": "預定四點看電影 · 原筆記例句",
        "panel": 3,
        "sourceKind": "original",
        "sourceLabel": "原筆記例句",
        "skipAudio": false
      }
    ],
    "readingNote": "這是情境語感對照，並非固定的確定度或時間規則。午後4時讀ごごよじ。"
  }
];
if(typeof module!=='undefined' && module.exports) module.exports = comics;
else root.VOICED_COMICS = comics;
})(globalThis);
