let currentQuestion = {};
let score = 0;
let level = 1;
let progress = 0;
let currentSubject = "";
let currentLanguage = "english";

// 🌍 QUESTIONS (MULTI-LANGUAGE)
let questions = {

    english: {
        math: [
            { q: "2 + 3 = ?", options: ["4", "5", "6"], answer: 1 },
            { q: "5 - 2 = ?", options: ["2", "3", "4"], answer: 1 }
        ],
        english: [
            { q: "Apple starts with?", options: ["A", "B", "C"], answer: 0 },
            { q: "Cat spelling?", options: ["C-A-T", "K-A-T", "C-O-T"], answer: 0 }
        ],
        science: [
            { q: "Sun is a?", options: ["Planet", "Star", "Moon"], answer: 1 },
            { q: "Water formula?", options: ["H2O", "CO2", "O2"], answer: 0 }
        ]
    },

    hindi: {
        math: [
            { q: "2 + 3 = ?", options: ["4", "5", "6"], answer: 1 },
            { q: "5 - 2 = ?", options: ["2", "3", "4"], answer: 1 }
        ],
        english: [
            { q: "Apple kis se shuru hota hai?", options: ["A", "B", "C"], answer: 0 }
        ],
        science: [
            { q: "Surya kya hai?", options: ["Graha", "Tara", "Chand"], answer: 1 }
        ]
    },

    odia: {
        math: [
            { q: "2 + 3 = ?", options: ["4", "5", "6"], answer: 1 }
        ],
        english: [
            { q: "Apple ra first letter kana?", options: ["A", "B", "C"], answer: 0 }
        ],
        science: [
            { q: "Surya kana?", options: ["Planet", "Star", "Moon"], answer: 1 }
        ]
    }
};

// 🌍 LANGUAGE SELECT
function setLanguage(lang) {
    currentLanguage = lang;

    document.getElementById("languageScreen").style.display = "none";
    document.getElementById("subjectScreen").style.display = "block";
}

// ▶️ START GAME
function startGame(subject) {
    currentSubject = subject;

    document.getElementById("subjectScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    score = 0;
    level = 1;
    progress = 0;

    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    document.getElementById("progress").style.width = "0%";

    loadQuestion();
}

// 🔀 SHUFFLE
function shuffleOptions(q) {
    let opts = [...q.options];
    let correct = opts[q.answer];
    opts.sort(() => Math.random() - 0.5);
    return { q: q.q, options: opts, answer: opts.indexOf(correct) };
}

// ❓ LOAD QUESTION
function loadQuestion() {
    let subjectQ = questions[currentLanguage][currentSubject];

    let q = shuffleOptions(
        subjectQ[Math.floor(Math.random() * subjectQ.length)]
    );

    currentQuestion = q;

    document.getElementById("question").innerText = q.q;

    for (let i = 0; i < 3; i++) {
        document.getElementById("opt" + i).innerText = q.options[i];
    }

    document.getElementById("result").innerText = "";
}

// ✅ CHECK ANSWER
function checkAnswer(i) {
    if (i === currentQuestion.answer) {
        score += 10;
        progress += 25;

        if (Math.random() > 0.7) {
            let bonus = 20;
            score += bonus;
            document.getElementById("reward").innerText = "🎁 +" + bonus;
        } else {
            document.getElementById("reward").innerText = "";
        }

        document.getElementById("result").innerText = "✅ Correct!";
    } else {
        document.getElementById("result").innerText = "❌ Try Again!";
        document.getElementById("reward").innerText = "";
    }

    document.getElementById("score").innerText = score;
    document.getElementById("progress").style.width = progress + "%";

    if (progress >= 100) {
        level++;
        progress = 0;
        document.getElementById("level").innerText = level;
        alert("🎉 Level Up!");
    }

    saveScore();
    setTimeout(loadQuestion, 1000);
}

// 💾 SAVE SCORE
function saveScore() {
    fetch("/save_score", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({score: score})
    });
             }
