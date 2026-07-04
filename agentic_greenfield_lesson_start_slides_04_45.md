# Agentic Greenfield — стартове заняття: слайди 04–45

- **Source:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/4
- **Extracted range:** slides 4–44, plus slide 45 if available
- **Purpose:** personal study notes / особисті навчальні нотатки
- **Extraction mode:** full visible text, no summarization
- **Примітка про авторство:** Це не оригінальний матеріал. Усі слайди — авторства спікера презентації «Agentic Engineering — Greenfield» (Fwdays Academy). Кожна секція містить посилання на джерело. Матеріал відтворено виключно для особистого навчання.
- **Технічна примітка:** текст витягнуто з відрендереного DOM (Slidev print-view) і додатково звірено з PDF-експортом `Day_1.pdf`. Програмний витяг подекуди склеює слова без пробілів — у нотатках відновлено читабельні межі без зміни формулювань. Код, ідентифікатори, назви файлів/бібліотек/API не перекладалися.
- **Звірка з PDF:** наданий `Day_1.pdf` (41 сторінка, build-step-розгорнутий експорт із власною нумерацією «X / 66») підтвердив текст усіх слайдів. Текст усередині діаграм/графіків (раніше позначений для manual review) тепер зчитано візуально з рендеру PDF і додано до відповідних слайдів (06, 07, 08, 10, 14, 15, 16, 17, 20, 36). Нумерація слайдів збережена за URL-хешем живого деку (`slidev-page-N` = `#/N`), а не за нумерацією PDF.

---

## Slide 04

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/4

### Visible text

```
День 01
Нова SDLC та специфіка Greenfield
Чим відрізняється агентна інженерія, коли ти будуєш з нуля — і чому свобода без дисципліни перетворюється на vibe coding.
```

### Переклад українською
Текст слайда вже українською. Термін «vibe coding» — усталений англомовний термін, не перекладається.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Титульний слайд блоку «День 01». Проблем витягу немає.

---

## Slide 05

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/5

### Visible text

```
// 2026, AI агенти в розробці — це вже мейнстрім
85% девів регулярно використовують AI-агентів
51% щодня
41% нового коду згенеровано AI
The New SDLC With Vibe Coding · Osmani, Saboo, Kartakis · Google / Kaggle · травень 2026
```

### Переклад українською
Англомовний рядок-джерело: «The New SDLC With Vibe Coding» → «Нова SDLC з вайб-кодингом» (назва whitepaper; у нотатках лишаємо оригінальну назву як посилання на джерело). Імена авторів (Osmani, Saboo, Kartakis) та назви організацій (Google / Kaggle) не перекладаються.

### Text from images / diagrams
Великі цифри (85%, 51%, 41%) — це стилізований текст слайда (HTML), не зображення.

### Images
Немає зображень на слайді (статистика подана текстом/CSS).

### Notes
Проблем витягу немає.

---

## Slide 06

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/6

### Visible text

```
// Як ми сюди дійшли
Від автокомпліту до автономії
Кожне покоління зберігало попереднє і піднімало стелю того, що може зробити один інженер.
```

### Переклад українською
Текст слайда вже українською.

### Text from images / diagrams
Текст усередині діаграми (зчитано з рендеру PDF, візуальний огляд):

- **Location on slide:** заголовок діаграми (зверху).
  - **Original text:** "Each generation preserved what came before while raising the ceiling on what one engineer could accomplish."
  - **Переклад українською:** «Кожне покоління зберігало попереднє, піднімаючи стелю того, що може зробити один інженер.»
  - **Confidence:** high.
- **Location on slide:** п'ять кроків таймлайну (зліва направо).
  - **Original text:**
    - "Autocomplete (~2021) — Simple token predictions. The editor guesses your next few characters."
    - "Inline Code Suggestions (~2022) — Complete entire functions from a signature. The model understands patterns, not just tokens."
    - "Chat-Based Generation (~2023) — Describe a feature in natural language, receive a working implementation. The conversation becomes the interface."
    - "Coding agents (~2024-25) — Multi-file edits, tool calling, test execution, iterative self-correction. The agent runs its own loop."
    - "Autonomous Agents (~2025-26) — Clone repositories, plan architecture, execute in sandboxes, run full test suites, submit pull requests — no human keystrokes required."
  - **Переклад українською:**
    - «Автокомпліт (~2021) — прості передбачення токенів. Редактор вгадує наступні кілька символів.»
    - «Інлайн-пропозиції коду (~2022) — завершує цілі функції за сигнатурою. Модель розуміє патерни, а не лише токени.»
    - «Генерація через чат (~2023) — описуєш фічу природною мовою, отримуєш робочу імплементацію. Чат стає інтерфейсом.»
    - «Кодинг-агенти (~2024-25) — мультифайлові зміни, виклик інструментів, запуск тестів, ітеративна само-корекція. Агент крутить власний цикл.»
    - «Автономні агенти (~2025-26) — клонують репозиторії, планують архітектуру, виконують у пісочницях, ганяють повні набори тестів, відкривають pull request — без жодного натискання клавіш людиною.»
  - **Confidence:** high.
- **Location on slide:** вісь під кроками та виноска.
  - **Original text:** "Syntax → Intent" · "More human effort … More machine autonomy" · "85% of developers now use AI coding tools regularly. 41% of new code is AI-generated. — 2026 industry data"
  - **Переклад українською:** «Синтаксис → Намір» · «Більше людських зусиль … більше машинної автономії» · «85% розробників тепер регулярно використовують AI-інструменти для коду. 41% нового коду згенеровано AI. — галузеві дані 2026».
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig1-autocomplete-to-autonomy.png (alt: "From Autocomplete to Autonomy")

### Notes
Текст діаграми відновлено з PDF-експорту (`Day_1.pdf`, відповідна сторінка), візуальний огляд.

---

## Slide 07

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/7

### Visible text

```
// Спільне визначення
Агент — це не чат. Це цикл.
Чат відповідає і чекає. Агент крутить власний цикл: сприйняти ціль → спланувати → діяти інструментами → спостерігати → повторювати, доки не виконано.
Складові: model · tools · memory · orchestration · deployment.
«The loop is the beating heart of every agent.»
```

### Переклад українською
Англомовна цитата: «The loop is the beating heart of every agent.» → «Цикл — це б'юче серце кожного агента.»
Терміни model · tools · memory · orchestration · deployment лишаються в оригіналі (технічні складові).

### Text from images / diagrams
Текст усередині діаграми циклу (зчитано з рендеру PDF):

- **Location on slide:** вузли циклу (за годинниковою стрілкою) та підписи.
  - **Original text:** "User prompt / task specification" → "Perceive Goal" → "Observe Results" → "Act (Tools)" → "Plan Steps" (замкнений цикл); центр: "Self-Correcting"; пунктирна червона стрілка: "Result unsatisfactory → re-plan" з позначкою "(n)"; праворуч: "Termination condition met → output delivered".
  - **Переклад українською:** «Промпт користувача / специфікація задачі» → «Сприйняти ціль» → «Спостерігати результати» → «Діяти (інструменти)» → «Спланувати кроки»; центр: «Само-корекція»; пунктир: «Результат незадовільний → переплан» «(n)»; праворуч: «Умова завершення виконана → вивід доставлено».
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig2-agent-loop.png (alt: "The Agent Loop")

### Notes
Текст діаграми відновлено з PDF-експорту, візуальний огляд.

---

## Slide 08

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/8

### Visible text

```
// Важлива концепція
Agent = Model + Harness
Модель — це двигун.
Harness — це автомобіль.
Грубо: ~10% модель, ~90% harness. На Terminal-Bench 2.0 команда піднялася з-поза Топ-30 у Топ-5, змінивши лише harness — без зміни моделі. LangChain додав +13.7 бала так само.
«Most agent failures, examined honestly, are configuration failures.»
```

### Переклад українською
Англомовна цитата: «Most agent failures, examined honestly, are configuration failures.» → «Більшість збоїв агента, якщо чесно розібратися, — це збої конфігурації.»
Терміни Model, Harness, Terminal-Bench 2.0, LangChain — без перекладу.

### Text from images / diagrams
Текст усередині концентричної діаграми «анатомія harness» (зчитано з рендеру PDF):

- **Location on slide:** легенда (зверху-ліворуч).
  - **Original text:** "Model ~10% / Harness ~90%"
  - **Переклад українською:** «Модель ~10% / Harness ~90%»
- **Location on slide:** шари (зовні → всередину).
  - **Original text:** "Cloud Infrastructure — production services" (Managed Runtimes); "Developer Interface — operational tooling" (CLI / IDE Integration); "Framework Layer — where intelligence is shaped" з ядром "LLM", оточеним: "Instructions / Rule Files", "Tools & MCP Servers", "Orchestration Logic", "Guardrails & Hooks", "Eval & Testing", "Observability & Tracing"; ліворуч "Session / Memory Store"; знизу "Deployment Config", "Service & Scaling".
  - **Переклад українською:** «Хмарна інфраструктура — продакшн-сервіси» (керовані середовища виконання); «Інтерфейс розробника — операційний інструментарій» (CLI / інтеграція з IDE); «Рівень фреймворку — де формується інтелект» з ядром «LLM», оточеним: «Інструкції / файли правил», «Інструменти та MCP-сервери», «Логіка оркестрації», «Guardrails та хуки», «Eval та тестування», «Спостережуваність і трасування»; ліворуч «Сховище сесій / пам'яті»; знизу «Конфіг деплою», «Сервіс і масштабування». (Технічні назви компонентів лишено в оригіналі.)
