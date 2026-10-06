/* Conversations: hear a line, choose the natural reply.
   a  = what you hear (the other person)
   o  = three possible replies; ok marks the right one, why explains it
   sit = the situation, shown in English so you know the context before listening */
window.TALK = [

/* ---------------- HSK 1 ---------------- */
{l:1,sit:"Someone greets you at school.",a:"你好！你叫什么名字？",ap:"Nǐ hǎo! Nǐ jiào shénme míngzi?",ae:"Hello! What's your name?",
 o:[{t:"我叫李明。",p:"Wǒ jiào Lǐ Míng.",ok:true,why:"They asked your name, so you give it."},
    {t:"我很好，谢谢。",p:"Wǒ hěn hǎo, xièxie.",why:"That answers 你好吗, not a question about your name."},
    {t:"他是我的朋友。",p:"Tā shì wǒ de péngyou.",why:"This is about someone else — the question was about you."}]},

{l:1,sit:"A classmate asks about your family.",a:"你家有几口人？",ap:"Nǐ jiā yǒu jǐ kǒu rén?",ae:"How many people are in your family?",
 o:[{t:"我家有四口人。",p:"Wǒ jiā yǒu sì kǒu rén.",ok:true,why:"几口人 asks for a number of people, so answer with one."},
    {t:"我家很大。",p:"Wǒ jiā hěn dà.",why:"That describes the house, not how many people live in it."},
    {t:"我有一个朋友。",p:"Wǒ yǒu yí ge péngyou.",why:"Friends aren't family — and the measure word 口 is specifically for family members."}]},

{l:1,sit:"A waiter comes to your table.",a:"你想喝什么？",ap:"Nǐ xiǎng hē shénme?",ae:"What would you like to drink?",
 o:[{t:"我想喝茶，谢谢。",p:"Wǒ xiǎng hē chá, xièxie.",ok:true,why:"喝 is for drinking, so name a drink."},
    {t:"我想吃米饭。",p:"Wǒ xiǎng chī mǐfàn.",why:"吃 is eating. They asked what you want to drink."},
    {t:"这个很好吃。",p:"Zhège hěn hǎochī.",why:"A comment on food, not an answer to the question."}]},

{l:1,sit:"Someone asks about your day.",a:"你今天忙吗？",ap:"Nǐ jīntiān máng ma?",ae:"Are you busy today?",
 o:[{t:"不忙，怎么了？",p:"Bù máng, zěnme le?",ok:true,why:"A 吗 question takes yes or no — and asking back keeps the conversation going."},
    {t:"今天星期三。",p:"Jīntiān xīngqīsān.",why:"That's the day of the week, not whether you're busy."},
    {t:"我很高兴。",p:"Wǒ hěn gāoxìng.",why:"Happy isn't an answer to busy."}]},

{l:1,sit:"You bump into someone in a doorway.",a:"对不起！",ap:"Duìbuqǐ!",ae:"Sorry!",
 o:[{t:"没关系。",p:"Méi guānxi.",ok:true,why:"The standard reply to an apology — it's fine."},
    {t:"谢谢你。",p:"Xièxie nǐ.",why:"Thanks answers a favour, not an apology."},
    {t:"再见。",p:"Zàijiàn.",why:"Saying goodbye here would be strange."}]},

{l:1,sit:"A friend is leaving your house.",a:"时间不早了，我走了。",ap:"Shíjiān bù zǎo le, wǒ zǒu le.",ae:"It's getting late, I'm off.",
 o:[{t:"好，路上小心。",p:"Hǎo, lù shàng xiǎoxīn.",ok:true,why:"\"Take care on the way\" is what you say to someone leaving."},
    {t:"你好，请进。",p:"Nǐ hǎo, qǐng jìn.",why:"That welcomes someone in — they're going out."},
    {t:"我不知道。",p:"Wǒ bù zhīdào.",why:"Nothing was asked."}]},

/* ---------------- HSK 2 ---------------- */
{l:2,sit:"A friend suggests a plan for the weekend.",a:"周末我们一起去看电影，怎么样？",ap:"Zhōumò wǒmen yìqǐ qù kàn diànyǐng, zěnmeyàng?",ae:"Shall we go to a film together at the weekend?",
 o:[{t:"好啊，几点？",p:"Hǎo a, jǐ diǎn?",ok:true,why:"Accept, then ask the practical follow-up."},
    {t:"我昨天看了电影。",p:"Wǒ zuótiān kàn le diànyǐng.",why:"They're proposing something for the future, not asking about your past."},
    {t:"电影院在那儿。",p:"Diànyǐngyuàn zài nàr.",why:"A location isn't an answer to an invitation."}]},

{l:2,sit:"You're at a shop counter.",a:"一共三十五块。",ap:"Yígòng sānshíwǔ kuài.",ae:"That's thirty-five yuan altogether.",
 o:[{t:"好，我可以用手机付钱吗？",p:"Hǎo, wǒ kěyǐ yòng shǒujī fù qián ma?",ok:true,why:"You've been told the price — the next move is paying."},
    {t:"这个多少钱？",p:"Zhège duōshao qián?",why:"They just told you the price."},
    {t:"我不卖。",p:"Wǒ bú mài.",why:"You're the one buying."}]},

{l:2,sit:"A colleague notices you look unwell.",a:"你脸色不太好，怎么了？",ap:"Nǐ liǎnsè bú tài hǎo, zěnme le?",ae:"You don't look well — what's wrong?",
 o:[{t:"我有点儿感冒，头很疼。",p:"Wǒ yǒudiǎnr gǎnmào, tóu hěn téng.",ok:true,why:"怎么了 asks what's wrong, so say what's wrong."},
    {t:"你也不好看。",p:"Nǐ yě bù hǎokàn.",why:"They're expressing concern, not commenting on your appearance."},
    {t:"今天天气很好。",p:"Jīntiān tiānqì hěn hǎo.",why:"Changing the subject completely."}]},

{l:2,sit:"You arrive late to meet a friend.",a:"你怎么才来？我等了半个小时了。",ap:"Nǐ zěnme cái lái? Wǒ děng le bàn ge xiǎoshí le.",ae:"Why are you only arriving now? I've waited half an hour.",
 o:[{t:"真不好意思，路上堵车了。",p:"Zhēn bù hǎoyìsi, lù shàng dǔchē le.",ok:true,why:"Apologise and give the reason."},
    {t:"我也等了很久。",p:"Wǒ yě děng le hěn jiǔ.",why:"You're the one who was late — this doesn't fit."},
    {t:"好的，再见。",p:"Hǎo de, zàijiàn.",why:"Leaving immediately would be odd."}]},

{l:2,sit:"Someone offers you more food at dinner.",a:"再吃一点儿吧，别客气。",ap:"Zài chī yìdiǎnr ba, bié kèqi.",ae:"Have some more, don't be shy.",
 o:[{t:"谢谢，我真的吃饱了。",p:"Xièxie, wǒ zhēn de chī bǎo le.",ok:true,why:"Thank them, then decline politely — 吃饱了 is the natural way."},
    {t:"我不喜欢你。",p:"Wǒ bù xǐhuan nǐ.",why:"Far too blunt, and about the wrong thing."},
    {t:"这是什么？",p:"Zhè shì shénme?",why:"Ignores the offer."}]},

{l:2,sit:"You ask a stranger for directions.",a:"火车站？一直走，然后向右拐。",ap:"Huǒchēzhàn? Yìzhí zǒu, ránhòu xiàng yòu guǎi.",ae:"The station? Go straight, then turn right.",
 o:[{t:"谢谢！远吗？",p:"Xièxie! Yuǎn ma?",ok:true,why:"Thank them, and ask the one thing you still need to know."},
    {t:"我不去火车站。",p:"Wǒ bú qù huǒchēzhàn.",why:"You asked for it — contradicting yourself is strange."},
    {t:"你是谁？",p:"Nǐ shì shéi?",why:"They're helping you; this is abrupt and off-topic."}]},

/* ---------------- HSK 3 ---------------- */
{l:3,sit:"A friend calls to cancel.",a:"真抱歉，我今天有事，可能去不了了。",ap:"Zhēn bàoqiàn, wǒ jīntiān yǒu shì, kěnéng qù bù liǎo le.",ae:"I'm sorry, something's come up — I probably can't make it.",
 o:[{t:"没事，我们改天吧。",p:"Méi shì, wǒmen gǎi tiān ba.",ok:true,why:"Accept gracefully and suggest another day."},
    {t:"你一定要来。",p:"Nǐ yídìng yào lái.",why:"Pressuring someone who's just apologised doesn't fit."},
    {t:"我也不知道。",p:"Wǒ yě bù zhīdào.",why:"Nothing was asked."}]},

{l:3,sit:"Your manager checks on a task.",a:"那个报告你准备得怎么样了？",ap:"Nàge bàogào nǐ zhǔnbèi de zěnmeyàng le?",ae:"How's that report coming along?",
 o:[{t:"差不多写完了，明天就能交。",p:"Chàbuduō xiě wán le, míngtiān jiù néng jiāo.",ok:true,why:"Report progress and when it'll be done."},
    {t:"报告很有意思。",p:"Bàogào hěn yǒu yìsi.",why:"An opinion about it, not a status update."},
    {t:"我没有报告。",p:"Wǒ méiyǒu bàogào.",why:"Contradicts the premise — they know you have one."}]},

{l:3,sit:"A friend asks your opinion on their plan.",a:"我打算明年去中国留学，你觉得怎么样？",ap:"Wǒ dǎsuàn míngnián qù Zhōngguó liúxué, nǐ juéde zěnmeyàng?",ae:"I'm planning to study in China next year — what do you think?",
 o:[{t:"我觉得是个好主意，你汉语进步会很快。",p:"Wǒ juéde shì ge hǎo zhǔyi, nǐ Hànyǔ jìnbù huì hěn kuài.",ok:true,why:"你觉得怎么样 asks for your view, so give one with a reason."},
    {t:"中国很大。",p:"Zhōngguó hěn dà.",why:"A fact about China, not an opinion on their plan."},
    {t:"我去过中国。",p:"Wǒ qù guo Zhōngguó.",why:"About you, when they asked what you think of their idea."}]},

{l:3,sit:"At the doctor's.",a:"这个药一天吃三次，饭后吃。",ap:"Zhège yào yì tiān chī sān cì, fàn hòu chī.",ae:"Take this medicine three times a day, after meals.",
 o:[{t:"好的，要吃几天？",p:"Hǎo de, yào chī jǐ tiān?",ok:true,why:"Confirm, then ask the obvious next question — for how long."},
    {t:"我不想吃饭。",p:"Wǒ bù xiǎng chīfàn.",why:"饭后 just means after eating; this misses the point."},
    {t:"这个药很贵。",p:"Zhège yào hěn guì.",why:"Doesn't respond to the instructions."}]},

{l:3,sit:"A neighbour knocks on your door.",a:"不好意思打扰一下，你家有盐吗？",ap:"Bù hǎoyìsi dǎrǎo yíxià, nǐ jiā yǒu yán ma?",ae:"Sorry to bother you — do you have any salt?",
 o:[{t:"有，你等一下，我去拿。",p:"Yǒu, nǐ děng yíxià, wǒ qù ná.",ok:true,why:"Answer the 有…吗 question, then act on it."},
    {t:"我很忙。",p:"Wǒ hěn máng.",why:"Not an answer, and unkind to a neighbour asking for something small."},
    {t:"盐在商店。",p:"Yán zài shāngdiàn.",why:"Technically true but unhelpful — they asked about your kitchen."}]},

{l:3,sit:"A friend compliments your Chinese.",a:"你的汉语说得真好！",ap:"Nǐ de Hànyǔ shuō de zhēn hǎo!",ae:"Your Chinese is really good!",
 o:[{t:"哪里哪里，还差得远呢。",p:"Nǎli nǎli, hái chà de yuǎn ne.",ok:true,why:"The conventional modest reply. 谢谢 also works, but this sounds more native."},
    {t:"我知道。",p:"Wǒ zhīdào.",why:"Grammatical, but it comes across as arrogant."},
    {t:"你说什么？",p:"Nǐ shuō shénme?",why:"Suggests you didn't understand — after a compliment, that's awkward."}]},

/* ---------------- HSK 4 ---------------- */
{l:4,sit:"A colleague asks for help when you're already busy.",a:"你现在方便吗？我想请你帮个忙。",ap:"Nǐ xiànzài fāngbiàn ma? Wǒ xiǎng qǐng nǐ bāng ge máng.",ae:"Are you free right now? I'd like to ask you a favour.",
 o:[{t:"现在有点儿忙，半个小时以后行吗？",p:"Xiànzài yǒudiǎnr máng, bàn ge xiǎoshí yǐhòu xíng ma?",ok:true,why:"Decline the timing without declining the favour, and propose a time."},
    {t:"不行。",p:"Bù xíng.",why:"Grammatical but abrupt — it refuses outright with no reason."},
    {t:"我帮你了。",p:"Wǒ bāng nǐ le.",why:"Says you already helped, which doesn't fit the request."}]},

{l:4,sit:"A shop assistant after you try something on.",a:"这件怎么样？要不要试试别的颜色？",ap:"Zhè jiàn zěnmeyàng? Yào bú yào shìshi bié de yánsè?",ae:"How's this one? Would you like to try another colour?",
 o:[{t:"样子我挺喜欢的，有深一点儿的吗？",p:"Yàngzi wǒ tǐng xǐhuan de, yǒu shēn yìdiǎnr de ma?",ok:true,why:"Answer both parts: your view on this one, and what you'd like instead."},
    {t:"我不买衣服。",p:"Wǒ bù mǎi yīfu.",why:"You're in the middle of trying clothes on."},
    {t:"颜色很多。",p:"Yánsè hěn duō.",why:"An observation, not a reply to the offer."}]},

{l:4,sit:"A friend tells you bad news.",a:"我这次考试没考好，有点儿难过。",ap:"Wǒ zhè cì kǎoshì méi kǎo hǎo, yǒudiǎnr nánguò.",ae:"I didn't do well on this exam, I'm a bit down.",
 o:[{t:"别太难过，一次考试说明不了什么。",p:"Bié tài nánguò, yí cì kǎoshì shuōmíng bù liǎo shénme.",ok:true,why:"Acknowledge the feeling first, then offer perspective."},
    {t:"你应该多努力。",p:"Nǐ yīnggāi duō nǔlì.",why:"Grammatical, but lecturing someone who's just said they're upset."},
    {t:"我考得很好。",p:"Wǒ kǎo de hěn hǎo.",why:"Making it about you at exactly the wrong moment."}]},

{l:4,sit:"On the phone to a restaurant.",a:"您好，请问几位？什么时间？",ap:"Nín hǎo, qǐngwèn jǐ wèi? Shénme shíjiān?",ae:"Hello, how many people, and what time?",
 o:[{t:"四位，今天晚上七点，可以吗？",p:"Sì wèi, jīntiān wǎnshang qī diǎn, kěyǐ ma?",ok:true,why:"Two questions were asked, so answer both."},
    {t:"我要一杯茶。",p:"Wǒ yào yì bēi chá.",why:"That's ordering, not booking."},
    {t:"你们几点关门？",p:"Nǐmen jǐ diǎn guānmén?",why:"Answers a question with a different question."}]},

{l:4,sit:"A friend asks why you turned something down.",a:"那么好的机会，你为什么不接受呢？",ap:"Nàme hǎo de jīhuì, nǐ wèishénme bù jiēshòu ne?",ae:"Such a good opportunity — why didn't you take it?",
 o:[{t:"主要是离家太远，我得考虑父母。",p:"Zhǔyào shì lí jiā tài yuǎn, wǒ děi kǎolǜ fùmǔ.",ok:true,why:"为什么 asks for a reason, so give the real one."},
    {t:"是的，很好的机会。",p:"Shì de, hěn hǎo de jīhuì.",why:"Agrees but never answers the question."},
    {t:"我接受了。",p:"Wǒ jiēshòu le.",why:"Contradicts the premise of the question."}]},

{l:4,sit:"Someone disagrees with you in a meeting.",a:"我不太同意你的看法，我觉得风险太大了。",ap:"Wǒ bú tài tóngyì nǐ de kànfǎ, wǒ juéde fēngxiǎn tài dà le.",ae:"I don't quite agree — I think the risk is too high.",
 o:[{t:"你说得有道理，那我们再讨论一下方案。",p:"Nǐ shuō de yǒu dàoli, nà wǒmen zài tǎolùn yíxià fāng'àn.",ok:true,why:"Acknowledge the point, then move the discussion forward."},
    {t:"你错了。",p:"Nǐ cuò le.",why:"Flatly dismissive in a setting that calls for discussion."},
    {t:"我也不同意我自己。",p:"Wǒ yě bù tóngyì wǒ zìjǐ.",why:"Doesn't make sense as a reply."}]},

/* ---------------- HSK 5 ---------------- */
{l:5,sit:"A friend asks for advice about a job offer.",a:"那份工作工资高，但是要经常出差，我有点儿犹豫。",ap:"Nà fèn gōngzuò gōngzī gāo, dànshì yào jīngcháng chūchāi, wǒ yǒudiǎnr yóuyù.",ae:"The job pays well but involves a lot of travel — I'm hesitating.",
 o:[{t:"要看你更看重什么，钱还是生活。",p:"Yào kàn nǐ gèng kànzhòng shénme, qián háishi shēnghuó.",ok:true,why:"They named a trade-off, so a useful reply names what the choice depends on."},
    {t:"出差很累。",p:"Chūchāi hěn lèi.",why:"True, but it only repeats half of what they already said."},
    {t:"你一定要去。",p:"Nǐ yídìng yào qù.",why:"They said they're hesitating — a flat order ignores that."}]},

{l:5,sit:"A colleague apologises for a mistake they made.",a:"这次是我疏忽了，给大家添了麻烦，实在不好意思。",ap:"Zhè cì shì wǒ shūhu le, gěi dàjiā tiān le máfan, shízài bù hǎoyìsi.",ae:"This was my oversight, and it caused everyone trouble — I'm really sorry.",
 o:[{t:"谁都会出错，重要的是以后怎么避免。",p:"Shéi dōu huì chūcuò, zhòngyào de shì yǐhòu zěnme bìmiǎn.",ok:true,why:"Accepts the apology without dwelling on blame, and turns to what matters next."},
    {t:"对，都是你的错。",p:"Duì, dōu shì nǐ de cuò.",why:"Grammatical, but piling on someone who has already taken responsibility."},
    {t:"没有麻烦。",p:"Méiyǒu máfan.",why:"Denies something they have already stated, which sounds dismissive."}]},

{l:5,sit:"At a dinner, someone proposes a toast.",a:"今天难得聚在一起，我敬大家一杯！",ap:"Jīntiān nándé jù zài yìqǐ, wǒ jìng dàjiā yì bēi!",ae:"It's rare for us all to get together — a toast to everyone!",
 o:[{t:"干杯！祝大家身体健康！",p:"Gānbēi! Zhù dàjiā shēntǐ jiànkāng!",ok:true,why:"Return the toast and add a good wish — that's the convention."},
    {t:"我不喝酒。",p:"Wǒ bù hē jiǔ.",why:"You can say this, but as the only reply to a toast it lands flatly."},
    {t:"杯子在哪儿？",p:"Bēizi zài nǎr?",why:"Deflates the moment."}]},

{l:5,sit:"A friend talks about a problem they can't solve.",a:"这件事我想了很久，还是没想出办法来。",ap:"Zhè jiàn shì wǒ xiǎng le hěn jiǔ, háishi méi xiǎng chū bànfǎ lái.",ae:"I've thought about this for ages and still can't find a way.",
 o:[{t:"要不你说说具体情况，我们一起想想？",p:"Yàobù nǐ shuōshuo jùtǐ qíngkuàng, wǒmen yìqǐ xiǎngxiang?",ok:true,why:"Offers to help in a concrete way instead of just sympathising."},
    {t:"那就别想了。",p:"Nà jiù bié xiǎng le.",why:"Dismisses a problem they've clearly been sitting with."},
    {t:"我想出来了。",p:"Wǒ xiǎng chūlái le.",why:"Claims a solution to a problem you haven't heard yet."}]},

/* ---------------- HSK 6 ---------------- */
{l:6,sit:"A colleague raises a concern about a deadline.",a:"按照目前的进度，恐怕很难按时完成，你怎么看？",ap:"Ànzhào mùqián de jìndù, kǒngpà hěn nán ànshí wánchéng, nǐ zěnme kàn?",ae:"At the current pace I'm afraid we can't finish on time — what do you think?",
 o:[{t:"我同意，不如先把最关键的部分做完，其他的往后推。",p:"Wǒ tóngyì, bùrú xiān bǎ zuì guānjiàn de bùfen zuò wán, qítā de wǎng hòu tuī.",ok:true,why:"Agrees, then proposes a concrete adjustment — which is what 你怎么看 invites."},
    {t:"时间还很多。",p:"Shíjiān hái hěn duō.",why:"Contradicts their assessment without engaging with it."},
    {t:"这不是我的工作。",p:"Zhè bú shì wǒ de gōngzuò.",why:"They asked for your view, not whose job it is."}]},

{l:6,sit:"Someone gives you unexpected criticism.",a:"说实话，我觉得你最近的状态不如从前了。",ap:"Shuō shíhuà, wǒ juéde nǐ zuìjìn de zhuàngtài bùrú cóngqián le.",ae:"Honestly, I think you haven't been on form lately.",
 o:[{t:"谢谢你直接告诉我，我自己也有这种感觉。",p:"Xièxie nǐ zhíjiē gàosu wǒ, wǒ zìjǐ yě yǒu zhè zhǒng gǎnjué.",ok:true,why:"Takes honest feedback without defensiveness, and adds your own read."},
    {t:"你管得太多了。",p:"Nǐ guǎn de tài duō le.",why:"Shuts down someone being candid with you."},
    {t:"我状态很好。",p:"Wǒ zhuàngtài hěn hǎo.",why:"A flat denial that engages with nothing they said."}]},

{l:6,sit:"A friend shares an idea they're excited about.",a:"我一直在考虑辞职创业，虽然风险不小，但我觉得值得试一试。",ap:"Wǒ yìzhí zài kǎolǜ cízhí chuàngyè, suīrán fēngxiǎn bù xiǎo, dàn wǒ juéde zhídé shì yí shì.",ae:"I've been thinking about quitting to start something of my own. The risk is real, but I think it's worth a try.",
 o:[{t:"听起来你已经想得挺清楚了，需要我帮什么尽管说。",p:"Tīng qǐlái nǐ yǐjīng xiǎng de tǐng qīngchu le, xūyào wǒ bāng shénme jǐnguǎn shuō.",ok:true,why:"They've weighed it already — recognising that and offering help fits better than more warnings."},
    {t:"创业很难，大部分都失败。",p:"Chuàngyè hěn nán, dàbùfen dōu shībài.",why:"They already named the risk; repeating it adds nothing."},
    {t:"那你别干了。",p:"Nà nǐ bié gàn le.",why:"Dismisses something they've clearly thought hard about."}]}
];

