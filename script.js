document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    { question: "Katera vrsta nerjavečega jekla je najbolj odporna proti kislinam?", answers: { A: "AISI 304", B: "AISI 430", C: "AISI 316", D: "AISI 201" }, correct: "C" },
    { question: "Kaj pomeni oznaka površine '2B' pri inox pločevini?", answers: { A: "Brušena površina", B: "Hladno valjana, svetla površina", C: "Toplo valjana, črna površina", D: "Polirana do ogledala" }, correct: "B" },
    { question: "Katera zlitina aluminija je primerna za eloksiranje?", answers: { A: "EN AW-5754", B: "EN AW-1050", C: "EN AW-6082", D: "EN AW-7075" }, correct: "C" },
    { question: "Katera država proizvede največ aluminija?", answers: { A: "ZDA", B: "Indija", C: "Kitajska", D: "Rusija" }, correct: "C" },
    { question: "Kaj pomeni toleranca po standardu EN 10029?", answers: { A: "Dovoljena kemična odstopanja", B: "Toleranca debeline pločevine", C: "Korozijska odpornost", D: "Toplotna prevodnost" }, correct: "B" },
    { question: "Kateri element je ključni zlitinski dodatek pri nerjavečem jeklu?", answers: { A: "Krom", B: "Baker", C: "Nikelj", D: "Mangan" }, correct: "A" },
    { question: "Katera površinska obdelava daje sijaj zrcala?", answers: { A: "2B", B: "BA", C: "Bruseno", D: "Polirano do ogledala" }, correct: "D" },
    { question: "Katera oznaka aluminija označuje skoraj čisti aluminij?", answers: { A: "EN AW-1050", B: "EN AW-6061", C: "EN AW-5083", D: "EN AW-2024" }, correct: "A" },
    { question: "Kakšna je tipična vsebnost kroma v AISI 304?", answers: { A: "8%", B: "10%", C: "18%", D: "25%" }, correct: "C" },
    { question: "Kateri standard ureja mehanske lastnosti aluminija?", answers: { A: "EN 573", B: "EN 485", C: "EN 10025", D: "EN 602" }, correct: "B" }
  ];

  let currentQuestion = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let playerName = "";

  const questionEl = document.getElementById("question");
  const answerBtns = {
    A: document.getElementById("A"),
    B: document.getElementById("B"),
    C: document.getElementById("C"),
    D: document.getElementById("D")
  };
  const hintEl = document.getElementById("hint");
  const nextBtn = document.getElementById("next");
  const resultEl = document.getElementById("result");
  const finalMessage = document.getElementById("final-message");
  const finalScore = document.getElementById("final-score");
  const ladderEl = document.getElementById("question-ladder");
  const leaderboardEl = document.getElementById("leaderboard");
  const scoreList = document.getElementById("score-list");

  window.startGame = function () {
    const nameInput = document.getElementById("player-name");
    if (!nameInput.value.trim()) {
      alert("Prosim vnesi ime!");
      return;
    }
    playerName = nameInput.value.trim();
    document.getElementById("start-screen").style.display = "none";
    document.querySelector(".container").style.display = "block";
    loadQuestion();
  };

  function renderLadder() {
    ladderEl.innerHTML = "";
    for (let i = questions.length; i > 0; i--) {
      const step = document.createElement("div");
      step.textContent = `Vprašanje ${i}`;
      if (i - 1 === currentQuestion) step.classList.add("active");
      ladderEl.appendChild(step);
    }
  }

  function loadQuestion() {
    const q = questions[currentQuestion];
    if (!q) {
      questionEl.textContent = "Napaka pri nalaganju vprašanja.";
      return;
    }

    questionEl.textContent = q.question;
    hintEl.textContent = "";
    nextBtn.classList.add("hidden");

    Object.keys(answerBtns).forEach(key => {
      const btn = answerBtns[key];
      btn.textContent = `${key}: ${q.answers[key]}`;
      btn.disabled = false;
      btn.style.display = "inline-block";
      btn.classList.remove("correct", "incorrect");
    });

    renderLadder();
  }

  function selectAnswer(key) {
    const correctKey = questions[currentQuestion].correct;
    Object.keys(answerBtns).forEach(k => {
      answerBtns[k].disabled = true;
      if (k === correctKey) answerBtns[k].classList.add("correct");
    });
    if (key === correctKey) {
      correctAnswers++;
    } else {
      answerBtns[key].classList.add("incorrect");
      incorrectAnswers++;
    }
    nextBtn.classList.remove("hidden");
  }

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const key = e.target.id;
      selectAnswer(key);
    });
  });

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz-container").classList.add("hidden");
      showResult();
    }
  });

  function showResult() {
    resultEl.classList.remove("hidden");

    let message = "";
    if (correctAnswers === questions.length) {
      message = "Bravo! Si pravi INOX mojster!";
    } else if (correctAnswers === 0) {
      message = "Žal si še INOX amater. Poizkusi znova!";
    } else if (correctAnswers >= questions.length * 0.7) {
      message = "Odlično! Zelo si blizu mojstru!";
    } else if (correctAnswers >= questions.length * 0.4) {
      message = "Solidno! Še malo in boš mojster.";
    } else {
      message = "Zaenkrat še amater. Vadi naprej!";
    }

    finalMessage.textContent = message;
    finalScore.textContent = `${playerName}, pravilno si odgovoril na ${correctAnswers} od ${questions.length} vprašanj.`;

    saveScore();
    renderLeaderboard();
  }

  function saveScore() {
    const existing = JSON.parse(localStorage.getItem("inoxScores") || "[]");
    existing.push({ name: playerName, score: correctAnswers });
    localStorage.setItem("inoxScores", JSON.stringify(existing));
  }

  function renderLeaderboard() {
    leaderboardEl.classList.remove("hidden");
    const data = JSON.parse(localStorage.getItem("inoxScores") || "[]");
    const sorted = data.sort((a, b) => b.score - a.score).slice(0, 10);
    scoreList.innerHTML = "";
    sorted.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.score} točk`;
      scoreList.appendChild(li);
    });
  }
});