- **Location on slide:** підпис під діаграмою.
  - **Original text:** "The model is the engine. The harness is the car, the road, and the traffic laws."
  - **Переклад українською:** «Модель — це двигун. Harness — це автомобіль, дорога й правила дорожнього руху.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig7-harness-anatomy.png (alt: "Harness anatomy — model ~10%, harness ~90%")

### Notes
Текст діаграми відновлено з PDF-експорту, візуальний огляд.

---

## Slide 09

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/9

### Visible text

```
// Основна ідея курсу
Agentic Engineering — це налаштування
- Instructions & Rules — AGENTS.md, CLAUDE.md, скіли, промпти суб-агентів — хто агент і що йому заборонено.
- Tools — функції, MCP-сервери, API — коли і як їх викликати.
- Sandboxes — де виконується код, до чого має доступ, чого не дістане.
- Orchestration — спавн суб-агентів, роутинг моделей, хендофи між спеціалістами.
- Guardrails & Hooks — детермінований код у точках циклу: перед комітом, після правки.
- Observability — логи, треси, evals, облік вартості й латентності.
Context engineering — найважливіша складова harness.
«AI amplifies whatever engineering culture it lands in.» — Addy Osmani
```

### Переклад українською
Назва теми: «Agentic Engineering» → «Агентна інженерія» (термін лишаємо в оригіналі).
Англомовна цитата: «AI amplifies whatever engineering culture it lands in.» — Addy Osmani → «AI підсилює будь-яку інженерну культуру, у яку потрапляє.» — Едді Османі.
Заголовки складових (Instructions & Rules, Tools, Sandboxes, Orchestration, Guardrails & Hooks, Observability, Context engineering) — технічні терміни, без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 10

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/10

### Visible text

```
// Що відрізняє вайб від інженерії
Це не «чи використовуєш AI». Це як ти перевіряєш результат.
Vibe: «наче працює?»
Structured: ручні тести + спот-чеки
Agentic: тести + evals + CI-гейти
```

### Переклад українською
Мітки рівнів: Vibe → «Вайб», Structured → «Структуровано», Agentic → «Агентно» (у презентації лишені англійською як назви рівнів; терміни evals, CI-гейти — технічні).

### Text from images / diagrams
Текст усередині діаграми-спектра (зчитано з рендеру PDF):

- **Location on slide:** заголовок діаграми.
  - **Original text:** "The differentiator is not whether you use AI — it's how outputs get verified."
  - **Переклад українською:** «Відмінність не в тому, чи використовуєш AI, — а в тому, як перевіряються результати.»
- **Location on slide:** три колонки спектра.
  - **Original text:**
    - "Vibe Coding — Casual prompts / 'Does it seem to work?' / Disposable code"
    - "Structured AI-Assisted — Detailed prompts + constraints / Manual testing + spot checks / Features in established codebases"
    - "Agentic Engineering — Formal specs + architecture docs / Automated evals + CI/CD gates / Production systems at scale"
  - **Переклад українською:**
    - «Vibe Coding — недбалі промпти / “наче працює?” / одноразовий код»
    - «Structured AI-Assisted — детальні промпти + обмеження / ручні тести + спот-чеки / фічі в усталених кодбазах»
    - «Agentic Engineering — формальні специфікації + архітектурні доки / автоматичні evals + CI/CD-гейти / продакшн-системи в масштабі»
- **Location on slide:** вісь та підпис унизу.
  - **Original text:** "Less structure, more speed … More structure, more reliability" · "The right position depends on the stakes. The skill is knowing where to draw the line for each task."
  - **Переклад українською:** «Менше структури, більше швидкості … більше структури, більше надійності» · «Правильна позиція залежить від ставок. Майстерність — знати, де провести межу для кожної задачі.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig3-spectrum-vibe-to-agentic.png (alt: "Vibe coding to agentic engineering spectrum")

### Notes
Текст діаграми відновлено з PDF-експорту, візуальний огляд.

---

## Slide 11

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/11

### Visible text

```
// Два механізми перевірки
Tests vs Evals — навіщо обидва

Tests
Детерміноване. Один вхід → один правильний вихід. Перевіряє код, точна рівність.
```

```js
expect(comfortScore(22, 0)).toBe(87)
```

```
Evals
Недетерміноване. Багато валідних відповідей, якість суб'єктивна. Оцінює рубрика + LM-суддя на датасеті.
```

```
score(rationale) ≥ 8/10 на 30 кейсах
```

```
Аналогія для SWE: тест — це assert (бінарно, точно). Eval — це авто-QA за рубрикою на датасеті, з порогом (статистично). Без обох — це vibe coding.
```

### Переклад українською
Заголовок «Tests vs Evals — навіщо обидва» → «Тести проти Evals — навіщо обидва». Терміни Tests, Evals, assert, LM-суддя, SWE, vibe coding — без перекладу. Код не перекладається.

### Text from images / diagrams
Немає зображень із текстом (приклади подано як код-фрагменти).

### Images
Немає зображень на слайді.

### Notes
Фрагменти `expect(...).toBe(87)` та `score(rationale) ≥ 8/10` збережено як код.

---

## Slide 12

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/12

### Visible text

```
// Eval на прикладі (1/2) — output
Чому точна рівність не працює для LLM-виходу
Чиста функція — юніт-тест ідеальний:
```

```js
expect(comfortScore(22, 0)).toBe(87) ✓
```

```
Але рейтинг ще й пояснюється прозою — точна рівність крихка й безглузда:
```

```js
expect(text).toBe("Тепло і сухо") ✗
```

```
сотні валідних формулювань — яке з них «правильне»?
Eval замість рівності — рубрика + суддя на датасеті погоди:
✅ згадує реальні умови
✅ не суперечить даним — ніколи «приємно» в дощ
✅ українською, без оклику, ≤ 80 символів
Реальний баг, що зловив eval: у дощовий день рейтинг сказав «приємний». Юніт-тести при цьому були зелені. Агрегат: 28/30 кейсів пройшли · поріг не падає (eval-ratchet у CI).
«Set the bar at the eval, not the demo.»
```

### Переклад українською
Англомовна цитата: «Set the bar at the eval, not the demo.» → «Став планку на eval, а не на демо.»
Терміни LLM, eval, eval-ratchet, CI — без перекладу. Код збережено.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 13

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/13

### Visible text

```
// Eval на прикладі (2/2) — trajectory
Output eval vs Trajectory eval

Output eval
Оцінює фінальну відповідь: правильна? зрозуміла? на тон?
«Чи коректний топ-вибір міста?»

Trajectory eval
Оцінює шлях: ті інструменти, у тому порядку, без зайвого?
geocode → forecast → score → rank · без пропуску verify

Запит: «найкращі вихідні в межах 300 км для походу». Відповідь може бути правильною випадково, а шлях — зламаним: агент смикнув платний API 40 разів або пропустив крок перевірки. Коректна відповідь зі зламаним шляхом — надзвичайно небезпечний збій.
Лінки: Building effective agents · New SDLC whitepaper
```

### Переклад українською
Підзаголовки: «Output eval» → «Eval виходу», «Trajectory eval» → «Eval траєкторії» (у нотатках лишаємо й оригінал як технічні терміни).
Назви джерел «Building effective agents», «New SDLC whitepaper» — лишаються в оригіналі (назви публікацій). Кроки geocode → forecast → score → rank · verify — ідентифікатори інструментів, без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 14

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/14

### Visible text

```
// Контекст-інженерія для greenfield
Static vs Dynamic context
У brownfield контекст відновлюють з легасі. У greenfield його проєктують наперед як артефакт:
Static — завжди в контексті (AGENTS.md, правила). Дорого, максимально обмежуємо.
Dynamic — на вимогу (скіли, інструменти, RAG). Ефективно, платимо лише за потрібне.
Межа не завжди очевидна і може визначатися експериментально.
```

### Переклад українською
Заголовок «Static vs Dynamic context» → «Статичний проти динамічного контексту».
Терміни greenfield, brownfield, Static, Dynamic, AGENTS.md, RAG — без перекладу.

### Text from images / diagrams
Текст усередині діаграми (зчитано з рендеру PDF):

- **Location on slide:** ліворуч — "Six types of agent context".
  - **Original text:** Instructions (Roles, goals, boundaries); Knowledge (Documents, diagrams, domain data); Memory (Session logs, persistent state); Examples (Few-shot demos, reference patterns); Tools (APIs, scripts, external services); Guardrails (Hard constraints, safety rules). "Design decision: what goes where?"
  - **Переклад українською:** «Шість типів контексту агента»: Інструкції (ролі, цілі, межі); Знання (документи, діаграми, доменні дані); Пам'ять (логи сесій, постійний стан); Приклади (few-shot демо, еталонні патерни); Інструменти (API, скрипти, зовнішні сервіси); Guardrails (тверді обмеження, правила безпеки). «Проєктне рішення: що куди?»
