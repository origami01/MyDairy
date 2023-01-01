import datetime

# List to store diary entries
diary_entries = [
  {
    'id': 1,
    'title': 'First entry',
    'content': 'This is my first diary entry',
    'date': '2022-12-30'
  },
  {
    'id': 2,
    'title': 'Second entry',
    'content': 'This is my second diary entry',
    'date': '2022-12-31'
  }
]

def create_entry(title, content):
  # Add a new entry to the diary_entries list
  diary_entries.append({
    'id': len(diary_entries) + 1,
    'title': title,
    'content': content,
    'date': datetime.datetime.now().strftime('%Y-%m-%d')
  })
