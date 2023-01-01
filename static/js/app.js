// DOM elements
const diaryEntriesList = document.querySelector('.diary-entries');
const entryForm = document.querySelector('.entry-form');
const entryTitleInput = document.querySelector('.entry-title-input');
const entryContentInput = document.querySelector('.entry-content-input');
const entryDateInput = document.querySelector('.entry-date-input');

// Fetch all diary entries from the server
async function getDiaryEntries() {
  try {
    const response = await fetch('/api/entries');
    const entries = await response.json();
    renderDiaryEntries(entries);
  } catch (error) {
    console.error(error);
  }
}

// Render diary entries to the page
function renderDiaryEntries(entries) {
  // Clear the diary entries list
  diaryEntriesList.innerHTML = '';
  // Loop through the entries and create HTML elements for each one
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('diary-entry');
    entryElement.innerHTML = `
      <h3 class="entry-title">${entry.title}</h3>
      <p class="entry-content">${entry.content}</p>
      <p class="entry-date">${entry.date}</p>
    `;
    diaryEntriesList.appendChild(entryElement);
  });
}

// Add an entry to the diary
async function addDiaryEntry(event) {
  event.preventDefault();
  const title = entryTitleInput.value;
  const content = entryContentInput.value;
  const date = entryDateInput.value;
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content, date })
    });
    const entry = await response.json();
    getDiaryEntries();
  } catch (error) {
    console.error(error);
  }
}

// Event listeners
entryForm.addEventListener('submit', addDiaryEntry);

// Initialize the app
getDiaryEntries();