- **Location on slide:** праворуч — дві картки.
  - **Original text:** "Static Context — Always loaded, every interaction. Token cost: high. System instructions / Rules files (AGENTS.md) / Global memory / Core guardrails. Expensive but reliable. The agent never forgets these." | "Dynamic Context — Loaded on demand, per task. Token cost: low per turn. Agent Skills (triggered by task match) / Tool results (retrieved during execution) / Retrieved documents (RAG). Efficient and scalable. Pay only for what you use."
  - **Переклад українською:** «Статичний контекст — завжди завантажений, кожна взаємодія. Вартість у токенах: висока. Системні інструкції / файли правил (AGENTS.md) / глобальна пам'ять / основні guardrails. Дорого, але надійно. Агент ніколи цього не забуває.» | «Динамічний контекст — завантажується на вимогу, на задачу. Вартість у токенах: низька на хід. Agent Skills (за збігом задачі) / результати інструментів (отримані під час виконання) / знайдені документи (RAG). Ефективно й масштабовано. Платиш лише за те, що використовуєш.»
- **Location on slide:** підпис унизу.
  - **Original text:** "The best systems treat this as a first-class architectural decision, reviewed and versioned like code."
  - **Переклад українською:** «Найкращі системи трактують це як архітектурне рішення першого класу — з рев'ю і версіонуванням, як код.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig4-context-static-vs-dynamic.png (alt: "Static vs dynamic context")

### Notes
Текст діаграми відновлено з PDF-експорту, візуальний огляд.

---

## Slide 15

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/15

### Visible text

```
// Життєвий цикл стиснувся нерівномірно
Traditional SDLC → AI-Driven SDLC
Імплементація: тижні → години. Вимоги, архітектура, верифікація — лишаються за людиною.
Фокус зміщається на перевірку. І вона стає складнішою.
```

### Переклад українською
Заголовок «Traditional SDLC → AI-Driven SDLC» → «Традиційна SDLC → SDLC, керована AI».

### Text from images / diagrams
Текст усередині діаграми (зчитано з рендеру PDF):

- **Location on slide:** верхній ряд — "Traditional Iterative SDLC".
  - **Original text:** Requirements (2-3 days) → Design (1-2 days) → Implementation (1-3 weeks) → Testing (3-5 days) → Review & Deploy (2-3 days) → Maintenance (Ongoing). "Sprint cycle: weeks."
  - **Переклад українською:** «Традиційна ітеративна SDLC»: Вимоги (2–3 дні) → Дизайн (1–2 дні) → Імплементація (1–3 тижні) → Тестування (3–5 днів) → Рев'ю і деплой (2–3 дні) → Підтримка (постійно). «Цикл спринту: тижні.»
- **Location on slide:** середній підпис.
  - **Original text:** "Same phases, different bottlenecks, different proportions"
  - **Переклад українською:** «Ті самі фази, інші вузькі місця, інші пропорції.»
- **Location on slide:** нижній ряд — "AI-Driven SDLC".
  - **Original text:** Requirements ("Specification quality is the new bottleneck") → Design ("Architecture decisions amplified at scale") → [Minutes to hours] → Output Eval / Trajectory Eval ("Verify what it built AND how it got there") → Review & Deploy → Maintenance ("Continuous automation"). "Specs become eval criteria." "Agent self-corrects." "Iteration cycle: minutes to hours."
  - **Переклад українською:** «SDLC, керована AI»: Вимоги («Якість специфікації — нове вузьке місце») → Дизайн («Архітектурні рішення підсилюються в масштабі») → [Хвилини-години] → Output Eval / Trajectory Eval («Перевір, що збудовано, І як до цього дійшло») → Рев'ю і деплой → Підтримка («Безперервна автоматизація»). «Специфікації стають критеріями eval.» «Агент само-коригується.» «Цикл ітерації: хвилини-години.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig5-traditional-vs-ai-sdlc.png (alt: "Traditional vs AI-driven SDLC")

### Notes
Текст діаграми відновлено з PDF-експорту, візуальний огляд.

---

## Slide 16

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/16

### Visible text

```
// Дві ролі розробника
Conductor → Orchestrator
Навички оркестратора: Specification · Decomposition · Evaluation · System design — це і є фокус цього курсу.
```

### Переклад українською
Заголовок «Conductor → Orchestrator» → «Диригент → Оркестратор».
Навички: Specification → «Специфікація», Decomposition → «Декомпозиція», Evaluation → «Оцінювання», System design → «Проєктування систем».

### Text from images / diagrams
Текст усередині діаграми (зчитано з рендеру PDF):

- **Location on slide:** заголовок зверху.
  - **Original text:** "Not either/or — both, depending on the task"
  - **Переклад українською:** «Не одне-чи-інше — обидва, залежно від задачі.»
- **Location on slide:** ліва панель — "Conductor".
  - **Original text:** "Conductor — Real-time · Synchronous · In-IDE. Developer —prompt→ Agent —generates code; Developer —reviews inline→ Agent —refines. [Inline Completion] [Chat-in-Editor] [Diff Review & Accept/Review] [Quick Fix / Refactor]. • Keystroke-level control • Immediate feedback • Single-file scope • Developer always in the loop. Best for: Exploratory coding, prototyping, learning a new API."
  - **Переклад українською:** «Диригент — реальний час · синхронно · в IDE. Розробник —промпт→ Агент —генерує код; Розробник —рев'ю інлайн→ Агент —уточнює. [Інлайн-доповнення] [Чат-у-редакторі] [Diff-рев'ю та прийняти] [Швидкий фікс / рефактор]. • контроль на рівні натискань • миттєвий фідбек • однофайловий обсяг • розробник завжди в циклі. Найкраще для: дослідницький кодинг, прототипування, вивчення нового API.»
- **Location on slide:** права панель — "Orchestrator".
  - **Original text:** "Orchestrator — Asynchronous · High-level · Multi-agent. Developer —defines specific task→ Agent(s) work independently; Developer —reviews PR / output→ approves or corrects. [Task / Issue Assignment] [Background Terminal Agents] [CI/CD Integration] [Eval & Test Suites] [Multi-Agent Coordination]. • Goal-level control • Delayed feedback • Multi-file scope • Reviews outcomes not keystrokes. Best for: Feature implementation, migrations, test generation."
  - **Переклад українською:** «Оркестратор — асинхронно · високорівнево · мульти-агент. Розробник —визначає конкретну задачу→ Агент(и) працюють незалежно; Розробник —рев'ю PR / виходу→ схвалює або коригує. [Призначення задач / ішью] [Фонові термінальні агенти] [Інтеграція з CI/CD] [Eval та тест-набори] [Координація мульти-агентів]. • контроль на рівні цілей • відкладений фідбек • мультифайловий обсяг • рев'ю результатів, а не натискань. Найкраще для: імплементація фіч, міграції, генерація тестів.»
- **Location on slide:** вісь та підпис унизу.
  - **Original text:** "Fine-grained control … High-leverage delegation" · "Most developers move fluidly between both."
  - **Переклад українською:** «Дрібнозернистий контроль … високоважільне делегування» · «Більшість розробників вільно переходять між обома.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig8-conductor-vs-orchestrator.png (alt: "Conductor vs orchestrator")

### Notes
Текст діаграми відновлено з PDF-експорту, візуальний огляд. (У діаграмі є друкарська помилка автора: "Cooridnation".)

---

## Slide 17

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/17

### Visible text

```
// Економіка greenfield
Vibe = low CapEx / high OpEx
Vibe coding дешево стартує, але платить «податок» токенами, підтримкою й безпекою. За точкою перетину — 3–10× дорожче за фічу.
Agentic: дорожчий старт (схеми, тести, контекст) → нижча гранична вартість.
Важіль — intelligent model routing: дорогі моделі на складне, дешеві на детерміноване.
```

### Переклад українською
Заголовок «Vibe = low CapEx / high OpEx» → «Вайб = низький CapEx / високий OpEx».
Термін «intelligent model routing» → «розумний роутинг моделей». CapEx, OpEx, Vibe coding, Agentic — без перекладу.

### Text from images / diagrams
Текст усередині графіка (зчитано з рендеру PDF):

- **Location on slide:** осі.
  - **Original text:** Y: "Cumulative Total Cost of Ownership"; X: "Time / Features Shipped".
  - **Переклад українською:** Y: «Сукупна повна вартість володіння»; X: «Час / випущені фічі».
- **Location on slide:** червона крива "Vibe Coding" та її мітки.
  - **Original text:** "Context Collapse", "Security Risk", "Maintenance Tax", "Prompting Tax", "High CapEx Platform", "Low CapEx", "Token Burn"; "Vibe coding advantage: speed to first output."
  - **Переклад українською:** «Колапс контексту», «Ризик безпеки», «Податок на підтримку», «Податок на промптинг», «Висока CapEx-платформа», «Низький CapEx», «Згоряння токенів»; «Перевага вайб-кодингу: швидкість до першого виводу.»
- **Location on slide:** синя крива "Agentic Engineering" та точка перетину.
  - **Original text:** "Regressions Caught" (×3), "Agentic engineering advantage: sustainable scale.", "Crossover Point — At this point, the vibe coding costs 3-10x more per feature."
  - **Переклад українською:** «Регресії впіймано» (×3), «Перевага агентної інженерії: стале масштабування.», «Точка перетину — у цей момент вайб-кодинг коштує у 3–10× дорожче за фічу.»
