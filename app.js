const questions = [
  {
    text: "JavaScriptで配列の要素数を取得するプロパティは？",
    choices: ["size", "length", "count", "items"],
    answer: 1,
    explanation:
      "配列の要素数は length プロパティで取得します。size や count は標準の配列プロパティではありません。",
  },
  {
    text: "HTTPステータスコード 404 の意味は？",
    choices: ["認証エラー", "サーバー内部エラー", "見つからない", "成功"],
    answer: 2,
    explanation:
      "404 Not Found は、要求されたリソースがサーバー上で見つからないことを示します。",
  },
  {
    text: "CSSで文字色を指定するプロパティは？",
    choices: ["font-color", "text-style", "color", "foreground"],
    answer: 2,
    explanation:
      "CSSで文字色を指定する正しいプロパティは color です。font-color は存在しません。",
  },
  {
    text: "Gitでローカル変更をステージする基本コマンドは？",
    choices: ["git save", "git add", "git stage", "git push"],
    answer: 1,
    explanation:
      "git add は変更をステージングエリアに追加します。git push はリモートへ反映する操作です。",
  },
  {
    text: "HTMLで最も重要な見出しを表すタグは？",
    choices: ["<heading>", "<h1>", "<title>", "<head>"],
    answer: 1,
    explanation:
      "<h1> は本文内の最上位見出しです。<title> はページタイトルで、本文見出しとは用途が異なります。",
  },
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submitButton");
const resultContainer = document.getElementById("result");
const meta = document.getElementById("meta");

meta.textContent = `全 ${questions.length} 問（4択）`;

questions.forEach((question, index) => {
  const article = document.createElement("article");
  article.className = "question";

  const title = document.createElement("p");
  const titlePrefix = document.createElement("strong");
  titlePrefix.textContent = `Q${index + 1}. `;
  title.appendChild(titlePrefix);
  title.appendChild(document.createTextNode(question.text));
  article.appendChild(title);

  question.choices.forEach((choice, choiceIndex) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = String(choiceIndex);
    label.appendChild(input);
    label.append(` ${choice}`);
    article.appendChild(label);
  });

  quizContainer.appendChild(article);
});

submitButton.addEventListener("click", () => {
  let score = 0;
  const details = [];

  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const selectedIndex = selected ? Number(selected.value) : -1;
    const isCorrect = selectedIndex === question.answer;

    if (isCorrect) {
      score += 1;
    }

    const selectedLabel =
      selectedIndex >= 0 ? question.choices[selectedIndex] : "未回答";
    const correctLabel = question.choices[question.answer];

    details.push({
      number: index + 1,
      text: question.text,
      selectedLabel,
      correctLabel,
      explanation: question.explanation,
      isCorrect,
    });
  });

  resultContainer.classList.remove("hidden");
  resultContainer.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = `結果: ${score} / ${questions.length}`;
  resultContainer.appendChild(heading);

  const summary = document.createElement("p");
  summary.textContent =
    score === questions.length
      ? "満点です！"
      : "復習して再チャレンジしてみましょう。";
  resultContainer.appendChild(summary);

  details.forEach((detail) => {
    const feedback = document.createElement("div");
    feedback.className = `feedback ${detail.isCorrect ? "correct" : "incorrect"}`;

    const q = document.createElement("p");
    const qPrefix = document.createElement("strong");
    qPrefix.textContent = `Q${detail.number}: `;
    q.appendChild(qPrefix);
    q.appendChild(document.createTextNode(detail.text));

    const selected = document.createElement("p");
    selected.textContent = `あなたの回答: ${detail.selectedLabel}`;

    const answer = document.createElement("p");
    answer.textContent = `正解: ${detail.correctLabel}`;

    const explanation = document.createElement("p");
    explanation.textContent = `解説: ${detail.explanation}`;

    feedback.append(q, selected, answer, explanation);
    resultContainer.appendChild(feedback);
  });
});
