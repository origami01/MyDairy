from flask import Flask, jsonify, request
from models import diary_entries, create_entry

app = Flask(__name__)

# Define a route for getting all diary entries
@app.route('/entries')
def get_entries():
  # Return a list of all diary entries as a JSON response
  return jsonify([entry.to_dict() for entry in diary_entries])

# Define a route for getting a specific diary entry
@app.route('/entries/<int:entry_id>')
def get_entry(entry_id):
  # Find the diary entry with the specified ID
  entry = next((entry for entry in diary_entries if entry.id == entry_id), None)
  if entry:
    # Return the diary entry as a JSON response if it exists
    return jsonify(entry.to_dict())
  else:
    # Return a 404 error if the diary entry does not exist
    return jsonify({'error': 'Entry not found'}), 404

# Define a route for adding a diary entry
@app.route('/entries', methods=['POST'])
def add_entry():
  # Get the data for the new diary entry from the request body
  data = request.get_json()
  # Create a new diary entry using the create_entry function
  new_entry = create_entry(data)
  # Return the new diary entry as a JSON response
