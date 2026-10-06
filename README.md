# 练 — Chinese practice

Nine ways to practise Chinese **actively**, built on the HSK 1–6 vocabulary — including listening — plus the full flashcard deck on its own page.

| | Exercise | What you do |
|---|---|---|
| 组 | Build the sentence | Drag or tap scrambled words back into the right order. 1,919 sentences. |
| 配 | Match pairs | Pair six characters with their meanings against the clock. 4,796 words. |
| 语 | Spot the right grammar | Two sentences, one mistake — pick the correct one and read why. 72 rules. |
| 笔 | Write the strokes | Trace a character in the correct stroke order on a 田字格 grid. 618 characters. |
| 读 | Read a story | Graded texts with tap-to-see glosses, comprehension questions, then a translation. |
| 概 | Summarise | Read a paragraph, choose the summary that actually fits, then write your own. |
| 听 | Hear it, build it | Listen to a sentence and rebuild it from word tiles. Characters stay hidden until you answer. |
| 意 | Listen for the gist | Hear a short passage, pick the sentence that sums it up. |
| 答 | Answer back | Someone speaks to you — choose the reply that fits. |
| 卡 | Flashcards (`cards.html`) | The full 4,993-word deck with spaced repetition, on its own page. |

No build step, no framework, no tracking. Progress and level are saved in your browser. Works offline once loaded, and installs to a phone home screen.

## Listening and audio

There are no audio files in this repo. Sentences are spoken by **your device's own Chinese voice** through the Web Speech API — which keeps the repo small and gives you a far better voice than any file I could ship.

The catch: not every device has a Chinese voice. Most phones and Macs do; plenty of desktop Linux installs and some Windows ones do not. The app checks on load, and if there's no Chinese voice it says so on the home screen and each listening exercise explains how to install one, offering a reading exercise instead of a dead end.

Adding a voice: **iPhone** Settings → Accessibility → Spoken Content → Voices → Chinese · **Android** Settings → Accessibility → Text-to-speech → install Chinese · **Mac** System Settings → Accessibility → Spoken Content → Manage Voices → Chinese · **Windows** Settings → Time & Language → Language → add Chinese with speech.

Each listening exercise has **Play**, **Slow** (0.6×) for when it goes past too fast, and **Show the characters** when you want to give up and read it. Characters, pinyin and translation always appear once you answer.

## Deploy to GitHub Pages

1. Copy these files into the root of a new repository.
2. Push to `main`.
3. **Settings → Pages → Build and deployment**: Source *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Your site is live at `https://USERNAME.github.io/REPO/`.

A workflow at `.github/workflows/deploy.yml` is included if you'd rather set Source to *GitHub Actions*. Use one method, not both.

Afterwards, replace the `USERNAME`/`REPO` placeholders in the `canonical` and `og:url` tags in `index.html`. Everything else uses relative paths and works at any subpath.

## Running locally

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Use a server rather than opening the file directly — the stroke data is fetched per character, which needs HTTP.

## Adding your own content

Everything lives in `data/` as plain JS files. Each is one array you can extend by hand.

- **`grammar.js`** — `{l, en, o:[two sentences], a:index of the correct one, why}`
- **`stories.js`** — `{l, t, tp, te, p:[paragraphs], g:{word:gloss}, q:[questions], tr}`. Any word listed in `g` is automatically underlined in the text.
- **`summaries.js`** — `{l, t, p, o:[{t, ok, why}], model}`
- **`talk.js`** — two arrays. `TALK` is conversations: `{l, sit, a, ap, ae, o:[{t, p, ok, why}]}` where `a` is what you hear. `LISTEN` is passages: `{l, p, pp, pe, o:[{t, ok}]}`
- **`vocab.js`** — the flashcard deck used by `cards.html`
- **`sentences.js`** — generated from the flashcard deck; `t` is the array of word tiles in correct order
- **`pairs.js`**, **`strokechars.js`** — generated word and character lists

`l` is the HSK level everywhere. When a level has fewer than four items, the app automatically widens to neighbouring levels rather than showing an empty screen.

**After changing anything in `data/`, bump `CACHE` in `sw.js`** (`lian-v1` → `lian-v2`), or returning visitors keep the cached old copy.

## Colours

Colour means something here, consistently across every exercise:

| | | |
|---|---|---|
| `#B8F3FF` | ice | things you touch — tiles, options |
| `#8ABCAD` | sage | correct |
| `#DA9D95` | rose | wrong, and glosses you can tap |
| `#22223B` | ink | the app frame |
| `#F2E9E4` | paper | the worksheet the exercise sits on |

All five are CSS custom properties at the top of `styles.css`.

## Credits and licence

Stroke-order data and the renderer come from [Hanzi Writer](https://hanziwriter.org/), whose character data derives from the [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) project. That data is released under the **Arphic Public License**, included here as `ARPHICPL.TXT` — if you redistribute this site, keep that file.

Vocabulary derived from the MIT-licensed [clem109/hsk-vocabulary](https://github.com/clem109/hsk-vocabulary) dataset. Stories, grammar items and summary exercises are original. App code is yours to use and modify.
