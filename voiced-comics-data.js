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
  }
];
if(typeof module !== "undefined" && module.exports) module.exports = comics;
else root.VOICED_COMICS = comics;
})(globalThis);
