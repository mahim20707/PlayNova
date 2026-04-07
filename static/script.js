let currentQuestion = {};
let score = 0;
let level = 1;
let progress = 0;
let currentSubject = "";
let currentLanguage = "english";
let questionCount = 0;

// ⏱️ TIME LIMIT (20 min)
let timeLeft = 20 * 60;

setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
        alert("⏰ Time up! Ab rest karo 😊");
        location.reload();
    }
}, 1000);

// 🌙 NIGHT LOCK
let hour = new Date().getHours();
if (hour >= 22) {
    alert("🌙 Sone ka time hai! Kal khelo 😊");
}

// QUESTIONS
let questions = {
    english: {
        math: [{ q: "2 + 3 = ?", options: ["4","5","6"], answer: 1 }],
        english: [{ q: "Apple starts with?", options: ["A","B","C"], answer: 0 }],
        science: [{ q: "Sun is a?", options: ["Planet","Star","Moon"], answer: 1 }]
    },
    hindi: {
        math: [{ q: "2 + 3 = ?", options: ["4","5","6"], answer: 1 }]
    },
    odia: {
        math: [{ q: "2 + 3 = ?", options: ["4","5","6"], answer: 1 }]
    }
};

// LANGUAGE
function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById("languageScreen").style.display = "none";
    document.getElementById("subjectScreen").style.display = "block";
}

// START GAME
function startGame(subject) {
    currentSubject = subject;

    document.getElementById("subjectScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    loadQuestion();
}

// BACK BUTTON
function goBack() {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("subjectScreen").style.display = "block";
}

// LOAD QUESTION
function loadQuestion() {
    let subjectQ = questions[currentLanguage][currentSubject];
    let q = subjectQ[Math.floor(Math.random() * subjectQ.length)];

    currentQuestion = q;

    document.getElementById("question").innerText = q.q;

    for (let i = 0; i < 3; i++) {
        document.getElementById("opt" + i).innerText = q.options[i];
    }

    document.getElementById("result").innerText = "";
}

// CHECK ANSWER
function checkAnswer(i) {
    questionCount++;

    if (i === currentQuestion.answer) {
        score += 10;
        progress += 25;
        document.getElementById("result").innerText = "✅ Correct!";
    } else {
        document.getElementById("result").innerText = "❌ Try Again!";
    }

    // BREAK REMINDER
    if (questionCount % 5 === 0) {
        alert("🧠 Break lo! Paani piyo 💧");
    }

    document.getElementById("score").innerText = score;
    document.getElementById("progress").style.width = progress + "%";

    if (progress >= 100) {
        level++;
        progress = 0;
        document.getElementById("level").innerText = level;
        alert("🎉 Level Up!");
    }

    setTimeout(loadQuestion, 1000);
        }