- **Location on slide:** дві картки-зведення.
  - **Original text:** "Vibe Coding — CapEx 12% Min Investment / OpEx High Running Costs · Rapid prototyping, slow scaling · High friction for long-term maintenance · Economic dead-end for complex systems." | "Agentic Engineering — CapEx Upfront Platform Design / OpEx Low Marginal Running Costs 12% · Controlled iteration, fast scaling · Low friction for automatic updates · Economically sustainable for mature codebases."
  - **Переклад українською:** «Vibe Coding — CapEx 12% мін. інвестиція / OpEx високі поточні витрати · швидке прототипування, повільне масштабування · високе тертя для довгої підтримки · економічний глухий кут для складних систем.» | «Agentic Engineering — CapEx початкове проєктування платформи / OpEx низькі граничні поточні витрати 12% · контрольована ітерація, швидке масштабування · низьке тертя для автоматичних оновлень · економічно стале для зрілих кодбаз.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/fig9-economics-capex-opex.png (alt: "Economics — CapEx vs OpEx crossover")

### Notes
Текст графіка відновлено з PDF-експорту, візуальний огляд.

---

## Slide 18

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/18

### Visible text

```
// Компоненти Agentic Engineering
Рухаємося по складових
- Моделі — двигун, ~10%
- Harness + інструменти — Claude Code, Cursor…
- Rules / AGENTS.md — хто агент, що не можна
- Agent Skills — процедурні знання
- MCP — інструменти, дані
- Субагенти — maker ≠ checker
- Factory — система, що будує
- Loop engineering — цикл замість промптів
Далі — по черзі.
```

### Переклад українською
Назви складових — технічні терміни (Моделі, Harness, Rules/AGENTS.md, Agent Skills, MCP, Субагенти, Factory, Loop engineering), лишаються в оригіналі. «maker ≠ checker» → «той, хто робить ≠ той, хто перевіряє».

### Text from images / diagrams
Немає зображень із текстом (карти складових подано текстом/CSS).

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 19

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/19

### Visible text

```
// Компонент 1 — Моделі
Моделі: фронтир і компроміси
Frontier (Claude Opus/Fable, GPT-5.x, Gemini 3) — для архітектури, складної імплементації, рев'ю. Дорожчі.
Швидкі/дешеві (Sonnet, Composer, Flash, Kimi) — для детермінованого: тести, рев'ю, рефактор. Дешевші в рази.
Правило: не одна модель на все — роутинг за складністю (День 02).
Обирай за результатами, але звіряємося з бенчмарками:
SWE-bench · Terminal-Bench · Aider · LMArena · DeepSWE · CursorBench
Але бенчмарк міряє модель + дефолтний harness + умовні задачі. Наш проєкт плюс harness може давати інші результати.
Лінки: swebench.com · tbench.ai · aider.chat/leaderboards · lmarena.ai · deepswe · cursorbench
```

### Переклад українською
Заголовок «Моделі: фронтир і компроміси» вже українською. «Frontier» → «фронтирні (передові) моделі». Назви моделей і бенчмарків (Claude Opus/Fable, GPT-5.x, Gemini 3, Sonnet, Composer, Flash, Kimi, SWE-bench, Terminal-Bench, Aider, LMArena, DeepSWE, CursorBench) та URL не перекладаються.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 20

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/20

### Visible text

```
// Фронтир, у цифрах
Бенчмарки: не все так однозначно
DeepSWE · Datacurve · довгі реальні SWE-задачі · deepswe.datacurve.ai
CursorBench 3.1 · ціна vs якість · cursor.com/cursorbench
```

### Переклад українською
Текст-підписи українською; назви бенчмарків, продуктів та URL не перекладаються. «ціна vs якість» → «ціна проти якості».

### Text from images / diagrams
Числові дані лідербордів (зчитано з рендеру PDF):

- **Location on slide:** лівий лідерборд "DeepSWE — frontier coding-agent benchmark".
  - **Підзаголовок:** "Pass@1 on 113 original long-horizon tasks · 91 repos · 5 languages · hand-written behaviour verifiers. Source: Datacurve (deepswe.datacurve.ai), captured 2026-06-22"
  - **Значення:** claude-fable-5 — 70% (±4); gpt-5.5 — 67% (±6); claude-opus-4.8 — 59% (±2); gpt-5.4 — 52% (±2); glm-5.2 — 44% (±2); gemini-3.5-flash — 37% (±2); kimi-k2.7-code — 31% (±1); claude-sonnet-4.6 — 30% (±4); gemini-3.1-pro — 12% (±2).
  - **Переклад підзаголовка українською:** «Pass@1 на 113 оригінальних довгогоризонтних задачах · 91 репозиторій · 5 мов · рукописні верифікатори поведінки. Джерело: Datacurve, зріз 2026-06-22.» (Назви моделей і числа — без перекладу.)
- **Location on slide:** правий лідерборд "CursorBench 3.1 — selected configurations".
  - **Підзаголовок:** "Score on ambiguous multi-file tasks; $ = average cost per task (28 configs total). Source: Cursor / Anysphere (cursor.com/cursorbench), captured 2026-06-22"
  - **Значення:** Fable 5 Max — 72.9% ($18.02/task); Fable 5 Extra High — 72.0% ($13.74/task); Opus 4.7 Max — 64.8% ($11.02/task); Opus 4.8 Max — 63.8% ($7.59/task); GPT-5.5 Extra High — 64.3% ($4.37/task); Composer 2.5 — 63.2% ($0.55/task); GPT-5.5 High — 62.6% ($3.59/task); Gemini 3.5 Flash — 49.8% ($1.94/task); Kimi 2.5 — 31.9% ($0.87/task).
  - **Переклад підзаголовка українською:** «Бал на неоднозначних мультифайлових задачах; $ = середня вартість на задачу (усього 28 конфігурацій). Джерело: Cursor / Anysphere, зріз 2026-06-22.»
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/benchmarks/deepswe-leaderboard.svg (alt: "DeepSWE leaderboard")
- Image 2: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/benchmarks/cursorbench-leaderboard.svg (alt: "CursorBench score vs cost")

### Notes
Числові значення лідербордів зчитано з PDF-рендеру (раніше були позначені для manual review). Зверни увагу: бенчмарк-цифри — частина презентації автора, ілюстративні.

---

## Slide 21

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/21

### Visible text

```
// Компонент 2 — інструменти
Де живуть агенти: IDE, термінал, хмара
В IDE
Інлайн-доповнення, чат у файлі. Copilot, Cursor, Windsurf, JetBrains AI.
У терміналі (чи GUI)
Мультифайлові зміни, запуск тестів, ітерація. Claude Code, Codex CLI, Aider, Cline.
У хмарі
Автономно в хмарі → PR. Davin, Jules, Copilot agent, Cursor background.
Цикл однаковий на будь-якому. Різниця у harness, а не те, яка модель усередині.
Claude Code · Cursor · Aider · Cline · Windsurf
```

### Переклад українською
Текст українською; назви продуктів (Copilot, Cursor, Windsurf, JetBrains AI, Claude Code, Codex CLI, Aider, Cline, Davin, Jules) та терміни IDE, GUI, PR, harness — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Примітка: у джерелі «Davin» (ймовірно мається на увазі продукт Devin) — збережено написання як у слайді, без виправлення (не очевидна OCR-помилка, а текст DOM).

---

## Slide 22

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/22

### Visible text

```
// Компонент 3 — Rules
Правила: що можна/не можна агенту
Текст, що задає роль, конвенції та тверді заборони. Єдиний стандарт — AGENTS.md (+ CLAUDE.md).
- статичний контекст → тримай тонким, версіонуй як код
- «додавай правило щоразу, коли агент робить те, чого не мав»
- negative-before-positive, DO-NOT-TOUCH зони
Стандарт: agents.md
```

Приклад-артефакт на слайді (код / вміст AGENTS.md):

```markdown
AGENTS.md
## Stack
Next.js · TS strict · Tailwind
## Hard rules
lib/ — без next/react
ніколи не давати ключі клієнту
```

### Переклад українською
Терміни Rules, AGENTS.md, CLAUDE.md, negative-before-positive, DO-NOT-TOUCH — без перекладу. «negative-before-positive» → принцип «спершу заборони, потім дозволи». Вміст блоку AGENTS.md — код/конфіг, не перекладається.

### Text from images / diagrams
Немає зображень із текстом (приклад AGENTS.md подано як стилізований код-блок).

### Images
Немає зображень на слайді.

### Notes
Блок AGENTS.md збережено як код.

---

## Slide 23

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/23

### Visible text

```
// Компонент 4 — Agent Skills
Скіли: процедурні знання на вимогу
Папка з інструкціями/скриптами/ресурсами (SKILL.md), яку агент підвантажує, коли задача збігається — progressive disclosure: метадані → інструкції → довідка.
Вирішують: context rot, брак процедурної пам'яті, портативність між інструментами.
- один скіл — багато поверхонь (День 03)
- каталоги: Anthropic, Vercel, skills.sh
- ⚠️ скіли виконуються з повними правами агента — перевіряй перед install
Лінки: Anthropic — Agent Skills · docs · anthropics/skills · skills.sh
```

### Переклад українською
Терміни Agent Skills, SKILL.md, progressive disclosure, context rot, install — без перекладу. «progressive disclosure» → «поступове розкриття»; «context rot» → «деградація контексту».

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 24

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/24

### Visible text