/* Listening passages: hear a short monologue, choose the sentence that sums it up. */
window.LISTEN = [

{l:1,p:"我叫王小月。我是学生，今年二十岁。我喜欢看书，也喜欢听音乐。",
 pp:"Wǒ jiào Wáng Xiǎoyuè. Wǒ shì xuésheng, jīnnián èrshí suì. Wǒ xǐhuan kàn shū, yě xǐhuan tīng yīnyuè.",
 pe:"My name is Wang Xiaoyue. I'm a student, twenty this year. I like reading and listening to music.",
 o:[{t:"她是学生，有两个爱好。",ok:true},{t:"她是老师，喜欢运动。",},{t:"她二十岁，不喜欢看书。"}]},

{l:1,sit:"",p:"今天下雨了，很冷。我没有伞，所以没出去。我在家看了一天电视。",
 pp:"Jīntiān xià yǔ le, hěn lěng. Wǒ méiyǒu sǎn, suǒyǐ méi chūqù. Wǒ zài jiā kàn le yì tiān diànshì.",
 pe:"It rained today and it was cold. I had no umbrella, so I didn't go out. I watched TV at home all day.",
 o:[{t:"因为下雨，他一天都在家。",ok:true},{t:"他带了伞，出去了。"},{t:"今天天气很好。"}]},

{l:2,p:"我家离公司很远，坐地铁要一个小时。所以我每天早上六点半就起床了。虽然有点儿累，但是我习惯了。",
 pp:"Wǒ jiā lí gōngsī hěn yuǎn, zuò dìtiě yào yí ge xiǎoshí. Suǒyǐ wǒ měitiān zǎoshang liù diǎn bàn jiù qǐchuáng le. Suīrán yǒudiǎnr lèi, dànshì wǒ xíguàn le.",
 pe:"My home is far from the office — an hour by subway. So I get up at half six every morning. It's a bit tiring, but I'm used to it.",
 o:[{t:"因为路远，他起得很早，已经习惯了。",ok:true},{t:"他住在公司旁边。"},{t:"他觉得很累，想换工作。"}]},

{l:2,p:"昨天是我妈妈的生日。我给她买了一个蛋糕，还做了几个菜。她很高兴，说这是最好的生日。",
 pp:"Zuótiān shì wǒ māma de shēngrì. Wǒ gěi tā mǎi le yí ge dàngāo, hái zuò le jǐ ge cài. Tā hěn gāoxìng, shuō zhè shì zuì hǎo de shēngrì.",
 pe:"Yesterday was my mum's birthday. I bought her a cake and cooked a few dishes. She was very happy and said it was her best birthday.",
 o:[{t:"他为妈妈过生日，妈妈很开心。",ok:true},{t:"妈妈给他做了饭。"},{t:"他忘记了妈妈的生日。"}]},

{l:3,p:"我以前很怕说汉语，因为担心说错。后来老师告诉我，说错是正常的，不说才永远学不会。从那以后我开始主动跟别人聊天，进步快多了。",
 pp:"Wǒ yǐqián hěn pà shuō Hànyǔ, yīnwèi dānxīn shuō cuò. Hòulái lǎoshī gàosu wǒ, shuō cuò shì zhèngcháng de, bù shuō cái yǒngyuǎn xué bú huì. Cóng nà yǐhòu wǒ kāishǐ zhǔdòng gēn biérén liáotiān, jìnbù kuài duō le.",
 pe:"I used to be afraid of speaking Chinese because I worried about making mistakes. Then my teacher told me mistakes are normal, and that not speaking is what stops you learning. Since then I've started talking to people, and I've improved much faster.",
 o:[{t:"他不再怕说错，所以进步更快了。",ok:true},{t:"老师说不能说错。"},{t:"他现在还是不敢说汉语。"}]},

{l:3,p:"这家饭馆开了三十年了。老板说，菜单几乎没有变过，因为很多老客人就是为了那几个菜来的。不过价格比以前贵了一些。",
 pp:"Zhè jiā fànguǎn kāi le sānshí nián le. Lǎobǎn shuō, càidān jīhū méiyǒu biàn guo, yīnwèi hěn duō lǎo kèrén jiù shì wèile nà jǐ ge cài lái de. Búguò jiàgé bǐ yǐqián guì le yìxiē.",
 pe:"This restaurant has been open thirty years. The owner says the menu has barely changed, because many regulars come for those few dishes. The prices, though, are higher than before.",
 o:[{t:"菜单没变，但是价格涨了。",ok:true},{t:"饭馆刚开了三年。"},{t:"老板每年都换菜单。"}]},

{l:4,p:"很多人以为学语言最重要的是记单词，其实不完全是。单词当然要记，但是如果不去用，很快就忘了。每天说几句，比一次背一百个词有用得多。",
 pp:"Hěn duō rén yǐwéi xué yǔyán zuì zhòngyào de shì jì dāncí, qíshí bù wánquán shì. Dāncí dāngrán yào jì, dànshì rúguǒ bú qù yòng, hěn kuài jiù wàng le. Měitiān shuō jǐ jù, bǐ yí cì bèi yìbǎi ge cí yǒuyòng de duō.",
 pe:"Many people think memorising words is the most important part of learning a language. It isn't quite that. You do need to learn words, but if you never use them you forget them fast. Saying a few sentences daily beats cramming a hundred words at once.",
 o:[{t:"记单词有用，但是经常使用更重要。",ok:true},{t:"背单词没有用。"},{t:"一次应该背一百个词。"}]},

{l:4,p:"上个月公司让我们在家工作。开始我觉得很方便，省了路上的时间。可是过了两个星期，我发现和同事交流少了很多，有些问题邮件说不清楚。现在我一周去办公室三天。",
 pp:"Shàng ge yuè gōngsī ràng wǒmen zài jiā gōngzuò. Kāishǐ wǒ juéde hěn fāngbiàn, shěng le lù shàng de shíjiān. Kěshì guò le liǎng ge xīngqī, wǒ fāxiàn hé tóngshì jiāoliú shǎo le hěn duō, yǒuxiē wèntí yóujiàn shuō bù qīngchu. Xiànzài wǒ yì zhōu qù bàngōngshì sān tiān.",
 pe:"Last month the company let us work from home. At first it felt convenient and saved commuting time. But after two weeks I found I was communicating much less with colleagues, and some things can't be explained clearly by email. Now I go into the office three days a week.",
 o:[{t:"在家工作有好处也有问题，所以他改成一周去三天。",ok:true},{t:"他觉得在家工作完全没有问题。"},{t:"公司不让他们在家工作。"}]},

{l:5,p:"研究发现，睡眠不足不只是让人觉得累。长期睡得少，记忆力和判断力都会下降，连情绪也更难控制。所以与其熬夜多做一个小时，不如早点儿睡，第二天效率更高。",
 pp:"Yánjiū fāxiàn, shuìmián bùzú bù zhǐ shì ràng rén juéde lèi. Chángqī shuì de shǎo, jìyìlì hé pànduànlì dōu huì xiàjiàng, lián qíngxù yě gèng nán kòngzhì. Suǒyǐ yǔqí áoyè duō zuò yí ge xiǎoshí, bùrú zǎo diǎnr shuì, dì èr tiān xiàolǜ gèng gāo.",
 pe:"Research finds that lack of sleep doesn't only make you tired. Over the long term, sleeping too little weakens memory and judgement, and makes emotions harder to control. So rather than staying up for one more hour's work, it's better to sleep early and be more efficient the next day.",
 o:[{t:"睡眠不足影响很多方面，早睡比熬夜更有效率。",ok:true},{t:"熬夜可以做更多的事。"},{t:"睡觉只影响人的体力。"}]},

{l:5,p:"这些年，越来越多年轻人选择离开大城市，回到家乡工作。原因不只是房价，也因为远程工作让很多岗位不再要求你住在哪里。不过回去以后，机会确实比大城市少，这是他们需要接受的。",
 pp:"Zhèxiē nián, yuè lái yuè duō niánqīng rén xuǎnzé líkāi dà chéngshì, huí dào jiāxiāng gōngzuò. Yuányīn bù zhǐ shì fángjià, yě yīnwèi yuǎnchéng gōngzuò ràng hěn duō gǎngwèi bú zài yāoqiú nǐ zhù zài nǎlǐ. Búguò huí qù yǐhòu, jīhuì quèshí bǐ dà chéngshì shǎo, zhè shì tāmen xūyào jiēshòu de.",
 pe:"In recent years more young people have chosen to leave big cities and work in their hometowns. The reason isn't only house prices, but also that remote work means many jobs no longer require you to live anywhere in particular. Still, once back, opportunities really are fewer than in the big cities, and that's something they have to accept.",
 o:[{t:"年轻人回家乡有多个原因，但也要接受机会变少。",ok:true},{t:"回家乡以后机会更多了。"},{t:"房价是唯一的原因。"}]},

{l:6,p:"关于人工智能会不会取代翻译，业内看法并不一致。有人认为日常翻译已经基本可以交给机器；也有人指出，涉及文化背景和语气的内容，机器仍然容易出错。比较现实的判断是，翻译这个职业不会消失，但工作内容会发生明显变化。",
 pp:"Guānyú réngōng zhìnéng huì bú huì qǔdài fānyì, yènèi kànfǎ bìng bù yízhì. Yǒu rén rènwéi rìcháng fānyì yǐjīng jīběn kěyǐ jiāo gěi jīqì; yě yǒu rén zhǐchū, shèjí wénhuà bèijǐng hé yǔqì de nèiróng, jīqì réngrán róngyì chūcuò. Bǐjiào xiànshí de pànduàn shì, fānyì zhège zhíyè bú huì xiāoshī, dàn gōngzuò nèiróng huì fāshēng míngxiǎn biànhuà.",
 pe:"Opinion in the field is divided on whether AI will replace translators. Some think everyday translation can already be handed to machines; others point out that content involving cultural background and tone still trips machines up. The more realistic judgement is that the profession won't disappear, but the work itself will change markedly.",
 o:[{t:"业内看法不同，多数认为翻译不会消失但会改变。",ok:true},{t:"所有人都认为机器会取代翻译。"},{t:"机器翻译已经完全没有问题。"}]}
];
