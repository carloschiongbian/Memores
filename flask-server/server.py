#input "python server.py" to run the flask server

from flask import Flask

app = Flask(__name__);

#when using routes, use the "@" symbol before the variable
#which holds the imported module

# access "localhost:5000/members" to see the server
# return the members in JSON format
@app.route("/members")

def members():
    return { "members": ["Hans","Joshua","Julian","Angelica"] }

if __name__ == "__main__":
    app.run(debug=True)