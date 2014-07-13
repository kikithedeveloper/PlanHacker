from flask import Flask, request, session, render_template, g, redirect, url_for, flash
import model
import jinja2

app = Flask(__name__)

@app.route("/")
def index():
    """This is the 'cover' page of the ubermelon site""" 
    return render_template("home.html")

# @app.route("/task")

if __name__ == "__main__":
    app.run()