```
// Компонент 5 — MCP
Model Context Protocol: інструменти й дані
Відкритий стандарт, що під'єднує агента до зовнішніх інструментів і даних — як «USB-C для AI-застосунків».
- Context7 — свіжі, версіє-correct доки бібліотек (антидот до галюцинованих API)
- Vercel MCP — деплой/превʼю + пошук по доках
- Atlassian MCP — ходимо в Jira та Confluence
Лінки: modelcontextprotocol.io · Context7 · Atlassian MCP
```

Приклад-артефакт (послідовність викликів MCP):

```
context7 › resolve-library-id next.js
✓ /vercel/next.js
› query-docs app router 16.2
✓ свіжі доки в контекст
```

### Переклад українською
«Model Context Protocol» → «Протокол контексту моделі» (термін лишаємо в оригіналі). «версіє-correct» → «коректні щодо версії». Назви Context7, Vercel MCP, Atlassian MCP, Jira, Confluence, USB-C, API та виклики інструментів — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 25

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/25

### Visible text

```
// Компонент 6 — Субагенти та мульти-агенти
Розділяй того, хто робить, і того, хто перевіряє
Субагент = чистий контекст + свої інструкції (часто сильніша модель на вищому effort) для рев'ю/дослідження.
maker ≠ checker — структурно, не на прохання.
Патерни: prompt chaining, routing, parallelization, orchestrator–worker, evaluator–optimizer.
- planner — декомпозиція
- builder — імплементує
- reviewer — адверсарне рев'ю
Anthropic: мульти-агент перевершив одного-агента на >90% у дослідженні — ціною ~15× токенів.
Лінки: Building effective agents · Multi-agent research system
```

### Переклад українською
«maker ≠ checker» → «той, хто робить ≠ той, хто перевіряє». Назви патернів (prompt chaining, routing, parallelization, orchestrator–worker, evaluator–optimizer) та ролей (planner, builder, reviewer) — технічні терміни, без перекладу. «effort» → «рівень зусиль».

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 26

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/26

### Visible text

```
// Компонент 7 — Loop engineering
Не промпти. Цикли, що промптять агентів.
Замість «вести агента за руку» — даєш ціль і реальну перевірку, і він ітерує сам:
DISCOVER → PLAN → EXECUTE → VERIFY → ITERATE
Компоненти: automations · worktrees · skills · connectors · sub-agents · state. Глибоко — День 02.
«You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents.» — Peter Steinberger
Лінки: loop-engineering · @steipete
```

### Переклад українською
Англомовна цитата: «You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents.» — Peter Steinberger → «Тобі більше не варто промптити кодинг-агентів. Тобі варто проєктувати цикли, що промптять твоїх агентів.» — Петер Штайнбергер.
Цикл «DISCOVER → PLAN → EXECUTE → VERIFY → ITERATE» збережено як ідентифікатори етапів (≈ «ВИЯВИТИ → СПЛАНУВАТИ → ВИКОНАТИ → ПЕРЕВІРИТИ → ПОВТОРИТИ»). Терміни automations, worktrees, skills, connectors, sub-agents, state — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Послідовність «DISCOVER → PLAN → EXECUTE → VERIFY → ITERATE» у DOM позначена як код/мітка циклу.

---

## Slide 27

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/27

### Visible text

```
// Компонент 8 — Factory approach
Кінцева мета — не код, а фабрика, що його робить
Розробник проєктує систему, що виробляє код: специфікації · агенти · тести/гейти · фідбек-цикли · guardrails.
- spec = «product thinking made explicit»
- red/green TDD — головний guardrail
- людське рев'ю — «the safety system»
«Generation is not the bottleneck anymore. Verification is.» — Addy Osmani, The Factory Model
Глибоко — у Дні 02 (Project Factory).
Лінка: addyosmani.com/blog/factory-model
```

### Переклад українською
«Factory approach» → «Підхід “фабрика”». Англомовні вставки: «product thinking made explicit» → «продуктове мислення, зроблене явним»; «the safety system» → «система безпеки». Цитата: «Generation is not the bottleneck anymore. Verification is.» — Addy Osmani → «Генерація більше не вузьке місце. Вузьке місце — верифікація.» — Едді Османі. Терміни red/green TDD, guardrail, spec — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 28

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/28

### Visible text

```
// Як це роблять на практиці
Приклади AI генерованих проєктів 2026: OpenClaw і Claude Code
Bottleneck змістився: швидкість = inference + hard thinking, не швидкість написання коду. Обидва інженери описують схожий підхід.

                         OpenClaw — Steinberger            Claude Code — Cherny
Стиль                    trust + iterate                   plan + verify
Памʼять моделі           docs/*.md, commit-to-main          CLAUDE.md (git-shared, team)
Plan mode                «хак для старих моделей»           головний режим (Shift+Tab ×2)
Паралелізм               3–8 проєктів на 2 Mac              5 терміналів + 5–10 web-сесій
Verification             «watch the stream»                 Chrome-ext тестує UI кожного PR

«Most code I don't read» — quality-gate перенесено у CI/verification.
Лінки: Shipping at Inference-Speed · Cherny thread
```

### Переклад українською
«Bottleneck» → «вузьке місце»; «inference + hard thinking» → «інференс + напружене обдумування». Стовпці-мітки: Стиль/Памʼять моделі/Plan mode/Паралелізм/Verification. Англомовні вставки: «trust + iterate» → «довіряй + ітеруй»; «plan + verify» → «плануй + перевіряй»; «хак для старих моделей» (вже укр.); «watch the stream» → «спостерігай за потоком»; «Most code I don't read» → «Більшість коду я не читаю». Назви OpenClaw, Claude Code, Steinberger, Cherny, CLAUDE.md, Shift+Tab, Chrome-ext, CI, PR — без перекладу.

### Text from images / diagrams
Немає зображень із текстом (порівняння подано таблицею тексту).

### Images
Немає зображень на слайді.

### Notes
Порівняльну таблицю відновлено з склеєного DOM-тексту; формулювання збережено.

---

## Slide 29

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/29

### Visible text

```
// Що показує їхній код
Дисципліна суворіша, ніж звучить «не читаю код»
- AGENTS.md = compiler-grade contract, не «інструкція»: тверді import-boundaries, escalation-matrix гейтів, NEVER skip gitleaks.
- Памʼять = policy з enforcement, а не docs: кожне твердження має правило / CI-гейт / hook.
- CLAUDE.md — один рядок: pointer на AGENTS.md.
- Hooks > prompts для критичної політики: PostToolUse форматує, Stop-hook не дає завершити сесію без зелених тестів.
- Permission allowlist, а не --dangerously-skip.
- Verification — головний множник якості (×2–3): Chrome-ext робить human-like UAT на кожен PR; OpenClaw має real-behavior-proof гейт.
«Give the agent a way to verify its work — it usually means 2–3× quality.» — B. Cherny
```

### Переклад українською
Цитата: «Give the agent a way to verify its work — it usually means 2–3× quality.» — B. Cherny → «Дай агенту спосіб перевіряти свою роботу — зазвичай це означає 2–3× якості.» — Б. Черни.
Технічні терміни (compiler-grade contract, import-boundaries, escalation-matrix, gitleaks, policy, enforcement, hook, Hooks, PostToolUse, Stop-hook, Permission allowlist, --dangerously-skip, UAT, real-behavior-proof, PR) — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Слайд містив рядки з «=» та «;» (відновлено з екранованого витягу).

---

## Slide 30

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/30

### Visible text

```
// Синтез
5 спільних принципів OpenClaw / Claude Code
1. Feedback loop як unlock — реальна перевірка важливіша за модель і промпт.
2. Памʼять = policy, не docs — AGENTS.md / CLAUDE.md з enforcement.
3. High-thinking модель як baseline — дешевша ≠ «майже така ж» в agentic.
4. CLI / термінал як основа — streaming, partial results; GUI додає latency, не value.
5. Long-running unattended runs — сесії живуть довше за людську увагу.
Різні шляхи (довіра vs контроль) — але обидва ставлять контрольну точку перед commit. Обирай те, що працює для тебе.
Детальніше тут: koldovsky.github.io/2026-dou-day-workshop
```

### Переклад українською
«Feedback loop як unlock» → «Цикл зворотного зв'язку як розблокування»; «High-thinking модель як baseline» → «модель із високим рівнем обдумування як базова»; «Long-running unattended runs» → «тривалі прогони без нагляду». Терміни policy, enforcement, baseline, agentic, CLI, GUI, streaming, partial results, latency, value, commit — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Відновлено з екранованого витягу (символи «=», «;»).

---

## Slide 31

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/31

### Visible text

```
// Greenfield = можливості + дисципліна
П'ять можливостей, п'ять проблем

Область          | Коректно                                           | Проблемно
SDLC             | spec-driven, loop-engineered з рядка 1             | вайб одразу в прод
Архітектура      | чисті межі → вивід агента перевірний               | плутанина, що множиться через паралельних агентів
Стек             | AI-friendly, популярний (багато даних, свіжі доки) | нішевий стек, проти якого модель галюцинує
Інструменти      | Claude Code / Codex / Cursor — цикл однаковий      | плутати інструмент із процесом
Автономність     | діал від assisted до повністю агентного            | «з рейок» прогони, що палять години й токени
```

