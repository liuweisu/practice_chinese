/* Grammar: pick the correct sentence.
   Each item: l = HSK level, o = options, a = index of the correct one,
   why = what the rule is, en = what the sentence means. */
window.GRAMMAR = [

/* ---- adjectives take no 是 ---- */
{l:1,en:"I am tired.",o:["我是累。","我很累。"],a:1,
 why:"Adjectives don't take 是. Use 很 as the link: 我很累. The 很 here is grammatical glue, not really \"very\"."},
{l:1,en:"The weather is good today.",o:["今天天气很好。","今天天气是好。"],a:0,
 why:"Adjective predicate, so no 是. 很 connects the subject to the adjective."},
{l:2,en:"This dish is delicious.",o:["这个菜是好吃。","这个菜很好吃。"],a:1,
 why:"好吃 is an adjective, so it takes 很 rather than 是."},
{l:1,en:"He is a teacher.",o:["他很老师。","他是老师。"],a:1,
 why:"The reverse case: 老师 is a noun, so you do need 是. 很 only links adjectives."},

/* ---- word order: time and place before the verb ---- */
{l:1,en:"I'm going to Beijing tomorrow.",o:["我去北京明天。","我明天去北京。"],a:1,
 why:"Time goes before the verb in Chinese, not at the end as in English."},
{l:2,en:"I read books at home.",o:["我看书在家。","我在家看书。"],a:1,
 why:"Place phrases with 在 come before the verb: 在家看书, never 看书在家."},
{l:2,en:"We're eating together at three tomorrow afternoon.",o:["我们明天下午三点一起吃饭。","我们一起吃饭明天下午三点。"],a:0,
 why:"Time runs general to specific — 明天 → 下午 → 三点 — and the whole phrase sits before the verb."},
{l:3,en:"He works at a company in Beijing.",o:["他工作在北京的一家公司。","他在北京的一家公司工作。"],a:1,
 why:"在 + place always precedes the verb. English puts it after; Chinese does not."},

/* ---- questions keep statement word order ---- */
{l:1,en:"Where are you going?",o:["你去哪儿？","哪儿你去？"],a:0,
 why:"Question words sit where the answer would sit. Nothing moves to the front."},
{l:1,en:"What is this?",o:["什么是这？","这是什么？"],a:1,
 why:"这是什么 keeps subject-verb-object order; the question word just replaces the object."},
{l:2,en:"Are you a student?",o:["你是学生吗？","吗你是学生？"],a:0,
 why:"吗 turns a statement into a yes/no question and always goes at the very end."},
{l:2,en:"How much is this?",o:["这个多少钱？","多少钱这个？"],a:0,
 why:"多少钱 takes the object slot, after the subject."},
{l:2,en:"Are you going or not?",o:["你去不去？","你去吗不去？"],a:0,
 why:"The verb-not-verb pattern (去不去) is a question on its own — don't add 吗 as well."},

/* ---- 了 ---- */
{l:2,en:"I ate.",o:["我吃饭了。","我了吃饭。"],a:0,
 why:"了 follows the verb or closes the sentence. It never comes before the verb."},
{l:3,en:"Yesterday I bought two books.",o:["昨天我买了两本书。","昨天我买两本书了。"],a:0,
 why:"With a quantified object, 了 goes straight after the verb: 买了两本书."},
{l:3,en:"I haven't eaten yet.",o:["我没吃饭了。","我没吃饭。"],a:1,
 why:"没 and 了 don't combine. Negating a completed action drops 了 entirely."},

/* ---- 过 vs 了 ---- */
{l:3,en:"I've been to China (at some point).",o:["我去了中国。","我去过中国。"],a:1,
 why:"过 marks past experience — something you have done at least once. 了 would just report a completed trip."},
{l:3,en:"Have you ever eaten Beijing duck?",o:["你吃过北京烤鸭吗？","你吃了北京烤鸭吗？"],a:0,
 why:"\"Ever\" is 过. 吃了 would ask whether you've finished eating it."},

/* ---- measure words ---- */
{l:1,en:"I have three older brothers.",o:["我有三哥哥。","我有三个哥哥。"],a:1,
 why:"A number can't attach straight to a noun — it needs a measure word. 个 is the default."},
{l:2,en:"I bought two books.",o:["我买了两本书。","我买了二本书。"],a:0,
 why:"Before a measure word, \"two\" is 两, not 二. 二 is for counting and numbers."},
{l:3,en:"There's a car at the entrance.",o:["门口有一个车。","门口有一辆车。"],a:1,
 why:"Vehicles take 辆. 个 is the fallback, but specific measure words sound far more natural."},
{l:3,en:"She's wearing a red skirt.",o:["她穿了一条红裙子。","她穿了一个红裙子。"],a:0,
 why:"条 is for long, thin things — skirts, trousers, fish, roads."},

/* ---- 的 ---- */
{l:1,en:"This is my phone.",o:["这是我手机。","这是我的手机。"],a:1,
 why:"的 marks possession. It's dropped only with close relationships and institutions: 我妈妈, 我们学校."},
{l:2,en:"My mum is a doctor.",o:["我的妈妈是医生。","我妈妈是医生。"],a:1,
 why:"Both are understandable, but with family members Chinese normally drops 的: 我妈妈."},
{l:3,en:"the book I bought yesterday",o:["我昨天买的书","书我昨天买的"],a:0,
 why:"Relative clauses come before the noun and end in 的 — the opposite order from English."},

/* ---- 得 complements ---- */
{l:3,en:"He speaks very well.",o:["他说得很好。","他说很好。"],a:0,
 why:"To judge how an action is done, use verb + 得 + adjective: 说得很好."},
{l:3,en:"He runs very fast.",o:["他跑得很快。","他得跑很快。"],a:0,
 why:"得 attaches to the verb it describes and comes straight after it."},
{l:4,en:"He speaks Chinese very well.",o:["他说中文得很好。","他说中文说得很好。"],a:1,
 why:"With an object present, repeat the verb: 说中文说得很好. You can also say 他中文说得很好."},

/* ---- 在 / 正在 ---- */
{l:2,en:"I'm eating right now.",o:["我在吃饭。","我吃饭在。"],a:0,
 why:"在 before the verb marks an action in progress."},
{l:3,en:"He's sleeping.",o:["他正在睡觉呢。","他正在睡觉了。"],a:0,
 why:"Ongoing actions pair with 呢, not 了 — 了 signals change or completion, which contradicts \"in progress\"."},

/* ---- 把 ---- */
{l:3,en:"Please close the door.",o:["请把门关上。","请关上把门。"],a:0,
 why:"把 moves the object in front of the verb: 把 + object + verb + result."},
{l:4,en:"He broke my cup.",o:["他把我的杯子打碎了。","他把我的杯子打。"],a:0,
 why:"A 把 sentence needs a result on the verb — 打碎了, not a bare 打."},

/* ---- 比 comparisons ---- */
{l:2,en:"Today is colder than yesterday.",o:["今天比昨天很冷。","今天比昨天冷。"],a:1,
 why:"Drop 很 in a 比 comparison. Use 更 or 还 if you want to intensify it."},
{l:3,en:"He is three years older than me.",o:["他比我大三岁。","他比我三岁大。"],a:0,
 why:"The amount of difference goes after the adjective: 大三岁."},
{l:3,en:"My Chinese isn't as good as his.",o:["我的中文没有他好。","我的中文不比他好。"],a:0,
 why:"没有…好 is the natural \"not as good as\". 不比 means \"not more than\", which is a different claim."},

/* ---- 会 / 能 / 可以 ---- */
{l:2,en:"I can cook Chinese food (learned skill).",o:["我能做中国菜。","我会做中国菜。"],a:1,
 why:"会 is for skills you've learned. 能 is about being physically able or free to."},
{l:2,en:"Can you wait five minutes for me?",o:["你会等我五分钟吗？","你能等我五分钟吗？"],a:1,
 why:"能 covers ability and availability in the moment, which is what's being asked here."},
{l:3,en:"May I ask a question?",o:["我可以问一个问题吗？","我会问一个问题吗？"],a:0,
 why:"可以 asks permission. 会 would be asking whether you know how to ask."},

/* ---- 还是 / 或者 ---- */
{l:2,en:"Tea or coffee?",o:["你喝茶或者咖啡？","你喝茶还是咖啡？"],a:1,
 why:"In a question, \"or\" is 还是. 或者 belongs in statements."},
{l:3,en:"I read or watch films at the weekend.",o:["周末我看书还是看电影。","周末我看书或者看电影。"],a:1,
 why:"This is a statement, so 或者 is the right \"or\"."},

/* ---- paired connectives ---- */
{l:3,en:"Because it rained, I didn't go.",o:["因为下雨，所以我没去。","因为下雨，我没去所以。"],a:0,
 why:"因为…所以… is a matched pair, each at the start of its own clause."},
{l:3,en:"Although I'm tired, I'm happy.",o:["虽然我很累，但是我很开心。","虽然我很累，我很开心但是。"],a:0,
 why:"虽然…但是… works the same way. Unlike English, Chinese keeps both halves."},
{l:4,en:"Only if you work hard will you succeed.",o:["只要努力，就会成功。","只要努力，才会成功。"],a:0,
 why:"只要 pairs with 就. 只有 is the one that pairs with 才."},

/* ---- 一点儿 / 有点儿 ---- */
{l:3,en:"This is a bit expensive.",o:["这个一点儿贵。","这个有点儿贵。"],a:1,
 why:"有点儿 goes before an adjective and carries a complaint. 一点儿 follows one: 便宜一点儿."},
{l:3,en:"Please speak a bit slower.",o:["请有点儿慢说。","请说慢一点儿。"],a:1,
 why:"Asking for an adjustment puts 一点儿 after the adjective."},

/* ---- 就 / 才 ---- */
{l:4,en:"He arrived at seven — earlier than expected.",o:["他七点就来了。","他七点才来了。"],a:0,
 why:"就 says it happened sooner or more easily than expected; 才 says later or with more difficulty."},
{l:4,en:"He didn't arrive until nine.",o:["他九点就来。","他九点才来。"],a:1,
 why:"才 marks something as late or overdue. It also doesn't take 了."},

/* ---- 被 ---- */
{l:3,en:"My bicycle was stolen.",o:["我的自行车被偷了。","我的自行车偷了被。"],a:0,
 why:"被 comes before the verb: subject + 被 (+ doer) + verb + result."},
{l:4,en:"The cup was broken by him.",o:["杯子被他打碎了。","杯子被他打。"],a:0,
 why:"Like 把, a 被 sentence needs a result attached to the verb."},

/* ---- 多 questions ---- */
{l:3,en:"How old are you?",o:["你多大？","你很大？"],a:0,
 why:"多 + adjective asks about degree: 多大, 多高, 多远."},
{l:3,en:"How far is it from here?",o:["离这儿多远？","离这儿很远吗多少？"],a:0,
 why:"多远 is the set question form for distance."},

/* ---- existence 有 vs 在 ---- */
{l:2,en:"There's a bank near here.",o:["这儿附近在一家银行。","这儿附近有一家银行。"],a:1,
 why:"有 introduces something new at a place. 在 says where a known thing is."},
{l:2,en:"The book is on the table.",o:["书有桌子上。","书在桌子上。"],a:1,
 why:"The book is already known, so 在 states its location."},

/* ---- duration ---- */
{l:4,en:"I studied Chinese for three years.",o:["我学中文了三年。","我学了三年中文。"],a:1,
 why:"Duration sits between verb and object: 学了三年中文."},
{l:4,en:"I waited two hours for him.",o:["我等了他两个小时。","我等他了两个小时。"],a:0,
 why:"了 attaches to the verb, then the object, then the duration."},

/* ---- separable verbs ---- */
{l:4,en:"I slept for eight hours.",o:["我睡觉了八个小时。","我睡了八个小时的觉。"],a:1,
 why:"睡觉 is a separable verb — verb + object. Duration goes inside, splitting it apart."},
{l:4,en:"He has been married twice.",o:["他结过两次婚。","他结婚过两次。"],a:0,
 why:"结婚 splits too: 过 and the count sit between 结 and 婚."},
{l:5,en:"Help me out.",o:["帮忙我一下。","帮我一个忙。"],a:1,
 why:"帮忙 can't take an object as a unit. The person goes inside: 帮我一个忙."},

/* ---- 一 and 不 tone-sandhi spelling traps rendered as usage ---- */
{l:2,en:"I don't go.",o:["我不去。","我没去。"],a:0,
 why:"不 negates habits, intentions and the present. 没 negates completed actions in the past."},
{l:2,en:"I didn't go yesterday.",o:["昨天我不去。","昨天我没去。"],a:1,
 why:"A past event that didn't happen takes 没, never 不."},

/* ---- directional complements ---- */
{l:4,en:"Please come in.",o:["请进来。","请来进。"],a:0,
 why:"The direction word follows the verb: 进来, 出去, 回去."},
{l:4,en:"He ran out.",o:["他跑出去了。","他出去跑了。"],a:0,
 why:"跑出去 keeps the manner verb first and the direction after it."},

/* ---- 着 ---- */
{l:4,en:"He speaks while standing.",o:["他站着说话。","他说话站着。"],a:0,
 why:"着 marks the ongoing state that accompanies the main action, and that clause comes first."},
{l:4,en:"The door is open.",o:["门开着。","门开了着。"],a:0,
 why:"着 describes a continuing state on its own; it doesn't stack with 了."},

/* ---- 的/地/得 ---- */
{l:5,en:"He happily agreed.",o:["他高兴的同意了。","他高兴地同意了。"],a:1,
 why:"地 turns a description into an adverb before a verb. 的 modifies nouns; 得 follows verbs."},
{l:5,en:"a happy child",o:["高兴的孩子","高兴地孩子"],a:0,
 why:"Modifying a noun calls for 的."},

/* ---- 让 / 使 ---- */
{l:4,en:"Mum told me to sleep early.",o:["妈妈让我早点儿睡。","妈妈我让早点儿睡。"],a:0,
 why:"让 + person + action. The person comes straight after 让."},
{l:5,en:"This news made me very happy.",o:["这个消息使我很高兴。","这个消息很高兴我。"],a:0,
 why:"使 introduces a caused state, and needs a person before the resulting adjective."},

/* ---- 对 ---- */
{l:4,en:"I'm very interested in history.",o:["我对历史很感兴趣。","我很感兴趣历史。"],a:0,
 why:"对 + topic goes before the predicate: 对…感兴趣."},
{l:4,en:"Exercise is good for your health.",o:["运动对身体很好。","运动很好对身体。"],a:0,
 why:"对 phrases sit before the adjective they qualify."},

/* ---- 更 / 最 ---- */
{l:3,en:"I like this one best.",o:["我最喜欢这个。","我喜欢最这个。"],a:0,
 why:"最 goes directly before the verb or adjective it intensifies."},
{l:3,en:"Today is even hotter than yesterday.",o:["今天比昨天更热。","今天更比昨天热。"],a:0,
 why:"更 sits with the adjective, after the 比 phrase."}
];
