from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import os

app = Flask(__name__)

# Ensure the uploads directory exists
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# In-memory storage for portfolio items
portfolio_items = [
    {"title": "Sample Portrait", "filename": "photo1.jpg", "category": "portraits", "date": "2025-09-08"},
    {"title": "Event Capture", "filename": "photo2.jpg", "category": "events", "date": "2025-09-07"}
]

@app.route('/')
def home():
    return render_template('index.html', portfolio=portfolio_items)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        title = request.form.get('title')
        category = request.form.get('category')
        file = request.files.get('photo')

        if file and title and category:
            filename = file.filename
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            portfolio_items.append({
                "title": title,
                "filename": filename,
                "category": category,
                "date": datetime.now().strftime("%Y-%m-%d")
            })
            return redirect(url_for('home'))

    return render_template('upload.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    # Here you could send an email or save the message to a database
    print(f"Contact from {name} ({email}): {message}")

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
