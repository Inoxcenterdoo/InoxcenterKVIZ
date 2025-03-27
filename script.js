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

  let usedFiftyFifty = false;
  let usedEngineer = false;
  let usedAudience = false;

  function getCorrectKey() {
    return questions[currentQuestion].correct;
  }

  document.getElementById("fiftyFifty").addEventListener("click", () => {
    if (usedFiftyFifty) return;
    usedFiftyFifty = true;

    const correct = getCorrectKey();
    const wrongKeys = Object.keys(answerBtns).filter(k => k !== correct);
    const toHide = wrongKeys.sort(() => 0.5 - Math.random()).slice(0, 2);

    toHide.forEach(k => {
      answerBtns[k].style.visibility = "hidden";
    });
  });

  document.getElementById("callEngineer").addEventListener("click", () => {
    if (usedEngineer) return;
    usedEngineer = true;

    const correct = getCorrectKey();
    const keys = Object.keys(answerBtns);
    const suggestion = Math.random() < 0.8 ? correct : keys.find(k => k !== correct);
    hintEl.textContent = `Inženir predlaga odgovor: ${suggestion}`;
  });

  document.getElementById("askAudience").addEventListener("click", () => {
    if (usedAudience) return;
    usedAudience = true;

    const correct = getCorrectKey();
    let distribution = { A: 20, B: 20, C: 20, D: 20 };
    distribution[correct] = 60;

    hintEl.textContent = "Glasovi sodelavcev: " + 
      Object.entries(distribution).map(([k, v]) => `${k}: ${v}%`).join(", ");
  });

  // Spodaj pride še osnovna logika igre (skrajšana za prostor)...
});