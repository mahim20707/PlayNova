from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

# ---------- DATABASE ----------
def get_db():
    return sqlite3.connect("database.db")

def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            score INTEGER
        )
    """)
    db.commit()
    db.close()

init_db()

# ---------- ROUTES ----------

# Home page
@app.route("/")
def home():
    return render_template("game.html")


# Save score API
@app.route("/save_score", methods=["POST"])
def save_score():
    data = request.get_json()
    score = data.get("score", 0)

    db = get_db()
    db.execute("INSERT INTO scores (score) VALUES (?)", (score,))
    db.commit()
    db.close()

    return jsonify({"status": "success"})


# ---------- RUN (IMPORTANT FOR LOCAL ONLY) ----------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