### Переклад українською
Заголовки таблиці: Область / Коректно / Проблемно. Терміни spec-driven, loop-engineered, AI-friendly, assisted, Claude Code, Codex, Cursor, SDLC — без перекладу. «діал від assisted до повністю агентного» → «діапазон від асистованого до повністю агентного».

### Text from images / diagrams
Немає зображень із текстом (таблиця подана текстом/CSS).

### Images
Немає зображень на слайді.

### Notes
Двоколонкову таблицю «Коректно/Проблемно» відновлено з DOM-тексту.

---

## Slide 32

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/32

### Visible text

```
// Свобода стека ≠ всі стеки рівні
AI Friendly стек

Зелені прапорці
- багато тренувальних даних (популярна мова/фреймворк) → мільйони прикладів, менше галюцинацій
- свіжі доки на вимогу (Context7 / MCP) там, де тренування застаріло
- сильні типи + тести → вивід машинно-перевірний, є детерміновані гейти
- стабільні конвенції → агент тримає патерн, не дрейфує

Червоні прапорці
- нішевий / молодий стек → модель вигадує API, яких нема
- швидка зміна версій без свіжих доків → застарілі патерни
- слабка типізація, мало тестів → нічим автоматично відхилити поганий код
- мало прикладів «у природі» → низький first-pass success

Greenfield-хід: обирай AI-friendly стек свідомо — він частина harness, а не питання смаку. Популярні мови (JS/TS/Python/Java) випереджають нішеві (Elixir) — дослідження. Принцип training-data density — New SDLC whitepaper.
```

### Переклад українською
«AI Friendly стек» → «стек, дружній до AI». «Зелені прапорці» / «Червоні прапорці» — вже українською. Терміни first-pass success → «успіх із першого проходу»; training-data density → «щільність тренувальних даних». Назви мов (JS/TS/Python/Java/Elixir), Context7, MCP, API, harness — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 33

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/33

### Visible text

```
// Greenfield — архітектура
Архітектури, дружні до агентів
Обирай підхід, який спрощує роботу агента:
- готова, а не кастомна → готові перевірені архітектури і домовленості зрозуміліші агентам
- все в одному репозиторії → краще все тримати структуровано в одному репозиторії
- чисті межі модулів → паралельні агенти не заважають друг другу (worktrees)
- чисте ядро / pure functions (lib/ без фреймворку) → юніт-тести як гейти
- явні контракти й типи на межах → машинна перевірка
- вертикальні слайси замість шарів → один власник на capability
Уникай:
- глибокої зв'язності → велике «blast radius» на кожну зміну
- прихованого стану й сайд-ефектів → нема чим детерміновано перевірити
- «розумної» магії → агент і людина гублять контроль
Гарна greenfield-архітектура — agent-ready за побудовою (окупиться в Дні 03).
```

### Переклад українською
Терміни pure functions, worktrees, capability, blast radius, agent-ready, lib/ — без перекладу. «pure functions» → «чисті функції»; «blast radius» → «радіус ураження (наслідків)»; «вертикальні слайси замість шарів» → вертикальні зрізи замість горизонтальних шарів.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 34

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/34

### Visible text

```
// Одвічне питання
Моноліт vs Мікросервіси

Моноліт
Один процес, один контекст, одна відповідальність за результат.
Простіше стартувати й дебажити.
Менше контрактів між командами.
Але масштабування змін швидко впирається в межі одного ядра.

Мікросервіси
Багато автономних частин, явні контракти, координація через протоколи.
Легше розділяти ownership і змінювати частини незалежно.
Потрібні спостережуваність, версіонування й надійні межі.
Складність не зникає — вона переїжджає в інтеграцію.

Можна пізніше переробити моноліт в мікросервіси, коли це буде потрібно.
Детальніше →
```

### Переклад українською
Заголовок «Моноліт vs Мікросервіси» → «Моноліт проти мікросервісів». Термін ownership → «володіння/відповідальність». Решта українською.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 35

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/35

### Visible text

```
// Greenfield — фреймворки
Фреймворки: популярність = менше галюцинацій
Кращі для агента
- популярні, добре задокументовані (React/Next.js, Vue, Django, Rails)
- стабільні конвенції «за замовчуванням»
- велика спільнота → багато прикладів у тренуванні
Ризиковані
- молоді / швидкозмінні без свіжих доків → застарілі патерни, вигадані API
- нішеві DSL, мало прикладів
- мітигація: Context7/MCP для версіє-correct доків + читати node_modules/<pkg>/docs
Швидкі фреймворки рухаються швидше за training cutoff — тому свіжі доки в harness обовʼязкові.
```

### Переклад українською
Заголовок «Фреймворки: популярність = менше галюцинацій» вже українською. Терміни DSL, training cutoff, harness, node_modules/<pkg>/docs, Context7/MCP, назви фреймворків (React/Next.js, Vue, Django, Rails) — без перекладу. «версіє-correct» → «коректні щодо версії».

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Слайд містив «=» (відновлено з екранованого витягу).

---

## Slide 36

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/36

### Visible text

```
// Прихований ризик 1
Comprehension debt — борг розуміння
Розрив між обсягом коду і тим, скільки з нього люди справді розуміють. Накопичується непомітно — зелені тести й чисті метрики дають хибну впевненість.
- AI пише швидше, ніж людина встигає вдумливо рев'юнути
- приклад: усі тести зелені, але ніхто не знає, чому так спроєктовано → безпечно змінити вже не можна
- мітигація: розуміння — не опційне; AI для дослідження, а не пасивного делегування
«Making code cheap to generate doesn't make understanding cheap to skip.» — A. Osmani
Лінка: addyosmani.com/blog/comprehension-debt
```

### Переклад українською
«Comprehension debt — борг розуміння» (термін з перекладом уже на слайді). Цитата: «Making code cheap to generate doesn't make understanding cheap to skip.» — A. Osmani → «Те, що код став дешево генерувати, не робить розуміння дешевим, щоб його пропускати.» — Е. Османі.

### Text from images / diagrams
Текст усередині стовпчастої діаграми (зчитано з рендеру PDF):

- **Location on slide:** заголовок діаграми праворуч.
  - **Original text:** «Тест на розуміння свого коду / середній бал наступного дня» (уже українською).
- **Location on slide:** два стовпці.
  - **Original text:** «Без AI — 67%» (зелений стовпець); «З AI-асистом — 50%» (помаранчевий стовпець, підпис «−17 п.п.»).
- **Location on slide:** джерело під діаграмою.
  - **Original text:** «Дані: дослідження Anthropic · через A. Osmani, Comprehension Debt» (уже українською).
  - **Confidence:** high.

### Images
- Image 1: https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/figures/comprehension-quiz.svg (alt: «Тест на розуміння коду: 67% без AI проти 50% з AI»)

### Notes
Числа діаграми (67% / 50% / −17 п.п.) зчитано з PDF-рендеру (раніше — manual review).

---

## Slide 37

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/37

### Visible text

```
// Прихований ризик 2
Intent debt — борг наміру
Відсутність зафіксованого «чому» — цілей, обмежень, причин рішень. Можна повністю розуміти код (низький comprehension debt) і не мати запису, навіщо він такий.
- раніше намір жив у головах; агенти стартують щоразу «з нуля», без інституційної памʼяті
- приклад: агент прибрав guard-clause — критичний він був чи застарілий? запису нема
- тести проходять, бо кодували стару поведінку, а не намір
«An agent can't generate intent — it's the one input that has to come from you.» — A. Osmani
Економіка змінилась: невиражений намір коштує тепер щосесії агента, а не раз при онбордингу. 20 паралельних агентів → податок ×20.
Мітигація — винеси намір у репо:
- AGENTS.md як ledger наміру
- ADR / decision log
- intent-специфікації
Лінка: addyosmani.com/blog/intent-debt
```

### Переклад українською
«Intent debt — борг наміру» (термін з перекладом на слайді). Цитата: «An agent can't generate intent — it's the one input that has to come from you.» — A. Osmani → «Агент не може згенерувати намір — це єдиний вхід, що має походити від тебе.» — Е. Османі. Терміни guard-clause, comprehension debt, ledger, ADR, decision log, intent-специфікації, AGENTS.md — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Слайд містив «;» та «?» (відновлено з екранованого витягу).

---

## Slide 38

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/38

### Visible text

```
// Greenfield — все в репозиторії
Чому визначати все в репо — критично
Агент забуває між запусками — репозиторій ні. Джерело істини живе в репо, не в голові й не в чаті:
- AGENTS.md, правила, скіли — версіонуються, рев'ю в PR
- вимоги, специфікації, ADR — артефакти, не усні домовленості
- тести й еволи — виконуваний контракт наміру
Наслідки:
- відтворюваність — будь-який агент/людина стартує з того ж контексту
- traceability — вимога → спека → тест → коміт
- регенерація — за специфікацією можна перебудувати під інший стек
«The agent forgets; the repo doesn't.»
Контекст: agents.md · Anthropic — context engineering
```

### Переклад українською
Цитата: «The agent forgets; the repo doesn't.» → «Агент забуває; репозиторій — ні.» Терміни traceability → «простежуваність»; PR, ADR, AGENTS.md, context engineering — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Слайд містив «;» (відновлено з екранованого витягу).

---

## Slide 39

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/39

### Visible text

