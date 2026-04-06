from flask import Flask, render_template, request, redirect, session, jsonify
import sqlite3

app = Flask(__name__)
app.secret_key = "secret123"

def get_db():
    return sqlite3.connect("database.db")

def init_db():
    db = get_db()
    db.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        score INTEGER DEFAULT 0
    )
    """)
    db.commit()
    db.close()

init_db()

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/signup", methods=["POST"])
def signup():
    u = request.form["username"]
    p = request.form["password"]

    db = get_db()
    db.execute("INSERT INTO users (username, password) VALUES (?, ?)", (u, p))
    db.commit()
    db.close()

    return redirect("/")

@app.route("/login", methods=["POST"])
def login():
    u = request.form["username"]
    p = request.form["password"]

    db = get_db()
    user = db.execute("SELECT * FROM users WHERE username=? AND password=?", (u, p)).fetchone()
    db.close()

    if user:
        session["user"] = u
        return redirect("/game")
    return "Invalid Login"

@app.route("/game")
def game():
    if "user" in session:
        return render_template("game.html")
    return redirect("/")

@app.route("/save_score", methods=["POST"])
def save_score():
    score = request.json["score"]
    u = session["user"]

    db = get_db()
    db.execute("UPDATE users SET score=? WHERE username=?", (score, u))
    db.commit()
    db.close()

    return jsonify({"status": "saved"})

@app.route("/get_score")
def get_score():
    u = session["user"]

    db = get_db()
    user = db.execute("SELECT score FROM users WHERE username=?", (u,)).fetchone()
    db.close()

    return jsonify({"score": user[0]})

app.run(debug=True)
