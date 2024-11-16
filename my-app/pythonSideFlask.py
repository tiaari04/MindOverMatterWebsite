from flask import Flask, jsonify
app= Flask(__name__)

@app.route('./focus') #change this to the jsSideFLask
def send_notification():
