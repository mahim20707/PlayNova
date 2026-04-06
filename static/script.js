let currentQuestion = {};
let score = 0;
let level = 1;
let progress = 0;

let questions = [
    { q: "2 + 3 = ?", options: ["4", "5", "6"], answer: 1 },
    { q: "1 + 1 = ?", options: ["1", "2", "3"], answer: 1 },
    { q: "5 - 2 = ?", options: ["2", "3", "4"], answer: 1 }
];

function shuffleOptions(q) {
    let opts = [...q.options];
    let correct = opts[q.answer];
    opts.sort(() => Math.random() - 0.5);
    return { q: q.q, options: opts, answer: opts.indexOf(correct) };
}

function loadQuestion() {
    let q = shuffleOptions(questions[Math.floor(Math.random() * questions.length)]);
    currentQuestion = q;

    document.getElementById("question").innerText = q.q;

    for (let i = 0; i < 3; i++) {
        document.getElementById("opt" + i).innerText = q.options[i];
    }
}

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

function saveScore() {
    fetch("/save_score", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({score: score})
    });
}

fetch("/get_score")
.then(res => res.json())
.then(data => {
    score = data.score;
    document.getElementById("score").innerText = score;
});

loadQuestion();
