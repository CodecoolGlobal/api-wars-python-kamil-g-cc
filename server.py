from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def planets():
    return render_template("planets.html")

# put your code here