```
// Greenfield — Spec-Driven Development
Чому SDD важливий
Специфікація стає продуктом мислення, зробленим явним — і єдиним джерелом істини, з якого будують агенти.
- неоднозначна вимога множиться через паралельні автономні запуски
- спека наперед → менше дорогих циклів виправлення
- спека + тести = контракт, який можна автоматично перевірити
Інструменти:
- OpenSpec
- GitHub Spec Kit
Глибоко — у Дні 02, як одна шестерня в циклі фабрики.
Лінки: OpenSpec · GitHub Spec Kit
```

### Переклад українською
«Spec-Driven Development» → «Розробка, керована специфікацією (SDD)». Назви інструментів (OpenSpec, GitHub Spec Kit) — без перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Слайд містив «=» (відновлено з екранованого витягу).

---

## Slide 40

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/40

### Visible text (підписи слайда)

```
// Практика — підхід 1: vibe coding
«Ось PRD — імплементуй»
prd.md [copy] [download] [open]
```

Коментар-підписи праворуч на слайді:

```
Найпростіший шлях: кинути весь prd.md в агента й сказати «зроби продукт».
⚡ швидкий старт, нульова підготовка
❌ агент сам обирає стек, структуру, залежності
❌ немає тестів і гейтів — «наче працює»
❌ дрейф від PRD, важко перевірити й супроводжувати
Скопіюй PRD ліворуч (copy) або завантаж (download) — спробуємо наживо. Далі — інженерний підхід для порівняння.
```

Вбудований артефакт-файл `prd.md` (показаний на слайді як код-блок із кнопками copy/download/open). Збережено як код/документ без перекладу (правило: вміст файлів/код не перекладається):

