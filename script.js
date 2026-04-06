let currentQuestion = {};
let questions = [
    { q: "1 + 1 = ?", options: ["1", "2", "3"], answer: 1 },
    { q: "2 + 1 = ?", options: ["2", "3", "4"], answer: 1 },
    { q: "3 + 1 = ?", options: ["3", "4", "5"], answer: 1 },
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: 1 },
    { q: "5 - 1 = ?", options: ["3", "4", "5"], answer: 1 },
    { q: "4 - 2 = ?", options: ["1", "2", "3"], answer: 1 },
    { q: "3 + 2 = ?", options: ["4", "5", "6"], answer: 1 },
    { q: "6 - 3 = ?", options: ["2", "3", "4"], answer: 1 },
    { q: "1 + 2 = ?", options: ["2", "3", "4"], answer: 1 },
    { q: "2 + 3 = ?", options: ["4", "5", "6"], answer: 1 },
    { q: "5 + 3 = ?", options: ["7", "8", "9"], answer: 1 },
    { q: "9 - 4 = ?", options: ["4", "5", "6"], answer: 1 },
    { q: "7 + 2 = ?", options: ["8", "9", "10"], answer: 1 },
    { q: "10 - 6 = ?", options: ["3", "4", "5"], answer: 1 },
    { q: "6 + 4 = ?", options: ["9", "10", "11"], answer: 1 },
    { q: "8 - 3 = ?", options: ["4", "5", "6"], answer: 1 },
    { q: "4 + 5 = ?", options: ["8", "9", "10"], answer: 1 },
    { q: "7 - 5 = ?", options: ["1", "2", "3"], answer: 1 },
    { q: "3 + 6 = ?", options: ["8", "9", "10"], answer: 1 },
    { q: "9 - 2 = ?", options: ["6", "7", "8"], answer: 1 },
    { q: "10 + 5 = ?", options: ["14", "15", "16"], answer: 1 },
    { q: "15 - 7 = ?", options: ["7", "8", "9"], answer: 1 },
    { q: "6 + 7 = ?", options: ["12", "13", "14"], answer: 1 },
    { q: "12 - 4 = ?", options: ["7", "8", "9"], answer: 1 },
    { q: "9 + 8 = ?", options: ["16", "17", "18"], answer: 1 },
    { q: "14 - 6 = ?", options: ["7", "8", "9"], answer: 1 },
    { q: "11 + 3 = ?", options: ["13", "14", "15"], answer: 1 },
    { q: "13 - 5 = ?", options: ["7", "8", "9"], answer: 1 },
    { q: "8 + 6 = ?", options: ["13", "14", "15"], answer: 1 },
    { q: "16 - 9 = ?", options: ["6", "7", "8"], answer: 1 }
];
function startGame() {
    document.getElementById("home").style.display = "none";
    document.getElementById("game").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    document.getElementById("question").innerText = currentQuestion.q;

    for (let i = 0; i < 3; i++) {
        document.getElementById("opt" + i).innerText = currentQuestion.options[i];
    }

    document.getElementById("result").innerText = "";
}

function checkAnswer(index) {
    if (index === currentQuestion.answer) {
        document.getElementById("result").innerText = "✅ Correct!";
    } else {
        document.getElementById("result").innerText = "❌ Try Again!";
    }

    setTimeout(loadQuestion, 1000);
            }