```markdown
# PRD — Weather Explorer / Weekend Trip Planner

Last updated: 2026-05-15

This document is the **single source of truth** for what the product does and
what constraints govern it. Every requirement has a stable ID. Specs, tests,
PRs, and recordings reference these IDs to keep traceability intact.

Refer to [docs/product-brief.md](product-brief.md) for narrative context.

## ID conventions

| Prefix   | Meaning                    | Example                                       |
| -------- | -------------------------- | --------------------------------------------- |
| `FR-*`   | Functional Requirement     | `FR-SEARCH-01` — user searches city by name   |
| `NFR-*`  | Non-Functional Requirement | `NFR-PERF-01` — TTFB < 300 ms                 |
| `TC-*`   | Technical Constraint       | `TC-STACK-01` — Next.js 16 App Router         |
| `BC-*`   | Business / UX Constraint   | `BC-PRIVACY-01` — no analytics                |

Status values: `proposed`, `accepted` (та інші — далі по тексту).

## Functional requirements

### App shell (capability `app-shell`)

| ID          | Description                                                                          | Status   |
| ----------- | ------------------------------------------------------------------------------------ | -------- |
| FR-SHELL-01 | Single-page app with a top bar (logo, theme indicator) and a main content area       | proposed |
| FR-SHELL-02 | Layout adapts at 768 px and 1280 px breakpoints; mobile single-column, tablet two-column, desktop three-column | proposed |
| FR-SHELL-03 | Empty state on first load: hero copy + city search prominently centered               | proposed |

### Top clock (demo capability `top-clock`)

| ID          | Description                                                                          | Status   |
| ----------- | ------------------------------------------------------------------------------------ | -------- |
| FR-CLOCK-01 | Header shows a compact accessible local-time clock that updates live while the page is open | proposed |

### City search (capability `search`)

| ID           | Description                                                                          | Status   |
| ------------ | ------------------------------------------------------------------------------------ | -------- |
| FR-SEARCH-01 | User types a free-form city name into a single input; debounced suggestions appear from Open-Meteo geocoding API | proposed |
| FR-SEARCH-02 | Each suggestion shows: city name, admin region, country, optional flag emoji          | proposed |
| FR-SEARCH-03 | Selecting a suggestion sets the active location; URL reflects it as `?lat=&lon=&name=` | proposed |
| FR-SEARCH-04 | Pressing Enter with a single suggestion auto-selects it                               | proposed |
| FR-SEARCH-05 | If the geocoding API returns zero results, show "Nothing found" inline; no error toast | proposed |

### Footer jokes (capability `bottom-jokes`)

| ID          | Description                                                                          | Status   |
| ----------- | ------------------------------------------------------------------------------------ | -------- |
| FR-JOKES-01 | Footer area shows deterministic Ukrainian weather-themed jokes without external APIs or tracking | proposed |

### Forecast (capability `forecast`)

| ID             | Description                                                                       | Status   |
| -------------- | --------------------------------------------------------------------------------- | -------- |
| FR-FORECAST-01 | After a location is selected, fetch a 7-day daily forecast from Open-Meteo forecast API | proposed |
| FR-FORECAST-02 | Render 7 day cards: weekday name, hi / lo °C, weather icon, precipitation probability %, wind speed | proposed |
| FR-FORECAST-03 | Render an hourly temperature line chart for the next 48 h using Recharts            | proposed |
| FR-FORECAST-04 | While forecast loads, placeholder is a skeleton with the same footprint             | proposed |
| FR-FORECAST-05 | Re-fetch when location changes; cache last successful response in memory until next location switch | proposed |

### Map (capability `map`)

| ID        | Description                                                                            | Status   |
| --------- | -------------------------------------------------------------------------------------- | -------- |
| FR-MAP-01 | Render an OSM-tiled interactive map (Leaflet via react-leaflet) bounded to the current location | proposed |
| FR-MAP-02 | Show a marker at the current location with a popup naming the city                      | proposed |
| FR-MAP-03 | Clicking on the map updates the active location (reverse-geocoded via Open-Meteo) and re-fetches forecast | proposed |
| FR-MAP-04 | Display "© OpenStreetMap contributors" attribution at the bottom-right; required by OSM Tile Usage Policy | proposed |

### Comfort score (capability `comfort-score`)

| ID            | Description                                                                          | Status   |
| ------------- | ------------------------------------------------------------------------------------ | -------- |
| FR-COMFORT-01 | `comfortScore(daily): { value: 0..100; rationale: string }` is a **pure function** in `lib/scoring/comfort.ts` | proposed |
| FR-COMFORT-02 | Inputs: temperature feels-like, precipitation probability, wind, cloud cover, UV index | proposed |
| FR-COMFORT-03 | Output rationale is a single sentence in Ukrainian, max 80 chars, no emojis            | proposed |
| FR-COMFORT-04 | Score for each day is displayed in the day card as a colored badge (green ≥ 70, yellow 40-69, red < 40) | proposed |
| FR-COMFORT-05 | Score for the upcoming weekend (Sat + Sun avg) is highlighted at the top of the forecast grid | proposed |

### Animated background (capability `animated-bg`)

| ID         | Description                                                                            | Status   |
| ---------- | -------------------------------------------------------------------------------------- | -------- |
| FR-ANIM-01 | Background reflects current condition: day / night gradient, rain particles, snow particles, cloud drift | proposed |
| FR-ANIM-02 | Daytime vs nighttime is driven by today's sunrise/sunset for the active location, not by user's clock | proposed |
| FR-ANIM-03 | Animations respect `prefers-reduced-motion`: when set, render static gradient only      | proposed |
| FR-ANIM-04 | Background never blocks interaction; pointer-events disabled                            | proposed |

### Weekend compare (capability `weekend-compare`, optional)

| ID            | Description                                                                          | Status   |
| ------------- | ------------------------------------------------------------------------------------ | -------- |
| FR-COMPARE-01 | User can pin up to 3 cities; pinned cities appear in a small chip row above the forecast | proposed |
| FR-COMPARE-02 | A "Compare weekend" toggle switches the view to a 3-column table for Sat / Sun: hi/lo, precip %, comfort score | proposed |
| FR-COMPARE-03 | Each column has a sticky header with the city name and "make active" button           | proposed |

## Non-functional requirements

| ID          | Description                                                                            | Status   |
| ----------- | -------------------------------------------------------------------------------------- | -------- |
| NFR-PERF-01 | Vercel Preview TTFB ≤ 300 ms on p95 for the homepage                                   | proposed |
| NFR-PERF-02 | Lighthouse Performance ≥ 90 on production URL (mobile + desktop)                        | proposed |
| NFR-PERF-03 | Initial client JS payload ≤ 200 KB gzipped                                             | proposed |
| NFR-A11Y-01 | Lighthouse Accessibility ≥ 95; all interactive elements have visible focus styles and accessible names | proposed |
| NFR-A11Y-02 | Color palette meets WCAG AA contrast ratio across both light and dark themes            | proposed |
| NFR-COST-01 | Zero paid API keys; all third-party data is keyless or free-tier                        | proposed |
| NFR-OBS-01  | Console is silent at runtime (no warnings, no errors) on a healthy session              | proposed |
| NFR-DX-01   | `npm run lint && tsc --noEmit && npm test && npm run build` finish in < 60 s on a clean checkout | proposed |
| NFR-I18N-01 | Product UI strings centralised in `lib/i18n/uk.ts`; English fallback in `en.ts` (no runtime i18n library in MVP) | proposed |

## Technical constraints

| ID           | Description                                                                            | Status   |
| ------------ | -------------------------------------------------------------------------------------- | -------- |
| TC-STACK-01  | Next.js 16.2 App Router; TypeScript strict; React 19.2                                 | accepted |
| TC-STACK-02  | Tailwind CSS 4 (PostCSS plugin); shadcn/ui base-nova; class-variance-authority         | accepted |
| TC-STACK-03  | Open-Meteo APIs (forecast + geocoding); no other weather provider                       | accepted |
| TC-STACK-04  | Leaflet + react-leaflet for maps; OSM raster tiles only                                 | accepted |
| TC-STACK-05  | Vitest for unit tests on `lib/`; no Playwright. chrome-devtools MCP for E2E verification recordings | accepted |
| TC-DEPLOY-01 | Vercel for hosting; preview URL per PR via Git integration                              | proposed |
| TC-DATA-01   | All Open-Meteo calls happen from Server Components or Route Handlers when possible; never expose Open-Meteo URLs in the client bundle in a way that suggests they require keys | proposed |
| TC-MAP-01    | OSM tiles include attribution; respect Tile Usage Policy (HTTPS, no scraping, valid Referer) | proposed |
| TC-PURE-01   | `lib/` is framework-free: no `next/*`, no `react`, no DOM globals — enables 100% unit-testability | proposed |

## Business / UX constraints

| ID            | Description                                                                          | Status   |
| ------------- | ------------------------------------------------------------------------------------ | -------- |
| BC-PRIVACY-01 | No analytics, no third-party trackers, no fingerprinting                              | accepted |
| BC-PRIVACY-02 | Geolocation only via explicit user action (button "Use my location") — never on page load | accepted |
| BC-PRIVACY-03 | No cookies set by the application code                                                | accepted |
| BC-BRAND-01   | Visual identity follows DESIGN.md (chosen in Phase 4). UI is Ukrainian-first; tone is calm, practical, no exclamation marks | proposed |
| BC-BRAND-02   | Footer credits Open-Meteo and OpenStreetMap with hyperlinks                            | proposed |
| BC-DEMO-01    | The repo and live URL are the workshop's primary artifacts; every requirement is publicly demonstrable | accepted |

## Out of scope (MVP)

- Push notifications, scheduled jobs, background data refresh
- User accounts, history, favorites persisted server-side
- Marine / aviation / agriculture weather variables
- Localisation beyond UA + EN labels
- Native mobile app
- Climate / historical analysis beyond 7-day forecast
```

### Переклад українською
Український підпис слайда вже українською. Вбудований `prd.md` — це файл-артефакт (код/документ-специфікація), показаний у скрол-боксі; згідно з правилами витягу, вміст файлів, ідентифікатори вимог (FR-*, NFR-*, TC-*, BC-*), назви API/бібліотек і код **не перекладаються** та збережені в оригіналі.

### Text from images / diagrams
Немає растрових зображень. PRD подано як текстовий код-блок із кнопками copy / download / open.

### Images
Немає зображень на слайді (вбудований код-файл `prd.md`).

### Notes
PRD — довгий вбудований документ (~14,4 тис. символів). Витягнуто повністю з DOM посегментно; форматування markdown-таблиць нормалізовано для читабельності, формулювання та ідентифікатори збережено дослівно. Деякі символи («=», «?», «&», «;») у вихідному потоці екранувалися й відновлені.

---

## Slide 41

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/41

### Visible text

```
// Практика — підхід 2: в підготовленому середовищі
Від нуля до правильно зібраного репо
Антипод археології: даємо новому репо правильні контекст-інструменти з першої хвилини.
- Next.js (App Router, TS)
- vercel-react-best-practices
- Context7 MCP
- Vercel MCP
Ми не фокусуємося на тому щоб писати кращі промпти, ми збираємо краще середовища для Agentic Engineering.
```

Приклад-артефакт (термінальна сесія `greenfield setup`):

```
greenfield setup
› npx create-next-app@latest
✓  TS, App Router, Tailwind — чистий скелет за 30с
› npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
› Context7 + Vercel MCP
✓ live-доки Next 16 / React 19 + доступ до Vercel платформи
› generate debounced city-search
✓ best-practice rule застосовано · preview задеплоєно
```

### Переклад українською
Текст-підписи українською. Команди, назви пакетів, URL, прапорці CLI (npx create-next-app@latest, npx skills add …, vercel-react-best-practices, Context7 MCP, Vercel MCP) — код/ідентифікатори, не перекладаються.

### Text from images / diagrams
Немає зображень із текстом (термінальну сесію подано як код-блок).

### Images
Немає зображень на слайді.

### Notes
Проблем витягу немає.

---

## Slide 42

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/42

### Visible text

```
// Підсумок дня 01
Generation is solved.
Verification, judgment, and direction are the new craft.
Свобода greenfield — це перевага лише в парі з інженерною дисципліною. Її ми будуємо в День 02.
```

### Переклад українською
Англомовні рядки: «Generation is solved.» → «Генерацію вирішено.»; «Verification, judgment, and direction are the new craft.» → «Верифікація, судження і напрям — це нове ремесло.» Останній рядок уже українською.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді.

### Notes
Підсумковий слайд блоку «День 01». Проблем витягу немає.

---

## Slide 43

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/43

### Visible text
Видимого текстового контенту немає (порожній / службовий слайд). У відрендереному DOM елемент слайда містить лише обгортку без текстових вузлів (≈93 символи HTML, без видимого тексту).

### Переклад українською
Немає тексту для перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді (img/svg/iframe/CSS-фон відсутні).

### Notes
Порожній/перехідний слайд. Можливо, рендериться лише в живому режимі за певної навігації; у print-view контенту немає.

---

## Slide 44

**Slide URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/44

### Visible text
Видимого текстового контенту немає (порожній / завершальний слайд). У відрендереному DOM елемент слайда містить лише обгортку без текстових вузлів (≈93 символи HTML, без видимого тексту).

### Переклад українською
Немає тексту для перекладу.

### Text from images / diagrams
Немає зображень із текстом.

### Images
Немає зображень на слайді (img/svg/iframe/CSS-фон відсутні).

### Notes
Завершальний/порожній слайд презентації (останній наявний — №44).

---

## Slide 45 — перевірка наявності

**Перевірений URL:** https://koldovsky.github.io/2026-fwdays-agentic-greenfield-slidev/1#/45

**Результат:** Слайд 45 **не існує**. Презентація містить рівно **44 слайди** (у print-view виявлено 44 елементи `.slidev-page` / `.slidev-layout`, індекси 1–44). Навігація на `#/45` не відкриває нового слайда. Отже, слайд 45 відсутній і не належить до жодного блоку заняття.

---

## Extraction report / Звіт про витяг

- **Total slides processed:** 41 секція контенту (слайди 04–44) + явна перевірка слайда 45.
- **Джерело:** живий Slidev print-view (`/print`), текст із відрендереного DOM (JavaScript увімкнено). Логін Google не знадобився — презентація публічна.
- **Slide 45:** перевірено — не існує (усього 44 слайди). Зафіксовано в окремій секції вище.
- **Slides with OCR:** текст усіх слайдів отримано з DOM; внутрішній текст діаграм/графіків зчитано візуально з рендеру PDF `Day_1.pdf` для слайдів 06, 07, 08, 10, 14, 15, 16, 17, 20, 36.
- **Slides with images:** 06 (fig1), 07 (fig2), 08 (fig7), 10 (fig3), 14 (fig4), 15 (fig5), 16 (fig8), 17 (fig9), 20 (deepswe-leaderboard.svg, cursorbench-leaderboard.svg), 36 (comprehension-quiz.svg) — для кожного є прямий URL і тепер транскрибований внутрішній текст із перекладом.
- **Slides with missing image links:** немає — для кожного зображення отримано прямий URL (відносний шлях зведено до повного https://koldovsky.github.io/...).
- **Blank slides:** 43, 44 (видимого тексту й зображень немає; у PDF їм відповідників немає — PDF-експорт завершується на слайді «Практика — підхід 2»).
- **Слайди з екранованим витягом (символи =, ?, &, ;):** 29, 30, 35, 37, 38, 39, 40 — відновлено у фінальному тексті.
- **Особливо великий артефакт:** слайд 40 містить вбудований `prd.md` (~14,4 тис. символів) — витягнуто повністю; PDF підтвердив зміст.
- **Розбіжності деку vs PDF:** PDF `Day_1.pdf` — це окремий build-step-розгорнутий експорт (41 сторінка, внутрішня нумерація «X / 66»), що додатково містить вступні слайди поза діапазоном завдання: титул «Agentic Engineering / 3 сесії наживо / Greenfield з першого дня», агенда, і слайд спікера «В'ячеслав Колдовський · SoftServe». Ці слайди (деку #1–#3) не входять у діапазон 4–44 і тут не транскрибовані. Текст слайдів 4–44 у PDF і в живому деку збігається.
- **Uncertain / manual verification points (залишок):**
  1. Слайди 43–44 — порожні в print-view і відсутні в PDF; якщо в живому деку на них є контент на клік-анімаціях, його варто переглянути окремо.
  2. Слайд 21: написання «Davin» збережено як у DOM (ймовірно мається на увазі «Devin») — не виправлялося.
  3. Дрібні друкарські особливості в авторських діаграмах (напр. "Cooridnation" на слайді 16) збережено як в оригіналі.

### Примітка щодо PDF
Файл `Day_1.pdf` підключено з теки `E:\Education\Agentic` і використано для звірки тексту й транскрипції діаграм. Допоміжні рендери сторінок збережено в робочій теці (`_fig/`) і не є частиною фінальних нотаток.
